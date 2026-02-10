# Rig-Master API Testing Guide

This guide documents every route mounted by `server/src/app.js` so you can test the backend end-to-end.

## 1. Base URL and headers

- Base URL: `http://localhost:5000`
- JSON header: `Content-Type: application/json`
- Auth header: `Authorization: Bearer <access_token>`
- Global rate limiting is enabled (`RATE_LIMIT_MAX` per `RATE_LIMIT_WINDOW_MS`), so high-volume test loops can return `429`.

## 2. Response formats

- Most success responses: `{ "success": true, "data": ... }`
- Most error responses: `{ "success": false, "error": { "code": "...", "message": "...", "details": [...]? } }`
- Exceptions:
- Cart endpoints return raw cart objects (not wrapped in `{ success, data }`)
- `DELETE /api/cart` returns `{ "message": "Cart cleared" }`
- `GET /health` returns `{ "ok": true, "ts": "<iso>" }`
- `POST /api/payment/webhook` returns `{ "received": true }` on success

## 3. Common test setup

1. Start server:
   ```bash
   cd server
   npm install
   npm run dev
   ```
2. Register a normal user (`POST /api/auth/register`), then login to get `USER_TOKEN`.
3. Create an admin user (no public admin signup route) and login to get `ADMIN_TOKEN`.
4. As admin, create at least one product to get `PRODUCT_ID`.
5. As user, create an order to get `ORDER_ID`.

## 4. Route checklist (all routes)

### System

#### GET /health
- Auth: none
- Request: none
- Success: `200`, `{ ok: true, ts: ISOString }`
- Useful negative test: none (always public)

### Auth (`/api/auth`)

