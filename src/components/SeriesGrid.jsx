import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERIES } from '../pages/data';

export default function SeriesGrid() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-2xl font-bold text-ink" style={{ fontFamily: 'Playfair Display, serif' }}>
          Browse by Series
        </h2>
        <button className="text-xs font-semibold tracking-wider uppercase text-gray-500 hover:text-ink transition-colors">
          View All Series →
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {SERIES.map(series => (
          <div
            key={series.id}
            onClick={() => navigate(`/category/${series.name}`)}
            className="series-tile text-center group cursor-pointer"
          >
            <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100 mb-2">
              <img
                src={series.img}
                alt={series.name}
                className="series-img w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
            </div>
            <div className="text-xs font-bold text-ink group-hover:text-gray-600 transition-colors">
              {series.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
