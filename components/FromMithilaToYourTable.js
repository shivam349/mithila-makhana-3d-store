'use client';

export default function FromMithilaToYourTable() {
  const stages = [
    {
      step: '1',
      name: 'SOURCE',
      origin: 'Mithila',
      desc: 'Naturally grown in perennial freshwater ponds across North Bihar.',
      icon: '🪷',
    },
    {
      step: '2',
      name: 'SELECT',
      origin: 'Carefully selected',
      desc: 'Sun-dried seeds inspected and graded for consistent puff volume.',
      icon: '✨',
    },
    {
      step: '3',
      name: 'ROAST',
      origin: 'Crisp texture',
      desc: 'Carefully prepared and dry-roasted over cast pans with zero oil.',
      icon: '🔥',
    },
    {
      step: '4',
      name: 'PACK',
      origin: 'Packed for freshness',
      desc: 'Vacuum sealed in moisture-barrier pouches to preserve peak crunch.',
      icon: '📦',
    },
    {
      step: '5',
      name: 'ENJOY',
      origin: 'At your table',
      desc: 'Delivered directly to your home as a light, wholesome daily snack.',
      icon: '🍽️',
    },
  ];

  return (
    <section id="journey" className="py-16 sm:py-20 bg-[#FFFDF9] border-t border-earth-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 relative z-10">
            {stages.map((stage, idx) => (
              <div
                key={stage.name}
                className="bg-white rounded-2xl p-5 border border-earth-200/80 shadow-2xs hover:shadow-md hover:border-makhana-400 transition-all flex flex-col items-center text-center group"
              >
                {/* Visual Icon with Step Badge */}
                <div className="relative w-14 h-14 rounded-2xl bg-makhana-50 border border-makhana-200/80 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
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
                <p className="text-xs text-earth-600 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
