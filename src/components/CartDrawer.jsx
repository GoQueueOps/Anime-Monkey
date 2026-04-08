import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext';

export default function CartDrawer() {
  const { cartItems, cartCount, cartTotal, cartOpen, setCartOpen, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 999;
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  const goToCheckout = () => {
    setCartOpen(false);
    setTimeout(() => navigate('/checkout'), 500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] flex flex-col shadow-2xl transition-transform duration-500 ease-in-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-ink">Your Bag</h2>
            <p className="text-xs text-gray-400 mt-0.5">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Free shipping progress */}
        {cartTotal > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
            {remaining > 0 ? (
              <>
                <p className="text-xs text-gray-600 mb-2">
                  Add <span className="font-bold text-ink">₹{remaining.toLocaleString('en-IN')}</span> more for free shipping!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-xs font-semibold text-green-600 flex items-center gap-1.5">
                🎉 You've unlocked free shipping!
              </p>
            )}
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛍</div>
              <h3 className="text-base font-semibold text-ink mb-2">Your bag is empty</h3>
              <p className="text-sm text-gray-400 mb-6">Add some anime merch and come back!</p>
              <button
                onClick={() => setCartOpen(false)}
                className="bg-ink text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                {/* Product image */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-400 mb-0.5">{item.series}</p>
                  <p className="text-sm font-semibold text-ink leading-snug mb-2 line-clamp-2">{item.name}</p>

                  <div className="flex items-center justify-between">
                    {/* Qty stepper */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-base font-medium"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-ink">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-base font-medium"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-bold text-ink">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors text-sm mt-0.5"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer — only show if items exist */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-3 bg-white">
            {/* Order summary */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className={cartTotal >= FREE_SHIPPING_THRESHOLD ? 'text-green-600 font-semibold' : ''}>
                  {cartTotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : '₹99'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-ink pt-1 border-t border-gray-100">
                <span>Total</span>
                <span>₹{(cartTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={goToCheckout}
              className="block w-full bg-ink text-white text-center py-3.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout →
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="block w-full text-center text-sm text-gray-400 hover:text-ink transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
