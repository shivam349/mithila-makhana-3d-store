'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import AuthButtons from './AuthButtons';
import CartDrawer from './CartDrawer';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const totalItems = getTotalItems();

  // Ensure hydration match by only rendering interactive elements after client-side load
  useEffect(() => {
    setIsClient(true);
    // Check if on admin pages after client loads
    setIsAdminPage(pathname?.startsWith('/admin') || pathname === '/admin-login');
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Don't show navigation on admin pages
  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-earth-100 py-3'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full bg-makhana-500 text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
              M
            </span>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-earth-900 tracking-tight leading-none">
                Mithila Makhana
              </span>
              <span className="text-[10px] tracking-widest uppercase text-makhana-700 font-medium">
                Traditional · Pure · Organic
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-earth-700 hover:text-makhana-600 transition-colors font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/#products"
              className="text-earth-700 hover:text-makhana-600 transition-colors font-medium text-sm"
            >
              Products
            </Link>
            <Link
              href="/#build-box"
              className="text-earth-700 hover:text-makhana-600 transition-colors font-medium text-sm"
            >
              Build Box
            </Link>
            <Link
              href="/#brand-story"
              className="text-earth-700 hover:text-makhana-600 transition-colors font-medium text-sm"
            >
              Our Story
            </Link>
            <Link
              href="/#journey"
              className="text-earth-700 hover:text-makhana-600 transition-colors font-medium text-sm"
            >
              Journey
            </Link>
            <Link
              href="/engineering"
              className="text-makhana-700 hover:text-makhana-900 transition-colors font-semibold text-xs px-2.5 py-1 bg-makhana-50 rounded-lg border border-makhana-200"
            >
              Engineering
            </Link>

            {/* Admin Authentication */}
            {isClient && isAuthenticated() ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="text-earth-700 hover:text-makhana-600 transition-colors font-medium text-sm"
                >
                  🔧 Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-earth-700 hover:text-red-600 transition-colors font-medium text-sm"
                >
                  Logout
                </button>
              </>
            ) : isClient ? (
              <Link
                href="/admin-login"
                className="text-earth-500 hover:text-makhana-600 transition-colors text-xs font-medium"
              >
                Admin
              </Link>
            ) : null}

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-makhana-50 border border-makhana-200 text-earth-900 hover:bg-makhana-100 transition-all text-sm font-medium shadow-xs"
              aria-label="Open cart"
            >
              <span>🛒</span>
              <span>Cart</span>
              {isClient && totalItems > 0 && (
                <span className="bg-makhana-600 text-white rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-bold shadow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Firebase Authentication */}
            <AuthButtons />
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={openCart}
              className="relative p-2 rounded-full bg-makhana-50 border border-makhana-200 text-earth-900 text-lg"
              aria-label="Open cart"
            >
              🛒
              {isClient && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-makhana-600 text-white rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-earth-800 rounded-lg hover:bg-earth-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-white border-b border-earth-100 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-earth-800 font-medium py-1"
            >
              Home
            </Link>
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-earth-800 font-medium py-1"
            >
              Products
            </Link>
            <Link
              href="/#build-box"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-earth-800 font-medium py-1"
            >
              Build Box
            </Link>
            <Link
              href="/#brand-story"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-earth-800 font-medium py-1"
            >
              Our Story
            </Link>
            <Link
              href="/#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-earth-800 font-medium py-1"
            >
              Journey
            </Link>
            <Link
              href="/engineering"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-makhana-700 font-semibold py-1"
            >
              Architecture & Engineering
            </Link>
            <div className="pt-2 border-t border-earth-100">
              <AuthButtons />
            </div>
          </div>
        )}
      </nav>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </>
  );
}
