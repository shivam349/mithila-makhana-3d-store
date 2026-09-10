'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/context/CartContext';

export default function ChooseYourMakhana() {
  const [activePreference, setActivePreference] = useState('all');
  const { addToCart, buyNow } = useCart();
  const [addedId, setAddedId] = useState(null);

  const preferences = [
    { id: 'all', label: 'ALL SNACKS' },
    { id: 'crunchy', label: 'CRUNCHY' },
    { id: 'spicy', label: 'SPICY' },
    { id: 'sweet', label: 'SWEET' },
    { id: 'light', label: 'LIGHT' },
    { id: 'premium', label: 'PREMIUM' },
  ];

  const products = [
    {
      id: 1,
      name: 'Classic Makhana',
      tags: ['crunchy', 'light'],
      price: 249,
      badge: 'Lightly Salted',
      image: '/images/products/classic-makhana.webp',
      slug: 'classic',
      pitch: 'Pure roasted foxnuts with delicate Himalayan salt crystals.',
    },
    {
      id: 2,
      name: 'Masala Makhana',
      tags: ['spicy', 'crunchy'],
      price: 299,
      badge: 'Indian Spiced',
      image: '/images/products/masala-makhana.webp',
      slug: 'masala',
      pitch: 'Slow roasted with roasted cumin, black pepper, and tangy chaat spices.',
    },
    {
      id: 3,
      name: 'Premium Organic',
      tags: ['premium', 'crunchy', 'light'],
      price: 399,
      badge: 'Certified Organic',
      image: '/images/products/premium-organic.webp',
      slug: 'premium',
      pitch: 'Jumbo grade-1 kernels harvested fresh from pristine Mithila wetlands.',
    },
    {
      id: 4,
      name: 'Honey Makhana',
      tags: ['sweet', 'crunchy'],
      price: 349,
      badge: 'Raw Forest Honey',
      image: '/images/products/honey-makhana.webp',
      slug: 'honey',
      pitch: 'Crisp roasted puffs glazed with natural honey and subtle cinnamon.',
    },
  ];

  const filtered = products.filter((p) => {
    if (activePreference === 'all') return true;
    return p.tags.includes(activePreference);
  });

  const handleAdd = (prod) => {
    addToCart(prod, 1);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-20 bg-white border-t border-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200">
            DISCOVERY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-earth-900 tracking-tight">
            Choose Your Makhana
          </h2>
          <p className="text-sm text-earth-600">
            What kind of snack are you looking for today?
          </p>
        </div>

        {/* Deterministic Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {preferences.map((pref) => {
            const isSelected = activePreference === pref.id;
            return (
              <button
                key={pref.id}
                type="button"
                onClick={() => setActivePreference(pref.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-makhana-700 text-white border-makhana-700 shadow-xs'
                    : 'bg-[#FFFDF9] text-earth-700 hover:bg-makhana-50 border-earth-200'
                }`}
              >
                [ {pref.label} ]
              </button>
            );
          })}
        </div>

        {/* Filtered Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filtered.map((prod) => {
            const isAdded = addedId === prod.id;
            return (
              <div
                key={prod.id}
                className="bg-[#FFFDF9] rounded-2xl p-4 border border-earth-200/80 shadow-2xs hover:shadow-md hover:border-makhana-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <Link href={`/product/${prod.slug}`} className="block relative aspect-square rounded-xl overflow-hidden bg-white mb-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-makhana-800 px-2 py-0.5 rounded-full border border-earth-200">
                      {prod.badge}
                    </span>
                  </Link>

                  <Link href={`/product/${prod.slug}`}>
                    <h3 className="font-serif font-bold text-base text-earth-900 group-hover:text-makhana-700 transition-colors">
                      {prod.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-earth-600 mt-1 line-clamp-2">
                    {prod.pitch}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-earth-100 flex items-center justify-between gap-2">
                  <span className="font-serif font-bold text-base text-earth-900">
                    ₹{prod.price}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleAdd(prod)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-earth-800 border-earth-200 hover:bg-makhana-50'
                      }`}
                    >
                      {isAdded ? '✓ Added' : 'Add'}
                    </button>
                    <button
                      type="button"
                      onClick={() => buyNow(prod, 1)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-earth-900 hover:bg-black text-white transition-colors"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
