# Professional Portfolio Demo Walkthrough (60–90 Seconds)

A structured, clean demonstration script designed for recording recruiter demos, video showcases, and portfolio walkthroughs of the **Mithila Makhana 3D Store**.

---

## Technical & Visual Objectives
- **Brand Identity:** Highlighting warm, authentic Indian food brand aesthetics (`#FFF8F0`, `#C67C2E`, `#3A250F`).
- **Interactive 3D Engineering:** Demonstrating real-time Three.js canvas rotation, inspection controls, and origin hotspots.
- **E-Commerce Utility:** Seamless deterministic snack discovery, custom 4-pack box building, live slide-over cart drawer, and Web3Forms serverless checkout.
- **Storytelling & Architecture:** Showing the 5-stage "From Mithila to Your Table" bridge, verified nutrition metrics, and technical `/engineering` specification.

---

## Timed Walkthrough Cue Sheet

| Timestamp | Screen / Flow | Action / Narration Prompt | Key Visual Focus |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:10** | **Homepage Hero (`/`)** | Open home page. Show smooth hero typography, 0ms optimistic load, and floating makhana visual. | Warm editorial palette, absence of generic SaaS blue/neon. |
| **0:10 – 0:25** | **Product Detail & 3D Viewer (`/product/classic`)** | Click on *Classic Makhana*. Rotate 3D kernel using OrbitControls. Click inspection hotspots (*Wetland Harvest*, *Crisp Expanded Puff*, *Slow Dry-Roasted*). | Hardware-accelerated 3D inspection, Phase 2 badge hierarchy (`₹249`, `Lightly salted`), Phase 3 horizontal milestone journey. |
| **0:25 – 0:38** | **Product Discovery & Size Lab** | Scroll to **Makhana Size Lab**. Toggle `JUMBO`, `PREMIUM`, and `STANDARD` tabs. Scroll to **Choose Your Makhana** and filter by `[ CRUNCHY ]` and `[ SPICY ]`. | Visual kernel comparison, instant deterministic client filtering with zero loading spinners. |
| **0:38 – 0:52** | **Build Your Makhana Box** | Navigate to **Build Your Box**. Increment flavors to 4/4. Observe the dynamic total price and click `[ Add Box to Cart ]`. | Interactive progress bar (`4/4 selected`), automatic opening of slide-over Cart Drawer. |
| **0:52 – 1:08** | **Cart Drawer & Checkout Flow** | In Cart Drawer, adjust quantity (`−`, `+`), review subtotal, click *Proceed to Checkout*, enter test details (Name, Phone, Email, Address), and click *Place Order*. | Smooth slide-over drawer, loading state `"Placing order..."`, confirmation message `"Order placed successfully. We have received your order."` via Web3Forms. |
| **1:08 – 1:20** | **From Mithila to Your Table & Story** | Showcase the 5-stage horizontal bridge (`SOURCE` $\rightarrow$ `SELECT` $\rightarrow$ `ROAST` $\rightarrow$ `PACK` $\rightarrow$ `ENJOY`) and the 7-stage Cinematic Mithila Story. | Balanced vertical rhythm connecting *Why Choose Makhana* to *Customer Reviews* without blank gaps. |
| **1:20 – 1:35** | **Engineering Architecture (`/engineering`)** | Navigate to `/engineering`. Show the 4-layer architecture diagram, performance strategy (0ms optimistic UI, 3s timeout protection), and GitHub repository link. | Technical excellence, clean system design, and production readiness for senior engineering roles. |

---

## Recording Checklist
- [x] Zero console errors during all transitions.
- [x] Responsive layout validated across mobile (390px), tablet (768px), and desktop (1440px).
- [x] Zero API key or credential exposure in UI.
- [x] Sub-second page loads powered by local WebP assets.
