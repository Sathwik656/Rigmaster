/**
 * Production-readiness tests: auth, products, orders, payments, schema, Razorpay flow.
 * Runs with in-memory MongoDB and mocked Razorpay when NODE_ENV=test.
 * Requires: npm install (mongodb-memory-server, supertest). Run from repo: npm test
 */
process.env.NODE_ENV = 'test';

import { MongoMemoryServer } from 'mongodb-memory-server';
import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';

let mongod;
let app;
let connectDb;
let disconnectDb;

async function setup() {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  const db = await import('../src/config/db.config.js');
  const appMod = await import('../src/app.js');
  app = appMod.default;
  connectDb = db.connectDb;
  disconnectDb = db.disconnectDb;
  await connectDb();
}

await setup();

test.after(async () => {
  if (disconnectDb) await disconnectDb();
  if (mongod) await mongod.stop();
});

// --- Health & routing ---
test('GET /health returns 200 and { ok, ts }', async () => {
  const res = await request(app).get('/health');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.ok, true);
  assert.ok(res.body.ts);
});

test('404 for unknown route returns { success: false, error }', async () => {
  const res = await request(app).get('/api/unknown');
  assert.strictEqual(res.status, 404);
  assert.strictEqual(res.body.success, false);
  assert.ok(res.body.error?.code);
  assert.ok(res.body.error?.message);
});

// --- Auth ---
test('POST /api/auth/register creates user and returns { success, data.user }', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'user@test.com', password: 'password123', name: 'Test User' });
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data?.user);
  assert.strictEqual(res.body.data.user.email, 'user@test.com');
  assert.ok(res.body.data.user._id);
  assert.ok(!res.body.data.user.passwordHash);
});

test('POST /api/auth/login returns { success, data: { user, accessToken, refreshToken } }', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@test.com', password: 'password123' });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data?.accessToken);
  assert.ok(res.body.data?.refreshToken);
  assert.ok(res.body.data?.user?.email);
});

test('GET /api/auth/profile without token returns 401', async () => {
  const res = await request(app).get('/api/auth/profile');
  assert.strictEqual(res.status, 401);
  assert.strictEqual(res.body.success, false);
});

test('GET /api/auth/profile with token returns user', async () => {
  const login = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@test.com', password: 'password123' });
  const token = login.body.data.accessToken;
  const res = await request(app).get('/api/auth/profile').set('Authorization', 'Bearer ' + token);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.data.user.email, 'user@test.com');
});

// --- Products (public list, schema for frontend) ---
test('GET /api/products returns { success, data: { products } }', async () => {
  const res = await request(app).get('/api/products');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(Array.isArray(res.body.data?.products));
});

test('GET /api/products?category=laptop applies filter', async () => {
  const res = await request(app).get('/api/products').query({ category: 'laptop' });
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body.data?.products));
});

// --- Admin: create product (valid schema, backend-owned pricing) ---
let adminToken;
let productId;
test('Create admin user and login', async () => {
  const { User } = await import('../src/models/User.model.js');
  const bcrypt = (await import('bcryptjs')).default;
  const hash = await bcrypt.hash('admin123', 12);
  await User.create({
    email: 'admin@test.com',
    passwordHash: hash,
    name: 'Admin',
    role: 'ADMIN',
  });
  const res = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'admin123' });
  assert.strictEqual(res.status, 200);
  adminToken = res.body.data.accessToken;
});

test('POST /api/products (admin) creates product with backend pricing schema', async () => {
  const res = await request(app)
    .post('/api/products')
    .set('Authorization', 'Bearer ' + adminToken)
    .send({
      name: 'Test Laptop',
      sku: 'SKU-LAP-001',
      category: 'laptop',
      brand: 'TestBrand',
      basePrice: 5000000,
      taxRate: 0.18,
      stockQuantity: 10,
      shortDescription: 'A test laptop',
    });
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.success, true);
  const p = res.body.data?.product;
  assert.ok(p);
  assert.strictEqual(p.sku, 'SKU-LAP-001');
  assert.strictEqual(p.category, 'laptop');
  assert.strictEqual(p.basePrice, 50000_00);
  assert.ok(typeof p.finalPrice === 'number');
  assert.ok(p._id);
  productId = p._id;
});

