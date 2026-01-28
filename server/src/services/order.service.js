import { Order } from '../models/Order.model.js';
import { Product } from '../models/Product.model.js';
import { getProductsForOrder } from './product.service.js';
import { reserveStock, releaseStock } from './inventory.service.js';
import { orderTotalPaise, computeFinalPricePaise } from '../utils/pricing.util.js';
import { logger } from '../utils/logger.util.js';

/**
 * Frontend sends only intent: product IDs + quantities.
 * Backend fetches products, recalculates totals, validates stock.
 */
export async function createOrder(userId, { items, shippingAddress }) {
  if (!items?.length) {
    throw Object.assign(new Error('Order must have at least one item'), { statusCode: 400 });
  }
  const productIds = [...new Set(items.map((i) => i.productId))];
  const { products, byId } = await getProductsForOrder(productIds);

  const lineItems = [];
  for (const row of items) {
    const pid = row.productId?.toString?.() ?? row.productId;
    const qty = Math.max(1, Math.floor(Number(row.quantity) || 0));
    const product = byId[pid];
    if (!product) {
      throw Object.assign(new Error(`Product not found: ${pid}`), { statusCode: 404 });
    }
    if (product.stockQuantity < qty) {
      throw Object.assign(
        new Error(`Insufficient stock for ${product.sku}. Available: ${product.stockQuantity}`),
        { statusCode: 400 }
      );
    }
    const unitPricePaise = computeFinalPricePaise(product);
    lineItems.push({
      productId: product._id,
      sku: product.sku,
      name: product.name,
      quantity: qty,
      unitPricePaise,
    });
  }

  const totalAmountPaise = orderTotalPaise(lineItems);
  if (totalAmountPaise <= 0) {
    throw Object.assign(new Error('Order total must be greater than zero'), { statusCode: 400 });
  }

  const order = await Order.create({
    userId,
    items: lineItems,
    totalAmountPaise,
    currency: 'INR',
    status: 'CREATED',
    shippingAddress: shippingAddress || {},
  });

  for (const item of lineItems) {
    try {
      await reserveStock(item.productId, item.quantity, order._id, 'sale');
    } catch (e) {
      logger.error('Stock reserve failed during order create, releasing already reserved', {
        orderId: order._id,
        productId: item.productId,
        error: e?.message,
      });
      for (const done of lineItems) {
        if (done.productId.equals(item.productId)) break;
        try {
          await releaseStock(done.productId, done.quantity, order._id, null, 'payment_failed_release');
        } catch (r) {
          logger.error('Release after partial reserve failure failed', { productId: done.productId, error: r?.message });
        }
      }
      await Order.updateOne({ _id: order._id }, { $set: { status: 'FAILED' } });
      throw e;
    }
  }

  await Order.updateOne({ _id: order._id }, { $set: { status: 'PAYMENT_PENDING' } });
  const updated = await Order.findById(order._id).lean();
  return updated;
}

export async function getOrderById(orderId, userId, isAdmin = false) {
  const order = await Order.findById(orderId).lean();
  if (!order) throw Object.assign(new Error('Order not found'), { statusCode: 404 });
  if (!isAdmin && order.userId.toString() !== userId.toString()) {
    throw Object.assign(new Error('Order not found'), { statusCode: 404 });
  }
  return order;
}

export async function getOrdersForUser(userId, { page = 1, limit = 20, status } = {}) {
  const filter = { userId };
  if (status) filter.status = status;
  const skip = (Math.max(1, page) - 1) * Math.min(50, Math.max(1, limit));
  const orders = await Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  return orders;
}

export async function updateOrderStatus(orderId, status, _meta = {}) {
  const allowed = ['PAYMENT_PENDING', 'PAID', 'FAILED', 'CANCELLED', 'DELIVERED'];
  if (!allowed.includes(status)) {
    throw Object.assign(new Error('Invalid status'), { statusCode: 400 });
  }
  const order = await Order.findByIdAndUpdate(orderId, { $set: { status } }, { new: true }).lean();
  if (!order) throw Object.assign(new Error('Order not found'), { statusCode: 404 });
  return order;
}

export async function cancelOrder(orderId, userId, isAdmin = false) {
  const order = await Order.findById(orderId);
  if (!order) throw Object.assign(new Error('Order not found'), { statusCode: 404 });
  if (!isAdmin && order.userId.toString() !== userId.toString()) {
    throw Object.assign(new Error('Order not found'), { statusCode: 404 });
  }
  if (['PAID', 'DELIVERED'].includes(order.status)) {
    throw Object.assign(new Error('Cannot cancel order in this state'), { statusCode: 400 });
  }
  const { releaseStock } = await import('./inventory.service.js');
  for (const item of order.items) {
    await releaseStock(item.productId, item.quantity, order._id, userId, 'order_cancel');
  }
  order.status = 'CANCELLED';
  await order.save();
  return order.toObject();
}
