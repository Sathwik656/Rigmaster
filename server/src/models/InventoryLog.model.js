import mongoose from 'mongoose';

const inventoryLogSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    sku: { type: String, required: true },
    change: { type: Number, required: true }, // + for add, - for deduct
    previousQty: { type: Number, required: true },
    newQty: { type: Number, required: true },
    reason: {
      type: String,
      enum: ['sale', 'restock', 'adjustment', 'payment_failed_release', 'order_cancel', 'initial'],
      required: true,
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

inventoryLogSchema.index({ productId: 1, createdAt: -1 });
inventoryLogSchema.index({ orderId: 1 });
inventoryLogSchema.index({ createdAt: -1 });

export const InventoryLog = mongoose.model('InventoryLog', inventoryLogSchema);
