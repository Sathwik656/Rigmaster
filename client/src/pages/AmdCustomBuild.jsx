import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AmdCustomBuild() {
    const [selectedCPU, setSelectedCPU] = useState('9950x'); // '9950x' | '9950x3d'

    // Pricing Mock
    const PRICES = {
        cpu: selectedCPU === '9950x' ? 699 : 699,
        gpu: 999, // Placeholder
        motherboard: 299, // Placeholder
        // Add other component prices as needed
    };

    const total = Object.values(PRICES).reduce((a, b) => a + b, 0);

    return (
        <div className="flex-1 flex flex-col lg:flex-row relative">
            {/* Left Content: Configurator */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Hero Section */}
                <div className="@container">
                    <div className="relative overflow-hidden">
                        {/* Subtle AMD Accent Gradient Background */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amd-red/10 via-amd-orange/5 to-transparent pointer-events-none"></div>
                        <div className="flex min-h-[360px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-6 py-10 lg:px-16 lg:py-16 relative" style={{ backgroundImage: 'linear-gradient(to right, rgba(16, 22, 34, 1) 20%, rgba(16, 22, 34, 0.6) 60%, rgba(16, 22, 34, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwVJo9Q6IJV6WUldpP1vNMaRma56oEaQrV_dN8gY4K_ao-FttVNjQVajrZVbMaHCcwpO98GhDJKIcl98PbuLNdgcLmkYMlIjGLNdf_cVKaDLZIFI5tfurdMeab8QR2P23hBhOXCUr8DIl3uF_b4UuSogG5nP8_XiyXoiYB9_9-g33akh1-j79QAZc6OfM3LdEtKeVtHN1xRQ_wqG4f7xQ30gu_TkB3A5xlgoS6sry1V0ZW5ZzllBySWIXahL01kmn0BF2kh2KUFw4")' }}>
                            <div className="flex flex-col gap-2 text-left relative z-10 max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amd-red to-amd-orange w-fit mb-2">
                                    <span className="text-white text-xs font-bold tracking-wider uppercase">Powered by Ryzen™ 7000 Series</span>
                                </div>
                                <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                                    AMD <span className="text-transparent bg-clip-text bg-gradient-to-r from-amd-red to-amd-orange">Ultimate</span> Configurator
                                </h1>
                                <p className="text-slate-300 text-base lg:text-lg font-normal leading-relaxed max-w-xl">
                                    Construct your dream machine with intelligent compatibility checking for AM5 socket architecture. Optimized for gaming and content creation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 lg:px-16 pt-8 pb-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-6 justify-between items-end">
                            <p className="text-slate-900 dark:text-white text-lg font-bold leading-normal">Build Progress</p>
                            <p className="text-slate-500 dark:text-[#9da6b9] text-sm font-medium leading-normal">25% Complete</p>
                        </div>
                        <div className="rounded-full bg-slate-200 dark:bg-[#3b4354] h-2 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-amd-red to-amd-orange" style={{ width: '25%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                            <span className="text-amd-orange">Processor</span>
                            <span>Cooling</span>
                            <span>Motherboard</span>
                            <span>Memory</span>
                            <span>Graphics</span>
                            <span>Storage</span>
                        </div>
                    </div>
                </div>

                {/* Accordions / Component Selection */}
                <div className="px-6 lg:px-16 pb-20">
                    <div className="flex flex-col gap-4">

                        {/* Step 1: Processor (Open) */}
                        <details className="group flex flex-col rounded-xl border border-primary/40 bg-white dark:bg-card-dark shadow-lg dark:shadow-none overflow-hidden transition-all" open>
                            <summary className="flex cursor-pointer items-center justify-between gap-6 px-5 py-4 bg-slate-50 dark:bg-[#1f2636] list-none">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">1</div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white text-base font-bold leading-normal">Processor (CPU)</p>
                                        <p className="text-slate-500 dark:text-[#9da6b9] text-xs">{selectedCPU === '9950x' ? 'AMD Ryzen 9 7950X' : 'AMD Ryzen 9 7950X3D'} selected</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="px-5 py-6 border-t border-slate-200 dark:border-border-dark bg-white dark:bg-[#161c28]">
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Select Series</h3>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 cursor-pointer">Ryzen 9</span>
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">Ryzen 7</span>
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">Ryzen 5</span>
                                        </div>
                                    </div>

                                    {/* Product Card Selected (7950X) */}
                                    <div
                                        onClick={() => setSelectedCPU('9950x')}
                                        className={`rounded-lg p-[1px] cursor-pointer ${selectedCPU === '9950x' ? 'bg-gradient-to-r from-amd-red to-amd-orange' : 'bg-transparent border border-slate-200 dark:border-border-dark'}`}
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 dark:bg-[#1a2230] h-full">
                                            <div className="w-full sm:w-24 h-24 bg-white rounded-md flex items-center justify-center p-2 shrink-0 border border-slate-200 dark:border-border-dark">
                                                <img alt="AMD Ryzen 9 Box" className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJo8D-7mklgzomD_4cjP8n7ABOlUZHR6iY1JSGH8LvKe1xdltZJxKZXUbhthXvJfif0ldmJxxIW4uLsxFgj02ev9J1GrtbI6aaCEMau2fPs8zYf2lVM0e_g1axTakKXK1aDTj-67EX_37KSq8jbKmz9IgQNfvKlZ63Ikj92w4VTR2B3IPo4MnA43SElYUGkOVM9jdu1KKY1wBPwD3zb3L4IP_37JBC2y2E1O2M7EcVW52TAwdUH9onPkSuJTLmIYr0AxYri70odKs" />
                                            </div>
                                            <div className="flex flex-col flex-1 justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-slate-900 dark:text-white font-bold text-lg">AMD Ryzen™ 9 7950X</h4>
                                                        <span className="text-primary font-bold text-lg">$699.00</span>
                                                    </div>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">16 Cores • 32 Threads • Up to 5.7 GHz Boost • AM5 Socket</p>
                                                </div>
                                                <div className="flex justify-between items-end mt-4">
                                                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                        Compatible
                                                    </div>
                                                    {selectedCPU === '9950x' ? (
                                                        <button className="bg-primary hover:bg-blue-600 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/20">Selected</button>
                                                    ) : (
                                                        <button className="text-primary hover:text-white border border-primary hover:bg-primary text-sm font-bold py-2 px-6 rounded-lg transition-colors">Select</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Card Option 2 (7950X3D) */}
                                    <div
                                        onClick={() => setSelectedCPU('9950x3d')}
                                        className={`rounded-lg p-[1px] cursor-pointer ${selectedCPU === '9950x3d' ? 'bg-gradient-to-r from-amd-red to-amd-orange' : 'bg-transparent border border-slate-200 dark:border-border-dark'}`}
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 dark:bg-[#1a2230] h-full">
                                            <div className="w-full sm:w-24 h-24 bg-white rounded-md flex items-center justify-center p-2 shrink-0 border border-slate-200 dark:border-border-dark">
                                                <img alt="AMD Ryzen 9 3D Box" className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBizIB1mfFsAlgS8UZ-bHLeQkJwLNpGS1kUVjc8ePDtYkMsymSsdRJU8rsnGemYAUEz53yTRtfrf6j7T9VrLyV5fNaS67whE95tu2-dCwh2xVUIZZbTLxWNaJliA1FOpkMhXhq6EGwmrSDkzJr6_Y1LglwmCZFYZVggbCZDaPgnxU6ILKfDMjvdRdY62PYZdVz_5TKIhbqWxNi0ZCAPNOzOUFRaI9v2u49R75L49DWkSM7ECRdW3AWSa_Tk_Ui9qdEwP3SgRZQBNbU" />
                                            </div>
                                            <div className="flex flex-col flex-1 justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-slate-900 dark:text-white font-bold text-lg">AMD Ryzen™ 9 7950X3D</h4>
                                                        <span className="text-slate-700 dark:text-white font-bold text-lg">$699.00</span>
                                                    </div>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">16 Cores • 32 Threads • 3D V-Cache Technology</p>
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    {selectedCPU === '9950x3d' ? (
                                                        <button className="bg-primary hover:bg-blue-600 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/20">Selected</button>
                                                    ) : (
                                                        <button className="text-primary hover:text-white border border-primary hover:bg-primary text-sm font-bold py-2 px-6 rounded-lg transition-colors">Select</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </details>

                        {/* Other Steps (Collapsed) */}
                        {['CPU Cooler', 'Motherboard', 'Memory (RAM)', 'Graphics Card'].map((item, index) => (
                            <details key={index} className="flex flex-col rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden group">
                                <summary className="flex cursor-pointer items-center justify-between gap-6 px-5 py-4 list-none bg-slate-50 dark:bg-card-dark hover:bg-slate-100 dark:hover:bg-[#1f2636] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-[#3b4354] text-slate-500 dark:text-slate-300 font-bold text-sm">{index + 2}</div>
                                        <p className="text-slate-900 dark:text-white text-base font-bold leading-normal">{item}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="px-5 py-4 border-t border-slate-200 dark:border-border-dark">
                                    <p className="text-slate-500 dark:text-[#9da6b9]">{item} options loading...</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Sidebar: Build Summary */}
            <div className="lg:w-[400px] border-l border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] flex flex-col lg:sticky lg:top-[65px] h-auto lg:h-[calc(100vh-65px)] z-40 shadow-xl lg:shadow-none">
                <div className="p-6 border-b border-slate-200 dark:border-[#282e39]">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">computer</span>
                        Your Rig
                    </h3>
                    <div className="mt-4 flex gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#282e39] text-xs font-bold text-slate-600 dark:text-slate-300">
                            <span className="material-symbols-outlined text-[16px] text-amd-orange">bolt</span>
                            Est. 185W
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                            Compatible
                        </div>
                    </div>
                </div>

                {/* Scrollable Part List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="flex flex-col gap-4">
                        {/* Sidebar Item */}
                        <div className="flex gap-3 group relative">
                            <div className="w-12 h-12 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1 shrink-0">
                                <img alt="CPU Thumbnail" className="max-h-full mix-blend-multiply dark:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsh6IcPNFXh-KIsqBzlf9waUf2yQLqzJkGETOjLzGDUxWiD0sRAXNrn3TR-fC66mr1fz1Af3Kec66c5kvu-EvlCrhIOgkXlC-00p_-h5b3pq5guHqXcHf3w_rB4cIG5k481j_b-Ep1cIfNezBoNGUIu6nfuTAuebUAHuY1UfU4rthdGTpw4YVcUr5-vsI-Gy7KQogf5dmCDMlnZ8F0lUBOtehS4zyyH1IYJJ4XZemxMifB5BXG6gEi7CqwHgIE0atktLmzWQupzuE" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Processor</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{selectedCPU === '9950x' ? 'AMD Ryzen 9 7950X' : 'AMD Ryzen 9 7950X3D'}</p>
                                <p className="text-sm font-medium text-primary">${PRICES.cpu}.00</p>
                            </div>
                            <button className="absolute right-0 top-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        {/* Empty Slots */}
                        {['Cooler', 'Motherboard', 'Memory'].map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-center opacity-50 border-t border-dashed border-slate-300 dark:border-slate-700 pt-3">
                                <div className="w-12 h-12 rounded border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">
                                        {item === 'Cooler' ? 'mode_fan' : item === 'Motherboard' ? 'developer_board' : 'memory'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item}</p>
                                    <p className="text-sm italic text-slate-400 dark:text-slate-500">Not selected</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 bg-slate-50 dark:bg-[#161c28] border-t border-slate-200 dark:border-[#282e39]">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Price</span>
                        <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">${total.toLocaleString()}.00</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="w-full h-12 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98]">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            Add to Cart
                        </button>
                        <div className="flex gap-3">
                            <button className="flex-1 h-10 rounded-lg bg-slate-200 dark:bg-[#282e39] hover:bg-slate-300 dark:hover:bg-[#353c4a] text-slate-700 dark:text-white font-semibold text-sm transition-colors">
                                Save Build
                            </button>
                            <button className="flex-1 h-10 rounded-lg bg-slate-200 dark:bg-[#282e39] hover:bg-slate-300 dark:hover:bg-[#353c4a] text-slate-700 dark:text-white font-semibold text-sm transition-colors">
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
