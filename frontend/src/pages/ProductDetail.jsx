import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(API_ENDPOINTS.products.byId(id))
      .then((res) => {
        if (res.data.success) setProduct(res.data.data.product);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.availabilityStatus === 'in_stock') {
      addItem(product, quantity);
      alert('Added to cart!');
    }
  };

  if (loading) return <div style={{ padding: '64px', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '64px', textAlign: 'center' }}>Product not found</div>;

  return (
    <div style={{ padding: '48px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div>
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: '100%', borderRadius: '12px', marginBottom: '24px' }}
              />
            )}
          </div>
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>{product.name}</h1>
            {product.brand && <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Brand: {product.brand}</p>}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--intel-start)', marginBottom: '8px' }}>
                {formatPrice(product.finalPrice)}
              </div>
              {product.discount && (
                <div style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(product.basePrice)}
                </div>
              )}
            </div>
            <p style={{ marginBottom: '24px', lineHeight: '1.8' }}>{product.detailedDescription || product.shortDescription}</p>
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: product.availabilityStatus === 'in_stock' ? 'var(--success)' : 'var(--error)',
                  color: 'white',
                }}
              >
                {product.availabilityStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            {product.availabilityStatus === 'in_stock' && (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stockQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, Number(e.target.value))))}
                  className="input"
                  style={{ width: '80px' }}
                />
                <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1 }}>
                  Add to Cart
                </button>
              </div>
            )}
            {Object.keys(product.specifications || {}).length > 0 && (
              <div className="card" style={{ marginTop: '32px' }}>
                <h3 style={{ marginBottom: '16px' }}>Specifications</h3>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontWeight: '600' }}>{key}:</span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Customer Reviews</h2>
          <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '18px', marginBottom: '16px' }}>No reviews yet.</p>
            <p>Be the first to review this product!</p>
            <button className="btn btn-secondary" style={{ marginTop: '16px' }}>Write a Review</button>
          </div>
        </div>

        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ padding: '32px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
              <p>Check out our other category pages for similar items!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
