import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function IntelCustomBuild() {
    const [selectedCPU, setSelectedCPU] = useState('i9'); // 'i9' | 'i7'

    // Pricing Mock
    const PRICES = {
        cpu: selectedCPU === 'i9' ? 599 : 409,
        gpu: 999,
        motherboard: 489,
        ram: 229,
        storage: 249,
        cooling: 149,
        psu: 189
    };

    const total = Object.values(PRICES).reduce((a, b) => a + b, 0);

    return (
        <div className="flex-1">
            {/* Hero Section */}
            <div className="relative w-full h-[400px] bg-background-dark overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGe43FZBGgptbbh_rZhJl11M9aj4TD_-dzON3CCFFcYyBs9qA7DCSzGhvLYYBj0XTVAIIHkxOM2OdUF0M03joKmg0Rs2InioU5jEplwL2hM74JRvWFIOZ9aYJjwWarkLdhBWcdRXfCZdlFV9-gekHrWKBfIlkL9mNw-mnar6rt1PrsFBcrNzfN1MrAP-ffTtdLx1ATKoD04wi7ASL_vWKxgJUHyvz0y8GyKZhmZGGLZWr5jJ-MeUX1S1GfknAUNwGt6Z1LsCa087Q')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider border border-primary/30">Configurator</span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10">14th Gen Ready</span>
                    </div>
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] max-w-2xl mb-4">
                        Unleash Performance
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-normal max-w-xl">
                        Customize your ultimate rig with the latest Intel® Core™ i9-14900K Series processors. Precision engineered for gaming and creation.
                    </p>
                </div>
            </div>

            {/* Configuration Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

                    {/* Left Column: Configurator */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Header & Filters */}
                        <div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <h2 className="text-white text-2xl font-bold">System Configuration</h2>
                                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                    <button className="whitespace-nowrap px-4 py-2 rounded-full bg-primary text-white text-sm font-medium shadow-[0_0_15px_rgba(19,91,236,0.5)]">Intel Core i9</button>
                                    <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-dark border border-border-dark text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium">Intel Core i7</button>
                                </div>
                            </div>
                        </div>

                        {/* Accordions List */}
                        <div className="flex flex-col gap-4">

                            {/* Step 1: CPU */}
                            <details className="group bg-surface-dark rounded-xl border border-primary/50 overflow-hidden" open>
                                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 bg-surface-dark select-none">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary">
                                            <span className="material-symbols-outlined">memory</span>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Processor (CPU)</h3>
                                            <p className="text-primary text-sm font-medium">{selectedCPU === 'i9' ? 'Intel Core i9-14900K' : 'Intel Core i7-14700K'} Selected</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="p-6 pt-2 border-t border-border-dark bg-background-dark/50">
                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Product Card 1 (i9) */}
                                        <label
                                            className={`relative flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-surface-dark border-2 cursor-pointer transition-colors ${selectedCPU === 'i9' ? 'border-primary' : 'border-border-dark hover:border-gray-500'}`}
                                            onClick={() => setSelectedCPU('i9')}
                                        >
                                            <input checked={selectedCPU === 'i9'} className="peer sr-only" name="cpu" type="radio" readOnly />
                                            <div className={`absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${selectedCPU === 'i9' ? 'border-primary bg-primary' : 'border-border-dark'}`}>
                                                {selectedCPU === 'i9' && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
                                            </div>
                                            <div className="w-24 h-24 shrink-0 rounded bg-white p-2 flex items-center justify-center">
                                                <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4XeXh-3l3RlK6KDuHReSj2vVHqPJi9P47VcE8OE8vIMoOJEDvdGPyo0WiVXGiamRh3YdV2X0ZMk5cZikBOnYX6cHyWCEg-JDbJM_oN5fLP9-ZAQCf3QwMkn4JforkFrtaMBYu4tUupMltKrdSWt9ZrO7kVAzuCCqhhDOeT9zNS4EQAksy-JLr8zD5CwcOPZcRDthEO_kcp6_-UyQffjvH4JOqaleYlTT6L2NecZzEgvHNKzgoACJpje62Y85ND1mynPuXY88futk')", backgroundSize: '60%' }}></div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-start pr-10">
                                                    <h4 className="text-white font-bold text-lg">Intel® Core™ i9-14900K</h4>
                                                    <span className="text-white font-bold text-lg tabular-nums">$599.00</span>
                                                </div>
                                                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-400 font-medium">
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">speed</span> 6.0 GHz Max</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">grid_view</span> 24 Cores</span>
                                                </div>
                                            </div>
                                        </label>

                                        {/* Product Card 2 (i7) */}
                                        <label
                                            className={`relative flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-surface-dark border-2 cursor-pointer transition-colors ${selectedCPU === 'i7' ? 'border-primary' : 'border-border-dark hover:border-gray-500'}`}
                                            onClick={() => setSelectedCPU('i7')}
                                        >
                                            <input checked={selectedCPU === 'i7'} className="peer sr-only" name="cpu" type="radio" readOnly />
                                            <div className={`absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${selectedCPU === 'i7' ? 'border-primary bg-primary' : 'border-border-dark'}`}>
                                                {selectedCPU === 'i7' && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
                                            </div>
                                            <div className="w-24 h-24 shrink-0 rounded bg-white p-2 flex items-center justify-center opacity-80">
                                                <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBImLpvth7JKlr3FUVwGiBGTAnxqhBNhuCNC04x5fpyLqwTe80dqlIYtRVzVlPiT9-1N1E1CLCXGscCE_fphdMAjIB_uHo5DSSaUNwI3X66kK-sfUgSEQi-1j6PaXCAPg_bJpf85diftP0dacGIhdhYUF9xxfm-BfxFzhFHP8MWCqpL8pSd7cqXASrBdVU_J9KqjQCZGZeZUT3YqSnq5qG6S9APXt2sS3NbJBpwQAtEoaD--JcVJRtKIMvlL6G8LKfKpdxGEc3xpbg')", backgroundSize: '60%' }}></div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-start pr-10">
                                                    <h4 className="text-white font-bold text-lg">Intel® Core™ i7-14700K</h4>
                                                    <span className="text-white font-bold text-lg tabular-nums">$409.00</span>
                                                </div>
                                                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-400 font-medium">
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">speed</span> 5.6 GHz Max</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">grid_view</span> 20 Cores</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </details>

                            {/* Step 2: GPU (Collapsed) */}
                            <details className="group bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
                                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 bg-surface-dark hover:bg-[#232732] transition-colors select-none">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded bg-gray-700 text-gray-300">
                                            <span className="material-symbols-outlined">videogame_asset</span>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Graphics Card (GPU)</h3>
                                            <p className="text-gray-400 text-sm font-medium">NVIDIA RTX 4080 Super Selected</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="p-6 pt-2 border-t border-border-dark bg-background-dark/50">
                                    <p className="text-gray-400">Expand to view graphics card options.</p>
                                </div>
                            </details>

                            {/* Step 3: Motherboard */}
                            <details className="group bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
                                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 bg-surface-dark hover:bg-[#232732] transition-colors select-none">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded bg-gray-700 text-gray-300">
                                            <span className="material-symbols-outlined">developer_board</span>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Motherboard</h3>
                                            <p className="text-gray-400 text-sm font-medium">ASUS ROG Maximus Z790</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                            </details>

                        </div>
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 rounded-xl border border-border-dark bg-surface-dark p-6 shadow-2xl">
                            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">description</span>
                                Rig Sheet
                            </h3>

                            {/* Component Summary List */}
                            <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-gray-400">
                                        {selectedCPU === 'i9' ? 'Core i9-14900K' : 'Core i7-14700K'}
                                    </span>
                                    <span className="text-white font-medium tabular-nums">${PRICES.cpu}.00</span>
                                </div>
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-gray-400">RTX 4080 Super</span>
                                    <span className="text-white font-medium tabular-nums">${PRICES.gpu}.00</span>
                                </div>
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-gray-400">ROG Maximus Z790</span>
                                    <span className="text-white font-medium tabular-nums">${PRICES.motherboard}.00</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-border-dark w-full mb-6"></div>

                            {/* Compatibility & Power */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                                    <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
                                    <span className="text-emerald-500 text-xs font-bold uppercase">Compatible</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400 text-sm">
                                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                                    <span>~780W Est.</span>
                                </div>
                            </div>

                            {/* Total & Action */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 text-sm font-medium">Estimated Total</span>
                                    <span className="text-white text-3xl font-bold tracking-tight tabular-nums">${total.toLocaleString()}.00</span>
                                </div>
                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-white font-bold text-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(19,91,236,0.3)] hover:shadow-[0_0_30px_rgba(19,91,236,0.5)]">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
