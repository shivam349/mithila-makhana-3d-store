'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MobileProductImage({ asset }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchTilt, setTouchTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subtle interactive micro-tilt on mobile touch
  const handleTouchMove = (e) => {
    if (reducedMotion || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 6; // Max 3deg tilt
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * -6;
    setTouchTilt({ x, y });
  };

  const handleTouchEnd = () => {
    setTouchTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full h-full min-h-[380px] bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F0] to-[#F7EEDB] flex items-center justify-center p-6 overflow-hidden rounded-3xl"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden shadow-md border border-earth-200/80 bg-white transition-all duration-500 ease-out ${
          isLoaded || reducedMotion
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-3 scale-98'
        }`}
        style={{
          transform: !reducedMotion && (touchTilt.x !== 0 || touchTilt.y !== 0)
            ? `perspective(800px) rotateX(${touchTilt.y}deg) rotateY(${touchTilt.x}deg) scale(1.01)`
            : undefined,
        }}
      >
        <Image
          src={asset.image}
          alt={asset.name}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          unoptimized
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[11px] font-bold text-earth-800 px-3 py-1 rounded-full border border-earth-200 shadow-2xs">
          Pure Mithila Harvest
        </div>
      </div>
    </div>
  );
}
