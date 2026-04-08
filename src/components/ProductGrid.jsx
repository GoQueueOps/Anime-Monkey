import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { FILTER_CHIPS } from '../pages/data';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { products, loading, error } = useProducts();

  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-2xl font-bold text-ink" style={{ fontFamily: 'Playfair Display, serif' }}>
          Featured Drops
        </h2>
        <button className="text-xs font-semibold tracking-wider uppercase text-gray-500 hover:text-ink transition-colors">
          View All →
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_CHIPS.map(chip => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-150
              ${activeFilter === chip
                ? 'bg-ink text-white border-ink'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-ink'
              }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl mb-3" style={{ aspectRatio: '0.78' }} />
              <div className="h-3 bg-gray-200 rounded mb-2 w-1/3" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-12 text-red-500 text-sm">
          Failed to load products. Check your Supabase connection.
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
