import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useProduct, useProducts } from '../hooks/useProducts';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { product, loading, error } = useProduct(id);
  const { products: related } = useProducts(product?.series);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const discount = product?.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  // Loading state
  if (loading) return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
        <div className="bg-gray-200 rounded-2xl aspect-square" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );

  // Error state
  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="text-5xl mb-4">😕</div>
      <h2 className="text-xl font-bold text-ink mb-2">Product not found</h2>
      <button onClick={() => navigate('/')} className="mt-4 bg-ink text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
        Back to Home
      </button>
    </div>
  );

  const images = [product.img, product.img, product.img];
  const relatedProducts = related.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <button onClick={() => navigate(`/category/${product.series}`)} className="hover:text-ink transition-colors">{product.series}</button>
        <span>›</span>
        <span className="text-ink font-medium">{product.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT — Image gallery */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === i ? 'border-ink' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Product info */}
          <div className="flex flex-col">
            <div className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-2">{product.series}</div>
            <h1 className="text-2xl font-bold text-ink leading-snug mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <span className="text-xs text-gray-400">4.8 (124 reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl font-black text-ink">₹{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">{discount}% OFF</span>
                </>
              )}
            </div>

            {product.badge && (
              <div className="mb-5">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${product.badgeColor}`}>{product.badge}</span>
              </div>
            )}

            {/* Stock warning */}
            {product.stock < 10 && product.stock > 0 && (
              <div className="bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold px-4 py-2 rounded-xl mb-4">
                ⚠️ Only {product.stock} left in stock!
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-2 rounded-xl mb-4">
                ❌ Out of Stock
              </div>
            )}

            <div className="border-t border-gray-100 mb-5" />

            {/* Quantity */}
            <div className="mb-5">
              <label className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-2 block">Quantity</label>
              <div className="flex items-center border border-gray-200 rounded-xl w-fit overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg font-medium">−</button>
                <span className="w-12 text-center text-sm font-bold text-ink">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock || 99, q + 1))} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg font-medium">+</button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  added ? 'bg-green-600 text-white' :
                  product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                  'bg-ink text-white hover:bg-gray-800'
                }`}
              >
                {added ? '✓ Added to Bag!' : product.stock === 0 ? 'Out of Stock' : `Add to Bag — ₹${(product.price * qty).toLocaleString('en-IN')}`}
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl text-xl hover:border-red-400 hover:text-red-400 transition-colors">♡</button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[{ icon: '🚀', text: 'Ships in 24h' }, { icon: '📦', text: 'Free over ₹999' }, { icon: '🔄', text: '14-day return' }].map(t => (
                <div key={t.text} className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-3">
                  <span className="text-xl mb-1">{t.icon}</span>
                  <span className="text-[10px] font-semibold text-gray-500">{t.text}</span>
                </div>
              ))}
            </div>

            {/* Pincode check */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📍</span>
              <div>
                <span className="font-semibold text-ink">Check delivery time — </span>
                Enter your pincode to check estimated delivery.
                <div className="flex gap-2 mt-2">
                  <input type="text" placeholder="Enter pincode" maxLength={6} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-ink transition-colors w-36" />
                  <button className="bg-ink text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors">Check</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex border-b border-gray-200 gap-1 mb-6">
            {['description', 'shipping', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-ink text-ink' : 'border-transparent text-gray-400 hover:text-ink'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="text-sm text-gray-600 leading-relaxed max-w-2xl space-y-3">
              <p>{product.description || `Premium quality collectible from the ${product.series} series. Handcrafted with exceptional attention to detail.`}</p>
              <ul className="space-y-1.5 mt-4">
                {['High-quality PVC material', 'Detailed paint finish', 'Sturdy display base included', 'Approx. 25cm height', 'Official licensed merchandise'].map(f => (
                  <li key={f} className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span><span>{f}</span></li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {[
                { icon: '🚀', title: 'Standard Shipping', desc: '3-5 business days · ₹99\nFree on orders above ₹999' },
                { icon: '⚡', title: 'Express Shipping', desc: '1-2 business days · ₹199\nAvailable in metro cities' },
                { icon: '🔄', title: 'Easy Returns', desc: '14-day return (video required)' },
                { icon: '📦', title: 'Packaging', desc: 'Bubble wrapped & boxed\nSafe delivery guaranteed' },
              ].map(item => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-ink mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500 whitespace-pre-line">{item.desc}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-5 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-black text-ink" style={{ fontFamily: 'Playfair Display, serif' }}>4.8</div>
                  <div className="flex text-amber-400 text-lg justify-center mt-1">★★★★★</div>
                  <div className="text-xs text-gray-400 mt-1">124 reviews</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 w-3">{star}</span>
                      <span className="text-amber-400">★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : '1%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {[
                { name: 'Arjun K.', rating: 5, date: '2 days ago', text: 'Absolutely love this figure! Quality is insane for the price.' },
                { name: 'Priya S.', rating: 5, date: '1 week ago', text: 'Got this as a gift for my brother and he went crazy over it!' },
                { name: 'Rahul M.', rating: 4, date: '2 weeks ago', text: 'Great quality, looks exactly like the photos. Fast delivery too!' },
              ].map((review, i) => (
                <div key={i} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">{review.name[0]}</div>
                      <div>
                        <div className="text-sm font-semibold text-ink">{review.name}</div>
                        <div className="text-[10px] text-gray-400">{review.date}</div>
                      </div>
                    </div>
                    <div className="text-amber-400 text-xs">{'★'.repeat(review.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-ink mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
              More from {product.series}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer group">
                  <div className="rounded-xl overflow-hidden bg-gray-100 mb-2" style={{ aspectRatio: '0.78' }}>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-0.5">{p.series}</div>
                  <div className="text-sm font-semibold text-ink mb-1 leading-snug">{p.name}</div>
                  <div className="text-sm font-bold text-ink">₹{p.price.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
