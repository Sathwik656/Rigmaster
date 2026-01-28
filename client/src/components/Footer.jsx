import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--secondary)', borderTop: '1px solid var(--border)', padding: '48px 0 24px', marginTop: '64px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>RigMaster</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Your trusted partner for custom PC builds, prebuilt systems, and premium components.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <Link to="/intel-custom">Intel Custom Builds</Link>
              <Link to="/amd-custom">AMD Custom Builds</Link>
              <Link to="/prebuilt">Prebuilt PCs</Link>
              <Link to="/laptops">Laptops</Link>
              <Link to="/accessories">Accessories</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <Link to="/contact">Contact</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/policies">Policies</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '12px' }}>Newsletter</h4>
            <form style={{ display: 'flex', gap: '8px' }}>
              <input type="email" placeholder="Your email" className="input" style={{ flex: 1 }} />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          © 2025 PC RigMaster. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
