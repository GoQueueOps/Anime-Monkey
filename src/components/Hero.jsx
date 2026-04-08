import React from 'react';
import logo from '../assets/logo.png';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f9f8f6] border-b border-gray-200">

      {/* Faint watermark text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="text-[130px] font-black tracking-[16px] uppercase whitespace-nowrap"
          style={{ color: 'rgba(0,0,0,0.028)', fontFamily: 'Playfair Display, serif' }}
        >
          ANIMEMONKEY
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-6">

        {/* Logo — big, centered, premium */}
        <img
          src={logo}
          alt="AnimeMonkey"
          className="h-44 md:h-56 w-auto object-contain mb-2 transition-transform duration-500 hover:scale-[1.02]"
          style={{
            filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.18))',
            maxWidth: '420px',
          }}
        />

        {/* Tagline */}
        <p
          className="text-sm font-bold tracking-[5px] uppercase mt-1 mb-4"
          style={{ color: '#999', fontFamily: 'Playfair Display, serif' }}
        >
        
        </p>

       

        {/* Stats */}
        <div className="flex items-center gap-8 mt-4">
          {[
            { num: '500+', lbl: 'Products' },
            { num: '40+', lbl: 'Series' },
            { num: '24h', lbl: 'Dispatch' },
            { num: '10k+', lbl: 'Happy Fans' },
          ].map(stat => (
            <div key={stat.lbl} className="text-center">
              <div
                className="text-2xl font-black text-ink leading-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {stat.num}
              </div>
              <div className="text-[10px] tracking-[2px] uppercase text-gray-400 mt-1">
                {stat.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
