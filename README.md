# AnimeMonkey — React + Tailwind Store

## 🗂 Project Structure

```
animemonkey-react/
├── public/
│   └── index.html              ← HTML shell
├── src/
│   ├── assets/
│   │   └── logo.png            ← Your logo (bg removed)
│   ├── components/
│   │   ├── Navbar.jsx          ← Sticky top nav with logo, search, cart
│   │   ├── Ticker.jsx          ← Scrolling announcement bar
│   │   ├── Hero.jsx            ← Big centered logo hero section
│   │   ├── Sidebar.jsx         ← Left category sidebar with accordions
│   │   ├── TrustBar.jsx        ← Shipping/returns/payment trust icons
│   │   ├── SeriesGrid.jsx      ← Browse by anime series tiles
│   │   ├── ProductGrid.jsx     ← Featured products with filter chips
│   │   ├── ProductCard.jsx     ← Individual product card component
│   │   ├── PromoBanners.jsx    ← 2 promo banners (discount + free shipping)
│   │   └── Footer.jsx          ← Footer with links and logo
│   ├── pages/
│   │   ├── data.js             ← All product/series/sidebar data
│   │   └── CartContext.jsx     ← React Context for cart & wishlist state
│   ├── App.jsx                 ← Root component, assembles everything
│   ├── index.js                ← React entry point
│   └── index.css               ← Tailwind directives + custom CSS
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# 3. Build for production
npm run build
```

Opens at: http://localhost:3000

## 🖼 Logo
Your logo is in `src/assets/logo.png` with the black background removed.
- **Hero section**: shown large and centered with drop shadow
- **Navbar**: shown small (h-10) with drop shadow
- **Footer**: shown with `filter: brightness(0) invert(1)` so it's visible on the dark background

## 🎨 Customisation

### Colors (tailwind.config.js)
```js
colors: {
  ink: "#111111",       // main dark color
  gold: "#c9a84c",      // accent gold (cart badge, ticker labels)
  "gold-light": "#e8c56a",
  muted: "#999999",
}
```

### Adding Products (src/pages/data.js)
Each product follows this shape:
```js
{
  id: 9,
  series: 'Naruto',
  name: 'Kakashi Figure',
  price: 1499,
  oldPrice: 1999,        // optional — shows sale price + % off
  badge: 'Hot',          // optional — 'New' | 'Hot' | 'Sale' | 'Limited'
  badgeColor: 'bg-amber-500 text-black',
  img: 'https://your-image-url.com/...',
}
```

### Adding Sidebar Categories (src/pages/data.js)
```js
{
  label: '🎮 Gaming',
  items: [
    { name: 'Genshin Impact', count: 18 },
    { name: 'Valorant', count: 12 },
  ],
}
```

## 🌐 Deployment

**Netlify (easiest — free):**
```bash
npm run build
# Drag & drop the `build/` folder at netlify.com
```

**Vercel:**
```bash
npm i -g vercel
vercel
```

**GitHub Pages:**
```bash
npm install gh-pages --save-dev
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run build && npm run deploy
```

## 📦 Tech Stack
- React 18
- Tailwind CSS 3
- React Context API (cart & wishlist)
- Google Fonts (DM Sans + Playfair Display)
