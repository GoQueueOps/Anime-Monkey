import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PRICE_RANGES = [
  { name: 'Under ₹500' },
  { name: '₹500 – ₹1,000' },
  { name: '₹1,000 – ₹2,500' },
  { name: '₹2,500+' },
];

const SHOP_BY_TYPE = [
  'Figurines', 'Nendoroids', 'Watches', 'Clothing',
  'Tapestry', 'Plushies', 'Keychains', 'Manga', 'Accessories', 'Cosplay',
];

const WESTERN_SERIES = ['Harry Potter', 'Marvel', 'DC Comics', 'Star Wars', 'Game of Thrones', 'The Boys'];
const MECH_SERIES = ['Gundam', 'Evangelion', 'Transformers'];

function SidebarSection({ label, items, counts }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(label.includes('Anime'));
  const [active, setActive] = useState(null);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400">{label}</span>
        <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && (
        <div className="pb-2">
          {items.map(item => {
            const count = counts?.[item.name];
            return (
              <button
                key={item.name}
                onClick={() => { setActive(item.name); navigate(`/category/${item.name}`); }}
                className={`w-full flex items-center justify-between px-5 pl-6 py-1.5 text-sm transition-all border-l-2
                  ${active === item.name
                    ? 'border-l-ink text-ink font-semibold bg-gray-50'
                    : 'border-l-transparent text-gray-500 hover:text-ink hover:bg-gray-50'
                  }`}
              >
                <span>{item.name}</span>
                {count !== undefined && (
                  <span className={`text-xs rounded-full px-2 py-0.5 ${active === item.name ? 'bg-gray-200 text-gray-600' : 'text-gray-300'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [animeSeries, setAnimeSeries] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchSeriesData();
  }, []);

  const fetchSeriesData = async () => {
    try {
      const { data } = await supabase.from('products').select('series');
      if (!data) return;

      // Count products per series
      const countMap = {};
      data.forEach(p => {
        countMap[p.series] = (countMap[p.series] || 0) + 1;
      });

      // Total count
      countMap['All Anime'] = data.length;

      setCounts(countMap);

      // Get unique anime series (exclude western and mechs)
      const allSeries = [...new Set(data.map(p => p.series))];
      const anime = allSeries
        .filter(s => !WESTERN_SERIES.includes(s) && !MECH_SERIES.includes(s))
        .map(name => ({ name }));

      const western = allSeries
        .filter(s => WESTERN_SERIES.includes(s))
        .map(name => ({ name }));

      const mechs = allSeries
        .filter(s => MECH_SERIES.includes(s))
        .map(name => ({ name }));

      setAnimeSeries({ anime, western, mechs });
    } catch (err) {
      console.error(err);
    }
  };

  const animeItems = [{ name: 'All Anime' }, ...(animeSeries.anime || [])];
  const westernItems = animeSeries.western?.length > 0 ? animeSeries.western : WESTERN_SERIES.map(name => ({ name }));
  const mechItems = animeSeries.mechs?.length > 0 ? animeSeries.mechs : MECH_SERIES.map(name => ({ name }));

  return (
    <aside className="w-56 flex-shrink-0 border-r border-gray-200 bg-white sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block">
      <SidebarSection label="🎌 Anime" items={animeItems} counts={counts} />
      <SidebarSection label="⚡ Western" items={westernItems} counts={counts} />
      <SidebarSection label="🤖 Mechs" items={mechItems} counts={counts} />
      <SidebarSection label="🛍 Shop by Type" items={SHOP_BY_TYPE.map(name => ({ name }))} counts={{}} />
      <SidebarSection label="🏷 Price Range" items={PRICE_RANGES} counts={{}} />
    </aside>
  );
}
