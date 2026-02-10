import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import { API_ENDPOINTS } from '../../config/api';
import { formatPrice } from '../../utils/formatPrice';

export default function ProductManagement() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, [category]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredProducts(products.filter(p =>
                p.name.toLowerCase().includes(lower) ||
                (p.sku && p.sku.toLowerCase().includes(lower))
            ));
        }
    }, [searchTerm, products]);

    const loadProducts = () => {
        setLoading(true);
        apiClient
            .get(API_ENDPOINTS.products.list, { params: { category, isActive: true } })
            .then((res) => {
                if (res.data.success) {
                    setProducts(res.data.data.products);
                    setFilteredProducts(res.data.data.products);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    const handleEdit = (product) => {
        setEditing(product._id);
        setForm({
            name: product.name,
            basePrice: product.basePrice / 100,
            stockQuantity: product.stockQuantity,
            isActive: product.isActive,
        });
    };

    const handleSave = async () => {
        try {
            await apiClient.patch(API_ENDPOINTS.products.update(editing), {
                ...form,
                basePrice: Math.round(form.basePrice * 100),
            });
            setEditing(null);
            loadProducts();
        } catch (err) {
            alert(err.response?.data?.error?.message || 'Update failed');
        }
    };

    const handleDeactivate = async (id) => {
        if (!confirm('Deactivate this product?')) return;
        try {
            await apiClient.delete(API_ENDPOINTS.products.deactivate(id));
            loadProducts();
        } catch (err) {
            alert(err.response?.data?.error?.message || 'Deactivation failed');
        }
    };

    const handleExport = () => {
        const headers = ['ID,Name,SKU,Price,Stock,Status'];
        const rows = filteredProducts.map(p =>
            [p._id, `"${p.name}"`, p.sku, p.finalPrice / 100, p.stockQuantity, p.isActive ? 'Active' : 'Inactive'].join(',')
        );
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products-${category}-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) return <div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1>{category} Products</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={handleExport} className="btn btn-secondary">
                        Export CSV
                    </button>
                    <button onClick={() => navigate(`/admin/products/${category}/new`)} className="btn btn-primary">
                        Add Product
                    </button>
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="Search by name or SKU..."
                    className="input"
                    style={{ width: '100%', maxWidth: '400px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="table" style={{ margin: 0 }}>
                    <thead style={{ background: 'var(--secondary)' }}>
                        <tr>
                            <th style={{ padding: '16px' }}>Name</th>
                            <th style={{ padding: '16px' }}>SKU</th>
                            <th style={{ padding: '16px' }}>Price</th>
                            <th style={{ padding: '16px' }}>Stock</th>
                            <th style={{ padding: '16px' }}>Status</th>
                            <th style={{ padding: '16px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((p) => (
                            <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '16px' }}>{p.name}</td>
                                <td style={{ padding: '16px' }}>{p.sku}</td>
                                <td style={{ padding: '16px' }}>{formatPrice(p.finalPrice)}</td>
                                <td style={{ padding: '16px' }}>{p.stockQuantity}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        background: p.isActive ? 'var(--success-light)' : 'var(--error-light)',
                                        color: p.isActive ? 'var(--success)' : 'var(--error)'
                                    }}>
                                        {p.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    {editing === p._id ? (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    style={{ width: '150px' }}
                                                />
                                                <input
                                                    type="number"
                                                    className="input"
                                                    value={form.basePrice}
                                                    onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                                                    style={{ width: '100px' }}
                                                />
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <button onClick={handleSave} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '12px' }}>Save</button>
                                                    <button onClick={() => setEditing(null)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => handleEdit(p)} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeactivate(p._id)} className="btn btn-danger" style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--error)', color: 'var(--error)' }}>
                                                Deactivate
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No products found matching "{searchTerm}"</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
