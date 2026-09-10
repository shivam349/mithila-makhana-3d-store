'use client';

export default function WhyMithilaSection() {
  return (
    <section className="py-20 bg-white border-t border-earth-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
                WHY MITHILA
              </span>
              <div className="pt-1">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-earth-900 tracking-tight">
                  Mithila
                </h2>
                <p className="text-base sm:text-lg font-medium text-makhana-700">
                  Bihar, India
                </p>
              </div>
            </div>

            <p className="text-earth-700 text-sm sm:text-base leading-relaxed">
              Mithila foxnuts are deeply intertwined with the cultural ecology of North Bihar. In the calm freshwater wetlands of Darbhanga, Madhubani, and Sitamarhi, makhana plants thrive naturally in shallow perennial ponds without requiring artificial fertilizers.
            </p>

            <p className="text-earth-700 text-sm sm:text-base leading-relaxed">
              Awarded the prestigious Geographical Indication (GI) tag, Mithila Makhana represents an authentic agrarian heritage where harvesting and popping methods have been preserved by local communities for generations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-earth-200/80">
                <p className="text-xs text-earth-500 font-semibold uppercase">Origin</p>
                <p className="font-serif font-bold text-earth-900 text-sm mt-0.5">North Bihar Ponds</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-earth-200/80">
                <p className="text-xs text-earth-500 font-semibold uppercase">Harvest</p>
                <p className="font-serif font-bold text-earth-900 text-sm mt-0.5">Handpicked at Dawn</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-earth-200/80">
                <p className="text-xs text-earth-500 font-semibold uppercase">Roasting</p>
                <p className="font-serif font-bold text-earth-900 text-sm mt-0.5">Dry-Roasted, 0% Oil</p>
              </div>
            </div>
          </div>

          {/* Right Photographic Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-makhana-50">
              <img
                src="/images/hero/mithila-makhana-hero.webp"
                alt="Authentic Mithila Makhana Harvest"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/hero/mithila-makhana-hero.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-serif font-bold text-base">GI Tagged Mithila Makhana</p>
                <p className="text-xs text-earth-200">Preserving indigenous North Bihar harvesting traditions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
