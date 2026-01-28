const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE}/auth/register`,
    login: `${API_BASE}/auth/login`,
    refresh: `${API_BASE}/auth/refresh`,
    logout: `${API_BASE}/auth/logout`,
    profile: `${API_BASE}/auth/profile`,
  },
  products: {
    list: `${API_BASE}/products`,
    byId: (id) => `${API_BASE}/products/id/${id}`,
    bySku: (sku) => `${API_BASE}/products/sku/${sku}`,
  },
  orders: {
    create: `${API_BASE}/orders`,
    list: `${API_BASE}/orders`,
    byId: (id) => `${API_BASE}/orders/${id}`,
    cancel: (id) => `${API_BASE}/orders/${id}/cancel`,
  },
  payment: {
    createOrder: `${API_BASE}/payment/create-order`,
    verify: `${API_BASE}/payment/verify`,
  },
};

export default API_ENDPOINTS;
