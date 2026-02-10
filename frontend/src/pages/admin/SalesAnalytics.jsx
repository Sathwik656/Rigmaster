import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import apiClient from '../../utils/apiClient';
import { API_ENDPOINTS } from '../../config/api';
import { formatPrice } from '../../utils/formatPrice';

export default function SalesAnalytics() {
    const [revenueData, setRevenueData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [dateRange]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [revenueRes, productRes] = await Promise.all([
                apiClient.get(API_ENDPOINTS.admin.revenueByDay, { params: dateRange }),
                apiClient.get(API_ENDPOINTS.admin.productPerformance, { params: { ...dateRange, limit: 10 } }),
            ]);
            if (revenueRes.data.success) {
                setRevenueData(revenueRes.data.data.series.map((d) => ({ date: d._id, revenue: d.revenuePaise / 100, orders: d.orderCount })));
            }
            if (productRes.data.success) {
                setProductData(productRes.data.data.products.map((p) => ({ name: p.name, revenue: p.totalRevenuePaise / 100 })));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRangeChange = (days) => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);
        setDateRange({
            startDate: start.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0],
        });
    };

    const totalRevenue = revenueData.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
    const totalOrders = revenueData.reduce((acc, curr) => acc + (curr.orders || 0), 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    if (loading) return <div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '32px' }}>Sales Analytics</h1>

            {/* Date Range Controls */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--secondary)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleRangeChange(7)} className="btn btn-secondary">Last 7 Days</button>
                    <button onClick={() => handleRangeChange(30)} className="btn btn-secondary">Last 30 Days</button>
                    <button onClick={() => handleRangeChange(90)} className="btn btn-secondary">Last 3 Months</button>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <input
                        type="date"
                        className="input"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                    />
                    <span>to</span>
                    <input
                        type="date"
                        className="input"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                    />
                </div>
            </div>

            {/* Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Revenue (Period)</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{formatPrice(Math.round(totalRevenue * 100))}</div>
                </div>
                <div className="card">
                    <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Orders</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalOrders}</div>
                </div>
                <div className="card">
                    <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Avg. Order Value</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{formatPrice(Math.round(avgOrderValue * 100))}</div>
                </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ marginBottom: '16px' }}>Revenue Trend</h2>
                <div className="card" style={{ height: '400px', padding: '24px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div>
                <h2 style={{ marginBottom: '16px' }}>Top Performing Products</h2>
                <div className="card" style={{ height: '400px', padding: '24px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} fontSize={12} />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Bar dataKey="revenue" fill="var(--success)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
