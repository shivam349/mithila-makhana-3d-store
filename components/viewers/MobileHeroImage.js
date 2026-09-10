'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MobileHeroImage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F0] to-[#F7EEDB]">
      <div
        className={`relative w-full h-full min-h-[300px] transition-all duration-700 ease-out ${
          isLoaded || reducedMotion
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-[0.98] translate-y-[10px]'
        }`}
      >
        <Image
          src="/images/hero/mithila-makhana-hero.webp"
          alt="Premium Mithila Makhana"
          fill
          className="object-cover"
          priority
          unoptimized
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-earth-800 text-[11px] font-semibold px-3 py-1 rounded-full border border-earth-200 shadow-2xs">
          ✨ Pure Handpicked Harvest
        </div>
      </div>
    </div>
  );
}
