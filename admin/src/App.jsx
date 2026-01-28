import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import SalesAnalytics from './pages/SalesAnalytics';
import ProductManagement from './pages/ProductManagement';
import ProductForm from './pages/ProductForm';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <SalesAnalytics />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:category"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductManagement />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:category/new"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:category/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/admin" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
