import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

const CATEGORY_INFO = {
  'intel-custom': { title: 'Intel Custom Builds', description: 'Build your perfect Intel-powered PC' },
  'amd-custom': { title: 'AMD Custom Builds', description: 'Create your ideal AMD-powered system' },
  prebuilt: { title: 'Prebuilt PCs', description: 'Ready-to-use systems tested and optimized' },
  laptops: { title: 'Laptops', description: 'Powerful laptops for work and play' },
  accessories: { title: 'Accessories', description: 'Complete your setup with premium accessories' },
};

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '' });
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high

  useEffect(() => {
    setLoading(true);
    const categoryMap = {
      'intel-custom': 'intel-custom',
      'amd-custom': 'amd-custom',
      prebuilt: 'prebuilt',
      laptops: 'laptop',
      accessories: 'accessory',
    };
    const params = { category: categoryMap[category] || category, isActive: true, limit: 100 };
    const search = searchParams.get('search');
    if (search) params.search = search;

    apiClient
      .get(API_ENDPOINTS.products.list, { params })
      .then((res) => {
        if (res.data.success) {
          let filtered = res.data.data.products;

          // Apply client-side filters
          if (filters.minPrice) {
            filtered = filtered.filter((p) => p.finalPrice >= Number(filters.minPrice) * 100);
          }
          if (filters.maxPrice) {
            filtered = filtered.filter((p) => p.finalPrice <= Number(filters.maxPrice) * 100);
          }

          // Apply sorting
          if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.finalPrice - b.finalPrice);
          } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.finalPrice - a.finalPrice);
          }

          setProducts(filtered);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, searchParams, filters, sortBy]);

  const info = CATEGORY_INFO[category] || { title: category, description: '' };

  return (
    <div style={{ padding: '32px 0' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text)' }}>{info.title || category}</span>
        </div>

        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '16px', fontWeight: 'bold' }}>{info.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>{info.description}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--secondary)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontWeight: '600' }}>Filters:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  className="input"
                  style={{ padding: '8px 12px', width: '100px', fontSize: '14px' }}
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  placeholder="Min ₹"
                />
                <span>-</span>
                <input
                  type="number"
                  className="input"
                  style={{ padding: '8px 12px', width: '100px', fontSize: '14px' }}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  placeholder="Max ₹"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500' }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--background)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px' }}>
              <div style={{ fontSize: '24px', marginBottom: '16px' }}>⌛</div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px', background: 'var(--secondary)', borderRadius: '12px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ marginBottom: '8px' }}>No products found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
