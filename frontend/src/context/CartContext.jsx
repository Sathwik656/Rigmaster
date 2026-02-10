import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from API
  const fetchCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await apiClient.get('/api/cart');
      if (res.data) {
        setItems(res.data.items || []);
      }
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addItem = async (product, quantity = 1) => {
    const productId = product._id || product.id; // product object or ID
    if (!user) {
      alert('Please login to add items to cart.');
      return;
    }
    try {
      const res = await apiClient.post('/api/cart', { productId, quantity });
      if (res.data) {
        setItems(res.data.items);
      }
    } catch (err) {
      console.error('Failed to add item', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    try {
      const res = await apiClient.patch(`/api/cart/${productId}`, { quantity });
      if (res.data) {
        setItems(res.data.items);
      }
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

  const removeItem = async (productId) => {
    if (!user) return;
    try {
      const res = await apiClient.delete(`/api/cart/${productId}`);
      if (res.data) {
        setItems(res.data.items);
      }
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await apiClient.delete('/api/cart');
      setItems([]);
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  const getTotalItems = () => items.reduce((sum, i) => sum + i.quantity, 0);

  // Helper to calculate total price
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      // product might be populated
      const price = item.product?.finalPrice || item.product?.basePrice || 0;
      // price is in paise, convert to rupees for display logic if needed, but usually we keep consistency
      return total + (price / 100) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice, loading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
