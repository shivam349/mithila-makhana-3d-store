'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutView, setIsCheckoutView] = useState(false);

  // Helper to normalize product id
  const getItemId = (item) => String(item._id || item.id);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mithila-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('mithila-cart', JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = (product, quantity = 1) => {
    const targetId = getItemId(product);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => getItemId(item) === targetId);
      
      if (existingItem) {
        return prevCart.map((item) =>
          getItemId(item) === targetId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    const targetId = String(productId);
    setCart((prevCart) => prevCart.filter((item) => getItemId(item) !== targetId));
  };

  const updateQuantity = (productId, quantity) => {
    const targetId = String(productId);
    if (quantity <= 0) {
      removeFromCart(targetId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        getItemId(item) === targetId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const openCart = () => {
    setIsCheckoutView(false);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setIsCheckoutView(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const openCheckout = () => {
    setIsCheckoutView(true);
    setIsCartOpen(true);
  };

  // Buy Now: adds item, opens drawer directly to checkout view
  const buyNow = (product, quantity = 1) => {
    addToCart(product, quantity);
    setIsCheckoutView(true);
    setIsCartOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isCartOpen,
        isCheckoutView,
        setIsCheckoutView,
        openCart,
        closeCart,
        toggleCart,
        openCheckout,
        buyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
