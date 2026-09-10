'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { isWebGLAvailable } from '@/lib/webglUtils';

// Dynamically import desktop 3D component so Three.js bundle is NOT loaded on mobile/tablet (<= 768px)
const DesktopHeroScene = dynamic(() => import('./3d/DesktopHeroScene'), {
  ssr: false,
  loading: () => <StaticHeroImage />,
});

function StaticHeroImage() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden rounded-3xl">
      <Image
        src="/images/hero/mithila-makhana-hero.webp"
        alt="Premium Mithila Makhana"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-earth-950/40 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-earth-800 text-[11px] font-semibold px-3 py-1 rounded-full border border-earth-200 shadow-2xs">
        ✨ Pure Handpicked Harvest
      </div>
    </div>
  );
}

export default function MakhanaScene({ classNameProp = '' }) {
  // Initial state is strictly false to ensure SSR and initial render never mount Three.js
  const [isDesktop3D, setIsDesktop3D] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      // RULE: width <= 768px is Mobile/Tablet -> STRICTLY static product image, NO Three.js
      // Only width > 768px with WebGL support loads Desktop 3D
      const isDesktop = window.innerWidth > 768;
      if (isDesktop && isWebGLAvailable()) {
        setIsDesktop3D(true);
      } else {
        setIsDesktop3D(false);
      }
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <div className={`w-full h-full rounded-3xl overflow-hidden ${classNameProp}`}>
      {isDesktop3D ? (
        <DesktopHeroScene fallback={<StaticHeroImage />} />
      ) : (
        <StaticHeroImage />
      )}
    </div>
  );
}
