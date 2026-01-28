import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { user } = useAuth();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({ productId: i.productId, quantity: i.quantity }));
      const res = await apiClient.post(API_ENDPOINTS.orders.create, {
        items: orderItems,
        shippingAddress: {},
      });
      if (res.data.success) {
        clearCart();
        navigate(`/checkout/${res.data.data.order._id}`);
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, i) => sum + (i.product?.finalPrice || 0) * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</div>
        <h1 style={{ marginBottom: '16px' }}>Your cart is empty</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ padding: '12px 32px' }}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '32px' }}>Shopping Cart</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <div>
            {items.map((item) => (
              <div key={item.productId} className="card" style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
                {item.product?.images?.[0] && (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '8px' }}>{item.product?.name}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {formatPrice(item.product?.finalPrice || 0)} each
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="btn btn-secondary" style={{ padding: '4px 8px' }}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="btn btn-secondary" style={{ padding: '4px 8px' }}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.productId)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                      Remove
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {formatPrice((item.product?.finalPrice || 0) * item.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ height: 'fit-content' }}>
            <h2 style={{ marginBottom: '24px' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px' }}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>You Might Also Like</h2>
          <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>Browse our categories to find more amazing products!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
