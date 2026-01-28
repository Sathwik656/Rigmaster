import * as adminService from '../services/admin.service.js';

export async function salesAnalytics(req, res, next) {
  try {
    const { startDate, endDate } = req.query;
    const data = await adminService.getSalesAnalytics(startDate, endDate);
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
}

export async function revenueByDay(req, res, next) {
  try {
    const { startDate, endDate } = req.query;
    const data = await adminService.getRevenueByDay(startDate, endDate);
    res.json({ success: true, data: { series: data } });
  } catch (e) {
    next(e);
  }
}

export async function productPerformance(req, res, next) {
  try {
    const { limit, startDate, endDate } = req.query;
    const data = await adminService.getProductPerformance(limit, startDate, endDate);
    res.json({ success: true, data: { products: data } });
  } catch (e) {
    next(e);
  }
}

export async function stockAlerts(req, res, next) {
  try {
    const threshold = req.query.threshold ?? 5;
    const data = await adminService.getStockAlerts(Number(threshold));
    res.json({ success: true, data: { alerts: data } });
  } catch (e) {
    next(e);
  }
}

export async function dashboardSummary(req, res, next) {
  try {
    const data = await adminService.getDashboardSummary();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
}
