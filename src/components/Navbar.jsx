import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useCart } from '../pages/CartContext';
import CartDrawer from './CartDrawer';
import { supabase } from '../pages/../lib/supabase';

const NAV_LINKS = [
  { label: 'New Arrivals', hot: false },
  { label: 'Best Sellers', hot: false },
  { label: 'Anime', hot: false },
  { label: 'Western', hot: false },
  { label: 'Collectibles', hot: false },
  { label: 'Sale 🔥', hot: true },
];

export default function Navbar() {
  const { cartCount, setCartOpen, wishlist } = useCart();
  const navigate = useNavigate();
  const [active, setActive] = useState('New Arrivals');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-16 gap-4">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src={logo}
            alt="AnimeMonkey"
            className="h-10 w-auto object-contain"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}
          />
          <div className="leading-tight">
            {/* "ANIME" is dark in the logo, "MONKEY" is pink/magenta — on white bg
                we show the wordmark as text fallback for very small displays */}
            <div className="text-base font-black tracking-tight text-ink hidden sm:block">
              <span className="text-white bg-ink px-1 rounded-sm mr-0.5">ANIME</span>
              <span className="text-[#e91e8c]">MONKEY</span>
            </div>
            <div className="text-[9px] font-semibold tracking-[2px] uppercase text-gray-400 hidden sm:block">
              Anime · Marvel · More
            </div>
          </div>
        </a>

        {/* NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => {
                setActive(link.label);
                navigate(`/category/${link.label}`);
              }}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${active === link.label
                  ? 'bg-gray-100 text-ink'
                  : link.hot
                    ? 'text-red-500 font-semibold hover:bg-red-50'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-ink'
                }
              `}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-gray-400 transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm text-ink placeholder-gray-400 w-36"
            />
          </form>

          {/* Wishlist */}
          <button
            onClick={() => navigate('/wishlist')}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:border-gray-400 transition-colors relative"
          >
            ♡
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            onClick={() => navigate(user ? '/account' : '/auth')}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:border-gray-400 transition-colors relative"
            title={user ? 'My Account' : 'Sign In'}
          >
            {user ? (
              <div className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-xs font-bold">
                {(user.email || 'U')[0].toUpperCase()}
              </div>
            ) : (
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 bg-ink text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-gold text-black text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
