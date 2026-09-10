import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';

const products = {
  classic: {
    id: 1,
    name: 'Classic Makhana',
    subtitle: '3D Product',
    price: 249,
    originalPrice: 349,
    rating: 4.8,
    reviews: 245,
    description: 'Pure roasted makhana with natural Himalayan pink salt. Experience the authentic, delicate crunch of Mithila foxnuts roasted to perfection with zero frying.',
    badges: ['Lightly salted', 'High fiber', 'Roasted', 'No frying'],
    image: '/images/products/classic-makhana.webp',
    imageFallback: '/images/products/classic-makhana.png',
    features: [
      'Lightly roasted to perfection',
      'Natural Himalayan salt',
      '100% organic, no pesticides',
      'High in protein and calcium',
      'Crunchy and delightful taste',
      'Vacuum sealed for freshness'
    ],
    nutritionFacts: {
      caloriesPer100g: 347,
      protein: 14.5,
      fat: 3.2,
      carbs: 63.1,
      fiber: 4.2
    },
    color: '#C67C2E',
    availableSizes: [
      { size: '250g', price: 249 },
      { size: '500g', price: 449 },
      { size: '1kg', price: 849 },
    ]
  },
  masala: {
    id: 2,
    name: 'Masala Makhana',
    subtitle: '3D Product',
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 312,
    description: 'Traditional spiced roasted makhana with an authentic blend of roasted cumin, black pepper, and chaat masala. Perfect for those who love bold Indian flavours.',
    badges: ['Authentic spices', 'High fiber', 'Slow roasted', 'No frying'],
    image: '/images/products/masala-makhana.webp',
    imageFallback: '/images/products/masala-makhana.png',
    features: [
      'Aromatic spice blend',
      'Traditional Mithila recipe',
      'Low fat content',
      'No artificial flavours',
      'Rich in antioxidants',
      'Crunchy texture'
    ],
    nutritionFacts: {
      caloriesPer100g: 360,
      protein: 15.2,
      fat: 3.8,
      carbs: 62.5,
      fiber: 4.1
    },
    color: '#D97706',
    availableSizes: [
      { size: '250g', price: 299 },
      { size: '500g', price: 549 },
      { size: '1kg', price: 999 },
    ]
  },
  premium: {
    id: 3,
    name: 'Premium Organic',
    subtitle: '3D Product',
    price: 399,
    originalPrice: 499,
    rating: 5.0,
    reviews: 189,
    description: 'Certified organic grade-1 jumbo makhana harvested fresh from the pristine natural ponds of Mithila. Hand-selected for uniform size and maximum puff.',
    badges: ['Certified organic', 'GI tag harvest', 'High protein', 'Zero additives'],
    image: '/images/products/premium-organic.webp',
    imageFallback: '/images/products/premium-organic.png',
    features: [
      'Certified organic harvest',
      'Direct from Mithila farmers',
      'Jumbo size selection',
      'Vacuum sealed freshness',
      'Pristine wetland origin',
      'Zero chemical pesticides'
    ],
    nutritionFacts: {
      caloriesPer100g: 342,
      protein: 16.1,
      fat: 2.9,
      carbs: 64.2,
      fiber: 4.5
    },
    color: '#8B5E34',
    availableSizes: [
      { size: '250g', price: 399 },
      { size: '500g', price: 749 },
      { size: '1kg', price: 1399 },
    ]
  },
  honey: {
    id: 4,
    name: 'Honey Makhana',
    subtitle: '3D Product',
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviews: 142,
    description: 'Crisp roasted foxnuts glazed with a light coating of raw forest honey and gentle cinnamon warmth. A guilt-free sweet crunch.',
    badges: ['Wild forest honey', 'Rich crunch', 'Naturally sweet', 'No frying'],
    image: '/images/products/honey-makhana.webp',
    imageFallback: '/images/products/honey-makhana.png',
    features: [
      'Pure forest honey glaze',
      'Light cinnamon hint',
      'No refined white sugar',
      'Natural energy snack',
      'Slow roasted crunch',
      'Vacuum packed'
    ],
    nutritionFacts: {
      caloriesPer100g: 355,
      protein: 13.8,
      fat: 2.8,
      carbs: 68.0,
      fiber: 3.9
    },
    color: '#B45309',
    availableSizes: [
      { size: '250g', price: 349 },
      { size: '500g', price: 649 },
      { size: '1kg', price: 1199 },
    ]
  }
};

export default function ProductPage({ params }) {
  const productKey = params?.product || 'classic';
  const product = products[productKey] || products.classic;

  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ProductDetail product={product} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
