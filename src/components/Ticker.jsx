import React from 'react';
import { TICKER_ITEMS } from '../pages/data';

export default function Ticker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-ink text-white py-2 overflow-hidden whitespace-nowrap select-none">
      <div className="ticker-track inline-block text-xs tracking-wide">
        {repeated.map((item, i) => (
          <span key={i} className="mx-10">
            <strong className="text-gold mr-2">{item.label}</strong>
            <span className="text-gray-400">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
