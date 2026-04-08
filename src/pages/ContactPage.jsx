import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens email client with prefilled content
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.open(`mailto:animemonkeyyy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  };

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-ink transition-colors bg-white';

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">Contact Us</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — info */}
          <div>
            <h1 className="text-3xl font-bold text-ink mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Get in Touch</h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Have a question, complaint, or just want to say hi? We'd love to hear from you. We usually respond within 24 hours.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">✉️</div>
                <div>
                  <div className="text-sm font-bold text-ink mb-0.5">Email</div>
                  <a href="mailto:animemonkeyyy@gmail.com" className="text-sm text-gray-500 hover:text-ink transition-colors">animemonkeyyy@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📍</div>
                <div>
                  <div className="text-sm font-bold text-ink mb-0.5">Location</div>
                  <p className="text-sm text-gray-500">India 🇮🇳</p>
                  <p className="text-xs text-gray-400 mt-0.5">Shipping all across India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">⏰</div>
                <div>
                  <div className="text-sm font-bold text-ink mb-0.5">Response Time</div>
                  <p className="text-sm text-gray-500">Within 24 hours</p>
                  <p className="text-xs text-gray-400 mt-0.5">Mon – Fri, 10am – 7pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📱</div>
                <div>
                  <div className="text-sm font-bold text-ink mb-1">Follow Us</div>
                  <div className="flex gap-3">
                    <a href="https://instagram.com/animemonkey" target="_blank" rel="noopener noreferrer"
                      className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                      Instagram
                    </a>
                    <a href="https://facebook.com/animemonkey" target="_blank" rel="noopener noreferrer"
                      className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-ink mb-2">Message Sent!</h3>
                <p className="text-sm text-gray-500 mb-6">Your email client should have opened. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="text-sm font-semibold text-ink underline hover:no-underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Your Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} required className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Subject</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)} required className={inputCls}>
                    <option value="">Select a topic</option>
                    <option>Order Issue</option>
                    <option>Return / Refund</option>
                    <option>Product Query</option>
                    <option>Shipping Query</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Message</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5} className={`${inputCls} resize-none`} />
                </div>
                <button type="submit" className="w-full bg-ink text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
