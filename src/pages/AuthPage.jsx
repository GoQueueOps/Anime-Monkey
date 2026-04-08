import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const clearError = (field) => setErrors(e => ({ ...e, [field]: '' }));

  const validate = () => {
    const e = {};
    if (mode === 'signup' && !name.trim()) e.name = 'Name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (mode === 'signup' && !phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit mobile required';
    if (mode !== 'forgot' && password.length < 6) e.password = 'Minimum 6 characters';
    if (mode === 'signup' && password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');

      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, phone }
          }
        });
        if (error) throw error;
        setSuccess('Account created! Please check your email to verify your account.');

      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSuccess('Password reset link sent to your email!');
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  const switchMode = (m) => { setMode(m); setErrors({}); setSuccess(''); };

  const inputCls = (err) =>
    `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-ink bg-white'}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="AnimeMonkey" className="h-20 w-auto object-contain mb-3 cursor-pointer"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
            onClick={() => navigate('/')} />
          <h1 className="text-xl font-bold text-ink" style={{ fontFamily: 'Playfair Display, serif' }}>
            {mode === 'login' ? 'Welcome back!' : mode === 'signup' ? 'Create your account' : 'Reset password'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {mode === 'login' ? 'Sign in to track orders & manage wishlist' :
             mode === 'signup' ? 'Join the AnimeMonkey family 🐵' :
             "We'll send you a reset link"}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8">

          {/* General error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
              <span className="text-green-500 text-lg">✓</span>
              <p className="text-sm text-green-700 font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Full Name</label>
                <input value={name} onChange={e => { setName(e.target.value); clearError('name'); }} className={inputCls(errors.name)} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); clearError('email'); }} className={inputCls(errors.email)} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Mobile Number</label>
                <input value={phone} onChange={e => { setPhone(e.target.value); clearError('phone'); }} maxLength={10} className={inputCls(errors.phone)} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            )}

            {mode !== 'forgot' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); clearError('password'); }} className={`${inputCls(errors.password)} pr-16`} />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-ink">{showPass ? 'Hide' : 'Show'}</button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }} className={`${inputCls(errors.confirmPassword)} pr-16`} />
                  <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-ink">{showConfirm ? 'Hide' : 'Show'}</button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" onClick={() => switchMode('forgot')} className="text-xs text-gray-400 hover:text-ink transition-colors">Forgot password?</button>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-ink text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                {mode === 'login' ? 'Signing in...' : mode === 'signup' ? 'Creating account...' : 'Sending...'}</>
              ) : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </button>

            {mode !== 'forgot' && (
              <>
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400">or continue with</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <button type="button" onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </>
            )}
          </form>
        </div>

        <div className="text-center mt-5 space-y-2">
          {mode === 'login' && <p className="text-sm text-gray-400">Don't have an account? <button onClick={() => switchMode('signup')} className="text-ink font-bold hover:underline">Sign up</button></p>}
          {mode === 'signup' && <p className="text-sm text-gray-400">Already have an account? <button onClick={() => switchMode('login')} className="text-ink font-bold hover:underline">Sign in</button></p>}
          {mode === 'forgot' && <p className="text-sm text-gray-400">Remember it? <button onClick={() => switchMode('login')} className="text-ink font-bold hover:underline">Back to Sign in</button></p>}
          <p className="text-xs text-gray-300">By continuing you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
