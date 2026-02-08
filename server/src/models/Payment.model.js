import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true, // ✅ single source of truth for index
    },
    razorpayPaymentId: {
      type: String,
      sparse: true,
    },
    razorpaySignature: {
      type: String,
    },
    status: {
      type: String,
      enum: ['created', 'attempted', 'captured', 'failed', 'refunded'],
      default: 'created',
    },
    amountPaise: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    paidAt: {
      type: Date,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

// ✅ keep non-duplicated index
paymentSchema.index({ status: 1 });

export const Payment = mongoose.model('Payment', paymentSchema);
