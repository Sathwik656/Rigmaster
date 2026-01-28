import { Product } from '../models/Product.model.js';
import { computeFinalPricePaise } from '../utils/pricing.util.js';
import { adjustStock } from './inventory.service.js';

const CATEGORIES = ['laptop', 'prebuilt', 'intel-custom', 'amd-custom', 'accessory'];
const AVAILABILITY = ['in_stock', 'out_of_stock', 'discontinued'];

export function listProducts({ category, isActive = true, page = 1, limit = 20, sort = '-createdAt' }) {
  const filter = {};
  if (category && CATEGORIES.includes(category)) filter.category = category;
  if (typeof isActive === 'boolean') filter.isActive = isActive;
  const skip = (Math.max(1, page) - 1) * Math.min(100, Math.max(1, limit));
  const cappedLimit = Math.min(100, Math.max(1, limit));
  return Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(cappedLimit)
    .lean()
    .then((docs) => docs.map((d) => ({ ...d, finalPrice: computeFinalPricePaise(d) })));
}

export async function getProductById(id) {
  const product = await Product.findOne({ _id: id, isActive: true }).lean();
  if (!product) throw Object.assign(new Error('Product not found'), { statusCode: 404 });
  return { ...product, finalPrice: computeFinalPricePaise(product) };
}

export async function getProductBySku(sku) {
  const product = await Product.findOne({ sku: sku.trim(), isActive: true }).lean();
  if (!product) throw Object.assign(new Error('Product not found'), { statusCode: 404 });
  return { ...product, finalPrice: computeFinalPricePaise(product) };
}

export async function createProduct(data, performedBy) {
  const existing = await Product.findOne({ sku: data.sku.trim() });
  if (existing) {
    throw Object.assign(new Error(`Product with sku ${data.sku} already exists`), { statusCode: 409 });
  }
  const payload = {
    name: data.name.trim(),
    sku: data.sku.trim(),
    category: data.category,
    brand: data.brand?.trim() || null,
    basePrice: Math.round(Number(data.basePrice)),
    discount: data.discount || null,
    taxRate: typeof data.taxRate === 'number' ? data.taxRate : 0.18,
    stockQuantity: Math.max(0, Math.floor(Number(data.stockQuantity) || 0)),
    shortDescription: data.shortDescription?.trim() || null,
    detailedDescription: data.detailedDescription || null,
    specifications: data.specifications && typeof data.specifications === 'object' ? data.specifications : {},
    images: Array.isArray(data.images) ? data.images.filter(Boolean) : [],
    isActive: true,
  };
  if (payload.stockQuantity > 0) payload.availabilityStatus = 'in_stock';
  else payload.availabilityStatus = 'out_of_stock';
  const product = await Product.create(payload);
  if (payload.stockQuantity > 0) {
    await adjustStock(product._id, payload.stockQuantity, 'initial', performedBy, { create: true });
  }
  const out = product.toObject();
  return { ...out, finalPrice: computeFinalPricePaise(out) };
}

export async function updateProduct(id, data, performedBy) {
  const product = await Product.findById(id);
  if (!product) throw Object.assign(new Error('Product not found'), { statusCode: 404 });
  const allowed = [
    'name', 'brand', 'basePrice', 'discount', 'taxRate', 'stockQuantity', 'shortDescription',
    'detailedDescription', 'specifications', 'images', 'isActive', 'availabilityStatus',
  ];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      if (key === 'basePrice') product.basePrice = Math.round(Number(data[key]));
      else if (key === 'stockQuantity') {
        const newQty = Math.max(0, Math.floor(Number(data[key]) || 0));
        const delta = newQty - product.stockQuantity;
        product.stockQuantity = newQty;
        if (delta !== 0) {
          await adjustStock(product._id, delta, 'adjustment', performedBy, { reason: 'admin_update' });
        }
      } else if (key === 'discount' && data[key] === null) product.discount = undefined;
      else product[key] = data[key];
    }
  }
  if (product.stockQuantity > 0 && product.availabilityStatus === 'out_of_stock') {
    product.availabilityStatus = 'in_stock';
  } else if (product.stockQuantity === 0 && product.availabilityStatus === 'in_stock') {
    product.availabilityStatus = 'out_of_stock';
  }
  await product.save();
  const out = product.toObject();
  return { ...out, finalPrice: computeFinalPricePaise(out) };
}

export async function deactivateProduct(id) {
  const product = await Product.findByIdAndUpdate(
    id,
    { $set: { isActive: false, availabilityStatus: 'discontinued' } },
    { new: true }
  );
  if (!product) throw Object.assign(new Error('Product not found'), { statusCode: 404 });
  return product;
}

export async function getProductsForOrder(productIds) {
  const products = await Product.find({ _id: { $in: productIds }, isActive: true }).lean();
  const byId = Object.fromEntries(products.map((p) => [p._id.toString(), p]));
  return { products, byId };
}
