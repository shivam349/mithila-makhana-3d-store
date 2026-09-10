'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/context/CartContext';
import { getProducts } from '@/lib/api';
import { defaultProducts } from '@/lib/productImages';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23FDF2E6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%23E8B896'/%3E%3Ctext x='200' y='280' font-family='sans-serif' font-size='22' font-weight='bold' fill='%238B5E34' text-anchor='middle'%3EMithila Makhana%3C/text%3E%3C/svg%3E";

const getProductSlug = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('masala')) return 'masala';
  if (n.includes('honey')) return 'honey';
  if (n.includes('organic')) return 'premium';
  return 'classic';
};

const getProductRating = (name = '') => {
  const n = (name || '').toLowerCase();
  if (n.includes('organic')) return { score: '4.9', count: 186 };
  if (n.includes('masala')) return { score: '4.8', count: 98 };
  if (n.includes('honey')) return { score: '4.7', count: 64 };
  return { score: '4.9', count: 142 };
};

export default function ProductShowcase() {
  const enrichProduct = (product) => {
    return {
      ...product,
      image: product.image || '/images/products/classic-makhana.webp',
      imageFallback: product.imageFallback || FALLBACK_IMAGE,
      _id: product._id || product.id || Math.random(),
      name: product.name || 'Makhana Product',
      price: product.price || 249,
      description: product.description || '',
      category: product.category || 'classic',
      stock: product.stock !== undefined ? product.stock : 50,
      slug: getProductSlug(product.name),
    };
  };

  const [products, setProducts] = useState(() => defaultProducts.map(enrichProduct));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState({});
  const [addedItemMap, setAddedItemMap] = useState({});
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const { addToCart, buyNow } = useCart();

  // Fetch products from API with 3-second timeout protection
  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const fetchProducts = async () => {
      try {
        const result = await getProducts({ signal: controller.signal });
        clearTimeout(timeoutId);
        if (result && result.length > 0) {
          setProducts(result.map(enrichProduct));
        }
      } catch (error) {
        // Backend sleeping or network delay: continue using instant local products
        console.log('Rendering with cached default products:', error.message);
      }
    };

    fetchProducts();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const getImageSource = (product) => {
    if (imageErrors[product._id]) {
      return product.imageFallback || FALLBACK_IMAGE;
    }
    return product.image || FALLBACK_IMAGE;
  };

  // GSAP animation
  useEffect(() => {
    if (products.length === 0) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
            opacity: 0,
            y: 24,
            duration: 0.45,
            delay: index * 0.06,
            ease: 'power2.out',
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [products, selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedItemMap((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product._id]: false }));
    }, 2000);
  };

  const handleQuickBuy = (product) => {
    buyNow(product, 1);
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'classic', label: 'Classic & Salted' },
    { id: 'spiced', label: 'Spiced Flavours' },
    { id: 'organic', label: 'Organic Jumbo' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'classic')
      return p.name.toLowerCase().includes('classic') || p.category === 'standard';
    if (selectedCategory === 'spiced')
      return p.name.toLowerCase().includes('masala') || p.name.toLowerCase().includes('honey');
    if (selectedCategory === 'organic')
      return p.name.toLowerCase().includes('organic') || p.category === 'organic';
    return true;
  });

  return (
    <section id="products" className="py-24 px-4 sm:px-6 bg-[#FFFDF9] border-t border-earth-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-makhana-700 bg-makhana-50 px-3.5 py-1 rounded-full border border-makhana-200/80">
            PREMIUM HARVEST
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-earth-900 tracking-tight">
            Our Artisan Makhana Collection
          </h2>
          <p className="text-base text-earth-600 max-w-2xl mx-auto leading-relaxed">
            Naturally puffed, slow dry-roasted, and sealed at source in Mithila for uncompromised purity and crunch.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-makhana-700 text-white shadow-xs'
                    : 'bg-white text-earth-700 hover:bg-makhana-50 border border-earth-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          {filteredProducts.map((product, index) => {
            const isAdded = !!addedItemMap[product._id];
            const productSlug = product.slug || getProductSlug(product.name);

            return (
              <div
                key={product._id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="bg-white border border-earth-200/80 rounded-2xl overflow-hidden hover:shadow-xl hover:border-makhana-300 transition-all duration-300 flex flex-col group"
              >
                {/* 1:1 Aspect Ratio Image Card Header */}
                <Link href={`/product/${productSlug}`} className="block relative aspect-square bg-makhana-50/50 overflow-hidden">
                  <Image
                    src={getImageSource(product)}
                    alt={product.name}
                    onError={() => handleImageError(product._id)}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    quality={90}
                    unoptimized={true}
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-earth-800 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-earth-200 shadow-2xs">
                    {product.name.toLowerCase().includes('organic')
                      ? 'Certified Organic'
                      : product.name.toLowerCase().includes('masala')
                      ? 'Spiced'
                      : product.name.toLowerCase().includes('honey')
                      ? 'Natural Glaze'
                      : 'Lightly Salted'}
                  </div>

                  {/* Product quality badge */}
                  <div className="absolute bottom-3 left-3 bg-earth-900/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1">
                    <span>🌱</span>
                    <span>0% Oil Roasted</span>
                  </div>
                </Link>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {(() => {
                      const rating = getProductRating(product.name);
                      return (
                        <div
                          className="flex items-center gap-1 text-amber-500 text-xs mb-1.5"
                          aria-label={`Rated ${rating.score} out of 5 stars based on ${rating.count} reviews`}
                        >
                          <span aria-hidden="true">★★★★★</span>
                          <span className="text-earth-700 font-semibold ml-1">{rating.score}</span>
                          <span className="text-earth-400 text-[11px]">({rating.count})</span>
                        </div>
                      );
                    })()}

                    <Link href={`/product/${productSlug}`}>
                      <h3 className="text-lg font-serif font-bold text-earth-900 group-hover:text-makhana-700 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-earth-600 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {product.description || 'Authentic roasted foxnuts from Mithila wetlands.'}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-earth-100">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-serif font-bold text-makhana-800">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-earth-400 line-through ml-2">
                          ₹{Math.round(product.price * 1.3)}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                    </div>

                    {/* Action Buttons Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1 ${
                          isAdded
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-makhana-50 text-makhana-900 border-makhana-200 hover:bg-makhana-100'
                        }`}
                      >
                        {isAdded ? '✓ Added' : 'Add to Cart'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickBuy(product)}
                        className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-earth-900 hover:bg-black text-white transition-all shadow-2xs"
                      >
                        Buy Now
                      </button>
                    </div>
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
