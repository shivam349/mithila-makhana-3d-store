'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function TabletHeroCSSViewer() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handlePointerMove = (e) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
    if (clientX === undefined || clientY === undefined) return;

    const xPos = (clientX - rect.left) / rect.width - 0.5;
    const yPos = (clientY - rect.top) / rect.height - 0.5;

    setRotate({
      x: -yPos * 8, // gentle tilt
      y: xPos * 10,
    });
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
      className="relative w-full h-full min-h-[360px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F0] to-[#F7EEDB]"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full h-full overflow-hidden rounded-3xl"
        style={{
          transform: !reducedMotion
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`
            : undefined,
          transition: reducedMotion
            ? 'none'
            : isHovered
            ? 'transform 0.15s ease-out'
            : 'transform 0.6s ease-out',
        }}
      >
        <Image
          src="/images/hero/mithila-makhana-hero.webp"
          alt="Premium Mithila Makhana"
          fill
          className="object-cover"
          priority
          unoptimized
        />

        {/* Ambient layered lighting effect */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + rotate.y * 3}% ${
                50 - rotate.x * 3
              }%, rgba(255,255,255,0.2) 0%, transparent 65%)`,
              opacity: isHovered ? 0.8 : 0.15,
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-earth-950/45 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-earth-800 text-[11px] font-semibold px-3 py-1 rounded-full border border-earth-200 shadow-2xs">
          ✨ Pure Handpicked Harvest
        </div>

        <div className="absolute top-4 right-4 bg-earth-950/80 backdrop-blur-sm text-[10px] font-semibold text-white px-2.5 py-0.5 rounded-full border border-white/20">
          📐 Tablet Depth View
        </div>
      </div>
    </div>
  );
}
