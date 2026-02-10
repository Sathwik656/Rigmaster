import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { useCart } from '../context/CartContext';

export default function GamingLaptops() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiClient.get('/api/products?category=laptop');
                if (res.data && res.data.data && res.data.data.products) {
                    setProducts(res.data.data.products);
                }
            } catch (err) {
                console.error('Failed to fetch laptops', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-5 bg-gradient-to-b from-background-light/50 to-white dark:from-background-dark dark:to-[#0a0c10]">
            {/* HeroSection */}
            <div className="w-full mb-12">
                <div className="@container">
                    <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-10 md:px-12 md:pb-16 relative overflow-hidden group shadow-2xl shadow-blue-900/10" data-alt="Futuristic slim gaming laptop with blue neon lighting on a dark desk" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuABdS-Kb2EA3Kq7kUbl0MK5IultebQDORgYdjewH1V0zmCVqXUFugcMxHu9cUn5vIzkRvgKBJLJEgQi9PrUhPqPG5orByRINyPwtnMASpCTh8gbxQGOMB6Lo0FXO1ub57lXAUIhug7kNZb91o9T9bby5Lk3JS53JT9rI6J7HVXfws-Q-T3O6gKt7lRS0SgFyxQ177oq1d5UDth-NnqIR6M42k8-wBeXRlnnUaakoysSQ80H0dxR9wIEJvY97yZA0excboHP86H7e24")' }}>
                        {/* Subtle Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="flex flex-col gap-4 text-left max-w-[800px] z-10">
                            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-xl w-fit">
                                New Release
                            </div>
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
                                Power Meets Portability
                            </h1>
                            <h2 className="text-slate-200 text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                                Introducing the RigMaster Blade Series. Uncompromising performance with NVIDIA® GeForce RTX™ 40 Series GPUs in a chassis thinner than a dime.
                            </h2>
                        </div>
                        <button className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-blue-600 transition-all text-white text-base font-bold tracking-wide mt-2 z-10 shadow-lg shadow-primary/25">
                            <span className="truncate">Configure Now</span>
                            <span className="material-symbols-outlined ml-2 !text-lg">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Laptop Features Header */}
            <div className="w-full mb-6">
                <h2 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em]">Laptop Features</h2>
            </div>

            {/* FeatureSection */}
            <div className="w-full mb-16">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-slate-800 dark:text-slate-100 tracking-tight text-3xl font-bold leading-tight max-w-[720px]">
                            Engineered for Domination
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-[720px]">
                            Top-tier internal components meet aerospace-grade build quality. We don't just build laptops; we forge weapons for your digital arsenal.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27] p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[28px]">thermometer</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Cryo-Tech Cooling</h4>
                                <p className="text-slate-500 dark:text-[#9da6b9] text-sm font-normal leading-relaxed">
                                    Vapor chamber technology and liquid metal thermal compound keeps your GPU cool under extreme pressure.
                                </p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27] p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[28px]">visibility</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Visual Fidelity</h4>
                                <p className="text-slate-500 dark:text-[#9da6b9] text-sm font-normal leading-relaxed">
                                    165Hz OLED displays with 100% DCI-P3 color accuracy and VESA DisplayHDR™ 600 True Black.
                                </p>
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27] p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[28px]">keyboard</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Mechanical Keys</h4>
                                <p className="text-slate-500 dark:text-[#9da6b9] text-sm font-normal leading-relaxed">
                                    Ultra-low profile Cherry MX mechanical switches for tactile precision and N-key rollover.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Choose Your Laptop Header + Benefits */}
            <div className="w-full mb-8">
                <h2 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] mb-6">Choose Your Laptop</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {/* Benefit Card 1 */}
                    <div className="relative overflow-hidden rounded-xl h-[300px] group">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Creative professional editing video on a laptop in a modern studio" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1346FlrN-CX8aiSt_69xQYkqLqOZyfofYYgW-9RqIfH4e3mFQ6Nm4M_HTGVN_8WdJeFAAZT5utvjdGeUjOzpCmSGXzH0QTrDrPIi-MIATD04MFrKs_ZzGY6ponAOJsmSHcAnpP93PngScd6APErgm4G20wAQqKXy0UTpxuj7FVIjtdire2xrvT1tV4GHEG6w3QMQn2Sk-MV_LcTQI4grKkPN0KCx7sE2093s5T77MjBnvM7MZ9kgoMYM6VkgOxquZ3TShsmrAmjs")' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-center items-start max-w-[60%]">
                            <div className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-2 py-1 rounded mb-3 backdrop-blur-sm">FOR CREATORS</div>
                            <h3 className="text-white text-2xl font-bold mb-2">Create Without Limits</h3>
                            <p className="text-slate-300 text-sm mb-4">Color-accurate displays and RTX studio drivers for rendering 8K video on the go.</p>
                            <Link to="#" className="text-white font-medium hover:text-primary transition-colors flex items-center text-sm">
                                Explore Creator Series <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                    {/* Benefit Card 2 */}
                    <div className="relative overflow-hidden rounded-xl h-[300px] group">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Esports gamer playing on a high end laptop with RGB lights" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAC5L74B2CGj_Z34SRtKlG-dyqPLKDkZUdMt3BFA2LWqz7gE3-mREBjvrevbxtc9EJhFpyMu_nsyIAzGQrlkGfpKglrMkAqVzQwXry96cv5lG0Z6RtqPXdjktQf3febhHgMnSWTSiUqonXzTWR-s5pOAIvZZ79trCzrPQZE-zjANWvNwx2LWXfUv5vPWZn2HQolXJBA-uweHyOdp5HM9tkCAd0LS3vPGTMg13xW0cO4jaUORH5Qigp9ywmRTqt8gcer1TWmaCOKXTc")' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-center items-start max-w-[60%]">
                            <div className="bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold px-2 py-1 rounded mb-3 backdrop-blur-sm">FOR GAMERS</div>
                            <h3 className="text-white text-2xl font-bold mb-2">Dominate The Arena</h3>
                            <p className="text-slate-300 text-sm mb-4">High refresh rates and minimal latency designed for competitive esports titles.</p>
                            <Link to="#" className="text-white font-medium hover:text-primary transition-colors flex items-center text-sm">
                                Shop Gaming Series <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid + Filters */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-8 sticky top-24 hidden lg:block">
                    <div className="space-y-6 p-4 rounded-xl bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#282e39]">
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Filters</h3>
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">GPU Series</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 group cursor-pointer">
                                    <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 bg-transparent text-primary focus:ring-primary" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">RTX 4090</span>
                                </label>
                                <label className="flex items-center gap-2 group cursor-pointer">
                                    <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 bg-transparent text-primary focus:ring-primary" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">RTX 4080</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-primary font-bold text-xl anim-pulse">Loading High Performance Gear...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="group flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27] overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
                                    <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={product.images?.[0] || 'https://via.placeholder.com/400'}
                                            alt={product.name}
                                        />
                                        {product.stockQuantity < 50 && product.stockQuantity > 0 && (
                                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">Low Stock</div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded border border-slate-700">
                                            {product.specifications?.gpu || 'Gaming GPU'}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1 relative bg-white dark:bg-[#1c1f27]">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                        <div className="space-y-2 mb-6 flex-1">
                                            <p className="text-sm text-slate-500 dark:text-[#9da6b9] line-clamp-2">{product.shortDescription}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(product.specifications || {}).slice(0, 2).map(([key, val]) => (
                                                    <span key={key} className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                                                        {val}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto border-t border-slate-100 dark:border-slate-700 pt-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-400">Starting at</span>
                                                <span className="text-xl font-bold text-slate-900 dark:text-white">
                                                    ${(product.finalPrice / 100).toLocaleString()}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => addItem(product)}
                                                className="rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white text-slate-900 dark:text-white p-2.5 transition-all shadow-sm hover:shadow-md active:scale-95"
                                                title="Add to Cart"
                                            >
                                                <span className="material-symbols-outlined">shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
