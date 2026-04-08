import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQS = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days. Express delivery is 1–2 business days. We ship all across India.' },
      { q: 'Do you offer free shipping?', a: 'Yes! Orders above ₹999 get free shipping. For orders below ₹999, a flat ₹99 shipping charge applies.' },
      { q: 'Is there a COD option?', a: 'Yes, Cash on Delivery is available with a ₹50 handling charge. COD is available across India.' },
      { q: 'Can I change my delivery address after ordering?', a: 'You can change your address within 2 hours of placing the order. Email us at animemonkeyyy@gmail.com immediately.' },
      { q: 'How do I track my order?', a: 'Once your order is shipped, you\'ll receive a tracking number via email. You can track it on our Track Order page.' },
    ]
  },
  {
    category: 'Products',
    items: [
      { q: 'Are the products official/licensed?', a: 'We clearly mention if a product is official licensed merchandise. Fan art and unofficial merch is also labeled accordingly.' },
      { q: 'Are the figures and collectibles authentic?', a: 'Yes! We source only from trusted manufacturers. Product descriptions mention material, size and quality details.' },
      { q: 'What if I receive a damaged product?', a: 'Refunds or replacements will only be considered if you provide a clear, uncut video showing the package from before opening through the entire unboxing process. Without this video proof, we will not be able to process any claims for damage or issues.' },
    ]
  },
  {
    category: 'Returns & Payments',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 14-day hassle-free return policy. Items must be in original condition and packaging.' },
      { q: 'How long do refunds take?', a: 'Refunds are processed within 5–7 business days for cards/net banking and 3–5 days for UPI.' },
      { q: 'What payment methods do you accept?', a: 'We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.' },
      { q: 'Is my payment information safe?', a: 'Absolutely. We use industry-standard encryption and never store your payment details.' },
    ]
  },
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">FAQ</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-ink mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h1>
        <p className="text-sm text-gray-400 mb-10">Can't find your answer? Email us at <a href="mailto:animemonkeyyy@gmail.com" className="text-ink font-semibold underline">animemonkeyyy@gmail.com</a></p>

        <div className="space-y-8">
          {FAQS.map(section => (
            <div key={section.category}>
              <h2 className="text-xs font-bold tracking-[2px] uppercase text-gray-400 mb-4 pb-2 border-b border-gray-100">
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={key} className="border border-gray-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenItem(isOpen ? null : key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-ink pr-4">{item.q}</span>
                        <span className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🐵</div>
          <h3 className="text-lg font-bold text-ink mb-2">Still have questions?</h3>
          <p className="text-sm text-gray-500 mb-4">We're here to help! Reach out and we'll get back to you within 24 hours.</p>
          <a
            href="mailto:animemonkeyyy@gmail.com"
            className="inline-block bg-ink text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
