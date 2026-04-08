import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from './CartContext';

const SORT_OPTIONS = [
  { label: 'Most Relevant', value: 'relevant' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const [input, setInput] = useState(query);
  const [products, setProducts] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('relevant');
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [addedId, setAddedId] = useState(null);

  // Fetch all series for filter panel
  useEffect(() => {
    supabase.from('products').select('series').then(({ data }) => {
      if (data) setAllSeries([...new Set(data.map(p => p.series))]);
    });
  }, []);

  // Fetch products when query/sort changes
  useEffect(() => {
    if (query) fetchResults();
  }, [query, sort]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      let q = supabase.from('products').select('*');

      // Search by name or series
      if (query) {
        q = q.or(`name.ilike.%${query}%,series.ilike.%${query}%`);
      }

      if (sort === 'price_asc') q = q.order('price', { ascending: true });
      else if (sort === 'price_desc') q = q.order('price', { ascending: false });

      const { data, error } = await q;
      if (error) throw error;

      setProducts((data || []).map(p => ({
        id: p.id, name: p.name, series: p.series,
        price: p.price, oldPrice: p.old_price,
        badge: p.badge, badgeColor: p.badge_color,
        img: p.img, stock: p.stock,
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setSearchParams({ q: input.trim() });
  };

  const toggleSeries = (s) => setSelectedSeries(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const clearFilters = () => { setSelectedSeries([]); setPriceRange('all'); setSort('relevant'); };
  const hasFilters = selectedSeries.length > 0 || priceRange !== 'all';

  // Client-side filter by series + price (after Supabase fetch)
  let filtered = products;
  if (selectedSeries.length > 0) filtered = filtered.filter(p => selectedSeries.includes(p.series));
  if (priceRange === 'under500') filtered = filtered.filter(p => p.price < 500);
  if (priceRange === '500to1000') filtered = filtered.filter(p => p.price >= 500 && p.price <= 1000);
  if (priceRange === '1000to2500') filtered = filtered.filter(p => p.price > 1000 && p.price <= 2500);
  if (priceRange === 'above2500') filtered = filtered.filter(p => p.price > 2500);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-ink focus-within:bg-white transition-all">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input autoFocus value={input} onChange={e => setInput(e.target.value)} placeholder="Search for anime, figures, series..." className="flex-1 bg-transparent outline-none text-sm text-ink placeholder-gray-400" />
              {input && <button type="button" onClick={() => { setInput(''); setSearchParams({}); }} className="text-gray-400 hover:text-ink text-lg leading-none">✕</button>}
            </div>
            <button type="submit" className="bg-ink text-white px-6 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">Search</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Demon Slayer', 'Naruto', 'One Piece', 'Gojo', 'Figurines', 'Sale'].map(tag => (
              <button key={tag} type="button" onClick={() => { setInput(tag); setSearchParams({ q: tag }); }} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors">{tag}</button>
            ))}
          </div>
        </form>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters */}
          <aside className="w-52 flex-shrink-0 hidden md:block">
            <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-ink">Filters</h3>
                {hasFilters && <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Clear all</button>}
              </div>
              <div className="mb-5">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-3">Series</p>
                <div className="space-y-2">
                  {allSeries.map(s => (
                    <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" checked={selectedSeries.includes(s)} onChange={() => toggleSeries(s)} className="accent-ink w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600 group-hover:text-ink transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-3">Price Range</p>
                <div className="space-y-2">
                  {[{ label: 'All Prices', value: 'all' }, { label: 'Under ₹500', value: 'under500' }, { label: '₹500–₹1,000', value: '500to1000' }, { label: '₹1,000–₹2,500', value: '1000to2500' }, { label: 'Above ₹2,500', value: 'above2500' }].map(opt => (
                    <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" name="price" value={opt.value} checked={priceRange === opt.value} onChange={() => setPriceRange(opt.value)} className="accent-ink w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600 group-hover:text-ink transition-colors">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p className="text-sm text-gray-500">
                {query ? <><span className="font-bold text-ink">{filtered.length}</span> results for "<span className="font-bold text-ink">{query}</span>"</> : <span className="text-gray-400">Enter a search term above</span>}
              </p>
              <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-ink bg-white">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Active filter pills */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSeries.map(s => (
                  <span key={s} className="flex items-center gap-1.5 bg-ink text-white text-xs px-3 py-1 rounded-full">
                    {s} <button onClick={() => toggleSeries(s)} className="hover:text-gray-300">✕</button>
                  </span>
                ))}
                {priceRange !== 'all' && (
                  <span className="flex items-center gap-1.5 bg-ink text-white text-xs px-3 py-1 rounded-full">
                    {priceRange === 'under500' ? 'Under ₹500' : priceRange === '500to1000' ? '₹500–₹1,000' : priceRange === '1000to2500' ? '₹1,000–₹2,500' : 'Above ₹2,500'}
                    <button onClick={() => setPriceRange('all')} className="hover:text-gray-300">✕</button>
                  </span>
                )}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-200" style={{ aspectRatio: '1' }} />
                    <div className="p-3 space-y-2"><div className="h-3 bg-gray-200 rounded w-1/3" /><div className="h-4 bg-gray-200 rounded" /><div className="h-4 bg-gray-200 rounded w-1/2" /></div>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {!loading && query && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-ink mb-2">No results found</h3>
                <p className="text-sm text-gray-400 mb-6">Nothing found for "<strong>{query}</strong>"</p>
                <div className="flex gap-3">
                  <button onClick={clearFilters} className="border border-gray-200 text-ink px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-ink transition-colors">Clear Filters</button>
                  <button onClick={() => navigate('/')} className="bg-ink text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">Back to Home</button>
                </div>
              </div>
            )}

            {/* No query yet */}
            {!loading && !query && (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-ink mb-2">Search for anything</h3>
                <p className="text-sm text-gray-400">Try "Naruto", "Demon Slayer figures", or "Sale"</p>
              </div>
            )}

            {/* Results grid */}
            {!loading && filtered.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(product => {
                  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
                  return (
                    <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '1' }}>
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                        {product.badge && <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${product.badgeColor}`}>{product.badge}</span>}
                        <button onClick={(e) => handleAdd(e, product)} className={`absolute bottom-2 left-2 right-2 text-xs font-bold py-2 rounded-lg border-none transition-all duration-200 ${addedId === product.id ? 'opacity-100 translate-y-0 bg-green-600 text-white' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 bg-white/95 text-ink hover:bg-ink hover:text-white'}`}>
                          {addedId === product.id ? '✓ Added!' : '+ Add to Bag'}
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="text-[9px] font-bold tracking-[2px] uppercase text-gray-400 mb-0.5">{product.series}</div>
                        <div className="text-xs font-semibold text-ink mb-1.5 leading-snug line-clamp-2">{product.name}</div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-ink">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.oldPrice && <><span className="text-xs text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span><span className="text-[10px] font-semibold text-green-600">{discount}% off</span></>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
