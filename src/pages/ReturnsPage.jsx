import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReturnsPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">Returns & Refunds</span>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-ink mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Returns & Refunds</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

          {/* Important notice — unboxing video */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-3xl flex-shrink-0">⚠️</span>
            <div>
              <div className="font-bold text-amber-800 text-base mb-2">Unboxing Video Required</div>
              <p className="text-amber-700 leading-relaxed">
                Refunds or replacements will <strong>only</strong> be considered if you provide a clear, uncut video showing the package from <strong>before opening through the entire unboxing process</strong>. Without this video proof, we will not be able to process any claims for damage or issues.
              </p>
            </div>
          </div>

          {/* 14 day policy */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-3xl flex-shrink-0">🔄</span>
            <div>
              <div className="font-bold text-green-800 text-base mb-1">14-Day Return Policy</div>
              <p className="text-green-700">You can request a return within <strong>14 days</strong> of delivery, subject to the conditions below.</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">What Can Be Returned</h2>
            <ul className="space-y-2">
              {[
                '✅ Items received in damaged or defective condition (with unboxing video proof)',
                '✅ Wrong item delivered (with unboxing video proof)',
                '✅ Item significantly different from description (with unboxing video proof)',
                '❌ Items that have been used or washed',
                '❌ Items without original packaging',
                '❌ Claims without an unboxing video will not be accepted',
                '❌ Custom or personalized orders',
              ].map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">How to Initiate a Return</h2>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Record a clear, uncut video from before opening the package through the entire unboxing. This is mandatory.' },
                { step: '2', text: 'Email us at animemonkeyyy@gmail.com with your Order ID, reason for return, and the unboxing video attached or linked.' },
                { step: '3', text: "We'll review your request within 24–48 hours. If approved, we'll send you return instructions." },
                { step: '4', text: 'Pack the item securely and drop it off at the nearest courier partner.' },
                { step: '5', text: 'Once we receive and inspect the item, your refund will be processed within 5–7 business days.' },
              ].map(s => (
                <div key={s.step} className="flex gap-4 items-start bg-gray-50 rounded-xl p-4">
                  <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">Refund Timeline</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { method: 'UPI / Net Banking', time: '3–5 business days' },
                { method: 'Credit / Debit Card', time: '5–7 business days' },
                { method: 'COD (Store Credit)', time: 'Instant store credit' },
              ].map(r => (
                <div key={r.method} className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-ink text-sm mb-1">{r.method}</div>
                  <div className="text-xs text-gray-500">{r.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-semibold text-ink mb-1">Need help with a return?</p>
            <p>Contact us at <a href="mailto:animemonkeyyy@gmail.com" className="text-ink font-semibold underline">animemonkeyyy@gmail.com</a> — don't forget to include your unboxing video!</p>
          </div>

        </div>
      </div>
    </div>
  );
}