#### POST /api/auth/register
- Auth: none
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "Test User"
  }
  ```
- Validation:
- `email` required, valid email
- `password` required, min 8 chars
- `name` optional
- Success: `201`, `{ success: true, data: { user } }`
- Negative tests:
- short password -> `400 VALIDATION_ERROR`
- duplicate email -> `409 EMAIL_EXISTS`

#### POST /api/auth/login
- Auth: none
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Success: `200`, `{ success: true, data: { user, accessToken, refreshToken, expiresIn } }`
- Negative tests:
- wrong password -> `401 INVALID_CREDENTIALS`
- unknown email -> `401 INVALID_CREDENTIALS`

#### POST /api/auth/refresh
- Auth: none
- Body:
  ```json
  {
    "refreshToken": "<refresh_token>"
  }
  ```
- Success: `200`, `{ success: true, data: { accessToken, refreshToken, expiresIn } }`
- Negative tests:
- invalid/expired token -> `401 INVALID_REFRESH`

#### POST /api/auth/logout
- Auth: Bearer user/admin token
- Body: none
- Success: `200`, `{ success: true, data: { ok: true } }`
- Negative tests:
- missing token -> `401 UNAUTHORIZED`
- invalid/expired token -> `401 INVALID_TOKEN` or `401 TOKEN_EXPIRED`

#### GET /api/auth/profile
- Auth: Bearer user/admin token
- Request: none
- Success: `200`, `{ success: true, data: { user } }`
- Negative tests:
- missing token -> `401 UNAUTHORIZED`

### Products (`/api/products`)

#### GET /api/products
- Auth: none
- Query:
- `category` in `laptop | prebuilt | intel-custom | amd-custom | accessory`
- `isActive` boolean
- `page` integer >= 1
- `limit` integer 1..100
- `sort` string (for mongoose sort)
- Success: `200`, `{ success: true, data: { products: Product[] } }`
- Notes:
- Default behavior returns active products (`isActive=true`) if query omits it
- Negative tests:
- invalid category -> `400 VALIDATION_ERROR`

#### GET /api/products/id/:id
- Auth: none
- Params:
- `id` must be 24-char hex ObjectId
- Success: `200`, `{ success: true, data: { product } }`
- Negative tests:
- invalid id format -> `400 VALIDATION_ERROR`
- not found or inactive -> `404` ("Product not found")

#### GET /api/products/sku/:sku
- Auth: none
- Params:
- `sku` non-empty string
- Success: `200`, `{ success: true, data: { product } }`
- Negative tests:
- missing/blank sku -> `400 VALIDATION_ERROR`
- not found/inactive sku -> `404`

#### POST /api/products
- Auth: Bearer admin token
- Body:
  ```json
  {
    "name": "Gaming Laptop",
    "sku": "SKU-LAP-001",
    "category": "laptop",
    "brand": "BrandX",
    "basePrice": 5000000,
    "discount": { "type": "percentage", "value": 10 },
    "taxRate": 0.18,
    "stockQuantity": 10,
    "shortDescription": "High performance",
    "detailedDescription": "Full specs",
    "specifications": { "ram": "16GB" },
    "images": ["https://example.com/p1.png"]
  }
  ```
- Success: `201`, `{ success: true, data: { product } }`
- Negative tests:
- non-admin token -> `403 FORBIDDEN`
- duplicate sku -> `409`
- invalid category or invalid body field types -> `400 VALIDATION_ERROR`

#### PATCH /api/products/:id
- Auth: Bearer admin token
- Params:
- `id` 24-char hex ObjectId
- Body: at least one of
- `name`, `brand`, `basePrice`, `discount`, `taxRate`, `stockQuantity`,
- `shortDescription`, `detailedDescription`, `specifications`, `images`,
- `isActive`, `availabilityStatus`
- Success: `200`, `{ success: true, data: { product } }`
- Negative tests:
- empty body -> `400 VALIDATION_ERROR`
- non-admin token -> `403 FORBIDDEN`
- unknown product id -> `404`

#### DELETE /api/products/:id
- Auth: Bearer admin token
- Params:
- `id` 24-char hex ObjectId
- Behavior: soft deactivate product (`isActive=false`, `availabilityStatus='discontinued'`)
- Success: `200`, `{ success: true, data: { product } }`
- Negative tests:
- non-admin token -> `403 FORBIDDEN`
- invalid id -> `400 VALIDATION_ERROR`

### Cart (`/api/cart`) - all routes require auth

#### GET /api/cart
- Auth: Bearer user/admin token
- Success: `200`, raw cart object:
  ```json
  {
    "_id": "...",
    "user": "...",
    "items": [
      { "product": { "...": "populated product" }, "quantity": 2 }
    ]
  }
  ```
- Notes:
- Creates empty cart automatically if user has none

#### POST /api/cart
- Auth: Bearer user/admin token
- Body:
  ```json
  {
    "productId": "<product_id>",
    "quantity": 1
  }
  ```
- Validation:
- `productId` required string
- `quantity` optional, min 1, defaults to 1
- Success: `200`, raw updated cart object
- Negative tests:
- missing token -> `401`
- product not found -> `404`
- invalid body -> `400 VALIDATION_ERROR`

#### PATCH /api/cart/:productId
- Auth: Bearer user/admin token
- Params:
- `productId` required string
- Body:
  ```json
  {
    "quantity": 3
  }
  ```
- Behavior:
- `quantity <= 0` removes item from cart
- `quantity > 0` updates item quantity
- Success: `200`, raw updated cart object
- Negative tests:
- cart not found -> `404`
- item not in cart -> `404`
- missing quantity -> `400 VALIDATION_ERROR`

#### DELETE /api/cart/:productId
- Auth: Bearer user/admin token
- Params:
- `productId` required string
- Success: `200`, raw updated cart object
- Negative tests:
- cart not found -> `404`

#### DELETE /api/cart
- Auth: Bearer user/admin token
- Success: `200`, `{ "message": "Cart cleared" }`

### Orders (`/api/orders`) - all routes require auth

#### POST /api/orders
- Auth: Bearer user/admin token
- Body:
  ```json
  {
    "items": [
      { "productId": "<24-char product id>", "quantity": 2 }
    ],
    "shippingAddress": {
      "line1": "Address line",
      "city": "Mumbai",
      "state": "MH",
      "pincode": "400001"
    }
  }
  ```
- Success: `201`, `{ success: true, data: { order } }`
- Notes:
- Backend computes `unitPricePaise` and `totalAmountPaise`
- Created order is moved to `PAYMENT_PENDING` when stock is reserved
- Negative tests:
- empty items -> `400`
- bad product id format -> `400 VALIDATION_ERROR`
- missing product or insufficient stock -> `404` or `400`

#### GET /api/orders
- Auth: Bearer user/admin token
- Query:
- `page` integer >= 1
- `limit` integer 1..50
- `status` in `CREATED | PAYMENT_PENDING | PAID | FAILED | CANCELLED | DELIVERED`
- Success: `200`, `{ success: true, data: { orders: Order[] } }`
- Negative tests:
- invalid status -> `400 VALIDATION_ERROR`

#### GET /api/orders/:id
- Auth: Bearer user/admin token
- Params:
- `id` 24-char hex ObjectId
- Success: `200`, `{ success: true, data: { order } }`
- Access control:
- user gets own order only
- admin can fetch any order
- Negative tests:
- non-owner user -> `404`
- invalid id format -> `400 VALIDATION_ERROR`

#### POST /api/orders/:id/cancel
- Auth: Bearer user/admin token
- Params:
- `id` 24-char hex ObjectId
- Success: `200`, `{ success: true, data: { order } }`
- Behavior:
- not cancellable when status is `PAID` or `DELIVERED`
- releases reserved stock when cancelled
- Negative tests:
- cancel paid order -> `400`
- non-owner user -> `404`

### Payment (`/api/payment`)

#### POST /api/payment/create-order
- Auth: Bearer user/admin token
- Body:
  ```json
  {
    "orderId": "<24-char order id>"
  }
  ```
- Success: `200`, `{ success: true, data: { orderId, razorpayOrderId, amount, currency, keyId } }`
- Preconditions:
- order must belong to caller
- order status must be `PAYMENT_PENDING`
- Negative tests:
- no auth -> `401`
- wrong order state -> `400`
- order not found -> `404`

#### POST /api/payment/verify
- Auth: Bearer user/admin token
- Body:
  ```json
  {
    "orderId": "<24-char order id>",
    "razorpay_order_id": "order_xxx",
    "razorpay_payment_id": "pay_xxx",
    "razorpay_signature": "sig_xxx"
  }
  ```
- Success: `200`, `{ success: true, data: { success: true, orderId, status: "PAID" } }`
- Negative tests:
- signature mismatch -> `400`
- missing payment record/order mismatch -> `404` or `400`

#### POST /api/payment/webhook
- Auth: none (signature-based)
- Headers:
- `x-razorpay-signature: <hmac_signature>`
- Body: Razorpay webhook payload (raw JSON body is required)
- Supported events:
- `payment.captured`
- `payment.failed`
- Success: `200`, `{ received: true }`
- Negative tests:
- invalid signature (when webhook secret configured) -> `400 { success: false, error: "Invalid webhook signature" }`

### Admin (`/api/admin`) - all routes require auth + ADMIN role

#### GET /api/admin/dashboard
- Auth: Bearer admin token
- Success: `200`, `{ success: true, data: { ordersPaid, ordersPending, productsLowStock, totalProducts, totalRevenuePaise } }`
- Negative tests:
- user token -> `403 FORBIDDEN`

#### GET /api/admin/analytics/sales
- Auth: Bearer admin token
- Query:
- `startDate` ISO date string, required
- `endDate` ISO date string, required, must be >= `startDate`
- Success: `200`, `{ success: true, data: { totalRevenuePaise, orderCount, totalItemsSold, startDate, endDate } }`
- Negative tests:
- missing/invalid dates -> `400 VALIDATION_ERROR`

#### GET /api/admin/analytics/revenue-by-day
- Auth: Bearer admin token
- Query:
- `startDate` ISO date string, required
- `endDate` ISO date string, required
- Success: `200`, `{ success: true, data: { series: [ { _id: "YYYY-MM-DD", revenuePaise, orderCount } ] } }`
- Negative tests:
- invalid date range -> `400 VALIDATION_ERROR`

#### GET /api/admin/analytics/product-performance
- Auth: Bearer admin token
- Query:
- `limit` integer 1..100 (optional)
- `startDate` ISO (optional)
- `endDate` ISO (optional)
- Success: `200`, `{ success: true, data: { products: [...] } }`
- Negative tests:
- `limit` out of range -> `400 VALIDATION_ERROR`

#### GET /api/admin/stock-alerts
- Auth: Bearer admin token
- Query:
- `threshold` integer >= 0 (optional, default 5)
- Success: `200`, `{ success: true, data: { alerts: [ { _id, sku, name, stockQuantity, availabilityStatus, category } ] } }`
- Negative tests:
- negative threshold -> `400 VALIDATION_ERROR`

## 5. Minimal cURL smoke tests

Use these as a quick sequence. Replace placeholder values.

```bash
# Health
curl -s http://localhost:5000/health

# Register user
curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"User"}'

# Login user (save accessToken as USER_TOKEN)
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Create product as admin (save _id as PRODUCT_ID)
curl -s -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Laptop","sku":"SKU-LAP-001","category":"laptop","basePrice":5000000,"taxRate":0.18,"stockQuantity":10}'

# Create order as user (save _id as ORDER_ID)
curl -s -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"<PRODUCT_ID>","quantity":1}],"shippingAddress":{"city":"Mumbai","pincode":"400001"}}'

# Create Razorpay order
curl -s -X POST http://localhost:5000/api/payment/create-order \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"<ORDER_ID>"}'

# Admin dashboard
curl -s http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

## 6. Suggested negative test matrix

- Missing auth token on protected routes -> `401`
- User token on admin routes -> `403`
- Invalid ObjectId for `:id` routes -> `400`
- Invalid query enums/ranges -> `400`
- Resource not found -> `404`
- Business-rule failures (stock, state transitions, payment signature) -> `400`
