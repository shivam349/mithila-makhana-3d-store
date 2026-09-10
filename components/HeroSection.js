'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Single subtle entrance animation (600ms), static thereafter
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16"
    >
      {/* 1. Full-bleed background hero image: original sharp image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero/mithila-makhana-hero.png"
          alt="Premium Mithila Makhana"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[80%_center] sm:object-[82%_center] lg:object-right"
        />
      </div>

      {/* 2. Left-to-right gradient blur overlay:
             - LEFT: soft blur behind text for readability
             - CENTER: gradual smooth transition
             - RIGHT: completely unblurred, keeping man and background 100% sharp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 28%, rgba(0,0,0,0) 58%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 28%, rgba(0,0,0,0) 58%)',
        }}
      />

      {/* 3. Soft warm cream readability fade on the left side only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,253,249,0.95) 0%, rgba(255,253,249,0.88) 30%, rgba(255,253,249,0.40) 48%, rgba(255,253,249,0) 64%)',
        }}
      />

      {/* 3. Hero content placed directly over the image on the LEFT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="max-w-[560px] space-y-6 text-left">
          {/* Category tag & Main headline */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-800 bg-makhana-100/90 px-3.5 py-1 rounded-full border border-makhana-300/80 mb-3 shadow-2xs">
              100% ORGANIC LOTUS SEEDS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-earth-950 leading-[1.15]">
              Premium <br />
              Mithila <br />
              Makhana
            </h1>
            <p className="text-makhana-800 font-semibold text-lg sm:text-xl mt-3 tracking-wide">
              Traditional Foxnuts Direct from Bihar
            </p>
          </div>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-earth-800 leading-relaxed font-normal">
            Handpicked foxnuts from the fertile wetland floodplains of Mithila. Naturally popped, slow dry-roasted with zero oil, and delivered fresh to your door.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-1">
            <Link href="#products" className="btn-primary">
              Shop Collection
            </Link>
            <Link href="#brand-story" className="btn-secondary bg-white/80 backdrop-blur-xs">
              Our Heritage
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
            <div className="badge justify-center text-xs py-2 px-3 bg-white/85 backdrop-blur-xs border border-earth-200/80">
              <span className="text-base">🌿</span>
              <span>100% Natural</span>
            </div>
            <div className="badge justify-center text-xs py-2 px-3 bg-white/85 backdrop-blur-xs border border-earth-200/80">
              <span className="text-base">💪</span>
              <span>High Protein</span>
            </div>
            <div className="badge justify-center text-xs py-2 px-3 bg-white/85 backdrop-blur-xs border border-earth-200/80">
              <span className="text-base">🚜</span>
              <span>Farm Fresh</span>
            </div>
            <div className="badge justify-center text-xs py-2 px-3 bg-white/85 backdrop-blur-xs border border-earth-200/80">
              <span className="text-base">🏠</span>
              <span>Made in Bihar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
