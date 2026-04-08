import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('total, created_at, customer_name, order_id, status').order('created_at', { ascending: false }),
        supabase.from('products').select('id', { count: 'exact' }),
      ]);

      const orders = ordersRes.data || [];
      const revenue = orders.reduce((sum, o) => sum + o.total, 0);

      setStats({
        orders: orders.length,
        revenue,
        products: productsRes.count || 0,
      });

      setRecentOrders(orders.slice(0, 8));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const STATUS_COLORS = {
    confirmed: 'bg-blue-500/10 text-blue-400',
    packed: 'bg-yellow-500/10 text-yellow-400',
    shipped: 'bg-purple-500/10 text-purple-400',
    delivered: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="p-7">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: loading ? '...' : stats.orders, icon: '🧾', color: 'text-blue-400' },
          { label: 'Total Revenue', value: loading ? '...' : `₹${stats.revenue.toLocaleString('en-IN')}`, icon: '💰', color: 'text-green-400' },
          { label: 'Total Products', value: loading ? '...' : stats.products, icon: '📦', color: 'text-purple-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[10px] font-bold tracking-[2px] uppercase text-gray-600">{stat.label}</span>
            </div>
            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-white font-bold text-sm">Recent Orders</h2>
          <button
            onClick={() => navigate('/admin/orders')}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-600 text-sm">Loading...</div>
        ) : recentOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-600 text-sm">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Order ID', 'Customer', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold tracking-[2px] uppercase text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.order_id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-3.5 text-white font-mono text-xs">#{order.order_id}</td>
                    <td className="px-6 py-3.5 text-gray-300">{order.customer_name}</td>
                    <td className="px-6 py-3.5 text-white font-semibold">₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-700 text-gray-400'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 text-xs">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
