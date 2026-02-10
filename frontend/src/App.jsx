import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import IntelCustomBuild from './pages/IntelCustomBuild';
import AmdCustomBuild from './pages/AmdCustomBuild';
import PrebuiltCollection from './pages/PrebuiltCollection';
import GamingLaptops from './pages/GamingLaptops';
import PcAccessories from './pages/PcAccessories';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

// Admin Imports
import AdminSidebar from './components/admin/AdminSidebar';
import AdminTopbar from './components/admin/AdminTopbar';
import Dashboard from './pages/admin/Dashboard';
import SalesAnalytics from './pages/admin/SalesAnalytics';
import ProductManagement from './pages/admin/ProductManagement';
import ProductForm from './pages/admin/ProductForm';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/login" />;
  return children;
}

function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: 'var(--sidebar-width)', paddingTop: '64px', width: 'calc(100% - var(--sidebar-width))' }}>
        <AdminTopbar />
        <main>{children}</main>
      </div>
    </div>
  );
}

function OrderSuccess() {
  return (
    <div style={{ padding: '64px 0', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '24px', color: 'var(--success)' }}>Order Placed Successfully!</h1>
      <p>Your order has been confirmed. You will receive an email shortly.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/build/intel" element={<IntelCustomBuild />} />
              <Route path="/build/amd" element={<AmdCustomBuild />} />
              <Route path="/category/prebuilt" element={<PrebuiltCollection />} />
              <Route path="/category/laptops" element={<GamingLaptops />} />
              <Route path="/category/accessories" element={<PcAccessories />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/checkout/:orderId" element={<Checkout />} />
              <Route path="/order-success/:orderId" element={<OrderSuccess />} />
              <Route path="/:category" element={<CategoryPage />} />

              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="analytics" element={<SalesAnalytics />} />
                      <Route path="products/:category" element={<ProductManagement />} />
                      <Route path="products/:category/new" element={<ProductForm />} />
                      <Route path="products/:category/edit/:id" element={<ProductForm />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
