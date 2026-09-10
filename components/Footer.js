'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-950 text-earth-200 pt-16 pb-12 px-4 sm:px-6 border-t border-earth-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-makhana-600 text-white flex items-center justify-center font-serif text-lg font-bold">
                M
              </span>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Mithila Makhana
              </span>
            </div>
            <p className="text-sm text-earth-400 leading-relaxed max-w-sm">
              Cultivated in the pristine wetland ponds of North Bihar. Handpicked, slow dry-roasted with zero oil, and vacuum-sealed for wholesome daily nourishment.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-earth-400">
              <span className="inline-flex items-center gap-1 bg-earth-900 px-3 py-1 rounded-full border border-earth-800 text-makhana-300">
                <span>🪷</span>
                <span>GI Tagged Origin</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-earth-900 px-3 py-1 rounded-full border border-earth-800 text-emerald-300">
                <span>✓</span>
                <span>100% Organic</span>
              </span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-makhana-400">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/product/classic" className="hover:text-white transition-colors">
                  Classic Roasted Makhana
                </Link>
              </li>
              <li>
                <Link href="/product/masala" className="hover:text-white transition-colors">
                  Masala Roasted Makhana
                </Link>
              </li>
              <li>
                <Link href="/product/premium" className="hover:text-white transition-colors">
                  Premium Organic Jumbo
                </Link>
              </li>
              <li>
                <Link href="/product/honey" className="hover:text-white transition-colors">
                  Honey Glazed Makhana
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Story & Heritage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-makhana-400">
              Our Story
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#brand-story" className="hover:text-white transition-colors">
                  From Mithila
                </a>
              </li>
              <li>
                <a href="/#journey" className="hover:text-white transition-colors">
                  Farm to Table Journey
                </a>
              </li>
              <li>
                <a href="/#benefits" className="hover:text-white transition-colors">
                  Health & Nutrition
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-makhana-400">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/cart" className="hover:text-white transition-colors">
                  Track & Complete Order
                </a>
              </li>
              <li>
                <Link href="/engineering" className="text-makhana-400 hover:text-white transition-colors font-medium">
                  Architecture & Engineering
                </Link>
              </li>
              <li>
                <span className="text-earth-400">
                  Shipping: All India Free
                </span>
              </li>
              <li>
                <span className="text-earth-400">
                  Returns: 7-Day Replacement
                </span>
              </li>
              <li>
                <a href="mailto:hello@mithilamakhana.com" className="hover:text-white transition-colors">
                  Contact: hello@mithilamakhana.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Engineering Attribution */}
        <div className="pt-8 border-t border-earth-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth-500">
          <p>
            © {currentYear} Mithila Makhana. All rights reserved. Direct from Darbhanga, Bihar.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/engineering" className="text-earth-400 hover:text-white transition-colors">
              /engineering
            </Link>
            <span className="text-earth-400">Privacy</span>
            <span className="text-earth-400">Terms</span>
            <a
              href="https://github.com/shivam349/mithila-makhana-3d-store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-makhana-400 hover:text-makhana-300 font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <span>Built as a modern ecommerce engineering project</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
