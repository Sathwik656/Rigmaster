import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background-dark pt-20 pb-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white shadow-[0_0_10px_rgba(19,91,236,0.5)]">
                <span className="material-symbols-outlined text-[20px]">memory</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">RigMaster</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Forging the ultimate gaming machines for enthusiasts worldwide. We don't just build PCs; we architect experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                {/* SVG Icons omitted for brevity, using text fallback or simple material icons if preferred, but SVG is better. Keeping concise. */}
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <span className="material-symbols-outlined">forum</span>
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Shop</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/category/prebuilt" className="text-sm text-gray-400 hover:text-primary transition-colors">Prebuilt Systems</Link></li>
              <li><Link to="/build/intel" className="text-sm text-gray-400 hover:text-primary transition-colors">Custom Configurator</Link></li>
              <li><Link to="/category/laptop" className="text-sm text-gray-400 hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link to="/category/accessory" className="text-sm text-gray-400 hover:text-primary transition-colors">Components</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Support</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Warranty Info</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Returns & Shipping</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Financing</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Join the Legion</h3>
            <p className="text-sm text-gray-400 mb-4">Sign up for exclusive drops and deals.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your email"
                type="email"
              />
              <button className="h-10 w-full rounded-lg bg-primary text-sm font-bold text-white transition-colors hover:bg-blue-600 shadow-[0_0_15px_rgba(19,91,236,0.3)]" type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-gray-600">© 2026 RigMaster Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-xs text-gray-600 hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs text-gray-600 hover:text-white transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
