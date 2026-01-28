import mongoose from 'mongoose';
import { Product } from '../models/Product.model.js';
import { InventoryLog } from '../models/InventoryLog.model.js';
import { logger } from '../utils/logger.util.js';

export async function reserveStock(productId, quantity, orderId, reason = 'sale') {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findById(productId).session(session);
    if (!product) throw Object.assign(new Error('Product not found'), { statusCode: 404 });
    const prev = product.stockQuantity;
    if (prev < quantity) {
      throw Object.assign(new Error(`Insufficient stock for ${product.sku}. Available: ${prev}`), { statusCode: 400 });
    }
    const newQty = prev - quantity;
    await Product.updateOne(
      { _id: productId },
      { $set: { stockQuantity: newQty, availabilityStatus: newQty > 0 ? 'in_stock' : 'out_of_stock' } },
      { session }
    );
    await InventoryLog.create(
      [
        {
          productId,
          sku: product.sku,
          change: -quantity,
          previousQty: prev,
          newQty,
          reason,
          orderId,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return { previousQty: prev, newQty };
  } catch (err) {
    await session.abortTransaction();
    logger.error('reserveStock failed', { productId, quantity, error: err?.message });
    throw err;
  } finally {
    session.endSession();
  }
}

export async function releaseStock(productId, quantity, orderId, performedBy, reason = 'payment_failed_release') {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findById(productId).session(session);
    if (!product) throw Object.assign(new Error('Product not found'), { statusCode: 404 });
    const prev = product.stockQuantity;
    const newQty = prev + quantity;
    await Product.updateOne(
      { _id: productId },
      { $set: { stockQuantity: newQty, availabilityStatus: 'in_stock' } },
      { session }
    );
    await InventoryLog.create(
      [
        {
          productId,
          sku: product.sku,
          change: quantity,
          previousQty: prev,
          newQty,
          reason,
          orderId,
          performedBy,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return { previousQty: prev, newQty };
  } catch (err) {
    await session.abortTransaction();
    logger.error('releaseStock failed', { productId, quantity, error: err?.message });
    throw err;
  } finally {
    session.endSession();
  }
}

export async function adjustStock(productId, change, reason, performedBy, meta = {}) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findById(productId).session(session);
    if (!product) throw Object.assign(new Error('Product not found'), { statusCode: 404 });
    const prev = product.stockQuantity;
    const newQty = Math.max(0, prev + change);
    await Product.updateOne(
      { _id: productId },
      { $set: { stockQuantity: newQty, availabilityStatus: newQty > 0 ? 'in_stock' : 'out_of_stock' } },
      { session }
    );
    await InventoryLog.create(
      [
        {
          productId,
          sku: product.sku,
          change,
          previousQty: prev,
          newQty,
          reason,
          performedBy,
          meta,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return { previousQty: prev, newQty };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

export async function getLogsForProduct(productId, limit = 50) {
  return InventoryLog.find({ productId }).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function getLogsForOrder(orderId) {
  return InventoryLog.find({ orderId }).sort({ createdAt: 1 }).lean();
}
