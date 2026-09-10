'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is makhana?',
    a: 'Makhana, also known as foxnuts or gorgon lotus seeds, are the naturally harvested and popped seeds of the lotus plant (Euryale ferox). They are naturally high in plant protein and dietary fiber, zero in cholesterol, and serve as an ideal healthy, crunchy daily snack.',
  },
  {
    q: 'Where does your makhana come from?',
    a: 'Our makhana is sourced directly from the fertile wetland floodplains and perennial ponds of the Mithila region in North Bihar, India. Mithila produces over 85% of the world’s high-grade lotus seeds and holds a protected Geographical Indication (GI) status.',
  },
  {
    q: 'Is your makhana roasted or fried?',
    a: 'All our makhana is 100% slow dry-roasted with zero oil and zero frying. We never use palm oil, hydrogenated fats, chemical preservatives, or artificial additives.',
  },
  {
    q: 'What grades and sizes are available?',
    a: 'We offer three distinct harvest grades: Jumbo (Grade 1 extra-large puffs for premium crunch), Premium (Grade 2 balanced size for optimal seasoning retention), and Standard (Grade 3 traditional natural harvest puff).',
  },
  {
    q: 'How should I store makhana and how long does it stay fresh?',
    a: 'Store in a cool, dry place away from direct sunlight. Once opened, transfer to an airtight container to preserve maximum crunchiness. Unopened sealed pouches retain peak freshness for up to 6 months from packaging.',
  },
  {
    q: 'How long does delivery take?',
    a: 'We dispatch all orders fresh within 24 to 48 hours. Standard domestic delivery typically takes 3 to 5 business days depending on your location in India.',
  },
  {
    q: 'Are your products FSSAI certified?',
    a: 'Yes. Our processing, sorting, and packaging facilities strictly adhere to national food safety guidelines under FSSAI Registration No. 10021033000124.',
  },
  {
    q: 'What is your return and replacement policy?',
    a: 'We offer a hassle-free 7-day replacement guarantee on all sealed pouches if your package arrives compromised, damaged, or unsealed during transit. Contact our support team with your order details.',
  },
  {
    q: 'How can I contact customer support?',
    a: 'You can reach us directly via email at shivamgarg1515@gmail.com for order tracking, bulk gifting, or product support. Our team responds within 24 hours.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#FFFDF9] border-t border-earth-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-earth-600">
            Everything you need to know about our sourcing, roasting, and delivery.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-earth-200/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex justify-between items-center gap-4 hover:bg-makhana-50/40 transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-earth-900">
                    {faq.q}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full bg-earth-100 flex items-center justify-center text-xs font-bold text-earth-700 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-makhana-100 text-makhana-800' : ''
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-earth-100">
                    <p className="text-xs sm:text-sm text-earth-700 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
