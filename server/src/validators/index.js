import Joi from 'joi';

export const auth = {
  register: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().min(8).max(128).required(),
    name: Joi.string().max(200).trim().allow('', null),
  }),
  login: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required(),
  }),
  refresh: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const discountSchema = Joi.object({
  type: Joi.string().valid('percentage', 'flat').required(),
  value: Joi.number().min(0).required(),
});

export const product = {
  create: Joi.object({
    name: Joi.string().required().trim(),
    sku: Joi.string().required().trim(),
    category: Joi.string().valid('laptop', 'prebuilt', 'intel-custom', 'amd-custom', 'accessory').required(),
    brand: Joi.string().trim().allow('', null),
    basePrice: Joi.number().min(0).required(),
    discount: discountSchema.allow(null),
    taxRate: Joi.number().min(0).max(1),
    stockQuantity: Joi.number().integer().min(0),
    shortDescription: Joi.string().trim().allow('', null),
    detailedDescription: Joi.string().allow('', null),
    specifications: Joi.object().unknown(true),
    images: Joi.array().items(Joi.string().trim()),
  }),
  update: Joi.object({
    name: Joi.string().trim(),
    brand: Joi.string().trim().allow('', null),
    basePrice: Joi.number().min(0),
    discount: discountSchema.allow(null),
    taxRate: Joi.number().min(0).max(1),
    stockQuantity: Joi.number().integer().min(0),
    shortDescription: Joi.string().trim().allow('', null),
    detailedDescription: Joi.string().allow('', null),
    specifications: Joi.object().unknown(true),
    images: Joi.array().items(Joi.string().trim()),
    isActive: Joi.boolean(),
    availabilityStatus: Joi.string().valid('in_stock', 'out_of_stock', 'discontinued'),
  }).min(1),
  listQuery: Joi.object({
    category: Joi.string().valid('laptop', 'prebuilt', 'intel-custom', 'amd-custom', 'accessory'),
    isActive: Joi.boolean(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string(),
  }),
  idParam: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
  skuParam: Joi.object({
    sku: Joi.string().min(1).required(),
  }),
};

const orderItemSchema = Joi.object({
  productId: Joi.string().length(24).hex().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const order = {
  create: Joi.object({
    items: Joi.array().items(orderItemSchema).min(1).required(),
    shippingAddress: Joi.object({
      line1: Joi.string().trim(),
      line2: Joi.string().trim(),
      city: Joi.string().trim(),
      state: Joi.string().trim(),
      pincode: Joi.string().trim(),
    }).unknown(true),
  }),
  listQuery: Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(50),
    status: Joi.string().valid('CREATED', 'PAYMENT_PENDING', 'PAID', 'FAILED', 'CANCELLED', 'DELIVERED'),
  }),
  idParam: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
};

export const payment = {
  createOrder: Joi.object({
    orderId: Joi.string().length(24).hex().required(),
  }),
  verify: Joi.object({
    orderId: Joi.string().length(24).hex().required(),
    razorpay_order_id: Joi.string().required(),
    razorpay_payment_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
  }),
};

export const admin = {
  analyticsQuery: Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
  }),
  stockAlertsQuery: Joi.object({
    threshold: Joi.number().integer().min(0),
  }),
  productPerformanceQuery: Joi.object({
    limit: Joi.number().integer().min(1).max(100),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
  }),
};
