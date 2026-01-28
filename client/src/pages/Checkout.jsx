import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    apiClient
      .get(API_ENDPOINTS.orders.byId(orderId))
      .then((res) => {
        if (res.data.success) setOrder(res.data.data.order);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  const handlePayment = async () => {
    if (!order || !window.Razorpay) {
      alert('Razorpay not loaded. Please refresh the page.');
      return;
    }
    setProcessing(true);
    try {
      const res = await apiClient.post(API_ENDPOINTS.payment.createOrder, { orderId });
      if (res.data.success) {
        const { razorpayOrderId, amount, keyId } = res.data.data;
        const options = {
          key: keyId,
          amount: amount,
          currency: 'INR',
          name: 'RigMaster',
          description: 'Order Payment',
          order_id: razorpayOrderId,
          handler: async (response) => {
            try {
              const verifyRes = await apiClient.post(API_ENDPOINTS.payment.verify, {
                orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              if (verifyRes.data.success) {
                navigate(`/order-success/${orderId}`);
              }
            } catch (err) {
              alert('Payment verification failed');
            }
          },
          prefill: { email: '', contact: '' },
          theme: { color: '#0071c5' },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', () => {
          alert('Payment failed. Please try again.');
        });
        razorpay.open();
      }
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Payment initiation failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div style={{ padding: '64px', textAlign: 'center' }}>Loading...</div>;
  if (!order) return <div style={{ padding: '64px', textAlign: 'center' }}>Order not found</div>;

  return (
    <div style={{ padding: '48px 0', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>

        {/* Progress Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
            <span style={{ fontWeight: '600', color: 'var(--text)' }}>Cart</span>
            <div style={{ width: '60px', height: '2px', background: 'var(--success)' }}></div>

            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
            <span style={{ fontWeight: '600', color: 'var(--text)' }}>Shipping</span>
            <div style={{ width: '60px', height: '2px', background: 'var(--primary)' }}></div>

            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
            <span style={{ fontWeight: '600', color: 'var(--text)' }}>Payment</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Confirm & Pay</h2>

            <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📦</span> Shipping Details
              </h3>
              <div style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                <p>User Email: {order.user?.email || 'Guest'}</p>
                <p>Standard Shipping (3-5 Business Days)</p>
              </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💳</span> Payment Method
              </h3>
              <div style={{ padding: '16px', border: '1px solid var(--primary)', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>🔒</span>
                <span style={{ fontWeight: '500' }}>Razorpay Secure Payment</span>
                <span style={{ marginLeft: 'auto', fontSize: '12px', background: 'var(--success)', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>Safe & Encrypted</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px', marginTop: '24px', fontSize: '18px', fontWeight: 'bold' }}
              >
                {processing ? 'Processing Secure Payment...' : `Pay ${formatPrice(order.totalAmountPaise)}`}
              </button>
              <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                By clicking "Pay", you agree to our Terms of Service.
              </div>
            </div>
          </div>

          <div className="card" style={{ height: 'fit-content' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Order Summary</h3>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                {/* Placeholder for item image if available or generic icon */}
                <div style={{ width: '50px', height: '50px', background: '#333', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💻</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: '500' }}>{formatPrice(item.unitPricePaise * item.quantity)}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>{formatPrice(order.totalAmountPaise)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-muted)' }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div style={{ borderTop: '2px dashed var(--border)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>{formatPrice(order.totalAmountPaise)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
