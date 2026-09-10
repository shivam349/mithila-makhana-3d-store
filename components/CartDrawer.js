'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import CheckoutForm from './CheckoutForm';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    isCheckoutView,
    setIsCheckoutView,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const drawerRef = useRef(null);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-earth-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-right overflow-hidden border-l border-earth-200"
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-earth-100 flex items-center justify-between bg-makhana-50/50">
          <div className="flex items-center gap-2">
            {isCheckoutView ? (
              <button
                onClick={() => setIsCheckoutView(false)}
                className="text-earth-600 hover:text-earth-900 text-sm font-semibold flex items-center gap-1 mr-2"
              >
                ← Back
              </button>
            ) : null}
            <h2 className="text-lg font-serif font-bold text-earth-900">
              {isCheckoutView ? 'Complete Your Order' : `Shopping Bag (${totalItems})`}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full flex items-center justify-center text-earth-400 hover:text-earth-700 hover:bg-earth-100 transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-makhana-50 rounded-full flex items-center justify-center text-3xl text-makhana-600 border border-makhana-200/50">
                🌿
              </div>
              <h3 className="text-lg font-serif font-semibold text-earth-900">
                Your cart is empty
              </h3>
              <p className="text-sm text-earth-600 max-w-xs leading-relaxed">
                Experience the authentic, pure roasted makhana from Mithila. Add fresh packs to your bag.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-makhana-600 hover:bg-makhana-700 text-white text-sm font-medium rounded-xl shadow transition-all"
              >
                Explore Products
              </button>
            </div>
          ) : isCheckoutView ? (
            <CheckoutForm
              onCancel={() => setIsCheckoutView(false)}
              onSuccess={() => {}}
            />
          ) : (
            <div className="space-y-4 divide-y divide-earth-100">
              {cart.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} className="pt-4 first:pt-0 flex gap-4 items-center">
                    <img
                      src={
                        item.image ||
                        item.imageFallback ||
                        '/images/products/classic-makhana.webp'
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl bg-makhana-50 border border-makhana-100 flex-shrink-0"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23FFF8F0" width="80" height="80"/%3E%3Ctext x="50%" y="50%" font-family="sans-serif" font-size="12" fill="%23C67C2E" text-anchor="middle" dominant-baseline="middle"%3EMakhana%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-earth-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-earth-500 mt-0.5">₹{item.price} per pack</p>

                      <div className="flex items-center gap-3 mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-earth-200 rounded-lg bg-white overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-sm font-semibold"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-earth-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-sm font-semibold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-earth-900 ml-auto">
                          ₹{item.price * item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(itemId)}
                          className="text-earth-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && !isCheckoutView && (
          <div className="px-6 py-4 border-t border-earth-100 bg-earth-50/50 space-y-3">
            <div className="flex justify-between items-center text-sm text-earth-600">
              <span>Subtotal</span>
              <span className="font-semibold text-earth-900">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-earth-600">
              <span>Shipping</span>
              <span className="text-emerald-700 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
                FREE (India)
              </span>
            </div>
            <div className="flex justify-between items-center text-base font-bold text-earth-900 pt-2 border-t border-earth-200/60">
              <span>Order Total</span>
              <span className="text-makhana-700 text-lg">₹{totalPrice}</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setIsCheckoutView(true)}
                className="w-full py-3.5 bg-gradient-to-r from-makhana-600 to-makhana-700 hover:from-makhana-700 hover:to-makhana-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full text-center py-2 text-xs font-semibold text-earth-600 hover:text-earth-900 transition-colors"
              >
                View Full Cart Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
