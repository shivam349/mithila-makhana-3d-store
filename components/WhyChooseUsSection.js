'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: '💪',
      title: 'High Protein Snack',
      description: 'Rich in protein and low in fat, perfect for a healthy lifestyle',
    },
    {
      icon: '🚜',
      title: 'Farm Fresh Quality',
      description: 'Directly sourced from local farmers ensuring maximum freshness',
    },
    {
      icon: '🌿',
      title: 'No Preservatives',
      description: 'Naturally roasted without any chemicals or additives',
    },
    {
      icon: '🏠',
      title: 'Direct from Mithila',
      description: 'Authentic foxnuts from the fertile lands of Bihar',
    },
  ];

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className="pt-16 pb-8 sm:pt-20 sm:pb-10 px-4 sm:px-6 bg-[#FFFDF9] border-t border-earth-100"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="opacity-0 translate-y-10 bg-white/90 rounded-2xl p-6 sm:p-7 text-center border border-earth-200/70 shadow-2xs transition-colors duration-200"
            >
              <div className="text-4xl sm:text-5xl mb-3 text-earth-800 select-none">
                {feature.icon}
              </div>
              <h3 className="font-serif font-bold text-lg text-earth-900 mb-2">
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
