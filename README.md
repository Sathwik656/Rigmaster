# RigMaster - Custom PC E-Commerce Platform

RigMaster is a comprehensive full-stack e-commerce application designed for selling custom PC builds, prebuilt computers, laptops, and accessories. It features a modern, responsive customer storefront and a powerful admin dashboard for business management.

## 🚀 Features

### 🛒 Client Storefront (`/client`)
- **Product Discovery:** Browse products by category (Laptops, Prebuilts, Custom Builds, Accessories).
- **Advanced Search & Filter:** Filter by price and sort products.
- **User Accounts:** Secure registration and login.
- **Shopping Cart:** Real-time cart management.
- **Checkout Flow:** Visual progress stepper with secure payment integration (Razorpay).
- **Order History:** Users can view their past orders.

### 🛠️ Admin Dashboard (`/admin`)
- **Sales Analytics:** Interactive charts for revenue trends and top-selling products.
- **Product Management:** 
  - Add, Edit, and Delete products.
  - Manage stock levels and pricing.
  - CSV Export for product data.
- **Order Management:** View recent orders and status.
- **Secure Access:** Role-based authentication for admins.

### ⚙️ Backend API (`/server`)
- **RESTful Architecture:** Built with Node.js and Express.
- **Database:** MongoDB with Mongoose ORM.
- **Authentication:** JWT-based auth with access and refresh tokens.
- **Security:** Password hashing (bcrypt), rate limiting, and CORS configuration.

## 🛠️ Technology Stack

- **Frontend:** React (Vite), React Router v6, Axios, Recharts.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Payment Gateway:** Razorpay.
- **Styling:** CSS Modules / Styled Components approach.

## 📂 Project Structure

```bash
Rig-Master/
├── admin/    # Admin Dashboard (React + Vite)
├── client/   # Customer Storefront (React + Vite)
└── server/   # Backend API (Node.js + Express)
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)

### 1. Backend Setup (`/server`)

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rigmaster  # Or your MongoDB Atlas URI
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
# Razorpay Credentials (Optional for Dev, required for Payments)
# RAZORPAY_KEY_ID=your_key_id
# RAZORPAY_KEY_SECRET=your_key_secret
```

Start the server:

```bash
npm run dev
```

### 2. Client Setup (`/client`)

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the client development server:

```bash
npm run dev
```
Access the store at: `http://localhost:5173`

### 3. Admin Setup (`/admin`)

Open a new terminal, navigate to the admin directory, and install dependencies:

```bash
cd admin
npm install
```

Start the admin development server:

```bash
npm run dev
```
Access the dashboard at: `http://localhost:5174` (Port may vary depending on Vite).

## 🔐 Default Admin Credentials

If you have seeded the database or need to access the admin panel, use:

- **Email:** `admin@rigmaster.com`
- **Password:** `admin`

## 🤝 Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---
Built with ❤️ by the RigMaster Team.
