import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/analytics', label: 'Sales Analytics', icon: '📈' },
  { path: '/admin/products/intel-custom', label: 'Intel Custom', icon: '🔵' },
  { path: '/admin/products/amd-custom', label: 'AMD Custom', icon: '🔴' },
  { path: '/admin/products/prebuilt', label: 'Prebuilt PCs', icon: '💻' },
  { path: '/admin/products/laptops', label: 'Laptops', icon: '📱' },
  { path: '/admin/products/accessories', label: 'Accessories', icon: '🎧' },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        background: '#1a1a1a', // Darker background for sidebar
        borderRight: '1px solid var(--border)',
        padding: '24px 16px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
        color: 'white',
      }}
    >
      <div style={{ padding: '0 12px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' }}>RigMaster <span style={{ color: 'var(--primary)', fontSize: '14px' }}>Admin</span></h2>
      </div>
      <nav>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '8px',
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.2s',
                textDecoration: 'none',
                fontWeight: isActive ? '500' : 'normal',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
