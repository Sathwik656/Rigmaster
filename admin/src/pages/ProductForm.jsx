import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { formatPrice } from '../utils/formatPrice';

const CATEGORIES = [
    { value: 'laptop', label: 'Laptop' },
    { value: 'prebuilt', label: 'Prebuilt PC' },
    { value: 'intel-custom', label: 'Intel Custom Build' },
    { value: 'amd-custom', label: 'AMD Custom Build' },
    { value: 'accessory', label: 'Accessory' },
];

export default function ProductForm() {
    const { category, id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [form, setForm] = useState({
        name: '',
        sku: '',
        brand: '',
        category: category || 'accessory',
        basePrice: '',
        stockQuantity: '',
        shortDescription: '',
        detailedDescription: '',
        specifications: '{}', // Edited as string, parsed to JSON
        images: '', // Comma separated string
        isActive: true,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (category) setForm(f => ({ ...f, category }));
    }, [category]);

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            apiClient.get(API_ENDPOINTS.products.byId(id))
                .then(res => {
                    if (res.data.success) {
                        const p = res.data.data.product;
                        setForm({
                            name: p.name,
                            sku: p.sku,
                            brand: p.brand || '',
                            category: p.category,
                            basePrice: p.basePrice / 100, // Convert to Rupee
                            stockQuantity: p.stockQuantity,
                            shortDescription: p.shortDescription || '',
                            detailedDescription: p.detailedDescription || '',
                            specifications: JSON.stringify(p.specifications, null, 2),
                            images: p.images.join(', '),
                            isActive: p.isActive,
                        });
                    }
                })
                .catch(err => setError('Failed to load product'))
                .finally(() => setLoading(false));
        }
    }, [isEdit, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let specifications = {};
            try {
                specifications = JSON.parse(form.specifications);
            } catch (e) {
                throw new Error('Invalid JSON in specifications');
            }

            const payload = {
                ...form,
                basePrice: Math.round(Number(form.basePrice) * 100), // Convert to Paise
                stockQuantity: Number(form.stockQuantity),
                specifications,
                images: form.images.split(',').map(s => s.trim()).filter(Boolean),
            };

            if (isEdit) {
                await apiClient.patch(API_ENDPOINTS.products.update(id), payload);
            } else {
                await apiClient.post(API_ENDPOINTS.products.create, payload);
            }

            navigate(`/admin/products/${form.category}`);
        } catch (err) {
            setError(err.response?.data?.error?.message || err.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '32px' }}>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>

            {error && (
                <div style={{ padding: '16px', background: 'var(--error)', color: 'white', borderRadius: '8px', marginBottom: '24px' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Name *</label>
                        <input
                            className="input"
                            style={{ width: '100%' }}
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>SKU *</label>
                        <input
                            className="input"
                            style={{ width: '100%' }}
                            value={form.sku}
                            onChange={e => setForm({ ...form, sku: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Brand</label>
                        <input
                            className="input"
                            style={{ width: '100%' }}
                            value={form.brand}
                            onChange={e => setForm({ ...form, brand: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price (₹) *</label>
                        <input
                            type="number"
                            className="input"
                            style={{ width: '100%' }}
                            value={form.basePrice}
                            onChange={e => setForm({ ...form, basePrice: e.target.value })}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Stock *</label>
                        <input
                            type="number"
                            className="input"
                            style={{ width: '100%' }}
                            value={form.stockQuantity}
                            onChange={e => setForm({ ...form, stockQuantity: e.target.value })}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category *</label>
                    <select
                        className="input"
                        style={{ width: '100%' }}
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        required
                    >
                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Short Description</label>
                    <input
                        className="input"
                        style={{ width: '100%' }}
                        value={form.shortDescription}
                        onChange={e => setForm({ ...form, shortDescription: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Detailed Description</label>
                    <textarea
                        className="input"
                        style={{ width: '100%', minHeight: '100px', fontFamily: 'inherit' }}
                        value={form.detailedDescription}
                        onChange={e => setForm({ ...form, detailedDescription: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Image URLs (comma separated)</label>
                    <input
                        className="input"
                        style={{ width: '100%' }}
                        placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                        value={form.images}
                        onChange={e => setForm({ ...form, images: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Specifications (JSON)</label>
                    <textarea
                        className="input"
                        style={{ width: '100%', minHeight: '150px', fontFamily: 'monospace', fontSize: '14px' }}
                        value={form.specifications}
                        onChange={e => setForm({ ...form, specifications: e.target.value })}
                        placeholder='{ "Processor": "Intel i9", "RAM": "32GB" }'
                    />
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ minWidth: '120px' }}
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
