import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShippingPolicy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">Shipping Policy</span>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-ink mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Shipping Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🚀', title: 'Standard Shipping', desc: '3–5 business days', price: '₹99' },
              { icon: '⚡', title: 'Express Shipping', desc: '1–2 business days', price: '₹199' },
              { icon: '🎁', title: 'Free Shipping', desc: 'On orders above ₹999', price: 'FREE' },
            ].map(s => (
              <div key={s.title} className="bg-gray-50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-bold text-ink text-sm mb-1">{s.title}</div>
                <div className="text-xs text-gray-500 mb-2">{s.desc}</div>
                <div className="text-lg font-black text-ink">{s.price}</div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">Where We Ship</h2>
            <p>We ship all across India 🇮🇳 — from Kashmir to Kanyakumari. No matter where you are, AnimeMonkey delivers to your doorstep.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">Processing Time</h2>
            <p>Orders are processed within <strong>24 hours</strong> of placement (excluding Sundays and public holidays). Once shipped, you will receive a tracking link via email and SMS.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">Order Tracking</h2>
            <p>Once your order is dispatched, you'll receive a tracking number. You can use this to track your package on the courier partner's website. You can also use our <button onClick={() => window.open('https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx', '_blank')} className="text-ink font-semibold underline">Track Order</button> link.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">Damaged or Lost Orders</h2>
            <p>If your order arrives damaged or goes missing in transit, please contact us within <strong>48 hours</strong> of the expected delivery date at <a href="mailto:animemonkeyyy@gmail.com" className="text-ink font-semibold underline">animemonkeyyy@gmail.com</a> and we'll make it right.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-semibold text-ink mb-1">Have a question?</p>
            <p>Write to us at <a href="mailto:animemonkeyyy@gmail.com" className="text-ink font-semibold underline">animemonkeyyy@gmail.com</a> and we'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
