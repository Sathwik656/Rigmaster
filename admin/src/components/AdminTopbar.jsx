import { useAuth } from '../context/AuthContext';

export default function AdminTopbar() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        height: '64px',
        background: 'var(--secondary)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 'var(--sidebar-width)',
        right: 0,
        zIndex: 100,
      }}
    >
      <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Admin Dashboard</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span>{user?.name || user?.email}</span>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>
    </header>
  );
}
