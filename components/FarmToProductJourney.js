'use client';

export default function FarmToProductJourney() {
  const steps = [
    {
      number: '01',
      title: 'SOURCE',
      desc: 'Indigenous perennial wetland ponds in North Bihar, enriched by natural alluvial runoff.',
      icon: '🪷',
    },
    {
      number: '02',
      title: 'HARVEST',
      desc: 'Skilled traditional harvesters gather mature thorny seeds from pond beds at first morning light.',
      icon: '🌊',
    },
    {
      number: '03',
      title: 'SELECT',
      desc: 'Seeds are sun-dried, cleaned, and meticulously graded for size and uniform puff potential.',
      icon: '⚖️',
    },
    {
      number: '04',
      title: 'ROAST',
      desc: 'High-temperature roasting in cast pans, instantly popped open with wooden mallets—never oil fried.',
      icon: '🔥',
    },
    {
      number: '05',
      title: 'PACK',
      desc: 'Immediate vacuum-packing in nitrogen-flushed multi-layer pouches to seal crispness.',
      icon: '📦',
    },
    {
      number: '06',
      title: 'YOU',
      desc: 'Wholesome, preservative-free superfood delivered straight to your pantry anywhere in India.',
      icon: '✨',
    },
  ];

  return (
    <section id="journey" className="py-24 bg-white border-t border-earth-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3.5 py-1 rounded-full border border-makhana-200/80">
            FARM TO PRODUCT JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            How Pure Makhana Reaches You
          </h2>
          <p className="text-earth-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            From the freshwater wetlands of Mithila to your daily healthy snack, followed step-by-step with zero chemical additives.
          </p>
        </div>

        {/* 6-Step Horizontal Journey Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative p-6 rounded-2xl bg-[#FFFDF9] border border-earth-200/80 shadow-2xs hover:shadow-md hover:border-makhana-400 transition-all duration-300 flex flex-col group"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-makhana-50 border border-makhana-200/80 text-makhana-800 flex items-center justify-center font-mono font-bold text-xs">
                  {step.number}
                </span>
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {step.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-base tracking-wider text-earth-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-earth-600 leading-relaxed flex-1">
                {step.desc}
              </p>

              {/* Arrow indicator (hidden on last item and on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-makhana-400 font-bold text-lg select-none">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quality commitment assurance strip */}
        <div className="mt-14 p-6 rounded-2xl bg-makhana-50/70 border border-makhana-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="font-serif font-bold text-sm text-earth-900">
              Preserving Bihar’s Heritage with Zero Intermediaries
            </h4>
            <p className="text-xs text-earth-600">
              Fair compensation for wetland farming communities and direct delivery for peak freshness.
            </p>
          </div>
          <a
            href="#products"
            className="px-5 py-2.5 bg-makhana-600 hover:bg-makhana-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex-shrink-0"
          >
            Taste the Difference →
          </a>
        </div>
      </div>
    </section>
  );
}
