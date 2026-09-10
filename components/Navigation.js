'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { usePathname } from 'next/navigation';
import CartDrawer from './CartDrawer';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCart();
  const pathname = usePathname();
  const totalItems = getTotalItems();

  const isAdminPage = pathname?.startsWith('/admin') || pathname === '/admin-login';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render navigation on admin pages
  if (isAdminPage) {
    return null;
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/#products' },
    { label: 'Choose', href: '/#choose' },
    { label: 'Build Box', href: '/#build-box' },
    { label: 'Our Story', href: '/#brand-story' },
    { label: 'Journey', href: '/#journey' },
    { label: 'Engineering', href: '/engineering', isBadge: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-earth-100 py-3'
            : 'bg-white/90 backdrop-blur-sm py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <span className="w-8 h-8 rounded-full bg-makhana-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:scale-105 transition-transform">
              M
            </span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-serif font-bold text-earth-900 tracking-tight leading-none">
                Mithila Makhana
              </span>
              <span className="text-[10px] tracking-widest uppercase text-makhana-700 font-medium mt-0.5">
                Traditional · Pure · Organic
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible on lg: 1024px+ for clean spacing without overflow) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) =>
              link.isBadge ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-makhana-700 hover:text-makhana-900 transition-colors font-semibold text-xs px-2.5 py-1 bg-makhana-50 hover:bg-makhana-100 rounded-lg border border-makhana-200"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-earth-700 hover:text-makhana-700 transition-colors font-medium text-sm"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Action Controls: Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-makhana-50 border border-makhana-200 text-earth-900 hover:bg-makhana-100 transition-all text-xs sm:text-sm font-semibold shadow-2xs"
              aria-label="Open cart"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Cart</span>
              {isClient && totalItems > 0 && (
                <span className="bg-makhana-700 text-white rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Menu Button (Visible < lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-earth-800 rounded-xl hover:bg-earth-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <span className="text-xl font-bold leading-none">✕</span>
              ) : (
                <span className="text-xl leading-none">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 py-5 bg-white border-b border-earth-200/80 shadow-lg space-y-3 animate-fadeInDown">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 text-sm font-medium transition-colors ${
                  link.isBadge
                    ? 'text-makhana-700 font-semibold inline-block px-3 py-1 bg-makhana-50 rounded-lg border border-makhana-200'
                    : 'text-earth-800 hover:text-makhana-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </>
  );
}
