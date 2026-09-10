'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';

export default function BuildYourBox() {
  const { addToCart, openCart } = useCart();
  const [addedSuccess, setAddedSuccess] = useState(false);

  const availableItems = [
    {
      id: 'box-classic',
      name: 'Classic Roasted Makhana',
      price: 249,
      badge: 'Lightly Salted',
      image: '/images/products/classic-makhana.webp',
    },
    {
      id: 'box-masala',
      name: 'Masala Spiced Makhana',
      price: 299,
      badge: 'Traditional Spices',
      image: '/images/products/masala-makhana.webp',
    },
    {
      id: 'box-organic',
      name: 'Premium Organic Jumbo',
      price: 399,
      badge: 'Certified Organic',
      image: '/images/products/premium-organic.webp',
    },
    {
      id: 'box-honey',
      name: 'Honey Glazed Makhana',
      price: 349,
      badge: 'Raw Forest Honey',
      image: '/images/products/honey-makhana.webp',
    },
  ];

  // Selection counts for each product
  const [counts, setCounts] = useState({
    'box-classic': 1,
    'box-masala': 1,
    'box-organic': 1,
    'box-honey': 1,
  });

  const totalSelected = Object.values(counts).reduce((a, b) => a + b, 0);
  const targetCount = 4;

  const handleIncrement = (id) => {
    if (totalSelected < targetCount) {
      setCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const handleDecrement = (id) => {
    if (counts[id] > 0) {
      setCounts((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  // Calculate dynamic total from actual prices
  const totalAmount = availableItems.reduce((total, item) => {
    return total + (counts[item.id] || 0) * item.price;
  }, 0);

  const handleAddBoxToCart = () => {
    if (totalSelected !== targetCount) return;

    // Create itemized summary string
    const summaryBreakdown = availableItems
      .filter((i) => counts[i.id] > 0)
      .map((i) => `${i.name} (x${counts[i.id]})`)
      .join(', ');

    const boxProduct = {
      _id: `custom-box-${Date.now()}`,
      name: `Custom 4-Pack Makhana Box`,
      price: totalAmount,
      image: '/images/hero/mithila-makhana-hero.webp',
      description: `Custom curated box: ${summaryBreakdown}`,
      category: 'custom-bundle',
      quantity: 1,
    };

    addToCart(boxProduct, 1);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
    openCart();
  };

  return (
    <section id="build-box" className="py-20 bg-[#FFFDF9] border-t border-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            CUSTOM BUNDLE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Build Your Makhana Box
          </h2>
          <p className="text-sm text-earth-600">
            Handpick any 4 packs from our artisanal collection for a personalized tasting experience.
          </p>
        </div>

        {/* Builder Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-earth-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Product Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif font-bold text-base text-earth-900">
              Choose 4 Products:
            </h3>

            <div className="space-y-3">
              {availableItems.map((item) => {
                const count = counts[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-earth-200/80 hover:border-makhana-300 transition-all flex items-center justify-between gap-3 bg-[#FFFDF9]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl bg-white border border-earth-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-earth-900 truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-bold text-xs text-makhana-800">₹{item.price}</span>
                          <span className="text-[10px] text-earth-500 bg-white px-2 py-0.5 rounded border border-earth-200">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Counter Buttons */}
                    <div className="flex items-center border border-earth-200 rounded-xl bg-white overflow-hidden flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleDecrement(item.id)}
                        disabled={count === 0}
                        className="w-8 h-8 flex items-center justify-center text-earth-700 hover:bg-earth-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-sm transition-colors"
                        aria-label={`Decrease ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-earth-900">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(item.id)}
                        disabled={totalSelected >= targetCount}
                        className="w-8 h-8 flex items-center justify-center text-earth-700 hover:bg-earth-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-sm transition-colors"
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Box Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-makhana-50/60 rounded-2xl p-6 border border-makhana-200/80 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-makhana-700">
                BOX SUMMARY
              </span>
              <h4 className="font-serif font-bold text-lg text-earth-900 mt-0.5">
                Your Curated Tasting Box
              </h4>
            </div>

            {/* Progress indicator */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-earth-700 mb-1.5">
                <span>Packs Selected:</span>
                <span className={totalSelected === targetCount ? 'text-emerald-700 font-bold' : 'text-makhana-800 font-bold'}>
                  {totalSelected} / {targetCount} selected
                </span>
              </div>
              <div className="w-full h-2.5 bg-earth-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    totalSelected === targetCount ? 'bg-emerald-600' : 'bg-makhana-600'
                  }`}
                  style={{ width: `${(totalSelected / targetCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Selected Breakdown */}
            <div className="bg-white rounded-xl p-3 border border-makhana-100 space-y-1.5 text-xs text-earth-700">
              <p className="font-semibold text-earth-900 text-[11px] uppercase tracking-wider">
                Box Contents:
              </p>
              {totalSelected === 0 ? (
                <p className="text-earth-400 italic">Select 4 packs to fill your box</p>
              ) : (
                availableItems.map((i) => {
                  const c = counts[i.id] || 0;
                  if (c === 0) return null;
                  return (
                    <div key={i.id} className="flex justify-between">
                      <span className="truncate pr-2">{i.name}</span>
                      <span className="font-bold flex-shrink-0">
                        {c} × ₹{i.price}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total Price & CTA */}
            <div className="pt-2 border-t border-makhana-200/70 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-earth-700">Bundle Total:</span>
                <span className="text-2xl font-serif font-bold text-earth-900">
                  ₹{totalAmount}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddBoxToCart}
                disabled={totalSelected !== targetCount}
                className="w-full py-3.5 bg-earth-900 hover:bg-black text-white font-semibold rounded-xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
              >
                {totalSelected === targetCount ? (
                  <>
                    <span>Add Box to Cart · ₹{totalAmount}</span>
                    <span>→</span>
                  </>
                ) : (
                  <span>Select {targetCount - totalSelected} More Pack{targetCount - totalSelected > 1 ? 's' : ''}</span>
                )}
              </button>

              <p className="text-[11px] text-center text-earth-500">
                📦 Packed together in a premium gift-ready box with free all-India shipping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
