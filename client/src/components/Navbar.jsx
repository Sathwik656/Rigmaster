import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-primary to-secondary text-white shadow-[0_0_15px_rgba(19,91,236,0.5)]">
              <span className="material-symbols-outlined text-[20px]">memory</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">RigMaster</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>

            <div className="relative group h-16 flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors focus:outline-none">
                Categories
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              {/* Dropdown */}
              <div className="absolute top-16 left-0 hidden w-48 rounded-lg border border-white/10 bg-[#161b22] p-2 shadow-xl group-hover:block">
                <Link to="/build/intel" className="block rounded px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary">Intel Systems</Link>
                <Link to="/build/amd" className="block rounded px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-red-500">AMD Systems</Link>
                <Link to="/category/prebuilt" className="block rounded px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Prebuilt PCs</Link>
              </div>
            </div>

            <Link to="/category/prebuilt" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Prebuilt</Link>
            <Link to="/category/laptops" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Laptops</Link>
            <Link to="/category/accessories" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Accessories</Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input
              className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-primary focus:bg-white/10 focus:ring-0 transition-all focus:outline-none"
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-500">search</span>
          </form>

          {/* Cart Icon */}
          <Link to="/cart" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors relative">
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
          </Link>

          {/* User Avatar / Login */}
          {user ? (
            <div className="relative group">
              <button className="h-8 w-8 overflow-hidden rounded-full border border-white/10 bg-gray-800 flex items-center justify-center">
                {/* Placeholder Avatar */}
                <span className="material-symbols-outlined text-gray-400">person</span>
              </button>
              {/* User Dropdown */}
              <div className="absolute top-full right-0 hidden w-48 rounded-lg border border-white/10 bg-[#161b22] p-2 shadow-xl group-hover:block mt-2">
                <div className="px-4 py-2 text-xs text-gray-500 border-b border-white/10 mb-2">
                  Signed in as <br /> <strong className="text-white">{user.name || user.email}</strong>
                </div>
                <Link to="/profile" className="block rounded px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Profile</Link>
                <Link to="/orders" className="block rounded px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Orders</Link>
                <button
                  onClick={logout}
                  className="w-full text-left block rounded px-4 py-2 text-sm text-red-500 hover:bg-white/5"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-white hover:text-primary transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
