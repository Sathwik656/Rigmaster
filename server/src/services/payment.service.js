import crypto from 'crypto';
import { getRazorpayInstance, getRazorpayWebhookSecret } from '../config/razorpay.config.js';
import { env } from '../config/env.config.js';
import { Order } from '../models/Order.model.js';
import { Payment } from '../models/Payment.model.js';
import { updateOrderStatus } from './order.service.js';
import { releaseStock } from './inventory.service.js';
import { logger } from '../utils/logger.util.js';

export async function createRazorpayOrder(orderId, userId) {
  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) throw Object.assign(new Error('Order not found'), { statusCode: 404 });
  if (order.status !== 'PAYMENT_PENDING') {
    throw Object.assign(new Error('Order is not in payment pending state'), { statusCode: 400 });
  }
  const amountPaise = order.totalAmountPaise;
  const razorpay = getRazorpayInstance();
  const options = {
    amount: amountPaise,
    currency: 'INR',
    receipt: `order_${orderId}`,
    notes: { orderId: orderId.toString() },
  };
  const razorpayOrder = await razorpay.orders.create(options);
  await Payment.findOneAndUpdate(
    { orderId },
    {
      $set: {
        orderId,
        razorpayOrderId: razorpayOrder.id,
        amountPaise,
        currency: 'INR',
        status: 'created',
      },
    },
    { upsert: true, new: true }
  );
  return {
    orderId: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: amountPaise,
    currency: 'INR',
    keyId: env.razorpay.keyId,
  };
}

function verifySignature(body, signature, secret) {
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expected, 'utf8'));
}

export async function verifyPaymentAndCapture(orderId, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const payment = await Payment.findOne({ orderId });
  if (!payment) throw Object.assign(new Error('Payment record not found'), { statusCode: 404 });
  if (payment.razorpayOrderId !== razorpay_order_id) {
    throw Object.assign(new Error('Order id mismatch'), { statusCode: 400 });
  }
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const secret = env.razorpay.keySecret;
  const valid = verifySignature(body, razorpay_signature, secret);
  if (!valid) {
    await Payment.updateOne(
      { orderId },
      { $set: { status: 'failed' }, $unset: { paidAt: 1 } }
    );
    throw Object.assign(new Error('Invalid payment signature'), { statusCode: 400 });
  }
  await Payment.updateOne(
    { orderId },
    {
      $set: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'captured',
        paidAt: new Date(),
      },
    }
  );
  await updateOrderStatus(orderId, 'PAID');
  return { success: true, orderId, status: 'PAID' };
}

export function verifyWebhookSignature(rawBody, signature) {
  const secret = getRazorpayWebhookSecret();
  if (!secret) {
    logger.warn('RAZORPAY_WEBHOOK_SECRET not set; skipping webhook signature verification');
    return true;
  }
  return verifySignature(rawBody, signature, secret);
}

export async function handlePaymentCapturedWebhook(paymentEntity) {
  const paymentByRazorpay = await Payment.findOne({ razorpayOrderId: paymentEntity.order_id });
  const orderId = paymentByRazorpay?.orderId ?? paymentEntity.notes?.orderId;
  if (!orderId) {
    logger.warn('Webhook payment.captured cannot resolve orderId', { paymentId: paymentEntity.id, order_id: paymentEntity.order_id });
    return;
  }
  const order = await Order.findById(orderId);
  if (!order) {
    logger.warn('Webhook order not found', { orderId });
    return;
  }
  if (order.status === 'PAID') {
    return;
  }
  const payment = await Payment.findOne({ orderId });
  if (!payment) {
    await Payment.create({
      orderId,
      razorpayOrderId: paymentEntity.order_id,
      razorpayPaymentId: paymentEntity.id,
      status: 'captured',
      amountPaise: paymentEntity.amount,
      currency: paymentEntity.currency || 'INR',
      paidAt: new Date(),
    });
  } else {
    await Payment.updateOne(
      { orderId },
      {
        $set: {
          razorpayPaymentId: paymentEntity.id,
          status: 'captured',
          paidAt: new Date(),
        },
      }
    );
  }
  await updateOrderStatus(orderId, 'PAID');
  logger.info('Order marked PAID via webhook', { orderId, paymentId: paymentEntity.id });
}

export async function handlePaymentFailedWebhook(paymentEntity) {
  const paymentByRazorpay = await Payment.findOne({ razorpayOrderId: paymentEntity.order_id });
  const orderId = paymentByRazorpay?.orderId ?? paymentEntity.notes?.orderId;
  if (!orderId) return;

  const order = await Order.findById(orderId);
  if (!order || order.status === 'PAID') return;

  await Payment.updateOne(
    { orderId },
    { $set: { status: 'failed' } }
  );

  await updateOrderStatus(orderId, 'FAILED');

  for (const item of order.items) {
    try {
      await releaseStock(
        item.productId,
        item.quantity,
        order._id,
        null,
        'payment_failed_release'
      );
    } catch (e) {
      logger.error(
        'Release stock on payment failed webhook error',
        { orderId, productId: item.productId, error: e?.message }
      );
    }
  }

  logger.info(
    'Order marked FAILED and stock released via webhook',
    { orderId }
  );
}
