# RigMaster Admin Dashboard

Production-ready React admin dashboard for managing products, viewing analytics, and monitoring sales.

## Features

- **Admin-only access** with role-based authentication
- **Dashboard** with revenue, orders, and stock alerts
- **Sales Analytics** with charts (revenue trends, product performance)
- **Product Management** by category (Intel, AMD, Prebuilt, Laptops, Accessories)
- **Real-time data** from backend APIs
- **Isolated from customer UI** - completely separate application

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

The app will run on `http://localhost:3001`

## Build

```bash
npm run build
```

## Architecture

- **Protected routes** - redirects to login if not admin
- **Sidebar navigation** - category-based product management
- **Charts** - Recharts for analytics visualization
- **API client** - matches backend admin endpoints exactly

## Pages

- `/admin` - Dashboard with key metrics
- `/admin/analytics` - Sales analytics with date range filters
- `/admin/products/:category` - Product management by category

## Admin Features

- View total revenue, orders, active products, low stock alerts
- Analyze revenue trends and product performance
- Edit product details (name, price, stock)
- Deactivate products (soft delete)
- All changes validated by backend

## Authentication

- Admin login required (role must be 'ADMIN')
- JWT tokens with automatic refresh
- Logout clears tokens and redirects to login
