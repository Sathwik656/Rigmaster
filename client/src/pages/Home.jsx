import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    apiClient
      .get(API_ENDPOINTS.products.list, { params: { limit: 6, isActive: true } })
      .then((res) => {
        if (res.data.success) setFeatured(res.data.data.products);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <section
        style={{
          background: 'linear-gradient(135deg, var(--intel-start), var(--intel-end))',
          padding: '80px 0',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>Build Your Dream PC</h1>
          <p style={{ fontSize: '20px', marginBottom: '32px', opacity: 0.9 }}>
            Custom builds, prebuilt systems, and premium components
          </p>
          <Link to="/prebuilt" className="btn" style={{ background: 'white', color: 'var(--intel-start)', padding: '16px 32px' }}>
            Shop Now
          </Link>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '32px' }}>Browse Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <Link to="/intel-custom" className="card gradient-intel" style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Intel Custom Builds</h3>
              <p>Build your perfect Intel-powered PC</p>
            </Link>
            <Link to="/amd-custom" className="card gradient-amd" style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>AMD Custom Builds</h3>
              <p>Create your ideal AMD-powered system</p>
            </Link>
            <Link to="/prebuilt" className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Prebuilt PCs</h3>
              <p>Ready-to-use systems tested and optimized</p>
            </Link>
            <Link to="/laptops" className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Laptops</h3>
              <p>Powerful laptops for work and play</p>
            </Link>
            <Link to="/accessories" className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Accessories</h3>
              <p>Complete your setup with premium accessories</p>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0', background: 'var(--secondary)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '32px' }}>Featured Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="card gradient-intel" style={{ padding: '48px', color: 'white' }}>
            <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>Intel Performance</h3>
            <p style={{ marginBottom: '24px', opacity: 0.9 }}>
              Experience cutting-edge performance with Intel processors. Build a system tailored to your needs.
            </p>
            <Link to="/intel-custom" className="btn" style={{ background: 'white', color: 'var(--intel-start)' }}>
              Explore Intel Builds
            </Link>
          </div>
          <div className="card gradient-amd" style={{ padding: '48px', color: 'white' }}>
            <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>AMD Power</h3>
            <p style={{ marginBottom: '24px', opacity: 0.9 }}>
              Unlock exceptional value and performance with AMD Ryzen processors. Customize your perfect build.
            </p>
            <Link to="/amd-custom" className="btn" style={{ background: 'white', color: 'var(--amd-start)' }}>
              Explore AMD Builds
            </Link>
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 0', background: 'var(--secondary)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '32px' }}>Why Choose RigMaster?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', textAlign: 'center' }}>
            <div className="card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛠️</div>
              <h3 style={{ marginBottom: '16px' }}>Expert Support</h3>
              <p>Our team of experts is here to help you build the perfect PC for your needs.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
              <h3 style={{ marginBottom: '16px' }}>Fast Shipping</h3>
              <p>Get your rig delivered safely and quickly with our premium shipping partners.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{ marginBottom: '16px' }}>Warranty Included</h3>
              <p>All builds come with a comprehensive warranty for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'linear-gradient(to right, #1a1a1a, #2a2a2a)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Join the RigMaster Community</h2>
          <p style={{ marginBottom: '32px', opacity: 0.8 }}>Subscribe to our newsletter for the latest deals, builds, and tech news.</p>
          <form style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            />
            <button className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
