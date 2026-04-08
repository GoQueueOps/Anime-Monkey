import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PromoBanners() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6 pb-10">

      {/* Promo 1 */}
      <div
        className="relative rounded-2xl overflow-hidden min-h-[170px] flex items-center px-9 py-8 cursor-pointer group"
        style={{ background: 'linear-gradient(130deg, #1a1a2e 0%, #2d1b69 100%)' }}
        onClick={() => navigate('/search')}
      >
        <div aria-hidden="true" className="absolute right-5 bottom-[-12px] text-[110px] leading-none opacity-[0.07] select-none pointer-events-none">🐵</div>
        <div className="relative z-10">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-white/40 mb-2">First Order Offer</div>
          <div className="text-2xl font-bold text-white leading-snug mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            10% Off<br />Your First Drop
          </div>
          <div className="inline-block text-sm font-bold tracking-[3px] border border-dashed border-white/30 rounded-md px-4 py-2 text-white/80 mb-4">
            MONKEY10
          </div>
          <br />
          <button
            onClick={(e) => { e.stopPropagation(); navigate('/search'); }}
            className="inline-flex items-center gap-2 bg-white/12 hover:bg-white/22 text-white text-xs font-semibold border border-white/20 rounded-lg px-5 py-2.5 transition-colors"
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* Promo 2 */}
      <div
        className="relative rounded-2xl overflow-hidden min-h-[170px] flex items-center px-9 py-8 cursor-pointer group"
        style={{ background: 'linear-gradient(130deg, #1c1208 0%, #7a4000 100%)' }}
        onClick={() => navigate('/search')}
      >
        <div aria-hidden="true" className="absolute right-5 bottom-[-12px] text-[110px] leading-none opacity-[0.07] select-none pointer-events-none">📦</div>
        <div className="relative z-10">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-white/40 mb-2">Always On</div>
          <div className="text-2xl font-bold text-white leading-snug mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            Free Shipping<br />Above ₹999
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('/search'); }}
            className="inline-flex items-center gap-2 bg-white/12 hover:bg-white/22 text-white text-xs font-semibold border border-white/20 rounded-lg px-5 py-2.5 transition-colors"
          >
            Explore All →
          </button>
        </div>
      </div>
    </div>
  );
}
