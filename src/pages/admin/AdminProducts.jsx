import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const EMPTY_FORM = {
  name: '', series: '', price: '', old_price: '',
  badge: '', badge_color: '', img: '', description: '', stock: '',
};

const SERIES_OPTIONS = [
  'Demon Slayer', 'Naruto', 'One Piece', 'Jujutsu Kaisen',
  'Dragon Ball', 'Attack on Titan', 'My Hero Academia',
  'Bleach', 'Chainsaw Man', 'Solo Leveling', 'Tokyo Revengers',
  'Hunter x Hunter', 'Harry Potter', 'Marvel', 'DC Comics',
  'Star Wars', 'Game of Thrones', 'Gundam', 'Evangelion',
];

const BADGE_OPTIONS = [
  { label: 'None', value: '', color: '' },
  { label: 'New', value: 'New', color: 'bg-ink text-white' },
  { label: 'Hot', value: 'Hot', color: 'bg-amber-500 text-black' },
  { label: 'Sale', value: 'Sale', color: 'bg-red-600 text-white' },
  { label: 'Limited', value: 'Limited', color: 'bg-purple-700 text-white' },
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      series: product.series,
      price: product.price,
      old_price: product.old_price || '',
      badge: product.badge || '',
      badge_color: product.badge_color || '',
      img: product.img,
      description: product.description || '',
      stock: product.stock,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  // Upload image to Supabase Storage
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `products/${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert('Upload failed: ' + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    update('img', urlData.publicUrl);
    setUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.series || !form.price || !form.img) {
      alert('Name, series, price and image are required.');
      return;
    }
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      series: form.series,
      price: parseInt(form.price),
      old_price: form.old_price ? parseInt(form.old_price) : null,
      badge: form.badge || null,
      badge_color: form.badge_color || null,
      img: form.img.trim(),
      description: form.description.trim(),
      stock: form.stock ? parseInt(form.stock) : 100,
    };

    if (editId) {
      const { error } = await supabase.from('products').update(payload).eq('id', editId);
      if (error) { alert('Error updating: ' + error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('products').insert([payload]);
      if (error) { alert('Error adding: ' + error.message); setSaving(false); return; }
    }

    setSaving(false);
    setShowForm(false);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await supabase.from('products').delete().eq('id', id);
    setDeleteId(null);
    fetchProducts();
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.series.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-7">

      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products in store</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="bg-gray-900 border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors w-full max-w-xs placeholder-gray-600"
        />
      </div>

      {/* Products table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-600 text-sm">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Image', 'Product', 'Series', 'Price', 'Stock', 'Badge', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-bold tracking-[2px] uppercase text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="px-5 py-3">
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-800">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-white font-semibold text-sm max-w-[180px] leading-snug">{product.name}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{product.series}</td>
                    <td className="px-5 py-3">
                      <div className="text-white font-bold">₹{product.price.toLocaleString('en-IN')}</div>
                      {product.old_price && (
                        <div className="text-gray-600 text-xs line-through">₹{product.old_price.toLocaleString('en-IN')}</div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-sm font-bold ${product.stock < 10 ? 'text-red-400' : 'text-green-400'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {product.badge ? (
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${product.badge_color}`}>
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-gray-700 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="text-xs bg-red-900/30 text-red-400 hover:bg-red-900/60 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-8 text-center text-gray-600 text-sm">No products found</div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h2 className="text-white font-bold">{editId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white text-xl transition-colors">✕</button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">

              {/* Image upload */}
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1.5">Product Image *</label>
                <div className="flex gap-3 items-start">
                  {form.img && (
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img src={form.img} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <label className="block w-full border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-xl p-4 text-center cursor-pointer transition-colors">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <div className="text-2xl mb-1">📸</div>
                      <div className="text-xs text-gray-400">
                        {uploading ? 'Uploading...' : 'Click to upload photo'}
                      </div>
                    </label>
                    <div className="text-gray-600 text-xs text-center">or</div>
                    <input
                      value={form.img}
                      onChange={e => update('img', e.target.value)}
                      placeholder="Paste image URL"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-gray-500 placeholder-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1.5">Product Name *</label>
                <input
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  placeholder="e.g. Tanjiro Water Breathing Form"
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-500 placeholder-gray-600"
                />
              </div>

              {/* Series */}
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1.5">Series *</label>
                <select
                  value={form.series}
                  onChange={e => update('series', e.target.value)}
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                >
                  <option value="">Select series</option>
                  {SERIES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Price row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => update('price', e.target.value)}
                    placeholder="1299"
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-500 placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Old Price (₹)</label>
                  <input
                    type="number"
                    value={form.old_price}
                    onChange={e => update('old_price', e.target.value)}
                    placeholder="1999 (optional)"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-500 placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Badge + Stock row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Badge</label>
                  <select
                    value={form.badge}
                    onChange={e => {
                      const opt = BADGE_OPTIONS.find(b => b.value === e.target.value);
                      update('badge', opt.value);
                      update('badge_color', opt.color);
                    }}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                  >
                    {BADGE_OPTIONS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={e => update('stock', e.target.value)}
                    placeholder="100"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-500 placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder="Product description..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-500 resize-none placeholder-gray-600"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-700 text-gray-400 py-3 rounded-xl text-sm font-semibold hover:border-gray-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 bg-white text-black py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="text-white font-bold mb-2">Delete Product?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-700 text-gray-400 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
