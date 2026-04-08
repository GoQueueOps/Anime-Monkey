import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-3 border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">Terms & Conditions</span>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-ink mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Terms & Conditions</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

          <p>
            Welcome to <strong className="text-ink">AnimeMonkey</strong>. By accessing or using our website and placing an order, you agree to be bound by the following terms and conditions. Please read them carefully before making a purchase.
          </p>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">1. General</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>These terms apply to all users of the AnimeMonkey website.</li>
              <li>We reserve the right to update or modify these terms at any time without prior notice.</li>
              <li>Continued use of the website after changes constitutes acceptance of the updated terms.</li>
              <li>By placing an order, you confirm that you are at least 18 years of age or have parental consent.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">2. Products & Pricing</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.</li>
              <li>We reserve the right to change product prices at any time without prior notice.</li>
              <li>Product images are for illustrative purposes. Actual products may vary slightly in colour or finish due to photography and screen settings.</li>
              <li>We do not guarantee that all products shown on the website are available at all times. Stock availability is subject to change.</li>
              <li>Products marked as fan merchandise are not officially licensed unless explicitly stated.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">3. Orders & Payments</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>All orders are subject to acceptance and availability.</li>
              <li>Once an order is placed and payment is confirmed, it cannot be cancelled unless there is a genuine issue with the product.</li>
              <li>We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD). A ₹50 handling fee applies to COD orders.</li>
              <li>In case of payment failure, the order will not be processed. Please retry or use an alternative payment method.</li>
              <li>AnimeMonkey reserves the right to cancel any order at its discretion, including cases of suspected fraud or pricing errors.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">4. Shipping & Delivery</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>We ship across India. Estimated delivery times are 3–5 business days for standard and 1–2 business days for express.</li>
              <li>Delivery timelines are estimates and may vary due to factors beyond our control (weather, courier delays, public holidays).</li>
              <li>AnimeMonkey is not responsible for delays caused by incorrect address information provided by the customer.</li>
              <li>Free shipping is applicable on orders above ₹999. Shipping charges for other orders are ₹99.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">5. Returns, Refunds & Claims</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 font-semibold mb-1">⚠️ Unboxing Video is Mandatory</p>
              <p className="text-amber-700">Refunds or replacements will only be considered if you provide a clear, uncut video showing the package from before opening through the entire unboxing process. Without this video proof, we will not be able to process any claims for damage or issues.</p>
            </div>
            <ul className="space-y-2 list-disc list-inside">
              <li>Returns are accepted within 14 days of delivery for eligible items.</li>
              <li>Items must be unused, unwashed, and in original packaging to qualify for a return.</li>
              <li>Refunds are processed within 5–7 business days after the returned item is received and inspected.</li>
              <li>Custom, personalised, or used items are not eligible for return.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">6. Intellectual Property</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>All content on this website — including logos, images, text and designs — is the property of AnimeMonkey and may not be copied, reproduced or used without written permission.</li>
              <li>Fan art and merchandise on this platform is created for fan purposes and is not affiliated with or endorsed by the original copyright holders unless explicitly stated.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">7. Limitation of Liability</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>AnimeMonkey shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</li>
              <li>Our total liability shall not exceed the amount paid for the specific order in question.</li>
              <li>We are not responsible for any loss or damage caused by events outside our reasonable control.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">8. Governing Law</h2>
            <p>These terms and conditions are governed by the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of India.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-3">9. Contact</h2>
            <p>For any questions or concerns regarding these terms, please contact us at <a href="mailto:animemonkeyyy@gmail.com" className="text-ink font-semibold underline">animemonkeyyy@gmail.com</a>.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-semibold text-ink mb-1">By placing an order on AnimeMonkey, you agree to these Terms & Conditions.</p>
            <p className="text-gray-500">If you do not agree, please do not use our website or services.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
