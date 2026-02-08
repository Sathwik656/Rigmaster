import mongoose from 'mongoose';
import { computeFinalPricePaise } from '../utils/pricing.util.js';

const discountSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['percentage', 'flat'], required: true },
    value: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['laptop', 'prebuilt', 'intel-custom', 'amd-custom', 'accessory'],
      required: true,
    },
    brand: { type: String, trim: true },
    basePrice: { type: Number, required: true, min: 0 },
    discount: { type: discountSchema, default: null },
    taxRate: { type: Number, default: 0.18, min: 0, max: 1 },
    stockQuantity: { type: Number, required: true, min: 0, default: 0 },
    availabilityStatus: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'discontinued'],
      default: 'out_of_stock',
    },
    shortDescription: { type: String, trim: true },
    detailedDescription: { type: String },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    images: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ keep non-duplicated indexes
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1, isActive: 1 });

productSchema.virtual('finalPrice').get(function () {
  return computeFinalPricePaise({
    basePrice: this.basePrice,
    discount: this.discount,
    taxRate: this.taxRate,
  });
});

productSchema.pre('save', function (next) {
  if (this.stockQuantity > 0 && this.availabilityStatus === 'out_of_stock') {
    this.availabilityStatus = 'in_stock';
  } else if (this.stockQuantity === 0 && this.availabilityStatus === 'in_stock') {
    this.availabilityStatus = 'out_of_stock';
  }
  next();
});

productSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    ret.finalPrice = doc.finalPrice;
    return ret;
  },
});

export const Product = mongoose.model('Product', productSchema);
