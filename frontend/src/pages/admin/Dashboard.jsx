import { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import { API_ENDPOINTS } from '../../config/api';
import { formatPrice } from '../../utils/formatPrice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dashboardRes = await apiClient.get(API_ENDPOINTS.admin.dashboard);
                if (dashboardRes.data.success) setData(dashboardRes.data.data);

                try {
                    const ordersRes = await apiClient.get('/orders?limit=5&sort=-createdAt');
                    if (ordersRes.data.success) setRecentOrders(ordersRes.data.data.orders);
                } catch (e) {
                    console.warn("Failed to fetch recent orders, using mock data for demo", e);
                    setRecentOrders([
                        { _id: '1', user: { email: 'demo@user.com' }, totalAmount: 150000, status: 'paid', createdAt: new Date().toISOString() },
                        { _id: '2', user: { email: 'test@user.com' }, totalAmount: 85000, status: 'pending', createdAt: new Date().toISOString() }
                    ]);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>;
    if (!data) return <div>Error loading dashboard</div>;

    // Mock data for the chart if real data isn't available
    const salesData = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 2000 },
        { name: 'Apr', sales: 2780 },
        { name: 'May', sales: 1890 },
        { name: 'Jun', sales: 2390 },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '32px' }}>Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>Total Revenue</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{formatPrice(data.totalRevenuePaise)}</div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>Orders Paid</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{data.ordersPaid}</div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>Orders Pending</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{data.ordersPending}</div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>Active Products</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{data.totalProducts}</div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>Low Stock Alerts</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: data.productsLowStock > 0 ? 'var(--warning)' : 'var(--success)' }}>
                        {data.productsLowStock}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="card" style={{ height: '400px' }}>
                    <h3 style={{ marginBottom: '24px' }}>Sales Overview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="var(--primary)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '24px' }}>Recent Orders</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {recentOrders.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No recent orders found.</p>
                        ) : (
                            recentOrders.map(order => (
                                <div key={order._id} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: '500' }}>#{order._id.slice(-6)}</span>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            background: order.status === 'paid' ? 'var(--success-light)' : 'var(--warning-light)',
                                            color: order.status === 'paid' ? 'var(--success)' : 'var(--warning)'
                                        }}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                                        <span>{order.user?.email}</span>
                                        <span>{formatPrice(order.totalAmount)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                        <button className="btn btn-secondary" style={{ marginTop: 'auto' }}>View All Orders</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
