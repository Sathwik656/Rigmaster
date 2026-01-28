const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE}/auth/login`,
    refresh: `${API_BASE}/auth/refresh`,
    logout: `${API_BASE}/auth/logout`,
    profile: `${API_BASE}/auth/profile`,
  },
  products: {
    list: `${API_BASE}/products`,
    byId: (id) => `${API_BASE}/products/id/${id}`,
    create: `${API_BASE}/products`,
    update: (id) => `${API_BASE}/products/${id}`,
    deactivate: (id) => `${API_BASE}/products/${id}`,
  },
  admin: {
    dashboard: `${API_BASE}/admin/dashboard`,
    salesAnalytics: `${API_BASE}/admin/analytics/sales`,
    revenueByDay: `${API_BASE}/admin/analytics/revenue-by-day`,
    productPerformance: `${API_BASE}/admin/analytics/product-performance`,
    stockAlerts: `${API_BASE}/admin/stock-alerts`,
  },
};

export default API_ENDPOINTS;
