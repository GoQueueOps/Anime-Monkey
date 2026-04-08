import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, total, name, address } = location.state || {};

  const [show, setShow] = useState(false);

  // Animate in on mount
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  // If someone lands here directly without order state, redirect home
  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-5xl mb-4">🤔</div>
        <h2 className="text-xl font-bold text-ink mb-2">No order found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-ink text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const estimatedDelivery = () => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div
        className={`w-full max-w-lg transition-all duration-700 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >

        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          {/* Top green banner */}
          <div className="bg-green-50 border-b border-green-100 px-8 py-8 text-center">
            {/* Animated checkmark */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-800 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Order Placed! 🎉
            </h1>
            <p className="text-sm text-green-600">
              Thank you {name?.split(' ')[0]}! Your anime merch is on its way.
            </p>
          </div>

          {/* Order details */}
          <div className="px-8 py-6 space-y-4">

            {/* Order ID */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <div>
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400">Order ID</p>
                <p className="text-base font-black text-ink mt-0.5">#{orderId}</p>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(orderId)}
                className="text-xs font-semibold text-gray-400 hover:text-ink transition-colors border border-gray-200 rounded-lg px-3 py-1.5"
              >
                Copy
              </button>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Amount Paid</p>
                <p className="text-base font-bold text-ink">₹{total?.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Est. Delivery</p>
                <p className="text-sm font-bold text-ink">{estimatedDelivery()}</p>
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Delivering To</p>
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{address}</p>
            </div>

            {/* Timeline */}
            <div className="pt-2">
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-3">Order Timeline</p>
              <div className="space-y-0">
                {[
                  { label: 'Order Confirmed', sub: 'Just now', done: true },
                  { label: 'Packing', sub: 'Within 12 hours', done: false },
                  { label: 'Shipped', sub: 'Within 24 hours', done: false },
                  { label: 'Out for Delivery', sub: '3-5 business days', done: false },
                  { label: 'Delivered', sub: estimatedDelivery(), done: false },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        step.done ? 'bg-green-500' : 'bg-gray-200'
                      }`}>
                        {step.done ? (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                        )}
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`w-px flex-1 my-1 ${step.done ? 'bg-green-300' : 'bg-gray-200'}`} style={{ minHeight: '20px' }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-semibold ${step.done ? 'text-green-700' : 'text-gray-500'}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-400">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom actions */}
          <div className="px-8 pb-8 space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-ink text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                if (orderId) {
                  window.open(`https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx`, '_blank');
                }
              }}
              className="w-full bg-white text-ink border border-gray-200 py-3 rounded-xl text-sm font-semibold hover:border-ink transition-colors"
            >
              Track My Order
            </button>
          </div>

        </div>

        {/* Help text */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Confirmation sent to your email · Need help?{' '}
          <button className="text-ink font-semibold hover:underline">Contact us</button>
        </p>

      </div>
    </div>
  );
}
