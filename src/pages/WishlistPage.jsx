import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { PRODUCTS } from './data';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
          <span>›</span>
          <span className="text-ink font-medium">Wishlist</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ink" style={{ fontFamily: 'Playfair Display, serif' }}>
              My Wishlist
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistProducts.forEach(p => addToCart(p));
              }}
              className="bg-ink text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Add All to Bag
            </button>
          )}
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Empty state */}
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-5">
              🤍
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-gray-400 mb-7 max-w-xs">
              Save your favourite anime merch here and come back to them anytime.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-ink text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {wishlistProducts.map(product => {
              const discount = product.oldPrice
                ? Math.round((1 - product.price / product.oldPrice) * 100)
                : null;

              return (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                  {/* Image */}
                  <div
                    className="relative overflow-hidden bg-gray-100 cursor-pointer"
                    style={{ aspectRatio: '0.78' }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Remove from wishlist */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                      title="Remove from wishlist"
                    >
                      ♥
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <div className="text-[9px] font-bold tracking-[2px] uppercase text-gray-400 mb-0.5">
                      {product.series}
                    </div>
                    <div
                      className="text-sm font-semibold text-ink mb-2 leading-snug line-clamp-2 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-sm font-bold text-ink">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.oldPrice && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.oldPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-semibold text-green-600">
                            {discount}% off
                          </span>
                        </>
                      )}
                    </div>

                    {/* Add to bag */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-ink text-white py-2 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
                    >
                      + Add to Bag
                    </button>
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
