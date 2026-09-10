'use client';

import { useState } from 'react';

export default function NutritionVisualizer() {
  const [servingSize, setServingSize] = useState('100g'); // '100g' | '30g'

  // Verified facts: 347 kcal, 14.5g protein, 63.1g carbs, 4.2g fiber, 3.2g fat per 100g
  const multiplier = servingSize === '30g' ? 0.3 : 1;

  const nutrients = [
    {
      label: 'Plant Protein',
      amount: (14.5 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, 14.5 * multiplier * 4),
      tag: 'Natural Protein',
      barColor: 'bg-makhana-600',
    },
    {
      label: 'Dietary Fiber',
      amount: (4.2 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, 4.2 * multiplier * 7),
      tag: 'Wholesome Fiber',
      barColor: 'bg-emerald-600',
    },
    {
      label: 'Carbohydrates',
      amount: (63.1 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, 63.1 * multiplier * 1.2),
      tag: 'Complex Energy',
      barColor: 'bg-amber-600',
    },
    {
      label: 'Healthy Fats',
      amount: (3.2 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, 3.2 * multiplier * 6),
      tag: 'Naturally Low Fat',
      barColor: 'bg-earth-600',
    },
  ];

  const calories = Math.round(347 * multiplier);

  return (
    <section id="nutrition" className="py-20 bg-white border-t border-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            NUTRITIONAL FACTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Nutrition at a Glance
          </h2>
          <p className="text-sm text-earth-600">
            Wholesome plant-based nourishment, naturally slow-roasted with zero oil.
          </p>

          {/* Serving Toggle */}
          <div className="flex justify-center items-center gap-2 pt-4">
            <span className="text-xs font-semibold text-earth-600">Portion:</span>
            <div className="inline-flex bg-earth-100 p-1 rounded-xl border border-earth-200">
              <button
                type="button"
                onClick={() => setServingSize('30g')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  servingSize === '30g'
                    ? 'bg-white text-earth-900 shadow-xs'
                    : 'text-earth-600 hover:text-earth-900'
                }`}
              >
                Snack Serving (30g)
              </button>
              <button
                type="button"
                onClick={() => setServingSize('100g')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  servingSize === '100g'
                    ? 'bg-white text-earth-900 shadow-xs'
                    : 'text-earth-600 hover:text-earth-900'
                }`}
              >
                Standard (100g)
              </button>
            </div>
          </div>
        </div>

        {/* Visual Cards Grid */}
        <div className="max-w-4xl mx-auto bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-earth-200/80 shadow-sm space-y-8">
          {/* Calorie Card */}
          <div className="p-6 rounded-2xl bg-white border border-earth-200 text-center space-y-1 shadow-2xs">
            <span className="text-[10px] font-bold tracking-widest uppercase text-earth-500">
              ENERGY VALUE ({servingSize})
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-serif font-bold text-4xl sm:text-5xl text-earth-900">
                {calories}
              </span>
              <span className="text-sm font-semibold text-earth-600">kcal</span>
            </div>
            <p className="text-xs text-earth-500">
              Light and naturally satisfying energy without frying or added oil.
            </p>
          </div>

          {/* Macronutrient Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nutrients.map((n) => (
              <div
                key={n.label}
                className="bg-white p-5 rounded-2xl border border-earth-200 shadow-2xs space-y-3"
              >
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-earth-900">{n.label}</h3>
                    <span className="text-[10px] font-semibold text-earth-500">{n.tag}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-bold text-lg text-earth-900">
                      {n.amount}
                    </span>
                    <span className="text-xs font-semibold text-earth-600 ml-0.5">{n.unit}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-earth-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${n.barColor} transition-all duration-500 rounded-full`}
                    style={{ width: `${n.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Clean Quality Guarantees */}
          <div className="pt-4 border-t border-earth-200/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2">
              <span className="text-lg block">🌱</span>
              <span className="text-[11px] font-bold text-earth-900 block mt-1">Zero Trans Fat</span>
              <span className="text-[10px] text-earth-500">Naturally clean</span>
            </div>
            <div className="p-2">
              <span className="text-lg block">🔥</span>
              <span className="text-[11px] font-bold text-earth-900 block mt-1">Slow Dry-Roasted</span>
              <span className="text-[10px] text-earth-500">Zero cooking oil</span>
            </div>
            <div className="p-2">
              <span className="text-lg block">🌾</span>
              <span className="text-[11px] font-bold text-earth-900 block mt-1">Naturally Gluten-Free</span>
              <span className="text-[10px] text-earth-500">100% lotus seed</span>
            </div>
            <div className="p-2">
              <span className="text-lg block">🚫</span>
              <span className="text-[11px] font-bold text-earth-900 block mt-1">No Preservatives</span>
              <span className="text-[10px] text-earth-500">Purity assured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
