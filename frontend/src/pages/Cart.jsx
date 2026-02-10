import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, loading } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.18; // 18% Tax assumption
  const total = subtotal + tax;

  if (loading && items.length === 0) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-20">
        <div className="text-xl text-primary font-bold">Loading Cart...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 w-full px-4 py-8 lg:px-10 lg:py-12 flex flex-col items-center justify-center gap-6">
        <div className="size-24 rounded-full bg-slate-100 dark:bg-[#161b22] flex items-center justify-center text-slate-300 dark:text-slate-600">
          <span className="material-symbols-outlined text-[48px]">shopping_cart_off</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Cart is Empty</h1>
        <p className="text-slate-500 dark:text-slate-400">Looks like you haven't added any high-performance gear yet.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">Start Building</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full px-4 py-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">Your Cart</h1>
          <p className="text-slate-500 dark:text-slate-400">You have {getTotalItems()} items in your cart ready for checkout.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Cart Items List */}
            <div className="flex flex-col gap-4">
              {/* Header Row (Hidden on mobile) */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 dark:border-[#282e39] text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <div className="col-span-6 pl-4">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right pr-4">Price</div>
              </div>

              {items.map((item) => (
                <div key={item.product?._id} className="group relative flex flex-col md:grid md:grid-cols-12 items-center gap-4 rounded-xl bg-surface-light dark:bg-[#1a202c]/50 border border-gray-200 dark:border-[#282e39] p-4 transition-all hover:border-primary/50">
                  {/* Product Info */}
                  <div className="col-span-6 w-full flex items-center gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-[#282e39]">
                      <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${item.product?.images?.[0]}")` }}></div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{item.product?.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{item.product?.shortDescription}</p>
                      <p className="text-xs text-green-500 font-medium flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> In Stock
                      </p>
                    </div>
                  </div>
                  {/* Quantity */}
                  <div className="col-span-3 w-full flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-sm text-slate-500">Qty:</span>
                    <div className="flex items-center rounded-lg border border-gray-200 dark:border-[#282e39] bg-gray-50 dark:bg-[#111318]">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <input className="h-9 w-12 bg-transparent text-center text-sm font-medium outline-none border-none focus:ring-0 p-0 text-slate-900 dark:text-white" type="text" value={item.quantity} readOnly />
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>
                  {/* Price & Actions */}
                  <div className="col-span-3 w-full flex justify-between md:justify-end items-center gap-4 pr-0 md:pr-4">
                    <span className="md:hidden text-sm text-slate-500">Price:</span>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-slate-900 dark:text-white">${((item.product?.finalPrice || 0) / 100).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="absolute top-4 right-4 md:static md:flex text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove Item"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upsell Section (Static for now, but could be dynamic) */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#282e39]">
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Recommended for Your Build</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Rec 1 - Hardcoded Mockup for visual completeness as requested */}
                <div className="flex flex-col gap-3 rounded-lg bg-surface-light dark:bg-[#1a202c]/30 border border-gray-200 dark:border-[#282e39] p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/50 transition-colors">
                  <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-800">
                    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8REUQq88b0acSZYIW4o55Vb4djG9bxzGtniar55ju1mXcgc-aJ8gss4l_xdT3ThYkB1BhAV4oR2QI6W7Su8AiFMVC-IiHQVhHaHtHUiIEu495us0gRevVi3Mvl8DGs60efASkF6AqR49-dZtJFssVIm1gyFqsvYNug75zXY9ccgiq9dz0yhjGJDvkgZ2ZyzAqKiCxcsX2fwE3A8EXKGzboTO8UrgcMo-P6wfxZobw9HeWHSLf450YeV-HFJTjqfQtlL6-CxnUhWU")' }}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Arctic Thermal Paste</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High conductivity</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-sm dark:text-white">$8.99</span>
                    <button className="h-8 w-8 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6 rounded-xl bg-surface-light dark:bg-[#1a202c] p-6 border border-gray-200 dark:border-[#282e39] shadow-xl shadow-black/5">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">Order Summary</h2>
              {/* Line Items */}
              <div className="flex flex-col gap-3 border-b border-gray-200 dark:border-[#282e39] pb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Shipping Estimate</span>
                  <span className="font-medium text-green-500">Free</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Tax (18%)</span>
                  <span className="text-xs text-slate-500 italic">${tax.toLocaleString()}</span>
                </div>
              </div>
              {/* Promo Code */}
              <div className="flex gap-2">
                <input className="w-full flex-1 rounded-lg border-gray-200 dark:border-[#282e39] bg-white dark:bg-[#111318] px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Promo code" type="text" />
                <button className="rounded-lg bg-gray-200 dark:bg-[#282e39] px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3f4756] transition-colors">Apply</button>
              </div>
              {/* Total */}
              <div className="flex items-end justify-between pt-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                <div className="flex flex-col items-end">
                  <span className="font-display text-3xl font-black text-slate-900 dark:text-white tracking-tight">${total.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">USD</span>
                </div>
              </div>
              {/* Main CTA */}
              <button className="group w-full rounded-lg bg-primary py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0">
                Proceed to Checkout
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
              </button>
              {/* Trust Badges */}
              <div className="mt-2 flex flex-col gap-3 items-center text-center">
                {/* ... badges ... */}
                <div className="text-xs text-slate-500">Secure Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
