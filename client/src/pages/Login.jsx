import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      {/* Visual Side */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="auth-visual-side"
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '48px', marginBottom: '24px', fontWeight: 'bold' }}>Welcome Back</h1>
          <p style={{ fontSize: '20px', lineHeight: '1.6', opacity: 0.9, maxWidth: '500px' }}>
            Sign in to access your saved builds, order history, and exclusive member deals.
          </p>
        </div>
        {/* Abstract decorative elements */}
        <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '300px', height: '300px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', background: 'var(--accent)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1 }}></div>
      </div>

      {/* Form Side */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', background: 'var(--background)' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Log In</h2>
            <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to continue</p>
          </div>

          {error && (
            <div style={{ padding: '16px', background: 'rgba(220, 38, 38, 0.1)', border: '1px solid var(--error)', borderRadius: '8px', marginBottom: '24px', color: 'var(--error)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Email Address</label>
              <input
                type="email"
                className="input"
                style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontWeight: '500', fontSize: '14px' }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '14px', color: 'var(--primary)' }}>Forgot password?</Link>
              </div>
              <input
                type="password"
                className="input"
                style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600' }}>
              {loading ? 'Logging in...' : 'Sign In'}
            </button>

            <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
              <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
