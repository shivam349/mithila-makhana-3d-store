'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #8B5E34 0%, #6B4423 50%, #4A2F1A 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          ref={contentRef}
          className="text-center space-y-6 sm:space-y-7"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-200 bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            AUTHENTIC TASTE OF BIHAR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Order Fresh Mithila Makhana Today
          </h2>
          <p className="text-base sm:text-lg text-makhana-100/90 max-w-xl mx-auto leading-relaxed">
            Experience authentic slow-roasted foxnuts, naturally popped over open flames with zero frying. Delivered fresh to your doorstep across India.
          </p>
          <div className="pt-2">
            <Link
              href="#products"
              className="inline-block px-8 py-3.5 rounded-xl font-semibold text-earth-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Shop Fresh Harvest →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
