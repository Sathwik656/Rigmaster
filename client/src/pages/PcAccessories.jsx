import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { useCart } from '../context/CartContext';

export default function PcAccessories() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiClient.get('/api/products?category=accessory');
                if (res.data && res.data.data && res.data.data.products) {
                    setProducts(res.data.data.products);
                }
            } catch (err) {
                console.error('Failed to fetch accessories', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-5 bg-gradient-to-b from-slate-50 to-white dark:from-[#0d1117] dark:to-[#0a0c10]">
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
                                Level Up Your Command Center
                            </h1>
                            <h2 className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed drop-shadow-md">
                                Premium peripherals engineered for the ultimate gaming experience. Precision, speed, and immersion.
                            </h2>
                        </div>
                        <button className="z-10 flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(19,91,236,0.5)]">
                            <span className="truncate">Shop All Gear</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Grid */}
            <div className="flex items-center justify-between px-4 pb-3 pt-5">
                <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Browse by Category</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-8">
                {/* ... Static Categories for Visuals ... */}
                {[
                    { title: 'Keyboards', subtitle: 'Mechanical & Optical', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoC5AMbHha_IhYpEJ7aKZjX-Pl0jDcGazGi1tqmpVAb5Bp8vRXfbAuXd9w2z5SeAm5tz9xG6NpVk-TJQ_LYG74WRlr9bnVTFdVQ5trr4coJg9EztJoxIrV0brAfb65WIlh4aKFST3lpWdMn_HKJG_hlYbUHFg2v-CQ1Zi8znMl3DuxydTtZrgRTFQgTHwjpY872JUzmpfbVkjNVlmUq1DCDBBRI1o6zqPy2wJlXCLRJqlV-If6M-rTi_84y4Z2pLVJwa83o7-XmSw' },
                    { title: 'Mice', subtitle: 'Wireless & Lightweight', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQjM7rl2M2un3hzCPLGMHdCKGePg0w3u65GTmGItEwXvNvSUC6cDc98iSHxvTNTs3ojN3sJKeCwORrH8jHPgsQm7JkrM4A26YqP45rrhQGZXlZy3uW4_Z_ivWM6CWqccDgh2SM7IiyHfAD404pCXlTVjBSZGF3cASc3bME0qso71YVbq3-0-Co22w1iWauVb7R5ayW37y2A7HLtO5pE64EwewsSbhaZqIjFvhOHjzCazRFWZwjYcaCGcE_OC4gyujbvFw9n9PKCdE' },
                    { title: 'Audio', subtitle: 'Surround & Spatial', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUdGiJ1BWxwfG3fY_Dda4jS-kkTLANMEx-_JptqR_Uw6-21b5FNgi9hSUzMLB6PvY9umqQSjhBvaohmvUNsUiiVW0yvrgX9Pm0ehGh7T5b9svg3JtJUgrWBrdRtPFHvk0QPZFjb9e-DXvxZb5NmWxtpi_-wTa_fET4_sACc7EdZ6T1cS-a-cBl6aCRUD1HdO04yfEemIKQcz3SaWW0zj--FCqYGO6uyoao65zR7XJKHLAsjMA__NQjZ46dhnWDWJfldLTaOIiJ3Hw' },
                    { title: 'Monitors', subtitle: 'OLED & High Refresh', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4w10ocy0XyGQBbfjkCrR4V4EwKjHUOgqmW15hOJTFKdEFtONbwIAX6YirJqqCqotsU4PcgSEUeOnNp6DSMel0q00xTV1EFU9ye1U7v3bfJEsxhFBou7Wb-0vTcpmamESE4G-D41XCZgoHOMRSxO9HTGYsXLbbL1eTS-MDRcURV4LwsW3oTRjyLb9c1Vvd037HkPQhmS5lQYk-qB7j4SH_3gw4hdYbonek0ctLGSNOeMQjs9KlZ087R0fQmIlJc2yyr7O6clKzQ3w' },
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
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar items-center">
                    <span className="text-sm font-bold mr-2 text-slate-500">Filters:</span>
                    <button className="flex items-center gap-2 px-4 h-10 rounded-full bg-primary text-white font-medium text-sm whitespace-nowrap shadow-lg shadow-primary/20">
                        All Items
                    </button>
                    <button className="flex items-center gap-2 px-4 h-10 rounded-full bg-slate-200 dark:bg-[#161b22] text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-[#282e39] font-medium text-sm whitespace-nowrap transition-colors border border-transparent dark:border-slate-800">
                        Keyboards
                    </button>
                    <button className="flex items-center gap-2 px-4 h-10 rounded-full bg-slate-200 dark:bg-[#161b22] text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-[#282e39] font-medium text-sm whitespace-nowrap transition-colors border border-transparent dark:border-slate-800">
                        Mice
                    </button>
                    <button className="flex items-center gap-2 px-4 h-10 rounded-full bg-slate-200 dark:bg-[#161b22] text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-[#282e39] font-medium text-sm whitespace-nowrap transition-colors border border-transparent dark:border-slate-800">
                        Audio
                    </button>
                </div>
            </div>

            {/* Product List */}
            <div className="px-4 pb-3 pt-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">grid_view</span>
                <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">All Accessories</h2>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64 text-primary font-bold text-xl anim-pulse">Loading Accessories...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mb-8">
                    {products.map((item) => (
                        <div key={item._id} className="flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-[#282e39] group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10">
                            <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-[#111318] p-4 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-[#161b22] transition-colors">
                                {item.discount && (
                                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                        -{item.discount.value}%
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="size-8 rounded-full bg-slate-200 dark:bg-[#282e39] flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-[#3b4252] transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                </div>
                                <img
                                    className="w-full h-full object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500"
                                    src={item.images?.[0]}
                                    alt={item.name}
                                />
                            </div>
                            <div className="flex flex-col p-4 gap-2 flex-1 relative bg-white dark:bg-[#1c1f27]">
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
                                <p className="text-slate-500 dark:text-[#9da6b9] text-sm line-clamp-2">{item.shortDescription}</p>
                                <div className="flex items-center gap-1 mt-auto pt-2">
                                    <span className="material-symbols-outlined text-yellow-500 text-[16px]">star</span>
                                    <span className="text-slate-900 dark:text-white text-sm font-bold">4.8</span>
                                    <span className="text-slate-400 text-xs">(120)</span>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-[#282e39]">
                                    <div className="flex flex-col">
                                        {item.basePrice > item.finalPrice && <span className="text-slate-400 text-xs line-through">${(item.basePrice / 100).toFixed(2)}</span>}
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
        </div>
    );
}
