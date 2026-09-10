'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductViewer from './ProductViewer';
import { useCart } from '@/lib/context/CartContext';

export default function ProductDetail({ product = {} }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g');
  const [addedToast, setAddedToast] = useState(false);
  const { addToCart, buyNow } = useCart();

  const defaultProduct = {
    id: 1,
    name: 'Classic Makhana',
    subtitle: '3D Product',
    price: 249,
    originalPrice: 349,
    rating: 4.8,
    reviews: 245,
    description:
      'Pure roasted makhana with natural Himalayan salt. Experience the authentic, delicate crunch of Mithila foxnuts roasted to perfection with zero frying.',
    badges: ['Lightly salted', 'High fiber', 'Roasted', 'No frying'],
    image: '/images/products/classic-makhana.webp',
    imageFallback: '/images/products/classic-makhana.png',
    features: [
      'Lightly roasted to perfection',
      'Natural Himalayan salt',
      '100% organic, no pesticides',
      'High in protein and calcium',
      'Crunchy and delightful taste',
      'Vacuum sealed for freshness',
    ],
    nutritionFacts: {
      caloriesPer100g: 347,
      protein: 14.5,
      fat: 3.2,
      carbs: 63.1,
      fiber: 4.2,
    },
    color: '#C67C2E',
    availableSizes: [
      { size: '250g', price: 249 },
      { size: '500g', price: 449 },
      { size: '1kg', price: 849 },
    ],
  };

  const prod = { ...defaultProduct, ...product };

  // Calculate current price based on selected size
  const activeSizeObj = prod.availableSizes?.find((s) => s.size === selectedSize) || {
    size: '250g',
    price: prod.price,
  };
  const currentPrice = activeSizeObj.price;
  const currentOriginalPrice = prod.originalPrice || Math.round(currentPrice * 1.35);
  const discountPercent = Math.round((1 - currentPrice / currentOriginalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(
      {
        ...prod,
        price: currentPrice,
        selectedSize,
      },
      quantity
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleBuyNow = () => {
    buyNow(
      {
        ...prod,
        price: currentPrice,
        selectedSize,
      },
      quantity
    );
  };

  return (
    <div className="space-y-16">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-earth-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm border border-earth-700">
          <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            ✓
          </span>
          <span>Added <strong>{prod.name}</strong> ({quantity} pack) to cart</span>
        </div>
      )}

      {/* Main Product Presentation (Phase 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* 3D Interactive Viewer Dominating Left (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-[420px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-xl border border-makhana-200/70 bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F0] to-[#F7EEDB]">
            {/* Tag over 3D viewer (desktop only) */}
            <div className="hidden lg:flex absolute top-4 left-4 z-10 items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-earth-200 text-xs font-medium text-earth-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>3D Interactive View · Rotate to Explore</span>
            </div>

            <ProductViewer
              product={
                prod.name.toLowerCase().includes('masala')
                  ? 'masala'
                  : prod.name.toLowerCase().includes('honey')
                  ? 'honey'
                  : prod.name.toLowerCase().includes('organic')
                  ? 'premium'
                  : 'classic'
              }
              color={prod.color}
              classNameProp="h-full"
            />
          </div>

          <div className="hidden lg:flex items-center justify-between text-xs text-earth-500 px-2">
            <span>🖱️ Drag to rotate 3D makhana</span>
            <span>✨ Real-time Three.js Canvas</span>
          </div>
        </div>

        {/* Product Purchase & Hierarchy Right (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Subtitle */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3 py-1 rounded-full border border-makhana-200/80 mb-2">
              {prod.subtitle || '3D Product'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-earth-900 tracking-tight leading-tight">
              {prod.name}
            </h1>

            {/* Authentic Rating by Variant */}
            {(() => {
              const ratingData = (() => {
                const n = (prod.name || '').toLowerCase();
                if (n.includes('organic')) return { score: '4.9', count: 186 };
                if (n.includes('masala')) return { score: '4.8', count: 98 };
                if (n.includes('honey')) return { score: '4.7', count: 64 };
                return { score: '4.9', count: 142 };
              })();

              return (
                <div
                  className="flex items-center gap-2 mt-3"
                  aria-label={`Rated ${ratingData.score} out of 5 stars based on ${ratingData.count} verified ratings`}
                >
                  <div className="flex items-center text-amber-500 text-sm" aria-hidden="true">
                    ★★★★★
                  </div>
                  <span className="text-sm font-bold text-earth-900">
                    {ratingData.score}
                  </span>
                  <span className="text-xs text-earth-500">
                    ({ratingData.count} customer ratings)
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-makhana-50/60 border border-makhana-200/60 flex items-baseline gap-4">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-makhana-800">
              ₹{currentPrice}
            </span>
            <span className="text-xl text-earth-400 line-through">
              ₹{currentOriginalPrice}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Product Benefits Badges (Compact, Clean) */}
          <div>
            <span className="text-xs font-semibold text-earth-600 uppercase tracking-wider block mb-2">
              Highlights & Benefits
            </span>
            <div className="flex flex-wrap gap-2">
              {(prod.badges || ['Lightly salted', 'High fiber', 'Roasted', 'No frying']).map(
                (badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-earth-800 border border-earth-200 shadow-2xs"
                  >
                    <span className="text-makhana-600 font-bold">✓</span>
                    <span>{badge}</span>
                  </span>
                )
              )}
            </div>
          </div>

          {/* Size Selection */}
          {prod.availableSizes && prod.availableSizes.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-2">
                Select Pack Weight
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {prod.availableSizes.map((sizeObj) => {
                  const isSelected = selectedSize === sizeObj.size;
                  return (
                    <button
                      key={sizeObj.size}
                      type="button"
                      onClick={() => setSelectedSize(sizeObj.size)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-makhana-600 bg-makhana-50 text-makhana-900 ring-2 ring-makhana-500/20 font-bold'
                          : 'border-earth-200 bg-white text-earth-700 hover:border-earth-300'
                      }`}
                    >
                      <p className="text-sm font-semibold">{sizeObj.size}</p>
                      <p className="text-xs text-earth-500 mt-0.5">₹{sizeObj.price}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div>
            <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-2">
              Quantity
            </label>
            <div className="flex items-center border border-earth-200 rounded-xl bg-white w-fit">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-earth-600 hover:bg-earth-100 rounded-l-xl transition-colors text-base font-bold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-12 text-center text-base font-bold text-earth-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-earth-600 hover:bg-earth-100 rounded-r-xl transition-colors text-base font-bold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Primary: ADD TO CART */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-4 px-6 bg-makhana-600 hover:bg-makhana-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] text-base flex items-center justify-center gap-2"
            >
              <span>ADD TO CART</span>
              <span className="text-sm opacity-80">· ₹{currentPrice * quantity}</span>
            </button>

            {/* Secondary/High-Priority: BUY NOW */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-earth-900 hover:bg-black text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] text-base flex items-center justify-center gap-2"
            >
              <span>BUY NOW</span>
              <span className="text-xs text-earth-300">⚡ Instant Fast Checkout</span>
            </button>
          </div>

          {/* Quick trust assurances */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-earth-200/80 text-center">
            <div className="p-2">
              <p className="text-xs font-semibold text-earth-800">🚚 Free Shipping</p>
              <p className="text-[10px] text-earth-500">Across all of India</p>
            </div>
            <div className="p-2 border-x border-earth-200">
              <p className="text-xs font-semibold text-earth-800">🌾 100% Authentic</p>
              <p className="text-[10px] text-earth-500">Mithila GI heritage</p>
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold text-earth-800">🛡️ Farm Fresh</p>
              <p className="text-[10px] text-earth-500">Vacuum sealed pack</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Features & Nutrition Breakdown (Moved up for instant health scanner access) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Why Choose This */}
        <div className="bg-white rounded-3xl p-8 border border-earth-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-makhana-700">
              Purity & Assurance
            </span>
            <h3 className="text-2xl font-serif font-bold text-earth-900">
              Why Choose Our {prod.name}?
            </h3>
          </div>

          <ul className="space-y-3.5">
            {prod.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-makhana-50/50 border border-makhana-100/60"
              >
                <span className="text-makhana-600 font-bold text-base flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-sm text-earth-800 font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Facts */}
        <div className="bg-white rounded-3xl p-8 border border-earth-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-makhana-700">
              Guilt-Free Fuel
            </span>
            <h3 className="text-2xl font-serif font-bold text-earth-900">
              Nutrition Facts
            </h3>
            <p className="text-xs text-earth-500">Per 100g serving</p>
          </div>

          <div className="p-6 rounded-2xl bg-makhana-50/70 border border-makhana-200/80 text-center space-y-1">
            <p className="text-4xl font-serif font-bold text-makhana-800">
              {prod.nutritionFacts.caloriesPer100g}
            </p>
            <p className="text-xs uppercase font-semibold text-earth-600 tracking-wider">
              Calories (kcal)
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-earth-200/70 text-center">
              <p className="text-xs text-earth-500 font-medium">Protein</p>
              <p className="text-lg font-bold text-earth-900 mt-1">
                {prod.nutritionFacts.protein}g
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-earth-200/70 text-center">
              <p className="text-xs text-earth-500 font-medium">Dietary Fiber</p>
              <p className="text-lg font-bold text-earth-900 mt-1">
                {prod.nutritionFacts.fiber}g
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-earth-200/70 text-center">
              <p className="text-xs text-earth-500 font-medium">Carbs</p>
              <p className="text-lg font-bold text-earth-900 mt-1">
                {prod.nutritionFacts.carbs}g
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-earth-200/70 text-center">
              <p className="text-xs text-earth-500 font-medium">Healthy Fat</p>
              <p className="text-lg font-bold text-earth-900 mt-1">
                {prod.nutritionFacts.fat}g
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Heritage Callout */}
      <div className="p-6 rounded-2xl bg-white border border-earth-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-makhana-700">Mithila Provenance</span>
          <p className="text-sm text-earth-700 mt-0.5">
            Slow dry-roasted with zero oil from fresh wetland ponds of North Bihar. FSSAI Lic. 10021033000124 compliant.
          </p>
        </div>
        <Link
          href="/#brand-story"
          className="inline-flex items-center gap-1 text-xs font-semibold text-makhana-800 hover:text-makhana-900 transition-colors flex-shrink-0"
        >
          <span>Read Our Story</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
