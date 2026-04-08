import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_CATEGORIES } from '../pages/data';

function SidebarSection({ category }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(category.defaultOpen || false);
  const [activeItem, setActiveItem] = useState(
    category.defaultOpen ? category.items[0]?.name : null
  );

  const handleClick = (itemName) => {
    setActiveItem(itemName);
    navigate(`/category/${itemName}`);
  };

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400">
          {category.label}
        </span>
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {open && (
        <div className="pb-2">
          {category.items.map(item => (
            <button
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`
                w-full flex items-center justify-between px-5 pl-6 py-1.5 text-sm transition-all duration-150
                border-l-2 
                ${activeItem === item.name
                  ? 'border-l-ink text-ink font-semibold bg-gray-50'
                  : 'border-l-transparent text-gray-500 hover:text-ink hover:bg-gray-50'
                }
              `}
            >
              <span>{item.name}</span>
              {item.count && (
                <span className={`text-xs rounded-full px-2 py-0.5 ${activeItem === item.name ? 'bg-gray-200 text-gray-600' : 'text-gray-300'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 border-r border-gray-200 bg-white sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block">
      {SIDEBAR_CATEGORIES.map(cat => (
        <SidebarSection key={cat.label} category={cat} />
      ))}
    </aside>
  );
}
