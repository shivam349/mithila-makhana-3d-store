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

// Fallback product image
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23FDF2E6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%23E8B896'/%3E%3Ctext x='200' y='280' font-family='sans-serif' font-size='22' font-weight='bold' fill='%238B5E34' text-anchor='middle'%3EMithila Makhana%3C/text%3E%3C/svg%3E";

export default function ProductShowcase() {
  // Ensure product has all required fields
  const enrichProduct = (product) => {
    return {
      ...product,
      image: product.image || '/images/products/classic-makhana.webp',
      imageFallback: product.imageFallback || FALLBACK_IMAGE,
      _id: product._id || product.id || Math.random(),
      name: product.name || 'Makhana Product',
      price: product.price || 0,
      description: product.description || '',
      category: product.category || 'standard',
      stock: product.stock !== undefined ? product.stock : 0,
    };
  };

  // Instant optimistic render: never block the user on cold-starting Render backend
  const [products, setProducts] = useState(() => defaultProducts.map(enrichProduct));
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const { addToCart } = useCart();

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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const getImageSource = (product) => {
    if (imageErrors[product._id]) {
      return product.imageFallback || FALLBACK_IMAGE;
    }
    return product.image || FALLBACK_IMAGE;
  };

  // Animations - Optimized to reduce overhead
  useEffect(() => {
    if (products.length === 0) return;
    
    const ctx = gsap.context(() => {
      // Use simpler fade-in animation without scrub for better performance
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true, // Run animation only once
            },
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: index * 0.05, // Stagger effect
            ease: 'power2.out'
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`✅ ${product.name} added to cart!`);
  };

  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-makhana-600 to-earth-600 bg-clip-text text-transparent">
              Premium Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked makhana collection, sourced directly from the fertile fields of Mithila
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <div
                key={product._id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="bg-white border border-makhana-100 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-48 bg-makhana-50 overflow-hidden">
                  <Image
                    src={getImageSource(product)}
                    alt={product.name}
                    onError={() => handleImageError(product._id)}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    quality={85}
                    unoptimized={true}
                  />
                  <div className="absolute top-2 right-2 bg-makhana-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-makhana-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="w-full bg-gradient-to-r from-makhana-500 to-makhana-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
