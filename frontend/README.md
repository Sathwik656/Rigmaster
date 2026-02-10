# RigMaster Customer Web Store

Production-ready React frontend for the customer-facing e-commerce store.

## Features

- **Component-driven architecture** with reusable UI components
- **API-driven rendering** - all pricing, inventory, and product data from backend
- **JWT authentication** with automatic token refresh
- **Cart management** with localStorage persistence
- **Razorpay payment integration** for secure checkout
- **Category-based routing** for all product categories
- **Responsive design** with minimalistic styling and gradient themes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional, defaults to proxy):
```env
VITE_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Build

```bash
npm run build
```

## Architecture

- **Context API** for auth and cart state management
- **React Router** for navigation
- **Axios** with interceptors for JWT token management
- **API client** matches backend contract exactly (`/api/schemas/api.schema.md`)

## Pages

- `/` - Homepage with featured products and category navigation
- `/login` - User login
- `/register` - User registration
- `/cart` - Shopping cart
- `/products/:id` - Product detail page
- `/checkout/:orderId` - Checkout with Razorpay
- `/:category` - Category pages (intel-custom, amd-custom, prebuilt, laptops, accessories)

## Key Components

- `Navbar` - Global navigation with search and cart
- `Footer` - Site footer with links and newsletter
- `ProductCard` - Reusable product display card
- `AuthContext` - JWT auth with refresh token rotation
- `CartContext` - Cart state management

## Backend Integration

All API calls match the backend schema:
- Prices in **paise** (integer) - converted to INR for display
- Product data includes `finalPrice` computed server-side
- Order creation sends only `productId` + `quantity` (intent-only)
- Payment flow: create Razorpay order → verify signature → success
