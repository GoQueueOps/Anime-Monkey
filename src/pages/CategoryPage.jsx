import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { supabase } from '../lib/supabase';

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];

const WESTERN_SERIES = ['Harry Potter', 'Marvel', 'DC Comics', 'Star Wars', 'Game of Thrones', 'The Boys'];
const MECH_SERIES = ['Gundam', 'Evangelion', 'Transformers'];

export default function CategoryPage() {
  const { series } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [series]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('products').select('*');

      // Apply filter based on what was clicked
      if (series === 'New Arrivals') {
        query = query.eq('badge', 'New');
      } else if (series === 'Best Sellers') {
        query = query.eq('badge', 'Hot');
      } else if (series === 'Sale 🔥') {
        query = query.not('old_price', 'is', null);
      } else if (series === 'Anime') {
        query = query.not('series', 'in', `(${[...WESTERN_SERIES, ...MECH_SERIES].join(',')})`);
      } else if (series === 'Western') {
        query = query.in('series', WESTERN_SERIES);
      } else if (series === 'Collectibles') {
        // show all
      } else if (series === 'Under ₹500') {
        query = query.lt('price', 500);
      } else if (series === '₹500 – ₹1,000') {
        query = query.gte('price', 500).lte('price', 1000);
      } else if (series === '₹1,000 – ₹2,500') {
        query = query.gt('price', 1000).lte('price', 2500);
      } else if (series === '₹2,500+') {
        query = query.gt('price', 2500);
      } else if (series === 'All Anime') {
        // show all
      } else {
        // Filter by exact series name
        query = query.eq('series', series);
      }

      // Sort
      if (sort === 'price_asc') query = query.order('price', { ascending: true });
      else if (sort === 'price_desc') query = query.order('price', { ascending: false });
      else query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      setProducts((data || []).map(p => ({
        id: p.id,
        name: p.name,
        series: p.series,
        price: p.price,
        oldPrice: p.old_price,
        badge: p.badge,
        badgeColor: p.badge_color,
        img: p.img,
        stock: p.stock,
      })));
    } catch (err) {
      console.error('Error fetching:', err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when sort changes
  useEffect(() => { fetchProducts(); }, [sort]);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">{series}</span>
      </div>

      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink" style={{ fontFamily: 'Playfair Display, serif' }}>{series}</h1>
            <p className="text-sm text-gray-400 mt-1">{loading ? 'Loading...' : `${products.length} products found`}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Sort by:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-ink bg-white text-ink">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl mb-3" style={{ aspectRatio: '1' }} />
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-ink mb-2">No products found</h3>
            <p className="text-sm text-gray-400 mb-6">Nothing here yet for <strong>{series}</strong>. Check back soon!</p>
            <button onClick={() => navigate('/')} className="bg-ink text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">Back to Home</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(product => {
              const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
              return (
                <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: '1' }}>
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl" />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>{product.badge}</span>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl">
                        <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">Sold Out</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      disabled={product.stock === 0}
                      className={`absolute bottom-3 left-3 right-3 text-xs font-bold tracking-wide py-2.5 rounded-lg border-none transition-all duration-200
                        ${addedId === product.id ? 'opacity-100 translate-y-0 bg-green-600 text-white' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 bg-white/95 text-ink hover:bg-ink hover:text-white'}`}
                    >
                      {addedId === product.id ? '✓ Added!' : '+ Add to Bag'}
                    </button>
                  </div>
                  <div className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">{product.series}</div>
                  <div className="text-sm font-semibold text-ink mb-2 leading-snug">{product.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-ink">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.oldPrice && <><span className="text-xs text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span><span className="text-xs font-semibold text-green-600">{discount}% off</span></>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
