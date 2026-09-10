'use client';

export default function CinematicMithilaStory() {
  const steps = [
    {
      stage: '01',
      title: 'MITHILA',
      subtitle: 'The Geographical Cradle',
      desc: 'The alluvial floodplains of North Bihar create the ideal natural ecology for freshwater lotus seed cultivation.',
      image: '/images/hero/mithila-makhana-hero.webp',
      icon: '🪷',
    },
    {
      stage: '02',
      title: 'SOURCE',
      subtitle: 'Perennial Wetland Ponds',
      desc: 'Grown in sunlit ponds fed by seasonal rains, without synthetic chemical fertilizers or pesticides.',
      image: '/images/products/premium-organic.webp',
      icon: '🌊',
    },
    {
      stage: '03',
      title: 'HARVEST',
      subtitle: 'Traditional Dawn Gathering',
      desc: 'Skilled local harvesters collect seeds directly from pond beds at daybreak, maintaining ecological balance.',
      image: '/images/hero/mithila-makhana-hero.webp',
      icon: '🌾',
    },
    {
      stage: '04',
      title: 'SELECTION',
      subtitle: 'Sun-Drying & Grading',
      desc: 'Seeds are naturally cured in the Bihar sun and sorted by size to guarantee uniform popping.',
      image: '/images/products/classic-makhana.webp',
      icon: '⚖️',
    },
    {
      stage: '05',
      title: 'ROASTING',
      subtitle: 'Clay Oven Popping',
      desc: 'Heated in cast pans and instantly burst open by hand—slow roasted without oil or deep frying.',
      image: '/images/products/masala-makhana.webp',
      icon: '🔥',
    },
    {
      stage: '06',
      title: 'PACKAGING',
      subtitle: 'Vacuum Sealed at Source',
      desc: 'Multi-layer barrier pouches lock in moisture-free crunchiness for lasting crisp texture.',
      image: '/images/products/honey-makhana.webp',
      icon: '📦',
    },
    {
      stage: '07',
      title: 'CUSTOMER',
      subtitle: 'Pure Daily Nourishment',
      desc: 'Direct from Mithila to your home table, supporting healthy snacking across India.',
      image: '/images/hero/mithila-makhana-hero.webp',
      icon: '✨',
    },
  ];

  return (
    <section className="py-24 bg-earth-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-400 bg-earth-900 px-3 py-1 rounded-full border border-earth-800">
            CINEMATIC STORY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            From the Waters of Mithila <br className="hidden sm:inline" />
            to Your Daily Ritual.
          </h2>
          <p className="text-sm sm:text-base text-earth-300 max-w-2xl leading-relaxed pt-2">
            Follow the authentic 7-stage lineage of Bihar’s GI-tagged superfood, harvested with generational reverence.
          </p>
        </div>

        {/* 7-Stage Visual Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {steps.map((item, idx) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-earth-900/80 border border-earth-800 flex flex-col justify-between hover:border-makhana-500 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-makhana-400 mb-3 font-mono font-bold">
                  <span>STAGE {item.stage}</span>
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm tracking-wider text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] font-semibold text-makhana-300 mb-2">
                  {item.subtitle}
                </p>

                <p className="text-xs text-earth-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-earth-800/80 text-[10px] text-earth-500 uppercase tracking-wider">
                Step {idx + 1} of 7
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
