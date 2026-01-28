import { Order } from '../models/Order.model.js';
import { Product } from '../models/Product.model.js';
import { Payment } from '../models/Payment.model.js';

export async function getSalesAnalytics(startDate, endDate) {
  const match = {
    status: 'PAID',
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
  };
  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: null,
        totalRevenuePaise: { $sum: '$totalAmountPaise' },
        orderCount: { $sum: 1 },
        totalItems: { $sum: { $size: '$items' } },
      },
    },
  ];
  const [r] = await Order.aggregate(pipeline);
  return {
    totalRevenuePaise: r?.totalRevenuePaise ?? 0,
    orderCount: r?.orderCount ?? 0,
    totalItemsSold: r?.totalItems ?? 0,
    startDate,
    endDate,
  };
}

export async function getRevenueByDay(startDate, endDate) {
  const pipeline = [
    {
      $match: {
        status: 'PAID',
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        revenuePaise: { $sum: '$totalAmountPaise' },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ];
  return Order.aggregate(pipeline);
}

export async function getProductPerformance(limit = 10, startDate, endDate) {
  const dateFilter = startDate && endDate
    ? { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } }
    : {};
  const pipeline = [
    { $match: { status: 'PAID', ...dateFilter } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.productId',
        sku: { $first: '$items.sku' },
        name: { $first: '$items.name' },
        totalQuantity: { $sum: '$items.quantity' },
        totalRevenuePaise: { $sum: { $multiply: ['$items.unitPricePaise', '$items.quantity'] } },
      },
    },
    { $sort: { totalRevenuePaise: -1 } },
    { $limit: limit },
  ];
  return Order.aggregate(pipeline);
}

export async function getStockAlerts(threshold = 5) {
  return Product.find({
    isActive: true,
    stockQuantity: { $lte: threshold },
    availabilityStatus: { $ne: 'discontinued' },
  })
    .select('_id sku name stockQuantity availabilityStatus category')
    .sort({ stockQuantity: 1 })
    .lean();
}

export async function getDashboardSummary() {
  const [ordersPaid, ordersPending, productsLow, totalProducts] = await Promise.all([
    Order.countDocuments({ status: 'PAID' }),
    Order.countDocuments({ status: 'PAYMENT_PENDING' }),
    Product.countDocuments({ isActive: true, stockQuantity: { $lte: 5 }, availabilityStatus: 'in_stock' }),
    Product.countDocuments({ isActive: true }),
  ]);
  const revenueResult = await Order.aggregate([
    { $match: { status: 'PAID' } },
    { $group: { _id: null, total: { $sum: '$totalAmountPaise' } } },
  ]);
  return {
    ordersPaid,
    ordersPending,
    productsLowStock: productsLow,
    totalProducts,
    totalRevenuePaise: revenueResult[0]?.total ?? 0,
  };
}
