import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './pages/CartContext';

// Customer pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccess from './pages/OrderSuccess';
import SearchPage from './pages/SearchPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import WishlistPage from './pages/WishlistPage';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsPage from './pages/ReturnsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminLayout from './pages/admin/AdminLayout';

// Store layout wrapper
function StoreLayout() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Ticker />
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:series" element={<CategoryPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function WithAdminLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<WithAdminLayout><AdminDashboard /></WithAdminLayout>} />
          <Route path="/admin/products" element={<WithAdminLayout><AdminProducts /></WithAdminLayout>} />
          <Route path="/admin/orders" element={<WithAdminLayout><AdminOrders /></WithAdminLayout>} />
          <Route path="/*" element={<StoreLayout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
