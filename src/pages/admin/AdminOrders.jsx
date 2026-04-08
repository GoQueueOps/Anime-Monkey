import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const STATUSES = ['confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

const STATUS_COLORS = {
  confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  packed: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const updateStatus = async (orderId, status) => {
    setUpdating(true);
    await supabase.from('orders').update({ status }).eq('id', orderId);
    setUpdating(false);
    setSelected(prev => prev ? { ...prev, status } : null);
    fetchOrders();
  };

  let filtered = orders;
  if (filterStatus !== 'all') filtered = filtered.filter(o => o.status === filterStatus);
  if (search) filtered = filtered.filter(o =>
    o.order_id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-7">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search order ID or customer..."
          className="bg-gray-900 border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors w-64 placeholder-gray-600"
        />
        <div className="flex gap-2 flex-wrap">
          {['all', ...STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors
                ${filterStatus === s
                  ? 'bg-white text-black'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-600 text-sm">Loading orders...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-bold tracking-[2px] uppercase text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="px-5 py-3.5 text-white font-mono text-xs">#{order.order_id}</td>
                    <td className="px-5 py-3.5">
                      <div className="text-white text-sm font-medium">{order.customer_name}</div>
                      <div className="text-gray-500 text-xs">{order.customer_email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                      {order.items?.length} {order.items?.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-5 py-3.5 text-white font-bold">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs capitalize">
                      {order.payment_method}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setSelected(order)}
                        className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-8 text-center text-gray-600 text-sm">No orders found</div>
            )}
          </div>
        )}
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div>
                <h2 className="text-white font-bold">Order #{selected.order_id}</h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date(selected.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xl transition-colors">✕</button>
            </div>

            <div className="px-6 py-5 space-y-5">

              {/* Update status */}
              <div>
                <label className="text-xs font-bold tracking-[2px] uppercase text-gray-500 block mb-2">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      disabled={updating}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors
                        ${selected.status === s
                          ? 'bg-white text-black'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer info */}
              <div className="bg-gray-800/50 rounded-xl p-4 space-y-1.5">
                <p className="text-xs font-bold tracking-[2px] uppercase text-gray-500 mb-2">Customer</p>
                <p className="text-white text-sm font-semibold">{selected.customer_name}</p>
                <p className="text-gray-400 text-xs">{selected.customer_email}</p>
                <p className="text-gray-400 text-xs">{selected.customer_phone}</p>
                <p className="text-gray-400 text-xs mt-2">{selected.address}, {selected.city}, {selected.state} - {selected.pincode}</p>
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-bold tracking-[2px] uppercase text-gray-500 mb-3">Items Ordered</p>
                <div className="space-y-3">
                  {selected.items?.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold leading-snug">{item.name}</p>
                        <p className="text-gray-500 text-xs">{item.series} · Qty: {item.qty}</p>
                      </div>
                      <p className="text-white text-xs font-bold flex-shrink-0">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Subtotal</span><span>₹{selected.subtotal?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Shipping</span>
                  <span className={selected.shipping === 0 ? 'text-green-400' : ''}>
                    {selected.shipping === 0 ? 'FREE' : `₹${selected.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white border-t border-gray-700 pt-2">
                  <span>Total</span><span>₹{selected.total?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 pt-1">
                  <span>Payment</span><span className="capitalize">{selected.payment_method}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
