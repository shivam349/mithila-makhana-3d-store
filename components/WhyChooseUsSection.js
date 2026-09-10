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
      className="py-16 sm:py-20 px-4 sm:px-6 bg-[#FFFDF9] border-t border-earth-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="opacity-0 translate-y-10 card-base p-8 text-center hover:shadow-card transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-heading mb-3 group-hover:text-makhana-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-body">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
