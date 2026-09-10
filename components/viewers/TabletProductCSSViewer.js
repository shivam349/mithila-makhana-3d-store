'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function TabletProductCSSViewer({ asset }) {
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

    const xPos = (clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const yPos = (clientY - rect.top) / rect.height - 0.5;

    // Subtle 3D perspective rotation (max ~12 deg)
    setRotate({
      x: -yPos * 14,
      y: xPos * 16,
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
      className="relative w-full h-full min-h-[380px] bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F0] to-[#F7EEDB] flex items-center justify-center p-6 overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Dimensional Card */}
      <div
        className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden shadow-xl border border-earth-200/80 bg-white"
        style={{
          transform: !reducedMotion
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.03 : 1})`
            : undefined,
          transition: reducedMotion
            ? 'none'
            : isHovered
            ? 'transform 0.15s ease-out'
            : 'transform 0.5s ease-out',
          boxShadow: isHovered
            ? `${-rotate.y * 1.5}px ${rotate.x * 1.5 + 15}px 35px rgba(107, 68, 35, 0.15)`
            : '0 10px 30px rgba(107, 68, 35, 0.1)',
        }}
      >
        <Image
          src={asset.image}
          alt={asset.name}
          fill
          className="object-cover transition-transform duration-500 ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          unoptimized
        />

        {/* Ambient specular highlight layer reacting to tilt */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + rotate.y * 2}% ${
                50 - rotate.x * 2
              }%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
              opacity: isHovered ? 0.9 : 0.2,
            }}
          />
        )}

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[11px] font-bold text-earth-800 px-3 py-1 rounded-full border border-earth-200 shadow-2xs">
          Pure Mithila Harvest
        </div>

        {/* Tablet interactive indicator badge */}
        <div className="absolute bottom-3 left-3 bg-earth-950/80 backdrop-blur-sm text-[10px] font-semibold text-white px-2.5 py-0.5 rounded-full border border-white/20">
          📐 Touch &amp; Tilt View
        </div>
      </div>
    </div>
  );
}
