import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`} className="card" style={{ display: 'block' }}>
      {product.images?.[0] && (
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
        />
      )}
      <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>{product.name}</h3>
      {product.brand && <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>{product.brand}</p>}
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>{product.shortDescription}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--intel-start)' }}>
            {formatPrice(product.finalPrice)}
          </div>
          {product.discount && (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              {formatPrice(product.basePrice)}
            </div>
          )}
        </div>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            background: product.availabilityStatus === 'in_stock' ? 'var(--success)' : 'var(--error)',
            color: 'white',
          }}
        >
          {product.availabilityStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </Link>
  );
}
