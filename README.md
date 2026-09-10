# Mithila Makhana — Direct-to-Consumer (D2C) Storefront

[![Live Demo](https://img.shields.io/badge/Live%20Storefront-mithilla--makkhana.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mithilla-makkhana.vercel.app/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A premium Direct-to-Consumer (D2C) e-commerce storefront for authentic GI-tagged **Mithila Makhana** (foxnuts / lotus seeds) harvested directly from the wetland floodplains of North Bihar.

---

## 🌾 Business & Product Overview

Mithila Makhana brings clean, slow dry-roasted, zero-oil popped lotus seeds directly from farm to table. 

- **Protected GI Provenance:** Harvested by indigenous communities in North Bihar.
- **Zero-Oil Roasting:** 100% dry-roasted without palm oil, preservatives, or chemical additives.
- **Nutrient-Dense:** High natural plant protein, rich dietary fiber, and naturally gluten-free.

---

## ⚡ Key Features

- **Full-Bleed Hero Experience:** Full-width high-resolution product photography with subtle entrance animation and contrast-engineered typography.
- **Instant Product Catalog:** Instant initial render powered by local production assets with background API sync and 3-second timeout protection.
- **Interactive 3D Product Inspection (Desktop):** Interactive 3D kernel models with OrbitControls, zoom bounds, and studio lighting (loaded strictly for desktop viewports > 1024px).
- **Responsive 3-Tier Device Architecture:**
  - **Desktop (> 1024px):** Interactive Three.js / React Three Fiber product viewer.
  - **Tablet (769px–1024px):** Lightweight CSS 3D perspective transforms (zero WebGL overhead).
  - **Mobile (≤ 768px):** Clean static WebP images and micro-tilt interactions (zero Three.js bundle loading, zero WebGL context crashes).
- **Deterministic Product Discovery:** "What Are You in the Mood For?" filter helping customers select snacks by taste profile.
- **Build Your Makhana Box:** Interactive 4-pack custom bundle builder with live price calculation and cart synchronization.
- **Makhana Grade Guide:** Clear visual education comparing Jumbo, Premium, and Standard kernel varieties.
- **Nutrition at a Glance:** Dual-portion (30g / 100g) verified nutritional breakdown.
- **Instant Slide-Over Cart & Quick Buy:** Cart management with real-time subtotal calculations and single-click checkout trigger.
- **Serverless Order Notification:** Completed orders dispatch directly to merchant email (`shivamgarg1515@gmail.com`) via Web3Forms with anti-spam botcheck and idempotency guards.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2 (App Router, React 18, SSR / SSG)
- **Styling:** Vanilla Tailwind CSS with custom earth/makhana brand tokens
- **Animation:** GSAP (GreenSock) for scroll-triggered micro-interactions
- **3D Graphics (Desktop):** Three.js, React Three Fiber, React Three Drei
- **Order Dispatch:** Web3Forms Serverless Webhook API
- **Deployment:** Vercel CI/CD Pipeline

---

## 📐 Architecture & Engineering Decisions

```
Homepage (app/page.js)
├── 1. HeroSection (Full-width static image + contrast gradient)
├── 2. ProductShowcase (Instant local catalog + API sync)
├── 3. ChooseYourMakhana (Deterministic taste finder)
├── 4. BuildYourBox (4-pack bundle builder)
├── 5. MakhanaSizeLab (Makhana Grade Guide)
├── 6. NutritionVisualizer (Nutrition at a Glance)
├── 7. WhyChooseUsSection (GI origin & clean roasting promise)
├── 8. FromMithilaToYourTable (5-stage editorial farm-to-home journey)
├── 9. TestimonialSection (Customer reviews)
├── 10. FAQSection (Verified sourcing, roasting, & delivery Q&A)
├── 11. WhyMithilaSection (Cultural heritage narrative)
├── 12. CTABanner (Direct conversion bridge)
└── 13. Footer (Shop, policies, legal, engineering link)
```

For full architectural documentation, visit [`/engineering`](https://mithilla-makkhana.vercel.app/engineering) on the live deployment.

---

## 🚀 Local Development

### Prerequisites
- Node.js 18.17+
- npm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/shivam349/mithila-makhana-3d-store.git
cd mithila-makhana-3d-store

# Install dependencies
npm install

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Linting

```bash
# Verify ESLint (0 errors target)
npm run lint

# Compile Next.js production build
npm run build

# Run local production server
npm start
```

---

## 🚢 Deployment

The repository is linked with Vercel for automatic continuous deployment:
- **Production URL:** [https://mithilla-makkhana.vercel.app/](https://mithilla-makkhana.vercel.app/)
- Pushes to the `main` branch trigger automated builds and zero-downtime rollouts.

---

## 📄 License & Attribution

© 2026 Mithila Makhana. All rights reserved. Handpicked and direct from North Bihar, India.
