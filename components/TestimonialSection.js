'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Health Enthusiast',
    text: 'The quality of makhana is exceptional! Fresh, crispy, and no artificial flavors. This is my go-to healthy snack now.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Raj Kumar',
    role: 'Fitness Coach',
    text: 'I recommend Mithila Makhana to all my clients. Perfect for post-workout snacking with great protein content.',
    rating: 5,
    avatar: '👨‍🏫',
  },
  {
    name: 'Ananya Gupta',
    role: 'Food Blogger',
    text: 'Authentic taste of Mithila, delivered to your door. The 3D shopping experience is truly innovative!',
    rating: 5,
    avatar: '👩‍🍳',
  },
  {
    name: 'Vikram Singh',
    role: 'Business Owner',
    text: 'Fast delivery, great customer service, and premium quality. What more can you ask for?',
    rating: 5,
    avatar: '👨‍💼',
  },
];

export default function TestimonialSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          opacity: 0,
          y: 35,
          duration: 0.7,
          stagger: 0.1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="pt-8 pb-16 sm:pt-10 sm:pb-20 px-4 sm:px-6 bg-[#FFFDF9] border-t border-earth-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-sm text-earth-600 max-w-xl mx-auto">
            Read what our community has to say about the authentic taste and crunch of our slow-roasted Mithila foxnuts.
          </p>
        </div>

        {/* Informative Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white/95 rounded-2xl p-6 sm:p-7 border border-earth-200/70 shadow-2xs select-none"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="text-4xl select-none">{testimonial.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-earth-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-earth-500 font-medium">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-makhana-500 text-xs">★</span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-earth-700 leading-relaxed italic font-normal">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Rating Metrics Bar */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-earth-200/60 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-serif font-bold text-earth-900">4.9/5</p>
            <p className="text-xs sm:text-sm text-earth-600 font-medium mt-1">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-serif font-bold text-earth-900">2,000+</p>
            <p className="text-xs sm:text-sm text-earth-600 font-medium mt-1">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-serif font-bold text-earth-900">10,000+</p>
            <p className="text-xs sm:text-sm text-earth-600 font-medium mt-1">Orders Delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}
