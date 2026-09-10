'use client';

import Image from 'next/image';

export default function FromMithilaSection() {
  return (
    <section id="brand-story" className="py-24 bg-[#FFFDF9] border-t border-earth-100 relative overflow-hidden">
      {/* Subtle decorative background blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-makhana-200/20 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3.5 py-1 rounded-full border border-makhana-200/80">
            FROM MITHILA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-earth-900 tracking-tight leading-tight">
            A traditional ingredient, <br className="hidden sm:inline" />
            presented for the modern world.
          </h2>
          <p className="text-base sm:text-lg text-earth-600 font-normal leading-relaxed pt-2">
            In the calm, sunlit freshwater ponds of North Bihar, the lotus seed has been cultivated for centuries. We honor this timeless craft with minimal processing, pure dry-roasting, and complete provenance.
          </p>
        </div>

        {/* Editorial Two-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Imagery Showcase (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="/images/hero/mithila-makhana-hero.webp"
                alt="Traditional Mithila Makhana Bowl"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = '/images/hero/mithila-makhana-hero.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-widest text-makhana-300 font-semibold">
                  Geographical Indication (GI) Certified
                </span>
                <p className="text-sm font-medium text-earth-100">
                  Directly sourced from indigenous wetlands across Darbhanga and Madhubani.
                </p>
              </div>
            </div>

            {/* Floating floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-makhana-200/80 hidden sm:flex items-center gap-3">
              <span className="text-3xl">🪷</span>
              <div>
                <p className="text-xs font-bold text-earth-900">100% Wetland Harvest</p>
                <p className="text-[11px] text-earth-500">Zero Synthetic Fertilizers</p>
              </div>
            </div>
          </div>

          {/* Core Brand Narrative & Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-earth-700 text-sm sm:text-base leading-relaxed">
              <p>
                Mithila Makhana (fox nut or <em>Euryale ferox</em>) is not merely a superfood—it is a cultural lifeline in Bihar. The plant thrives naturally in shallow floodplains, nourished purely by alluvial soil and seasonal monsoon waters.
              </p>
              <p>
                Unlike modern mass-produced snacks that are deep fried in palm oil and saturated with synthetic flavourings, our makhana is carefully popped over clay stoves and dry roasted to retain its high plant protein, dietary fiber, and natural lightness.
              </p>
            </div>

            {/* Three Authentic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-earth-200/80 shadow-2xs space-y-1">
                <span className="text-xl">🌾</span>
                <h4 className="font-serif font-bold text-sm text-earth-900">Native Origin</h4>
                <p className="text-xs text-earth-500">
                  Grown in authentic Mithila wetland ponds.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-earth-200/80 shadow-2xs space-y-1">
                <span className="text-xl">🔥</span>
                <h4 className="font-serif font-bold text-sm text-earth-900">Slow Roasted</h4>
                <p className="text-xs text-earth-500">
                  Zero frying; crisp and nutrient-dense.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-earth-200/80 shadow-2xs space-y-1">
                <span className="text-xl">🤝</span>
                <h4 className="font-serif font-bold text-sm text-earth-900">Fair Sourced</h4>
                <p className="text-xs text-earth-500">
                  Direct procurement empowering local harvesters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
