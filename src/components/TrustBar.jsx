import React from 'react';
import { TRUST_ITEMS } from '../pages/data';

export default function TrustBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
      {TRUST_ITEMS.map((item, i) => (
        <div
          key={item.title}
          className={`flex items-center gap-3 px-5 py-4 ${i < TRUST_ITEMS.length - 1 ? 'border-r border-gray-200' : ''}`}
        >
          <span className="text-xl flex-shrink-0">{item.icon}</span>
          <div>
            <div className="text-sm font-semibold text-ink">{item.title}</div>
            <div className="text-xs text-gray-400 mt-0.5">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
