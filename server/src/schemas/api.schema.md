# API Response Schemas (Frontend Contract)

All success responses use `{ success: true, data: T }`. All error responses use `{ success: false, error: { code: string, message: string, details?: unknown } }`.

## Auth

- **POST /api/auth/register**  
  `201` → `{ success: true, data: { user: User } }`  
  User: `{ _id, email, name, role, isActive, createdAt, updatedAt }` (no passwordHash)

- **POST /api/auth/login**  
  `200` → `{ success: true, data: { user, accessToken, refreshToken, expiresIn } }`

- **POST /api/auth/refresh**  
  `200` → `{ success: true, data: { accessToken, refreshToken, expiresIn } }`

- **GET /api/auth/profile** (Bearer token)  
  `200` → `{ success: true, data: { user } }`

## Products

- **GET /api/products**  
  Query: `category?, isActive?, page?, limit?, sort?`  
  `200` → `{ success: true, data: { products: Product[] } }`

- **GET /api/products/id/:id**  
  `200` → `{ success: true, data: { product: Product } }`

- **GET /api/products/sku/:sku**  
  `200` → `{ success: true, data: { product: Product } }`

**Product** (backend-owned pricing; frontend must use these, never send price/stock):

```ts
{
  _id: string;
  name: string;
  sku: string;
  category: 'laptop' | 'prebuilt' | 'intel-custom' | 'amd-custom' | 'accessory';
  brand?: string;
  basePrice: number;        // paise (integer)
  discount?: { type: 'percentage' | 'flat'; value: number } | null;
  taxRate: number;
  finalPrice: number;       // paise, computed server-side only
  stockQuantity: number;
  availabilityStatus: 'in_stock' | 'out_of_stock' | 'discontinued';
  shortDescription?: string;
  detailedDescription?: string;
  specifications: Record<string, unknown>;
  images: string[];
  isActive: boolean;
  createdAt: string;        // ISO
  updatedAt: string;
}
```

## Orders

- **POST /api/orders** (Bearer)  
  Body: `{ items: [{ productId: string, quantity: number }], shippingAddress?: object }`  
  `201` → `{ success: true, data: { order: Order } }`

- **GET /api/orders** (Bearer)  
  Query: `page?, limit?, status?`  
  `200` → `{ success: true, data: { orders: Order[] } }`

- **GET /api/orders/:id** (Bearer)  
  `200` → `{ success: true, data: { order: Order } }`

**Order**:

```ts
{
  _id: string;
  userId: string;
  items: { productId: string; sku: string; name: string; quantity: number; unitPricePaise: number }[];
  totalAmountPaise: number;
  currency: string;
  status: 'CREATED' | 'PAYMENT_PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'DELIVERED';
  shippingAddress?: object;
  createdAt: string;
  updatedAt: string;
}
```

## Payment (Razorpay)

- **POST /api/payment/create-order** (Bearer)  
  Body: `{ orderId: string }`  
  `200` → `{ success: true, data: { orderId, razorpayOrderId, amount, currency, keyId } }`  
  Frontend uses `keyId` + `razorpayOrderId` + `amount` with Razorpay Checkout.

- **POST /api/payment/verify** (Bearer)  
  Body: `{ orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }`  
  `200` → `{ success: true, data: { success: true, orderId, status: 'PAID' } }`

## Admin

- **GET /api/admin/dashboard** (Admin Bearer)  
  `200` → `{ success: true, data: { ordersPaid, ordersPending, productsLowStock, totalProducts, totalRevenuePaise } }`

- **GET /api/admin/analytics/sales**  
  Query: `startDate` (ISO), `endDate` (ISO)  
  `200` → `{ success: true, data: { totalRevenuePaise, orderCount, totalItemsSold, startDate, endDate } }`

- **GET /api/admin/stock-alerts**  
  Query: `threshold?` (default 5)  
  `200` → `{ success: true, data: { alerts: { _id, sku, name, stockQuantity, availabilityStatus, category }[] } } }`
