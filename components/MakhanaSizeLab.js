'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MakhanaSizeLab() {
  const [selectedGrade, setSelectedGrade] = useState('jumbo');

  const grades = {
    jumbo: {
      id: 'jumbo',
      label: 'JUMBO',
      gradeTag: 'Grade 1 Selection',
      kernelScale: 'w-24 h-24 sm:w-28 sm:h-28',
      visualSize: 'Extra Large Puff',
      texture: 'Maximum puff volume with an ultra-light, crisp melt-in-mouth texture.',
      bestUse: 'Festive snacking, luxury gifting, and standalone roasted crunch with pink salt.',
      productLink: '/product/premium',
      productName: 'Premium Organic Jumbo',
      features: ['Airiest puff volume', 'Hand-sorted uniform kernels', 'Zero broken pieces'],
    },
    premium: {
      id: 'premium',
      label: 'PREMIUM',
      gradeTag: 'Grade 2 Selection',
      kernelScale: 'w-20 h-20 sm:w-22 sm:h-22',
      visualSize: 'Balanced Medium-Large',
      texture: 'Consistent density and satisfying crunch that holds natural spice seasonings.',
      bestUse: 'Daily afternoon snacking, tea-time crunch, and flavored savory roasts.',
      productLink: '/product/classic',
      productName: 'Classic & Masala Makhana',
      features: ['Balanced crisp crunch', 'Optimal spice absorption', 'Everyday wholesome snacking'],
    },
    standard: {
      id: 'standard',
      label: 'STANDARD',
      gradeTag: 'Grade 3 Selection',
      kernelScale: 'w-16 h-16 sm:w-18 sm:h-18',
      visualSize: 'Traditional Natural Puff',
      texture: 'Compact, firm crunch with traditional earthy nuttiness.',
      bestUse: 'Traditional makhana kheer, roasted savory trail mixes, curries, and soups.',
      productLink: '/product/classic',
      productName: 'Everyday Roasted Makhana',
      features: ['Natural harvest size', 'Quick roasting absorption', 'High fiber density'],
    },
  };

  const active = grades[selectedGrade];

  return (
    <section id="grade-guide" className="py-20 bg-[#FFFDF9] border-t border-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            GRADE GUIDE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Makhana Grade Guide
          </h2>
          <p className="text-sm text-earth-600">
            Compare kernel grades to find your ideal balance of volume, crispness, and texture.
          </p>
        </div>

        {/* Grade Selection Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10">
          {Object.values(grades).map((g) => {
            const isSelected = selectedGrade === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGrade(g.id)}
                className={`px-5 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-earth-900 text-white border-earth-900 shadow-sm'
                    : 'bg-white text-earth-700 hover:bg-makhana-50 border-earth-200'
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Visual Grade Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-earth-200/80 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Visual Kernel Display (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-makhana-50/50 rounded-2xl border border-makhana-100 min-h-[260px] text-center relative overflow-hidden">
            {/* Visual Kernel Representation */}
            <div
              className={`${active.kernelScale} rounded-full bg-gradient-to-br from-white via-makhana-100 to-makhana-200 shadow-md flex items-center justify-center border-2 border-makhana-300 transition-all duration-500 transform`}
            >
              <span className="text-3xl sm:text-4xl">🌾</span>
            </div>

            <div className="mt-6 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-makhana-700 bg-white px-2.5 py-0.5 rounded-full border border-makhana-200">
                {active.gradeTag}
              </span>
              <p className="font-serif font-bold text-sm text-earth-900 pt-1">
                {active.visualSize}
              </p>
            </div>
          </div>

          {/* Detailed Verified Attributes (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-semibold text-earth-500 uppercase tracking-wider">
                Texture & Mouthfeel
              </span>
              <p className="text-sm font-medium text-earth-800 mt-1 leading-relaxed">
                {active.texture}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-earth-500 uppercase tracking-wider">
                Best Use
              </span>
              <p className="text-sm font-medium text-earth-800 mt-1 leading-relaxed">
                {active.bestUse}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-earth-500 uppercase tracking-wider block mb-2">
                Key Qualities
              </span>
              <div className="flex flex-wrap gap-2">
                {active.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-earth-50 text-earth-800 border border-earth-200"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-earth-100">
              <div>
                <span className="text-xs text-earth-500">Available in: </span>
                <span className="font-semibold text-sm text-earth-900">{active.productName}</span>
              </div>
              <Link
                href={active.productLink}
                className="px-4 py-2 bg-makhana-600 hover:bg-makhana-700 text-white rounded-xl text-xs font-semibold transition-all shadow-2xs"
              >
                View {active.label} Pack →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
