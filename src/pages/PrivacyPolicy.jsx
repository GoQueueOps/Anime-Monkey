import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">Privacy Policy</span>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-ink mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

          <p>
            At <strong className="text-ink">AnimeMonkey</strong>, we are committed to protecting your personal information and your right to privacy. This policy explains what information we collect, how we use it, and what rights you have in relation to it.
          </p>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">1. Information We Collect</h2>
            <p className="mb-3">When you place an order or create an account, we collect:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Full name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>Delivery address (including city, state and pincode)</li>
              <li>Order history and payment method (we do not store card details)</li>
            </ul>
            <p className="mt-3">When you browse our website, we may also collect device information, browser type and IP address for analytics purposes.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">2. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To process and fulfil your orders</li>
              <li>To send order confirmations and shipping updates</li>
              <li>To respond to your queries and support requests</li>
              <li>To improve our website and product offerings</li>
              <li>To send promotional offers (only if you have opted in)</li>
            </ul>
            <p className="mt-3">We will never sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">3. Sharing of Information</h2>
            <p>We may share your information with trusted third parties only as necessary to operate our business:</p>
            <ul className="space-y-2 list-disc list-inside mt-3">
              <li><strong className="text-ink">Shipping partners</strong> — to deliver your orders (name, address, phone)</li>
              <li><strong className="text-ink">Payment processors</strong> — to securely handle transactions (we do not store payment details)</li>
              <li><strong className="text-ink">Analytics tools</strong> — to understand how our website is used (anonymised data only)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. All data is stored securely and access is restricted to authorised personnel only.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">5. Cookies</h2>
            <p>Our website uses cookies to improve your browsing experience, remember your preferences, and analyse site traffic. You can disable cookies in your browser settings, though some features of the site may not function properly as a result.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="space-y-2 list-disc list-inside mt-3">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:animemonkeyyy@gmail.com" className="text-ink font-semibold underline">animemonkeyyy@gmail.com</a>.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">7. Children's Privacy</h2>
            <p>Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy periodically.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-semibold text-ink mb-1">Questions about your privacy?</p>
            <p>Email us at <a href="mailto:animemonkeyyy@gmail.com" className="text-ink font-semibold underline">animemonkeyyy@gmail.com</a> and we'll respond within 24 hours.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
