# Mithila Makhana — Technical Architecture

This document provides an overview of the system architecture, performance optimizations, 3D rendering pipeline, and state management for the Mithila Makhana ecommerce platform.

---

## 1. System Architecture Overview

The application is structured into a modern 4-tier ecommerce architecture:

```text
┌────────────────────────────────────────────────────────┐
│                      Client Tier                       │
│  Next.js 14 App Router + React 18 + Three.js / Canvas   │
│  (Optimistic UI, Cart Drawer, 3D Product Exploration)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Vercel Edge Layer                    │
│      ISR Caching, Static Page Generation (12/12)       │
│      Asset Compression (WebP, Vector Icons)           │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
                ▼                        ▼
┌──────────────────────────────┐ ┌───────────────────────┐
│     API & Database Tier      │ │ Serverless Dispatch   │
│ Express.js + MongoDB Atlas   │ │ Web3Forms (Orders)    │
│ (Product catalog & admin)    │ │ shivamgarg1515@...    │
│ Background 3s timeout guard  │ └───────────────────────┘
└──────────────────────────────┘
```

---

## 2. Core Architectural Principles

### 0ms Instant Product Rendering
- The storefront initializes its catalog using pre-bundled, high-fidelity local product fallback data.
- Products render immediately upon initial page load without waiting for backend cold starts.
- Background synchronization queries the Render API with a strict 3-second timeout (`AbortController`). If the backend is waking from sleep or times out, the user experience remains uninterrupted.

### Lightweight Three.js 3D Product Experience
- Powered by `@react-three/fiber` and `@react-three/drei`.
- Optimized procedural geometries and lightweight realistic textures simulate puffed lotus seed contours with natural toasting accents.
- Fixed orbit constraints (`minDistance: 2.5`, `maxDistance: 7.0`) prevent camera disorientation.
- Floating viewport controls: Zoom In (`+`), Zoom Out (`−`), Auto-Rotate toggle, and Reset View.
- Interactive hotspots anchor directly in 3D space to explain product provenance and harvest methods.

### Deterministic State & Cart Management
- Client-side React context (`CartContext`) manages the live shopping cart drawer with zero full-page reloads.
- Supports single-item purchases, bundle box customization (`Build Your Box`), quantity increment/decrement, and live pricing calculations.
- Instant feedback on add-to-cart actions with non-blocking drawer animation.

### Serverless Order Flow
- Order notifications bypass heavy server dependencies by utilizing Web3Forms directly from `CheckoutForm.js`.
- Dispatches formatted HTML/JSON payloads containing Order ID, Customer Name, Phone, Email, Delivery Address, Itemized Breakdown, Subtotal, and Total.
- Notifications are triggered **strictly** upon final form submission—never on add-to-cart clicks.
