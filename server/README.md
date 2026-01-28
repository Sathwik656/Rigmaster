# Rig-Master Backend

Production-ready e-commerce backend for a computer store. **Single source of truth** for pricing, inventory, and payments. Frontend sends only intent (product IDs, quantities); all business logic runs on the server.

## Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Cloud Atlas)
- **Auth:** JWT (access + refresh)
- **Payments:** Razorpay (transactions only; no payment data in product schemas)
- **Validation:** Joi
- **Security:** Helmet, rate limiting, CORS

## Layout

```
server/
├── src/
│   ├── config/       # DB, Razorpay, env (fail-fast on missing vars)
│   ├── models/       # User, Product, Order, InventoryLog, Payment
│   ├── routes/       # auth, product, order, payment, admin
│   ├── controllers/  # Thin; delegate to services
│   ├── services/     # Business logic, pricing, stock, payments
│   ├── middlewares/  # auth, role, error, validate
│   ├── validators/   # Joi schemas per route
│   ├── schemas/      # api.schema.md – frontend contract
│   ├── utils/        # JWT, pricing, logger
│   └── app.js
├── test/             # backend.test.js (full), pricing.test.js (unit)
├── server.js         # Boot, graceful shutdown
├── .env.example
└── .gitignore
```

## Guarantees

- Prices, discounts, taxes, and stock are **never** taken from the client.
- Razorpay is used only for transactions; product models stay payment-agnostic.
- Order creation: backend fetches products, recalculates totals, validates stock, then creates Razorpay order with server-side amount.
- Payment success is decided by signature verification and webhooks, not by frontend.

## Setup

1. Copy `.env.example` to `.env` and set:
   - `MONGO_URI`
   - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET` (for webhook verification)
2. `npm install`
3. `npm run dev` or `npm start`

## Tests

- `npm test` – runs all tests (uses in-memory MongoDB and mocked Razorpay when `NODE_ENV=test`). Run from project root after `npm install`.
- Unit tests for pricing logic in `test/pricing.test.js`; full API/flow tests in `test/backend.test.js`.

## Deployment

- Set all env vars in the host; app fails fast if required ones are missing.
- Webhook URL: `https://your-domain/api/payment/webhook` (must receive raw body for signature verification).
- Stateless; horizontal scaling is supported.

## API Overview

| Area      | Endpoints |
|----------|-----------|
| Auth     | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`, `GET /api/auth/profile` |
| Products | `GET /api/products`, `GET /api/products/id/:id`, `GET /api/products/sku/:sku` (public); `POST/PATCH/DELETE /api/products/*` (admin) |
| Orders   | `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`, `POST /api/orders/:id/cancel` (auth) |
| Payment  | `POST /api/payment/create-order`, `POST /api/payment/verify` (auth); `POST /api/payment/webhook` (Razorpay) |
| Admin    | `GET /api/admin/dashboard`, `GET /api/admin/analytics/sales`, `GET /api/admin/analytics/revenue-by-day`, `GET /api/admin/analytics/product-performance`, `GET /api/admin/stock-alerts` |

## Frontend contract

Response shapes and types are documented in `src/schemas/api.schema.md`. Use `finalPrice` and `totalAmountPaise` from the API; never send or trust client-side price/stock.

## Admin user

There is no self-service admin signup. Set `role: 'ADMIN'` for a user in the database (e.g. via MongoDB shell or a one-off script) after the first user is registered.
