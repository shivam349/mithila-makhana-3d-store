// Product images with local self-hosted assets & WebP optimization
export const productImages = {
  classic: {
    primary: '/images/products/classic-makhana.webp',
    fallback: '/images/products/classic-makhana.png'
  },
  masala: {
    primary: '/images/products/masala-makhana.webp',
    fallback: '/images/products/masala-makhana.png'
  },
  organic: {
    primary: '/images/products/premium-organic.webp',
    fallback: '/images/products/premium-organic.png'
  },
  honey: {
    primary: '/images/products/honey-makhana.webp',
    fallback: '/images/products/honey-makhana.png'
  }
};

export const heroImage = {
  primary: '/images/hero/mithila-makhana-hero.webp',
  fallback: '/images/hero/mithila-makhana-hero.png'
};

// Get product image with fallback
export const getProductImage = (productKey, useFallback = false) => {
  const images = productImages[productKey];
  if (!images) return productImages.classic.fallback;
  return useFallback ? images.fallback : images.primary;
};

// Default products with proper makhana images
export const defaultProducts = [
  {
    _id: 1,
    name: 'Classic Makhana',
    price: 249,
    image: productImages.classic.primary,
    imageFallback: productImages.classic.fallback,
    description: 'Pure roasted makhana with natural Himalayan salt',
    category: 'standard',
    stock: 50,
  },
  {
    _id: 2,
    name: 'Masala Makhana',
    price: 299,
    image: productImages.masala.primary,
    imageFallback: productImages.masala.fallback,
    description: 'Traditional spiced roasted makhana',
    category: 'standard',
    stock: 50,
  },
  {
    _id: 3,
    name: 'Premium Organic',
    price: 399,
    image: productImages.organic.primary,
    imageFallback: productImages.organic.fallback,
    description: 'Certified organic jumbo makhana harvested fresh',
    category: 'organic',
    stock: 50,
  },
  {
    _id: 4,
    name: 'Honey Makhana',
    price: 349,
    image: productImages.honey.primary,
    imageFallback: productImages.honey.fallback,
    description: 'Crisp foxnuts glazed with raw forest honey',
    category: 'flavoured',
    stock: 50,
  },
];
