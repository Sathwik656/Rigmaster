import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { useCart } from '../context/CartContext';

export default function PrebuiltCollection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiClient.get('/api/products?category=prebuilt');
                if (res.data && res.data.data && res.data.data.products) {
                    setProducts(res.data.data.products);
                }
            } catch (err) {
                console.error('Failed to fetch prebuilt PCs', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen flex flex-col">
            <div className="layout-content-container flex flex-col max-w-[1440px] mx-auto w-full px-4 md:px-10 py-5 flex-1">

                {/* HeroSection */}
                <div className="@container mb-8">
                    <div className="@[480px]:p-4">
                        <div
                            className="relative flex min-h-[480px] flex-col gap-6 overflow-hidden rounded-xl items-center justify-center p-8 text-center bg-cover bg-center shadow-2xl"
                            data-alt="High tech gaming setup with RGB lighting"
                            style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCw-YsZqBEsIq7w8Ttg2kVNw3MwSt1x-XXadS463tXQXlCLqXV1sO6P3tjNG6bhaqwnohjkAvpkElJAqY0VybkvZzk67qNH8aZPKv1s3QWG8Y4FPH6cYyFhiCI4JLQZ7N_pHjx7qmvCLOVT6UNurfhjgfurClXnfrnHBCaP9IOIeiaeh5NDm9V1NyFvwYiaW2iUAA8STGkehk7cZxTXfsb9vevHh2ysdBws16-WsQRDy7j8QEhv5gbXyk8DE9IHxbXFpTKxHhTDAug")' }}
                        >
                            <div className="flex flex-col gap-4 z-10 max-w-2xl">
                                <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg">
                                    Dominate Immediately
                                </h1>
                                <h2 className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed drop-shadow-md">
                                    Expertly crafted rigs, stress-tested and ready to ship within 24 hours. Skip the wait, start the game.
                                </h2>
                            </div>
                            <button className="z-10 flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(19,91,236,0.5)]">
                                <span className="truncate">Shop All Rigs</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* SectionHeader: Categories */}
                <div className="flex items-center justify-between px-4 pb-3 pt-5">
                    <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Browse by Series</h2>
                    <Link to="#" className="text-primary text-sm font-medium hover:underline">View All Series</Link>
                </div>

                {/* Category Grid (Modified for Prebuilts) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-8">
                    {[
                        { title: 'Pro Series', subtitle: 'Competitive Gaming', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYx_49o9zOT-qDghYdQTgST4gyoPIxfn_AY5SJDn6udXWkA2YV3tdcLT_9Gjjl71vFAjTi5-HL6JcUlARiuINKpwD35F3wA_ZVbhqsUJ-HglSxTAmkf3N7AVwaFsNV73h_J97Hb92j6_OMb2ikBJz3iKz08DTHJmGro5vnVT6n4Q8ORpTuu0NZyNtwSs_4__dpcfIK3Ejbdc93MHYFt_MXE4M_Ot6YMj3RlCeULmQvagX3cWiDMch4hk8GzFQbULltJfTgF8650XQ' },
                        { title: 'Elite Series', subtitle: 'Enthusiast Performance', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_dEd5iGm5jWWItZMZvPwudFKI8XIU0Qbs1CyX8B1snek6PMkuR0agtLqAvNKsl6-2HqgW2GKvyPdD2EJvuKsCkcIiFMlRGOrfQ9Z7kJTDGz9m0BFQS1gMfylZnl6HMkSl1waXst0vK5_-vcGZfT6ll2I736wh9_57IbDvLVNNThWcx3HcKiy1tMa5uqVJW2jmI48I0ZS-zB60ckk0HUev9-ChiLqJJSr4McjDDp81g2qEPtO1obvhYexk_b-I4PgGh37krBPeELc' },
                        { title: 'Titan Series', subtitle: 'Ultimate Power', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIakHlrZ33T4y0eSuIS7tlD2D_XcNotwakJImgNDVP6Wqc43xGq9N5mF3wnRMCKTu5dWzC3dYUpCvlXxJJaFTCFFClHubdebV-9lTsL7OSn-VUjONQhujD7oKQd4x9zNaHAW01S4uFLtL5qFip2i_vwvggBTW8wr1VDN_18YZBG0iiCAO4iWY8VhCXGDryuGZxH3pG8nh_6ZU_4o7iyyjO1nSHDBzVPanZozlSAqYJYMjmA0M6vQ534L3NSKgpXXDRucvsMZtNzzU' },
                        { title: 'Creator Series', subtitle: 'Workstation Grade', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6SVN0CJDNH3Ih599SCSwfadKMcsBXBw7JCRtIucpb_eDpDFX71RPOrJHgoIiCcRAhOEqTFc_1O0uIzh_9Mjy2sxEaqaQNrVcFcQZCiLWEa4GGcMhD9fnMWpgH98fUglB6C852ZFV0agRVJbqhljr1O31YQ_yyeXpDoRNWfCcm0vLb9y5ba0QoNzKpB2iIkP9VNTcR3asjHwpVCcf4AJhjKKEegAzPtk6wom_KApXtVaImKacM6B-ZAmtCeBs7Liuh3m6tYil82Y' },
                    ].map((cat, idx) => (
                        <Link key={idx} to="#" className="group relative flex flex-col gap-3 pb-3 overflow-hidden rounded-xl bg-surface-dark/50 hover:bg-surface-dark transition-colors p-3 border border-slate-200 dark:border-slate-800">
                            <div className="w-full aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300" style={{ backgroundImage: `url("${cat.bg}")` }}></div>
                            <div className="text-center">
                                <p className="text-slate-900 dark:text-white text-base font-bold leading-normal">{cat.title}</p>
                                <p className="text-slate-500 dark:text-[#9da6b9] text-sm font-normal leading-normal">{cat.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Smart Filter Bar */}
                <div className="sticky top-[73px] z-40 px-4 py-3 mb-6 bg-background-light/95 dark:bg-[#0a0c10]/95 backdrop-blur-md border-y border-slate-200 dark:border-[#282e39]">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <label className="flex flex-col h-12 w-full md:w-1/2">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-200 dark:bg-[#282e39] focus-within:ring-2 focus-within:ring-primary transition-shadow">
                                <div className="text-slate-500 dark:text-[#9da6b9] flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-500 dark:placeholder:text-[#9da6b9] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search for models, specs, or GPUs..." />
                            </div>
                        </label>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                            <button className="flex items-center gap-2 px-4 h-12 rounded-lg bg-primary text-white font-medium text-sm whitespace-nowrap">
                                <span className="material-symbols-outlined text-[20px]">tune</span>
                                All Filters
                            </button>
                            <button className="flex items-center gap-2 px-4 h-12 rounded-lg bg-slate-200 dark:bg-[#282e39] text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-[#3b4252] font-medium text-sm whitespace-nowrap transition-colors">
                                In Stock
                            </button>
                            <button className="flex items-center gap-2 px-4 h-12 rounded-lg bg-slate-200 dark:bg-[#282e39] text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-[#3b4252] font-medium text-sm whitespace-nowrap transition-colors">
                                On Sale
                            </button>
                            <div className="w-px h-8 self-center bg-slate-300 dark:bg-[#3b4252] mx-1"></div>
                            <button className="flex items-center gap-2 px-4 h-12 rounded-lg bg-slate-200 dark:bg-[#282e39] text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-[#3b4252] font-medium text-sm whitespace-nowrap transition-colors">
                                Sort: Featured
                                <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Section: Performance Systems */}
                <div className="px-4 pb-3 pt-5 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">computer</span>
                    <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Performance Systems</h2>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64 text-primary font-bold text-xl anim-pulse">Loading Rigs...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mb-8">
                        {products.map((item) => (
                            <div key={item._id} className="flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-[#282e39] group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10">
                                <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-[#111318] p-4 flex items-center justify-center">
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">READY TO SHIP</span>
                                    </div>
                                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="size-8 rounded-full bg-slate-200 dark:bg-[#282e39] flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-[#3b4252] transition-colors shadow-sm">
                                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                                        </button>
                                    </div>
                                    <img
                                        className="w-full h-full object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                                        src={item.images?.[0]}
                                        alt={item.name}
                                    />
                                </div>
                                <div className="flex flex-col p-4 gap-2 flex-1 relative bg-white dark:bg-[#1c1f27]">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
                                        <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded border border-primary/20">
                                            {item.specifications?.gpu ? item.specifications.gpu.split(' ')[0] + ' ' + item.specifications.gpu.split(' ')[1] : 'RTX'}
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-[#9da6b9] text-sm line-clamp-2">{item.shortDescription}</p>

                                    {/* Specs Mini-Grid */}
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {item.specifications?.cpu && (
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-[#9da6b9] bg-slate-100 dark:bg-[#282e39] px-2 py-1 rounded">
                                                <span className="material-symbols-outlined text-[12px]">memory</span>
                                                <span className="truncate">{item.specifications.cpu}</span>
                                            </div>
                                        )}
                                        {item.specifications?.ram && (
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-[#9da6b9] bg-slate-100 dark:bg-[#282e39] px-2 py-1 rounded">
                                                <span className="material-symbols-outlined text-[12px]">sd_card</span>
                                                <span className="truncate">{item.specifications.ram}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1 mt-auto pt-2">
                                        <span className="material-symbols-outlined text-yellow-500 text-[16px]">star</span>
                                        <span className="text-slate-900 dark:text-white text-sm font-bold">5.0</span>
                                        <span className="text-slate-400 text-xs">({Math.floor(Math.random() * 50) + 10} reviews)</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-[#282e39]">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-xs line-through">${((item.basePrice + 20000) / 100).toLocaleString()}</span>
                                            <span className="text-slate-900 dark:text-white text-xl font-bold">${(item.finalPrice / 100).toLocaleString()}</span>
                                        </div>
                                        <button
                                            onClick={() => addItem(item)}
                                            className="px-4 py-2 bg-slate-100 dark:bg-[#282e39] text-slate-900 dark:text-white hover:bg-primary hover:text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 active:scale-95"
                                        >
                                            Add <span className="material-symbols-outlined text-[16px]">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Promo Banner (Reused from HTML) */}
                <div className="mx-4 mb-10 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-800 relative shadow-lg">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="flex flex-col md:flex-row items-center justify-between p-8 relative z-10 gap-6">
                        <div className="text-white">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">Build Your Dream Setup</h3>
                            <p className="text-blue-100 max-w-lg">Get 10% off when you bundle a monitor and peripherals with your new rig. Use code <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">RIGBUNDLE</span></p>
                        </div>
                        <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-50 transition-colors shadow-lg">
                            Bundle & Save
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
