import * as productService from '../services/product.service.js';

export async function list(req, res, next) {
  try {
    const data = await productService.listProducts(req.query);
    res.json({ success: true, data: { products: data } });
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ success: true, data: { product } });
  } catch (e) {
    next(e);
  }
}

export async function getBySku(req, res, next) {
  try {
    const product = await productService.getProductBySku(req.params.sku);
    res.json({ success: true, data: { product } });
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const product = await productService.createProduct(req.body, req.user._id);
    res.status(201).json({ success: true, data: { product } });
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body, req.user._id);
    res.json({ success: true, data: { product } });
  } catch (e) {
    next(e);
  }
}

export async function deactivate(req, res, next) {
  try {
    const product = await productService.deactivateProduct(req.params.id);
    res.json({ success: true, data: { product } });
  } catch (e) {
    next(e);
  }
}
