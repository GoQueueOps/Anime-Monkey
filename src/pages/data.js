export const SERIES = [
  { id: 1, name: 'Demon Slayer', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&q=80&fit=crop' },
  { id: 2, name: 'Naruto', img: 'https://images.unsplash.com/photo-1559181567-c3190d45a927?w=300&h=300&q=80&fit=crop' },
  { id: 3, name: 'One Piece', img: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=300&h=300&q=80&fit=crop' },
  { id: 4, name: 'Jujutsu Kaisen', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=300&q=80&fit=crop' },
  { id: 5, name: 'Dragon Ball', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&q=80&fit=crop' },
  { id: 6, name: 'Attack on Titan', img: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=300&h=300&q=80&fit=crop' },
];

export const PRODUCTS = [
  { id: 1, series: 'Demon Slayer', name: 'Tanjiro Water Breathing Form', price: 1299, badge: 'Hot', badgeColor: 'bg-amber-500 text-black', img: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=510&q=85&fit=crop' },
  { id: 2, series: 'Jujutsu Kaisen', name: 'Gojo Satoru Infinity Figure', price: 1799, badge: 'New', badgeColor: 'bg-ink text-white', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=510&q=85&fit=crop' },
  { id: 3, series: 'Dragon Ball', name: 'Goku Ultra Instinct Figure', price: 1999, oldPrice: 2999, badge: 'Sale', badgeColor: 'bg-red-600 text-white', img: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=510&q=85&fit=crop' },
  { id: 4, series: 'One Piece', name: 'Luffy Gear 5 Joy Boy Edition', price: 1549, badge: 'Limited', badgeColor: 'bg-purple-700 text-white', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=510&q=85&fit=crop' },
  { id: 5, series: 'Naruto', name: 'Naruto Sage Mode Stance', price: 999, oldPrice: 1299, img: 'https://images.unsplash.com/photo-1559181567-c3190d45a927?w=400&h=510&q=85&fit=crop' },
  { id: 6, series: 'My Hero Academia', name: 'Deku Full Cowl 100%', price: 1149, badge: 'New', badgeColor: 'bg-ink text-white', img: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=510&q=85&fit=crop' },
  { id: 7, series: 'Chainsaw Man', name: 'Denji Devil Hybrid Form', price: 1349, badge: 'Hot', badgeColor: 'bg-amber-500 text-black', img: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=510&q=85&fit=crop' },
  { id: 8, series: 'Attack on Titan', name: 'Levi Ackerman ODM Gear Figure', price: 1099, oldPrice: 1499, badge: 'Sale', badgeColor: 'bg-red-600 text-white', img: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=400&h=510&q=85&fit=crop' },
];

export const SIDEBAR_CATEGORIES = [
  {
    label: '🎌 Anime',
    items: [
      { name: 'All Anime', count: 248 },
      { name: 'Demon Slayer', count: 42 },
      { name: 'Naruto', count: 67 },
      { name: 'One Piece', count: 54 },
      { name: 'Jujutsu Kaisen', count: 38 },
      { name: 'Dragon Ball Z', count: 31 },
      { name: 'Attack on Titan', count: 29 },
      { name: 'My Hero Academia', count: 22 },
      { name: 'Bleach', count: 19 },
      { name: 'Chainsaw Man', count: 17 },
      { name: 'Solo Leveling', count: 14 },
      { name: 'Tokyo Revengers', count: 11 },
      { name: 'Hunter x Hunter', count: 9 },
    ],
    defaultOpen: true,
  },
  {
    label: '⚡ Western',
    items: [
      { name: 'Harry Potter', count: 33 },
      { name: 'Marvel', count: 45 },
      { name: 'DC Comics', count: 28 },
      { name: 'Star Wars', count: 21 },
      { name: 'Game of Thrones', count: 17 },
      { name: 'The Boys', count: 12 },
    ],
  },
  {
    label: '🤖 Mechs',
    items: [
      { name: 'Gundam', count: 36 },
      { name: 'Evangelion', count: 18 },
      { name: 'Transformers', count: 24 },
    ],
  },
  {
    label: '🛍 Shop by Type',
    items: [
      { name: 'Figurines', count: 112 },
      { name: 'Nendoroids', count: 58 },
      { name: 'Watches', count: 23 },
      { name: 'Clothing', count: 87 },
      { name: 'Tapestry', count: 39 },
      { name: 'Plushies', count: 44 },
      { name: 'Keychains', count: 95 },
      { name: 'Manga', count: 52 },
      { name: 'Accessories', count: 77 },
      { name: 'Cosplay', count: 34 },
    ],
  },
  {
    label: '🏷 Price Range',
    items: [
      { name: 'Under ₹500' },
      { name: '₹500 – ₹1,000' },
      { name: '₹1,000 – ₹2,500' },
      { name: '₹2,500+' },
    ],
  },
];

export const FILTER_CHIPS = ['All', 'Figurines', 'Clothing', 'Accessories', 'On Sale', 'Limited'];

export const TRUST_ITEMS = [
  { icon: '🚀', title: 'Fast Dispatch', sub: 'Ships within 24 hours' },
  { icon: '📦', title: 'Free Shipping', sub: 'On orders above ₹999' },
  { icon: '🔄', title: 'Easy Returns', sub: '14-day return (video required)' },
  { icon: '🔒', title: 'Secure Payment', sub: 'UPI · Cards · EMI · COD' },
];

export const TICKER_ITEMS = [
  { label: 'NEW DROP', text: 'Gojo Satoru Chrome Edition — Limited to 50 units' },
  { label: 'FREE SHIPPING', text: 'On all orders above ₹999 across India' },
  { label: 'EXCLUSIVE', text: 'Official Licensed Merchandise now available' },
  { label: '10% OFF', text: 'Your first order — use code MONKEY10' },
  { label: 'RESTOCKED', text: 'Gear 5 Luffy Joy Boy Edition — Back in stock' },
];
