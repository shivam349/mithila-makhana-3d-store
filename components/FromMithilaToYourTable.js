'use client';

import Link from 'next/link';

export default function FromMithilaToYourTable() {
  const stages = [
    {
      step: '1',
      name: 'SOURCE',
      origin: 'Mithila Wetlands',
      desc: 'Naturally grown in perennial freshwater ponds across North Bihar.',
      icon: '🪷',
    },
    {
      step: '2',
      name: 'SELECT',
      origin: 'Hand Graded',
      desc: 'Sun-dried seeds inspected and graded for consistent puff volume.',
      icon: '✨',
    },
    {
      step: '3',
      name: 'ROAST',
      origin: 'Zero-Oil Roast',
      desc: 'Slowly dry-roasted in traditional cast pans with no added oils.',
      icon: '🔥',
    },
    {
      step: '4',
      name: 'PACK',
      origin: 'Freshness Sealed',
      desc: 'Vacuum sealed in moisture-barrier pouches to lock in peak crunch.',
      icon: '📦',
    },
    {
      step: '5',
      name: 'ENJOY',
      origin: 'At Your Table',
      desc: 'Delivered directly to your door as a light, wholesome daily snack.',
      icon: '🍽️',
    },
  ];

  return (
    <section id="journey" className="pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#FFFDF9] border-t border-earth-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200/80">
            FARM TO HOME
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            FROM MITHILA TO YOUR TABLE
          </h2>
          <p className="text-sm sm:text-base text-earth-600 leading-relaxed pt-1">
            A simple journey from carefully selected makhana to the snack you enjoy at home.
          </p>
        </div>

        {/* Desktop Horizontal 5-Stage Journey: SOURCE ─── SELECT ─── ROAST ─── PACK ─── ENJOY */}
        <div className="relative">
          {/* Subtle Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-makhana-300 via-earth-300 to-makhana-300 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative z-10">
            {stages.map((stage) => (
              <div
                key={stage.name}
                className="bg-white/95 rounded-2xl p-5 border border-earth-200/80 shadow-2xs flex flex-col items-center text-center select-none"
              >
                {/* Visual Icon with Step Badge */}
                <div className="relative w-13 h-13 rounded-2xl bg-makhana-50 border border-makhana-200/80 flex items-center justify-center text-2xl mb-3">
                  <span>{stage.icon}</span>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-makhana-700 text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                    {stage.step}
                  </span>
                </div>

                {/* Stage Name */}
                <h3 className="font-serif font-bold text-sm tracking-wider text-earth-900 uppercase">
                  {stage.name}
                </h3>

                {/* Short Subtitle */}
                <span className="text-[11px] font-semibold text-makhana-700 mt-0.5 mb-2">
                  {stage.origin}
                </span>

                {/* 1 Short Sentence */}
                <p className="text-xs text-earth-600 leading-relaxed font-normal">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 4: Single Real Navigation Action */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-earth-800 hover:text-makhana-700 transition-colors group cursor-pointer py-1"
          >
            <span>Explore Freshly Roasted Flavors</span>
            <span className="text-makhana-600 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
