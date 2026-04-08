import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { placeOrder } from '../hooks/useOrders';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'Pay via any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Rupay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: '+₹50 COD handling charge' },
];

const INDIAN_STATES = ['Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra',
  'Manipur','Meghalaya','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','Uttarakhand','West Bengal'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const FREE_SHIPPING = 999;
  const COD_CHARGE = 50;

  const [payment, setPayment] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  // Use separate state for each field to avoid lag
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const shipping = cartTotal >= FREE_SHIPPING ? 0 : 99;
  const codCharge = payment === 'cod' ? COD_CHARGE : 0;
  const total = cartTotal + shipping + codCharge;

  const clearError = (field) => setErrors(e => ({ ...e, [field]: '' }));

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit number required';
    if (!address.trim()) e.address = 'Required';
    if (!city.trim()) e.city = 'Required';
    if (!state) e.state = 'Required';
    if (!pincode.match(/^\d{6}$/)) e.pincode = 'Valid 6-digit pincode required';
    if (payment === 'upi' && !upiId.includes('@')) e.upiId = 'Valid UPI ID required';
    return e;
  };

  const handlePlace = async () => {
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 800));
    try {
      const form = { name, email, phone, address, city, state, pincode };
      const { orderId } = await placeOrder({ form, cartItems, cartTotal, payment });
      clearCart();
      navigate('/order-success', {
        state: { orderId, total, name, address: `${address}, ${city}, ${state} - ${pincode}` }
      });
    } catch (err) {
      console.error('Order failed:', err);
      alert('Something went wrong. Please try again.');
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="text-6xl mb-4">🛍</div>
      <h2 className="text-xl font-bold text-ink mb-2">Your bag is empty</h2>
      <button onClick={() => navigate('/')} className="mt-4 bg-ink text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">Continue Shopping</button>
    </div>
  );

  const Field = ({ label, error, children }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 block mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const inputCls = (err) => `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-ink'}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-3 bg-white border-b border-gray-100 text-xs text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
        <span>›</span>
        <span className="text-ink font-medium">Checkout</span>
      </div>

      {/* Steps */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-center gap-3 max-w-lg mx-auto">
          {['Bag', 'Details', 'Payment', 'Confirm'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i <= 2 ? 'bg-ink text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</div>
                <span className={`text-xs font-medium hidden sm:block ${i <= 2 ? 'text-ink' : 'text-gray-400'}`}>{step}</span>
              </div>
              {i < 3 && <div className={`flex-1 h-px ${i < 2 ? 'bg-ink' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">

            {/* Delivery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-ink mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-ink text-white rounded-full flex items-center justify-center text-xs">1</span>
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.name}>
                  <input value={name} onChange={e => { setName(e.target.value); clearError('name'); }} className={inputCls(errors.name)} />
                </Field>
                <Field label="Mobile Number" error={errors.phone}>
                  <input value={phone} onChange={e => { setPhone(e.target.value); clearError('phone'); }} maxLength={10} className={inputCls(errors.phone)} />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); clearError('email'); }} className={`${inputCls(errors.email)} sm:col-span-2`} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Full Address" error={errors.address}>
                    <textarea value={address} onChange={e => { setAddress(e.target.value); clearError('address'); }} rows={2} className={`${inputCls(errors.address)} resize-none`} />
                  </Field>
                </div>
                <Field label="City" error={errors.city}>
                  <input value={city} onChange={e => { setCity(e.target.value); clearError('city'); }} className={inputCls(errors.city)} />
                </Field>
                <Field label="State" error={errors.state}>
                  <select value={state} onChange={e => { setState(e.target.value); clearError('state'); }} className={inputCls(errors.state)}>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Pincode" error={errors.pincode}>
                  <input value={pincode} onChange={e => { setPincode(e.target.value); clearError('pincode'); }} maxLength={6} className={inputCls(errors.pincode)} />
                </Field>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-ink mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-ink text-white rounded-full flex items-center justify-center text-xs">2</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(method => (
                  <label key={method.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === method.id ? 'border-ink bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value={method.id} checked={payment === method.id} onChange={() => setPayment(method.id)} className="accent-ink" />
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-ink">{method.label}</div>
                      <div className="text-xs text-gray-400">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {payment === 'upi' && (
                <div className="mt-4">
                  <Field label="UPI ID" error={errors.upiId}>
                    <input value={upiId} onChange={e => { setUpiId(e.target.value); clearError('upiId'); }} placeholder="name@upi" className={inputCls(errors.upiId)} />
                  </Field>
                </div>
              )}
              {payment === 'card' && (
                <div className="mt-4 space-y-3">
                  <input placeholder="Card Number" maxLength={19} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-ink" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" maxLength={5} className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-ink" />
                    <input placeholder="CVV" maxLength={3} type="password" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-ink" />
                  </div>
                  <input placeholder="Name on Card" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-ink" />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-20">
              <h2 className="text-base font-bold text-ink mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-ink leading-snug line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty}</p>
                      <p className="text-xs font-bold text-ink mt-0.5">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {payment === 'cod' && (
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>COD Charge</span><span>₹{COD_CHARGE}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-ink pt-2 border-t border-gray-100">
                  <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button
                onClick={handlePlace}
                disabled={placing}
                className="w-full mt-5 bg-ink text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {placing ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Processing...</>
                ) : `Place Order — ₹${total.toLocaleString('en-IN')}`}
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-3">🔒 Secure checkout · Your data is safe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
