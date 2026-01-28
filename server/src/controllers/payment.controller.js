import * as paymentService from '../services/payment.service.js';

export async function createRazorpayOrder(req, res, next) {
  try {
    const result = await paymentService.createRazorpayOrder(req.body.orderId, req.user._id);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
}

export async function verify(req, res, next) {
  try {
    const result = await paymentService.verifyPaymentAndCapture(req.body.orderId, {
      razorpay_order_id: req.body.razorpay_order_id,
      razorpay_payment_id: req.body.razorpay_payment_id,
      razorpay_signature: req.body.razorpay_signature,
    });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
}

export async function webhook(req, res, next) {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = typeof req.rawBody === 'string' ? req.rawBody : JSON.stringify(req.body);
    if (paymentService.verifyWebhookSignature(rawBody, signature) === false) {
      return res.status(400).json({ success: false, error: 'Invalid webhook signature' });
    }
    const event = req.body?.event;
    const payload = req.body?.payload?.payment?.entity ?? req.body?.payload?.entity;
    if (event === 'payment.captured' && payload) {
      await paymentService.handlePaymentCapturedWebhook(payload);
    } else if (event === 'payment.failed' && payload) {
      await paymentService.handlePaymentFailedWebhook(payload);
    }
    res.status(200).json({ received: true });
  } catch (e) {
    next(e);
  }
}
