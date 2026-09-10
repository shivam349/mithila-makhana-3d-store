'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TasteJourney() {
  const [selectedFlavor, setSelectedFlavor] = useState('classic');

  const flavors = {
    classic: {
      id: 'classic',
      name: 'CLASSIC MAKHANA',
      sequence: ['SLOW ROASTED', 'LIGHT SALT', 'CRISP FINISH'],
      accent: 'text-amber-700 bg-amber-50 border-amber-200',
      tagline: 'Delicate, pure roasted crunch with Himalayan pink salt.',
      notes: ['Delicate mineral salt', 'Warm toasted aroma', 'Clean, featherlight mouthfeel'],
      intensity: 'Mild & Crisp',
      pairings: 'Best enjoyed with evening chai, black coffee, or as a light desk snack.',
      productLink: '/product/classic',
      price: '₹249',
    },
    masala: {
      id: 'masala',
      name: 'MASALA SPICED',
      sequence: ['SLOW ROASTED', 'AUTHENTIC SPICE', 'SAVOURY FINISH'],
      accent: 'text-orange-700 bg-orange-50 border-orange-200',
      tagline: 'A bold, aromatic blend of roasted cumin, black pepper, and tangy chaat seasoning.',
      notes: ['Warm cumin warmth', 'Tangy chaat zing', 'Crisp savory coating'],
      intensity: 'Medium Savory',
      pairings: 'Perfect for mid-day cravings, movie nights, or party snack platters.',
      productLink: '/product/masala',
      price: '₹299',
    },
    honey: {
      id: 'honey',
      name: 'HONEY GLAZED',
      sequence: ['SLOW ROASTED', 'RAW FOREST HONEY', 'GOLDEN FINISH'],
      accent: 'text-yellow-800 bg-yellow-50 border-yellow-200',
      tagline: 'Lightly glazed with wild forest honey and gentle cinnamon warmth.',
      notes: ['Natural golden honey', 'Subtle cinnamon hint', 'Guilt-free sweet crunch'],
      intensity: 'Subtly Sweet',
      pairings: 'Excellent as an after-meal sweet treat, dessert topper, or morning energy fuel.',
      productLink: '/product/honey',
      price: '₹349',
    },
    organic: {
      id: 'organic',
      name: 'PREMIUM ORGANIC JUMBO',
      sequence: ['SUN POPPED', 'PURE EARTH', 'AIRY FINISH'],
      accent: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      tagline: 'Unseasoned, grade-1 jumbo kernels preserving pure wetland terroir.',
      notes: ['Natural nutty kernel', 'Largest puff volume', 'Zero oil or additives'],
      intensity: 'Pure & Unseasoned',
      pairings: 'Ideal for custom roasting, fitness diets, or traditional fasting (vrat) preparation.',
      productLink: '/product/premium',
      price: '₹399',
    },
  };

  const current = flavors[selectedFlavor];

  return (
    <section className="py-20 bg-[#FFFDF9] border-t border-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            FLAVOUR PROFILES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Taste Journey
          </h2>
          <p className="text-sm text-earth-600">
            Explore the curated flavor progression of each slow-roasted foxnut variant.
          </p>
        </div>

        {/* Product Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.values(flavors).map((flv) => {
            const isSelected = selectedFlavor === flv.id;
            return (
              <button
                key={flv.id}
                type="button"
                onClick={() => setSelectedFlavor(flv.id)}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-earth-900 text-white border-earth-900 shadow-xs'
                    : 'bg-white text-earth-700 hover:bg-makhana-50 border-earth-200'
                }`}
              >
                {flv.name}
              </button>
            );
          })}
        </div>

        {/* Selected Flavor Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-earth-200/80 shadow-sm space-y-8">
          {/* Flavor Sequence Diagram */}
          <div className="p-6 rounded-2xl bg-makhana-50/50 border border-makhana-200/80">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
              {current.sequence.map((step, idx) => (
                <div key={step} className="flex items-center gap-2 sm:gap-4">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white border border-earth-200 text-xs font-mono font-bold text-earth-900 shadow-2xs">
                    {step}
                  </span>
                  {idx < current.sequence.length - 1 && (
                    <span className="text-makhana-500 font-bold text-sm hidden sm:inline">
                      →
                    </span>
                  )}
                  {idx < current.sequence.length - 1 && (
                    <span className="text-makhana-500 font-bold text-sm sm:hidden">
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flavor Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${current.accent}`}>
                Intensity: {current.intensity}
              </span>
              <h3 className="font-serif font-bold text-2xl text-earth-900">
                {current.name}
              </h3>
              <p className="text-sm text-earth-600 leading-relaxed">
                {current.tagline}
              </p>

              <div className="pt-2">
                <span className="text-xs font-semibold text-earth-500 uppercase tracking-wider block mb-2">
                  Tasting Notes
                </span>
                <ul className="space-y-1.5">
                  {current.notes.map((n, i) => (
                    <li key={i} className="text-xs text-earth-800 flex items-center gap-2">
                      <span className="text-makhana-600 font-bold">✓</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5 bg-[#FFFDF9] p-6 rounded-2xl border border-earth-100 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-semibold text-earth-500 uppercase tracking-wider">
                  Recommended Pairing
                </span>
                <p className="text-xs text-earth-700 mt-1 leading-relaxed">
                  {current.pairings}
                </p>
              </div>

              <div className="pt-4 border-t border-earth-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-earth-500">Price per pack: </span>
                  <span className="font-serif font-bold text-xl text-makhana-800 ml-1">{current.price}</span>
                </div>
                <Link
                  href={current.productLink}
                  className="px-5 py-2.5 bg-makhana-600 hover:bg-makhana-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
                >
                  Explore Pack →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
