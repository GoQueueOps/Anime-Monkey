import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); return; }
      setUser(user);

      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setName(profileData.full_name || '');
        setPhone(profileData.phone || '');
      }

      // Get orders by email
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false });

      setOrders(ordersData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: name,
      phone,
      updated_at: new Date().toISOString(),
    });
    setProfile(p => ({ ...p, full_name: name, phone }));
    setEditing(false);
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const STATUS_COLORS = {
    confirmed: 'bg-blue-100 text-blue-700',
    packed: 'bg-yellow-100 text-yellow-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-ink border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <button onClick={() => navigate('/')} className="hover:text-ink transition-colors">Home</button>
          <span>›</span>
          <span className="text-ink font-medium">My Account</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center text-xl font-bold">
              {(profile?.full_name || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg font-bold text-ink">{profile?.full_name || 'My Account'}</h1>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-red-500 transition-colors border border-gray-200 px-4 py-2 rounded-lg hover:border-red-300">
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-6">
        <div className="flex gap-1">
          {['orders', 'profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-ink text-ink' : 'border-transparent text-gray-400 hover:text-ink'}`}
            >
              {tab === 'orders' ? `My Orders (${orders.length})` : 'Profile'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-lg font-bold text-ink mb-2">No orders yet</h3>
                <p className="text-sm text-gray-400 mb-6">Start shopping and your orders will appear here!</p>
                <button onClick={() => navigate('/')} className="bg-ink text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
                  Shop Now
                </button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-ink font-mono">#{order.order_id}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-ink">₹{order.total?.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-400 capitalize">{order.payment_method}</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex gap-2 flex-wrap mb-3">
                    {order.items?.slice(0, 4).map((item, i) => (
                      <div key={i} className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items?.length > 4 && (
                      <div className="w-14 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    {order.items?.length} {order.items?.length === 1 ? 'item' : 'items'} · Delivering to {order.city}, {order.state}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-ink">Personal Information</h2>
              {!editing && (
                <button onClick={() => setEditing(true)} className="text-sm font-semibold text-ink border border-gray-200 px-4 py-1.5 rounded-lg hover:border-ink transition-colors">
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Full Name</label>
                {editing ? (
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-ink" />
                ) : (
                  <p className="text-sm text-ink">{profile?.full_name || '—'}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email Address</label>
                <p className="text-sm text-ink">{user?.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">Email cannot be changed</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Mobile Number</label>
                {editing ? (
                  <input value={phone} onChange={e => setPhone(e.target.value)} maxLength={10} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-ink" />
                ) : (
                  <p className="text-sm text-ink">{profile?.phone || '—'}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Member Since</label>
                <p className="text-sm text-ink">
                  {new Date(user?.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {editing && (
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setEditing(false)} className="flex-1 border border-gray-200 text-gray-500 py-3 rounded-xl text-sm font-semibold hover:border-gray-400 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSaveProfile} disabled={saving} className="flex-1 bg-ink text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-60">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
