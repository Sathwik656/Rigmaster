import * as orderService from '../services/order.service.js';

export async function create(req, res, next) {
  try {
    const order = await orderService.createOrder(req.user._id, req.body);
    res.status(201).json({ success: true, data: { order } });
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const isAdmin = req.user?.role === 'ADMIN';
    const order = await orderService.getOrderById(req.params.id, req.user._id, isAdmin);
    res.json({ success: true, data: { order } });
  } catch (e) {
    next(e);
  }
}

export async function listMine(req, res, next) {
  try {
    const orders = await orderService.getOrdersForUser(req.user._id, req.query);
    res.json({ success: true, data: { orders } });
  } catch (e) {
    next(e);
  }
}

export async function cancel(req, res, next) {
  try {
    const isAdmin = req.user?.role === 'ADMIN';
    const order = await orderService.cancelOrder(req.params.id, req.user._id, isAdmin);
    res.json({ success: true, data: { order } });
  } catch (e) {
    next(e);
  }
}
