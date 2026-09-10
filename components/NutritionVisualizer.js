'use client';

import { useState } from 'react';

export default function NutritionVisualizer() {
  const [servingSize, setServingSize] = useState('100g'); // '100g' | '30g'

  // Verified facts from repository: 347 kcal, 14.5g protein, 63.1g carbs, 4.2g fiber, 3.2g fat per 100g
  const multiplier = servingSize === '30g' ? 0.3 : 1;

  const nutrients = [
    {
      label: 'Plant Protein',
      amount: (14.5 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, (14.5 * multiplier * 4)),
      tag: 'Muscle Support',
      barColor: 'bg-makhana-600',
    },
    {
      label: 'Dietary Fiber',
      amount: (4.2 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, (4.2 * multiplier * 7)),
      tag: 'Digestive Health',
      barColor: 'bg-emerald-600',
    },
    {
      label: 'Carbohydrates',
      amount: (63.1 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, (63.1 * multiplier * 1.2)),
      tag: 'Complex Energy',
      barColor: 'bg-amber-600',
    },
    {
      label: 'Healthy Fats',
      amount: (3.2 * multiplier).toFixed(1),
      unit: 'g',
      percentage: Math.min(100, (3.2 * multiplier * 6)),
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
            NUTRITION PROFILE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Nutrition Visualizer
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
          {/* Calorie Hero Card */}
          <div className="p-6 rounded-2xl bg-white border border-earth-200 text-center space-y-1 shadow-2xs">
            <span className="text-[10px] font-bold tracking-widest uppercase text-earth-500">
              ENERGY VALUE ({servingSize})
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-serif font-bold text-4xl sm:text-5xl text-makhana-800">
                {calories}
              </span>
              <span className="text-sm font-semibold text-earth-600">Calories (kcal)</span>
            </div>
          </div>

          {/* Visual Nutrient Bars */}
          <div className="space-y-4">
            {nutrients.map((item) => (
              <div key={item.label} className="bg-white p-4 rounded-xl border border-earth-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-earth-900">{item.label}</span>
                    <span className="text-[10px] text-earth-500 bg-earth-50 px-2 py-0.5 rounded border border-earth-200">
                      {item.tag}
                    </span>
                  </div>
                  <span className="font-bold text-earth-900 text-sm">
                    {item.amount}{item.unit}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-earth-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.barColor} transition-all duration-500 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Natural Purity Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs pt-2 border-t border-earth-200/60">
            <div className="p-3 bg-white rounded-xl border border-earth-100">
              <p className="font-bold text-earth-900">0%</p>
              <p className="text-earth-500 text-[11px] mt-0.5">Deep Frying</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-earth-100">
              <p className="font-bold text-earth-900">100%</p>
              <p className="text-earth-500 text-[11px] mt-0.5">Plant Based</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-earth-100">
              <p className="font-bold text-earth-900">Zero</p>
              <p className="text-earth-500 text-[11px] mt-0.5">Added Preservatives</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-earth-100">
              <p className="font-bold text-earth-900">Rich</p>
              <p className="text-earth-500 text-[11px] mt-0.5">Natural Minerals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
