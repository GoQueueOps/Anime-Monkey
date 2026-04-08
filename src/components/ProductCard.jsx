import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="product-card group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: '1' }}>
        <img
          src={product.img}
          alt={product.name}
          className="product-img w-full h-full object-cover"
          loading="lazy"
        />
        <div className="product-overlay absolute inset-0 rounded-xl" />

        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-base shadow-sm transition-transform hover:scale-110 border-none"
        >
          {isWishlisted ? <span className="text-red-500">♥</span> : <span className="text-gray-400">♡</span>}
        </button>

        <button
          onClick={handleAdd}
          className={`
            add-to-bag-btn absolute bottom-3 left-3 right-3 z-10
            bg-white/95 backdrop-blur-sm text-ink text-xs font-bold tracking-wide
            py-2.5 rounded-lg border-none
            hover:bg-ink hover:text-white transition-colors duration-150
            ${added ? 'bg-ink text-white opacity-100 translate-y-0' : ''}
          `}
        >
          {added ? '✓ Added!' : '+ Add to Bag'}
        </button>
      </div>

      <div className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">{product.series}</div>
      <div className="text-sm font-semibold text-ink mb-2 leading-snug">{product.name}</div>
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-ink">₹{product.price.toLocaleString('en-IN')}</span>
        {product.oldPrice && (
          <>
            <span className="text-xs text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs font-semibold text-green-600">{discount}% off</span>
          </>
        )}
      </div>
    </div>
  );
}
