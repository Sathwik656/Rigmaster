import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/global.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav style={{ background: 'var(--secondary)', borderBottom: '1px solid var(--border)', padding: '16px 0', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text)' }}>
          RigMaster
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, maxWidth: '600px' }}>
          <Link to="/" style={{ padding: '8px 12px', borderRadius: '6px' }}>Home</Link>
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button style={{ padding: '8px 12px', borderRadius: '6px' }}>Categories</button>
            {showCategories && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '8px 0',
                  minWidth: '200px',
                  zIndex: 1000,
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <Link to="/intel-custom" style={{ display: 'block', padding: '8px 16px', color: 'var(--text)' }}>Intel Custom Builds</Link>
                <Link to="/amd-custom" style={{ display: 'block', padding: '8px 16px', color: 'var(--text)' }}>AMD Custom Builds</Link>
                <Link to="/prebuilt" style={{ display: 'block', padding: '8px 16px', color: 'var(--text)' }}>Prebuilt PCs</Link>
                <Link to="/laptops" style={{ display: 'block', padding: '8px 16px', color: 'var(--text)' }}>Laptops</Link>
                <Link to="/accessories" style={{ display: 'block', padding: '8px 16px', color: 'var(--text)' }}>Accessories</Link>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-secondary">Search</button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/cart" style={{ position: 'relative', padding: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>🛒</span>
            {getTotalItems() > 0 && (
              <span className="badge" style={{ 
                position: 'absolute', 
                top: -5, 
                right: -5,
                background: 'var(--primary)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getTotalItems()}
              </span>
            )}
          </Link>
          
          {user ? (
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                <span style={{ fontWeight: '500' }}>{user.name || user.email}</span>
                <span style={{ fontSize: '10px' }}>▼</span>
              </button>
              
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '8px 0',
                  minWidth: '150px',
                  zIndex: 1000,
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ padding: '8px 16px', fontSize: '12px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                    Signed in as<br/>
                    <strong>{user.email}</strong>
                  </div>
                  <Link to="/profile" style={{ display: 'block', padding: '8px 16px', color: 'var(--text)' }}>My Profile</Link>
                  <Link to="/orders" style={{ display: 'block', padding: '8px 16px', color: 'var(--text)' }}>My Orders</Link>
                  <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                  <button 
                    onClick={logout} 
                    style={{ 
                      display: 'block', 
                      width: '100%', 
                      textAlign: 'left', 
                      padding: '8px 16px', 
                      color: 'var(--error)', 
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
