# Mithila Makhana 3D E-Commerce Website

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mithilla--makkhana.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mithilla-makkhana.vercel.app/)

</div>

A premium 3D e-commerce website for selling authentic Mithila makhana (lotus seeds) using cutting-edge web technologies.

## 🎯 Features

### 3D Visualization
- **Three.js Integration**: Beautiful 3D product visualization with interactive controls
- **React Three Fiber**: Seamless integration of 3D graphics with React components
- **Custom Product Viewers**: Unique 3D representations for each product variant
- **Particles & Effects**: Sparkles, floating elements, and animated particles

### Scroll Animations
- **GSAP AnimationLibrary**: Smooth scroll-triggered animations throughout the pages
- **Parallax Effects**: Dynamic parallax scrolling on hero sections
- **Staggered Animations**: Sequential animations on product cards and features
- **Interactive Hover Effects**: Engaging hover animations on buttons and cards

### Contemporary Design
- **Tailwind CSS**: Modern, responsive, and utility-first styling
- **Gradient Backgrounds**: Beautiful color gradients and backgrounds
- **Mobile Responsive**: Fully responsive design for all devices
- **Dark/Light Optimized**: Clean color palette optimized for readability

## 🏗️ Project Structure

```
codex1/
├── app/
│   ├── globals.css           # Global styles and animations
│   ├── layout.js             # Root layout
│   ├── page.js               # Home page
│   └── product/
│       └── [product]/
│           └── page.js       # Product detail pages
├── components/
│   ├── Navigation.js         # Fixed navigation header
│   ├── HeroSection.js        # Hero section with 3D scene
│   ├── ProductShowcase.js    # Product grid with animations
│   ├── ProductDetail.js      # Product information page
│   ├── ProductViewer.js      # 3D product viewer component
│   ├── SpecialOffersSection.js # Promotional offers
│   ├── BenefitsSection.js    # Product benefits showcase
│   ├── TestimonialSection.js # Customer testimonials
│   ├── CTASection.js         # Call-to-action section
│   ├── MakhanaScene.js       # Main 3D scene
│   └── Footer.js             # Footer component
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
└── next.config.mjs           # Next.js configuration
```

## 📦 Dependencies

### Core Technologies
- **Next.js 14.2.5**: React framework with server-side rendering
- **React 18.3.1**: UI library
- **Three.js 0.169.0**: 3D graphics library
- **@react-three/fiber 8.17.10**: React renderer for Three.js
- **@react-three/drei 9.120.4**: Useful helpers for React Three Fiber

### Animation & Styling
- **GSAP 3.12.5**: Professional animation library for scroll triggers
- **Tailwind CSS 3.4.14**: Utility-first CSS framework
- **PostCSS 8.4.47**: CSS transformation tool

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd codex1

# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🎨 Key Components

### MakhanaScene Component
The main 3D visualization component featuring:
- Interactive 3D makhana kernels
- Surrounding particle effects
- Sparkle animations
- Auto-rotating orbitcontrols

### HeroSection Component
Features:
- Full-width hero with 3D scene
- Scroll parallax effects
- Call-to-action buttons
- Feature highlights

### ProductShowcase Component
Includes:
- Grid of product cards
- GSAP scroll animations
- Product features and ratings
- Links to detailed product pages

### ProductDetail Component
Provides:
- Large 3D product viewer
- Detailed product information
- Size and quantity selection
- Nutrition facts
- Feature highlights

### Scroll Animations
All sections use GSAP ScrollTrigger for:
- Fade-in animations on scroll
- Parallax movement
- Staggered card animations
- Interactive hover effects

## 🎨 Color Scheme

The website uses a premium warm color palette:
- **Primary**: Amber (#f59e0b) and Orange (#f97316)
- **Secondary**: Orange (#fb923c) and Golden (#fbbf24)
- **Backgrounds**: Soft amber and orange gradients
- **Text**: Dark gray and amber tones

## 📱 Responsive Design

- **Mobile**: Single column layout with optimized touch interactions
- **Tablet**: Two-column layouts
- **Desktop**: Full multi-column grid with enhanced animations

## 🔧 Customization

### Adding New Products
Edit `/app/product/[product]/page.js` and add new product entries:

```javascript
const products = {
  newProduct: {
    id: 4,
    name: 'New Product Name',
    price: 599,
    // ... other properties
  }
};
```

### Modifying 3D Effects
Edit `/components/MakhanaScene.js` or `/components/ProductViewer.js` to:
- Change particle colors
- Adjust animation speeds
- Modify geometry shapes
- Add new lighting effects

### Tailoring Animations
In any component, import GSAP and customize:
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.from(element, {
  scrollTrigger: { trigger: element, start: 'top 80%' },
  // ... animation properties
});
```

## 📊 Performance Optimization

- Lazy loading of 3D components
- Optimized animations with GPU acceleration
- Tailwind CSS purging for minimal bundle
- Next.js automatic code splitting

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 API & Routes

### Pages
- `/` - Home page with all sections
- `/product/[product]` - Product detail page
  - `/product/classic` - Classic Makhana
  - `/product/masala` - Masala Makhana
  - `/product/premium` - Premium Organic

## 🎯 Features Implemented

- ✅ 3D product visualization with Three.js
- ✅ Smooth scroll animations with GSAP
- ✅ Responsive design with Tailwind CSS
- ✅ Product showcase with animations
- ✅ Product detail pages with custom 3D viewers
- ✅ Special offers section
- ✅ Customer testimonials
- ✅ Benefits & features showcase
- ✅ Navigation with scroll effects
- ✅ Call-to-action sections
- ✅ Modern footer

## 📝 Future Enhancements

- Shopping cart functionality
- User authentication
- Payment gateway integration
- Order tracking system
- Customer reviews & ratings
- Blog section
- Search & filtering
- Wishlist feature
- Email notifications

## 🐛 Troubleshooting

### 3D Scene Not Rendering
- Check browser WebGL support
- Ensure Canvas component is properly mounted
- Verify Three.js version compatibility

### Animations Not Playing
- Check GSAP is properly registered with ScrollTrigger
- Verify element refs are correctly set
- Check browser console for errors

### Styling Issues
- Clear Tailwind cache: `npm run build`
- Verify tailwind.config.js configuration
- Check for conflicting CSS classes

## 📄 License

This project is available for commercial and personal use.

## 👨‍💻 Author

Created with ❤️ using modern web technologies.

---

**Version**: 1.0.0
**Last Updated**: February 2026
