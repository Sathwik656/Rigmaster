import { Link } from 'react-router-dom';

export default function PrebuiltCollection() {
    return (
        <div className="flex-1">
            {/* Hero Section */}
            <div className="@container">
                <div
                    className="relative w-full h-[600px] flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: 'linear-gradient(rgba(16, 22, 34, 0.7) 0%, rgba(16, 22, 34, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFIZVkvs3NJxeoleYTn_ZK8PSik0EBQ23ANVrG5Xo4IQ4KNK-2Un7HzIelrN3TsJ_f3o1U22fvnCtekYkN1NywZI9OPH7si5Pxy_TYQ2WokNd19MuZpYHBZLP0PpTKY16ejNnussUs2HmHnkbjaMGdEDCdepa8oHvjxmbWxeV5ts-JgWabuQqLR9tJF9XsZOvF9hD9HMmU-qy0ANT1Jj7Jb0QzeoSjpl013VveqwMNP2etuVkgbd_Z4-2uViRPEbYvuegzwaD2v4o")' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent opacity-100 h-32 mt-auto"></div>
                    <div className="flex flex-col gap-6 text-center max-w-4xl px-4 relative z-10">
                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-wider mb-2 w-fit mx-auto">
                            Ready To Ship
                        </div>
                        <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-[-0.033em]">
                            DOMINATE IMMEDIATELY
                        </h1>
                        <h2 className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                            Expertly crafted rigs, stress-tested and ready to ship within 24 hours. Skip the wait, start the game.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-primary text-white text-base font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(19,91,236,0.5)]">
                                Shop All Rigs
                            </button>
                            <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base font-bold hover:bg-white/20 transition-colors">
                                View Components
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="layout-container flex flex-col items-center">
                <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-4 md:px-10">

                    {/* Feature Section */}
                    <div className="py-16 border-b border-slate-200 dark:border-border-dark/50">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-10">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight dark:text-white">Why Choose Prebuilt?</h2>
                                <p className="text-text-secondary text-lg">Skip the build time and troubleshooting. Get straight into the game with our professionally assembled systems.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: 'build', title: 'Expertly Tuned', desc: 'Overclocked and optimized by professionals for maximum FPS out of the box.' },
                                { icon: 'verified_user', title: '2-Year Warranty', desc: 'Comprehensive coverage for parts and labor. We\'ve got your back so you can game stress-free.' },
                                { icon: 'power_settings_new', title: 'Plug & Play', desc: 'No drivers to install, no BIOS to update. Unbox, plug in, and dominate instantly.' }
                            ].map((feature, idx) => (
                                <div key={idx} className="group flex flex-col gap-4 p-6 rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark hover:border-primary/50 transition-colors">
                                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{feature.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">{feature.title}</h3>
                                        <p className="text-text-secondary">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="py-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
                            <button className="h-9 px-4 rounded-lg bg-primary text-white font-medium text-sm whitespace-nowrap">All Series</button>
                            {['Pro Series', 'Elite Series', 'Creator Series'].map(series => (
                                <button key={series} className="h-9 px-4 rounded-lg bg-slate-200 dark:bg-border-dark dark:text-text-secondary font-medium text-sm whitespace-nowrap hover:text-primary transition-colors">{series}</button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                        {/* Product Card 1 */}
                        <Link to="/products/1" className="flex flex-col rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden group hover:shadow-[0_10px_30px_-10px_rgba(19,91,236,0.3)] hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-[#151820] flex items-center justify-center p-4">
                                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">HOT SELLER</div>
                                <img alt="Gaming PC case" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYx_49o9zOT-qDghYdQTgST4gyoPIxfn_AY5SJDn6udXWkA2YV3tdcLT_9Gjjl71vFAjTi5-HL6JcUlARiuINKpwD35F3wA_ZVbhqsUJ-HglSxTAmkf3N7AVwaFsNV73h_J97Hb92j6_OMb2ikBJz3iKz08DTHJmGro5vnVT6n4Q8ORpTuu0NZyNtwSs_4__dpcfIK3Ejbdc93MHYFt_MXE4M_Ot6YMj3RlCeULmQvagX3cWiDMch4hk8GzFQbULltJfTgF8650XQ" />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg leading-tight dark:text-white">RigMaster Pro X1</h3>
                                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">INTEL</span>
                                </div>
                                <div className="space-y-2 mb-4 flex-1">
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">memory</span>
                                        <span>Intel Core i5-13600K</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">grid_view</span>
                                        <span>NVIDIA RTX 4070 12GB</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 mt-auto">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold dark:text-white">$1,899</span>
                                        <span className="text-sm text-text-secondary line-through">$2,099</span>
                                    </div>
                                    <button className="w-full h-10 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>flash_on</span>
                                        Quick Buy
                                    </button>
                                </div>
                            </div>
                        </Link>

                        {/* Product Card 2 */}
                        <Link to="/products/2" className="flex flex-col rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden group hover:shadow-[0_10px_30px_-10px_rgba(19,91,236,0.3)] hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-[#151820] flex items-center justify-center p-4">
                                <img alt="White gaming PC" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_dEd5iGm5jWWItZMZvPwudFKI8XIU0Qbs1CyX8B1snek6PMkuR0agtLqAvNKsl6-2HqgW2GKvyPdD2EJvuKsCkcIiFMlRGOrfQ9Z7kJTDGz9m0BFQS1gMfylZnl6HMkSl1waXst0vK5_-vcGZfT6ll2I736wh9_57IbDvLVNNThWcx3HcKiy1tMa5uqVJW2jmI48I0ZS-zB60ckk0HUev9-ChiLqJJSr4McjDDp81g2qEPtO1obvhYexk_b-I4PgGh37krBPeELc" />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg leading-tight dark:text-white">Snowblind Elite</h3>
                                    <span className="text-xs font-bold bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded">AMD</span>
                                </div>
                                <div className="space-y-2 mb-4 flex-1">
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">memory</span>
                                        <span>AMD Ryzen 7 7800X3D</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">grid_view</span>
                                        <span>Radeon RX 7900 XT</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 mt-auto">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold dark:text-white">$2,249</span>
                                    </div>
                                    <button className="w-full h-10 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>flash_on</span>
                                        Quick Buy
                                    </button>
                                </div>
                            </div>
                        </Link>

                        {/* Product Card 3 */}
                        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden group hover:shadow-[0_10px_30px_-10px_rgba(19,91,236,0.3)] hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-[#151820] flex items-center justify-center p-4">
                                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">ULTIMATE</div>
                                <img alt="Futuristic PC" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIakHlrZ33T4y0eSuIS7tlD2D_XcNotwakJImgNDVP6Wqc43xGq9N5mF3wnRMCKTu5dWzC3dYUpCvlXxJJaFTCFFClHubdebV-9lTsL7OSn-VUjONQhujD7oKQd4x9zNaHAW01S4uFLtL5qFip2i_vwvggBTW8wr1VDN_18YZBG0iiCAO4iWY8VhCXGDryuGZxH3pG8nh_6ZU_4o7iyyjO1nSHDBzVPanZozlSAqYJYMjmA0M6vQ534L3NSKgpXXDRucvsMZtNzzU" />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg leading-tight dark:text-white">Titan Leviathan</h3>
                                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">INTEL</span>
                                </div>
                                <div className="space-y-2 mb-4 flex-1">
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">memory</span>
                                        <span>i9-14900K</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">grid_view</span>
                                        <span>RTX 4090 24GB</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 mt-auto">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold dark:text-white">$4,499</span>
                                    </div>
                                    <button className="w-full h-10 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>flash_on</span>
                                        Quick Buy
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 4 */}
                        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden group hover:shadow-[0_10px_30px_-10px_rgba(19,91,236,0.3)] hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-[#151820] flex items-center justify-center p-4">
                                <img alt="Mini PC" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6SVN0CJDNH3Ih599SCSwfadKMcsBXBw7JCRtIucpb_eDpDFX71RPOrJHgoIiCcRAhOEqTFc_1O0uIzh_9Mjy2sxEaqaQNrVcFcQZCiLWEa4GGcMhD9fnMWpgH98fUglB6C852ZFV0agRVJbqhljr1O31YQ_yyeXpDoRNWfCcm0vLb9y5ba0QoNzKpB2iIkP9VNTcR3asjHwpVCcf4AJhjKKEegAzPtk6wom_KApXtVaImKacM6B-ZAmtCeBs7Liuh3m6tYil82Y" />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg leading-tight dark:text-white">Creator Studio Mini</h3>
                                    <span className="text-xs font-bold bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded">WORK</span>
                                </div>
                                <div className="space-y-2 mb-4 flex-1">
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">memory</span>
                                        <span>Ryzen 9 7950X</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className="material-symbols-outlined text-sm">grid_view</span>
                                        <span>RTX 4080 Super</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 mt-auto">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold dark:text-white">$3,149</span>
                                    </div>
                                    <button className="w-full h-10 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>flash_on</span>
                                        Quick Buy
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Testimonials (Static for now) */}
                    <div className="w-full py-16 px-4 md:px-0">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold dark:text-white">Player Reviews</h2>
                            <div className="h-px bg-slate-200 dark:bg-border-dark flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            <div className="p-6 rounded-xl bg-slate-100 dark:bg-[#151820]">
                                <p className="italic text-gray-600 dark:text-gray-300 mb-4">"The build quality is insane. I opened it up and the cable management is basically art."</p>
                                <div className="font-bold dark:text-white">- Alex Rodriguez</div>
                            </div>
                            <div className="p-6 rounded-xl bg-slate-100 dark:bg-[#151820]">
                                <p className="italic text-gray-600 dark:text-gray-300 mb-4">"Shipping was incredibly fast. Ordered on Tuesday, playing by Thursday."</p>
                                <div className="font-bold dark:text-white">- Sarah Jenkins</div>
                            </div>
                            <div className="p-6 rounded-xl bg-slate-100 dark:bg-[#151820]">
                                <p className="italic text-gray-600 dark:text-gray-300 mb-4">"Beast of a machine. The Titan Leviathan handles 4K video editing like it's nothing."</p>
                                <div className="font-bold dark:text-white">- Marcus Chen</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
