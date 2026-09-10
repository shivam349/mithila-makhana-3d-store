'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .from(
          badgesRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFFDF9 0%, #FFF8F0 55%, #F7EEDB 100%)',
      }}
    >
      {/* Decorative ambient lighting elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-makhana-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-makhana-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-28 pb-16 lg:py-24">
        {/* Left content */}
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
          {/* Main headline */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3.5 py-1 rounded-full border border-makhana-200/80 mb-3">
              100% ORGANIC LOTUS SEEDS
            </span>
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-earth-900 leading-tight"
            >
              Premium Mithila Makhana
            </h1>
            <p className="text-makhana-700 font-medium text-lg sm:text-xl mt-2 tracking-wide">
              Traditional Foxnuts Direct from Bihar
            </p>
          </div>

          {/* Subheading */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-earth-700 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            Handpicked foxnuts from the fertile wetland floodplains of Mithila. Naturally popped, slow dry-roasted with zero oil, and delivered fresh to your door.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
          >
            <Link href="#products" className="btn-primary">
              Shop Collection
            </Link>
            <Link href="#brand-story" className="btn-secondary">
              Our Heritage
            </Link>
          </div>

          {/* Trust Badges */}
          <div
            ref={badgesRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 max-w-md mx-auto lg:mx-0"
          >
            <div className="badge justify-center text-xs py-2 px-3">
              <span className="text-base">🌿</span>
              <span>100% Natural</span>
            </div>
            <div className="badge justify-center text-xs py-2 px-3">
              <span className="text-base">💪</span>
              <span>High Protein</span>
            </div>
            <div className="badge justify-center text-xs py-2 px-3">
              <span className="text-base">🚜</span>
              <span>Farm Fresh</span>
            </div>
            <div className="badge justify-center text-xs py-2 px-3">
              <span className="text-base">🏠</span>
              <span>Made in Bihar</span>
            </div>
          </div>
        </div>

        {/* Right Visual: Static Hero Image */}
        <div
          ref={imageRef}
          className="relative w-full max-w-lg lg:max-w-none h-[340px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-makhana-200/60 bg-sky-100"
        >
          <Image
            src="/images/hero/mithila-makhana-hero.webp"
            alt="Mithila Makhana customer satisfaction"
            fill
            priority
            className="object-cover object-[75%_center] sm:object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          />
        </div>
      </div>
    </section>
  );
}
