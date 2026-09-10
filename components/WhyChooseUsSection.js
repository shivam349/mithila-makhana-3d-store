'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: '💪',
      title: 'High Protein Snack',
      description: 'Rich in natural plant protein and dietary fiber for clean, sustained energy.',
    },
    {
      icon: '🚜',
      title: 'Direct Farm Harvest',
      description: 'Handpicked from authentic Mithila wetland ponds ensuring peak freshness.',
    },
    {
      icon: '🌿',
      title: 'Zero-Oil Dry Roast',
      description: 'Naturally popped and slow roasted without palm oil, chemicals, or frying.',
    },
    {
      icon: '🏠',
      title: 'Protected GI Origin',
      description: 'Authentic Bihar Geographical Indication provenance with complete purity.',
    },
  ];

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFFDF9] border-t border-earth-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            OUR PROMISE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Why Choose Mithila Makhana
          </h2>
          <p className="text-sm text-earth-600 max-w-xl mx-auto">
            Direct from North Bihar wetlands, naturally slow-roasted with zero oil and uncompromised purity.
          </p>
        </div>

        {/* Informative Cards Grid (Clean, non-clickable presentation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white rounded-2xl p-6 text-center border border-earth-200/80 shadow-2xs"
            >
              <div className="text-3xl sm:text-4xl mb-3 text-earth-800 select-none">
                {feature.icon}
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-earth-900 mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
