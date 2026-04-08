import React from 'react';
import logo from '../assets/logo.png';

export default function Footer() {

  const go = (path) => { window.location.href = path; };

  return (
    <footer className="bg-[#0e0e0e] text-white">

      {/* Ships across India banner */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-center gap-3">
        <span className="text-lg">🇮🇳</span>
        <p className="text-sm font-semibold text-gray-300 tracking-wide">
          Proudly shipping across India — from Kashmir to Kanyakumari
        </p>
        <span className="text-lg">🚀</span>
      </div>

      <div className="px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="AnimeMonkey" className="h-12 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-2 max-w-xs">
              Your one-stop destination for premium anime merch, figures, cosplay & collectibles.
            </p>
            <p className="text-sm font-semibold text-gray-300 mb-6">
              Where Every Fan Finds Their Universe. 🐵
            </p>
            <div className="space-y-2 mb-6">
              <a href="mailto:animemonkeyyy@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <span>✉️</span> animemonkeyyy@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>📍</span> India
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://instagram.com/animemonkey" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a href="https://facebook.com/animemonkey" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] uppercase text-gray-500 mb-5">Quick Links</h3>
            <div className="space-y-3">
              {[
                { label: 'New Arrivals', path: '/category/New Arrivals' },
                { label: 'Best Sellers', path: '/category/Best Sellers' },
                { label: 'Sale', path: '/category/Sale 🔥' },
                { label: 'All Anime', path: '/category/Anime' },
                { label: 'Western', path: '/category/Western' },
              ].map(link => (
                <button key={link.label} onClick={() => go(link.path)}
                  className="block text-sm text-gray-500 hover:text-white transition-colors text-left">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] uppercase text-gray-500 mb-5">Help & Support</h3>
            <div className="space-y-3">
              <button onClick={() => window.open('https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx', '_blank')}
                className="block text-sm text-gray-500 hover:text-white transition-colors text-left">Track Order</button>
              <button onClick={() => go('/shipping-policy')}
                className="block text-sm text-gray-500 hover:text-white transition-colors text-left">Shipping Policy</button>
              <button onClick={() => go('/returns')}
                className="block text-sm text-gray-500 hover:text-white transition-colors text-left">Returns & Refunds</button>
              <button onClick={() => go('/faq')}
                className="block text-sm text-gray-500 hover:text-white transition-colors text-left">FAQ</button>
              <button onClick={() => go('/contact')}
                className="block text-sm text-gray-500 hover:text-white transition-colors text-left">Contact Us</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© 2025 AnimeMonkey. All rights reserved.</p>
          <p>Fan merch — not official unless explicitly stated.</p>
          <div className="flex gap-4">
            <button onClick={() => go('/privacy-policy')} className="hover:text-gray-400 transition-colors">Privacy Policy</button>
            <button onClick={() => go('/terms')} className="hover:text-gray-400 transition-colors">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