test('GET /api/products/id/:id returns product with finalPrice (frontend-ready)', async () => {
  const res = await request(app).get('/api/products/id/' + productId);
  assert.strictEqual(res.status, 200);
  assert.ok(res.body.data?.product);
  const p = res.body.data.product;
  assert.ok(p.finalPrice);
  assert.ok(['in_stock', 'out_of_stock', 'discontinued'].includes(p.availabilityStatus));
});

test('GET /api/products/sku/:sku returns product by sku', async () => {
  const res = await request(app).get('/api/products/sku/SKU-LAP-001');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.data?.product?.sku, 'SKU-LAP-001');
});

// --- Orders: intent-only (productId + quantity), backend computes total ---
let orderId;
let userToken;
test('User token for orders', async () => {
  const res = await request(app).post('/api/auth/login').send({ email: 'user@test.com', password: 'password123' });
  userToken = res.body.data.accessToken;
});

test('POST /api/orders with productId+quantity creates order (backend-owned total)', async () => {
  const res = await request(app)
    .post('/api/orders')
    .set('Authorization', 'Bearer ' + userToken)
    .send({
      items: [{ productId, quantity: 2 }],
      shippingAddress: { city: 'Mumbai', pincode: '400001' },
    });
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.success, true);
  const o = res.body.data?.order;
  assert.ok(o);
  assert.ok(o._id);
  assert.strictEqual(o.currency, 'INR');
  assert.ok(o.totalAmountPaise > 0);
  assert.ok(Array.isArray(o.items));
  assert.ok(o.items.every((i) => i.unitPricePaise != null && i.quantity != null));
  assert.ok(['CREATED', 'PAYMENT_PENDING'].includes(o.status));
  orderId = o._id;
});

test('GET /api/orders/:id returns order for owner', async () => {
  const res = await request(app).get('/api/orders/' + orderId).set('Authorization', 'Bearer ' + userToken);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.data?.order?._id, orderId);
});

// --- Payment: create Razorpay order (mocked), schema and auth ---
test('POST /api/payment/create-order without auth returns 401', async () => {
  const res = await request(app).post('/api/payment/create-order').send({ orderId });
  assert.strictEqual(res.status, 401);
});

test('POST /api/payment/create-order with auth returns razorpayOrderId and keyId', async () => {
  const res = await request(app)
    .post('/api/payment/create-order')
    .set('Authorization', 'Bearer ' + userToken)
    .send({ orderId });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data?.razorpayOrderId);
  assert.ok(res.body.data?.keyId);
  assert.strictEqual(res.body.data?.currency, 'INR');
  assert.ok(typeof res.body.data?.amount === 'number');
});

test('POST /api/payment/verify with invalid signature returns 400', async () => {
  const res = await request(app)
    .post('/api/payment/verify')
    .set('Authorization', 'Bearer ' + userToken)
    .send({
      orderId,
      razorpay_order_id: 'order_xxx',
      razorpay_payment_id: 'pay_xxx',
      razorpay_signature: 'invalid',
    });
  assert.strictEqual(res.status, 400);
  assert.strictEqual(res.body.success, false);
});

// --- Validation: reject malformed input ---
test('POST /api/auth/register with short password returns 400', async () => {
  const res = await request(app).post('/api/auth/register').send({ email: 'x@x.com', password: 'short' });
  assert.strictEqual(res.status, 400);
  assert.ok(res.body.error?.details || res.body.error?.message);
});

test('POST /api/orders with empty items returns 400', async () => {
  const res = await request(app)
    .post('/api/orders')
    .set('Authorization', 'Bearer ' + userToken)
    .send({ items: [] });
  assert.strictEqual(res.status, 400);
});

// --- Admin endpoints ---
test('GET /api/admin/dashboard without admin returns 403', async () => {
  const res = await request(app).get('/api/admin/dashboard').set('Authorization', 'Bearer ' + userToken);
  assert.strictEqual(res.status, 403);
});

test('GET /api/admin/dashboard with admin returns summary', async () => {
  const res = await request(app).get('/api/admin/dashboard').set('Authorization', 'Bearer ' + adminToken);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(typeof res.body.data?.totalRevenuePaise === 'number');
  assert.ok(typeof res.body.data?.ordersPaid === 'number');
});

test('GET /api/admin/stock-alerts returns array', async () => {
  const res = await request(app).get('/api/admin/stock-alerts').set('Authorization', 'Bearer ' + adminToken);
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body.data?.alerts));
});
