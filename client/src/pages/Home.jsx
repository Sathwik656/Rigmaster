import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-background-dark py-12 lg:py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl filter"></div>
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl filter"></div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:px-8 relative z-10">
          {/* Text Content */}
          <div className="flex flex-1 flex-col items-start gap-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-[0_0_10px_rgba(19,91,236,0.3)]">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              New RTX 40-Series Builds
            </div>
            <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              FRAME RATES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">WIN GAMES.</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-400">
              Premium custom loops, next-gen GPUs, and distinct cable management. Architect your ultimate machine today with RigMaster certified builds.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link to="/category/prebuilt" className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-[0_0_20px_rgba(19,91,236,0.4)] transition-all hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(19,91,236,0.6)]">
                Shop Prebuilt
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link to="/build/intel" className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40">
                Custom Configurator
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </Link>
            </div>
            {/* Specs Indicators */}
            <div className="mt-8 flex gap-6 border-t border-white/10 pt-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-gray-500">GPU</span>
                <span className="text-lg font-bold text-white">RTX 4090</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-gray-500">CPU</span>
                <span className="text-lg font-bold text-white">i9-14900KS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-gray-500">RAM</span>
                <span className="text-lg font-bold text-white">64GB DDR5</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex flex-1 items-center justify-center">
            <div className="relative z-10 w-full max-w-[600px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <div className="aspect-[4/3] w-full rounded-xl bg-gray-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZuXdLJ-MtqDI38EVOln_xV9GFvuaHzmvCswSqlGzgjb4huxLRSEoj_552QggnhJZM1ZGAdh246HE0akpY3sDdZX-E_T00CQiflD1XEyBJ-SOBeZXcESPQ9t2sLlS0BXYMOYKHkhFih9QDt3RXXkuSFC_ddr4QXCrczEuvUz_vlC9ZC1cimbTBvhb0uvI09eOWPupwGlgptG45mq3QVpDOtgEO7yAfE623uJjr5VpQCprAtzeI11yWeUUYGSFrTjvdb2rFd_XviuE')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
              </div>
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/10 bg-black/60 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Valkyrie X1 Extreme</p>
                    <p className="text-xs text-primary">Ready to Ship</p>
                  </div>
                  <span className="font-display font-bold text-white">$4,299</span>
                </div>
              </div>
            </div>
            {/* Decorative Elements behind image */}
            <div className="absolute -right-4 top-1/2 h-48 w-1 bg-gradient-to-b from-transparent via-secondary to-transparent"></div>
            <div className="absolute -left-4 top-1/4 h-32 w-1 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="border-t border-white/5 bg-surface-dark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">BROWSE CATEGORIES</h2>
              <p className="mt-2 text-gray-400">Find the right hardware for your setup.</p>
            </div>
            <Link to="/category/all" className="hidden text-sm font-semibold text-primary hover:text-white sm:block">View All Categories →</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <Link to="/category/laptop" className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-900 sm:aspect-[3/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmv9gr2tOCLGnX6j-et4pT9wKqsDYPMzjGMYdQOXBVpf1Vmp_aftsX3o_Q1Hh8WuLfYKlHkzDxgBkst7NZ4Z-eBCSZHATIidgGNT_AROU2rhTXmmqDldzp9Syv2DSu7xsXPh7ddZ99QrjQ4rD7VB0vb8xg9_bhfAmiHNRVA7lZ2GIUKqFYFYbD0OTkyVInT24aKGb-3XTfjD5XK-JRuT-iHNigpx7Kzhj7k4SKuPutut2NuI992PxOkgwLBP35msCK0Q3GzBbR-lM')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Laptops</h3>
                <p className="mt-1 text-sm text-gray-400 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Portable powerhouses</p>
              </div>
            </Link>
            {/* Card 2 */}
            <Link to="/category/prebuilt" className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-900 sm:aspect-[3/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARE3352vqzYqFCUWhcvctRCY0ecG5sa_RIldjXu5vRifMAGl5OfICZtg1Mg2Fwlm9eR6PZDNhOYYHxujCHclCDarAv5YdZvEPiCykUNBCK4BjGFOuibrUGaCJx8hk_34ooHh4SKbMQbrFsW8EjYs5QIQWsDMbOlPZMZt8FHHDa8uMqUsOfq4oMw06XLqG4wGr3SQ1KjVdWvc5evNN-6wNz4vUlI0cNb43IbJIONqtssOzbfnnIjmXlXRWV5KjzQwg8BmddC2tTtTo')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Desktops</h3>
                <p className="mt-1 text-sm text-gray-400 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Ultimate performance</p>
              </div>
            </Link>
            {/* Card 3 */}
            <Link to="/category/accessory" className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-900 sm:aspect-[3/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIbeUs6mdQdOFn4dL1Wyl-mgCVROa6VG7JD16ofYY6f9ZwSjVVCz5Ctwnbj1ze9vjVQnN-Jtx5hUJ3-3aQA4AG9HatLRj_KhA2zAlbbBQBzT_v8DTkC8P4bizOSPgjRTlN2jMrSthvUii0Y6TzXbR3-FdDv3ORBt8xxVPiOSBrEeVTD_tOyM_DFccs-3S7j0YzN0pxGnIj1OlkGt-KY5elVrka1_abAyC24l-Rcr8ZIMEEYu9mOgc_To2RJUVM_LEg1-PfLFdSrj0')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">Peripherals</h3>
                <p className="mt-1 text-sm text-gray-400 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Keyboards, mice & audio</p>
              </div>
            </Link>
            {/* Card 4 */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-900 sm:aspect-[3/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjn62mOHvHGECEW0LpZy41Ht_phSw_nF7Vh7dU6Ejcaix8m2GguBeZNFA2B5SyFhB53F_q51NQV3v3JvxLoKm1tmSwAIjH1wKvjCgeJLGlje7YnfnVLM8CTCI1zM68i4_ZZyzNex0D-CQmNUbgBTf7RahdS8ccrcDP0NRcr3HYh72-rUcD7Xh36-Gew1VPg90hTqHaSvI8AT90LaSwP2p8syp6v0DRULKbJTRX9NcQbMKhyrgCkP1qH1ZgNrEpg16-cFMu090w_YA')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">Components</h3>
                <p className="mt-1 text-sm text-gray-400 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Upgrade your rig</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path (Split Section) */}
      <section className="relative w-full">
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          {/* Intel Side */}
          <div className="group relative flex min-h-[500px] flex-col justify-center overflow-hidden bg-blue-950 px-8 py-16 md:px-16">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1624705002806-5d72df90c317?q=80&w=2832&auto=format&fit=crop')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
            <div className="relative z-10">
              <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-blue-300">Team Blue</span>
              <h2 className="mb-4 text-4xl font-black uppercase italic tracking-tighter text-white md:text-5xl">Intel Core<br />Extreme</h2>
              <p className="mb-8 max-w-sm text-blue-100">Maximize your clock speeds with the latest 14th Gen processors. Optimized for pure gaming dominance.</p>
              <Link to="/build/intel" className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-blue-900 transition-colors hover:bg-blue-50">
                Build Intel
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </Link>
            </div>
          </div>
          {/* AMD Side */}
          <div className="group relative flex min-h-[500px] flex-col justify-center overflow-hidden bg-red-950 px-8 py-16 md:px-16 text-right items-end">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-red-900/80 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-end">
              <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-red-300">Team Red</span>
              <h2 className="mb-4 text-4xl font-black uppercase italic tracking-tighter text-white md:text-5xl">Ryzen<br />Threadripper</h2>
              <p className="mb-8 max-w-sm text-red-100">Unleash multi-core fury. Perfect for streamers, creators, and heavy multitasking workloads.</p>
              <Link to="/build/amd" className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-red-900 transition-colors hover:bg-red-50">
                Build AMD
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Divider icon */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 hidden md:flex h-16 w-16 items-center justify-center rounded-full border-4 border-background-dark bg-background-dark text-white shadow-xl">
          <span className="font-bold italic text-xl">VS</span>
        </div>
      </section>

      {/* Why Us Banner */}
      <section className="border-y border-white/5 bg-white/5 py-12 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <h3 className="text-lg font-bold text-white">Expertly Tuned</h3>
            <p className="text-sm text-gray-400">Every rig is stress-tested and optimized for maximum frame rates before shipping.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined text-[32px]">bolt</span>
            </div>
            <h3 className="text-lg font-bold text-white">Fast Assembly</h3>
            <p className="text-sm text-gray-400">Get your custom build in as little as 5 days. Prebuilts ship within 24 hours.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <span className="material-symbols-outlined text-[32px]">support_agent</span>
            </div>
            <h3 className="text-lg font-bold text-white">Lifetime Support</h3>
            <p className="text-sm text-gray-400">US-based technical support team ready to help you troubleshoot any issue.</p>
          </div>
        </div>
      </section>
    </>
  );
}
