'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function EngineeringPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-16">
        {/* Hero & Technical Abstract */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-makhana-50 px-3.5 py-1.5 rounded-full border border-makhana-200 text-xs font-mono font-semibold text-makhana-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ENGINEERING SPECIFICATION & ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-earth-900 tracking-tight">
            How Mithila Makhana Is Built
          </h1>

          <p className="text-base sm:text-lg text-earth-600 leading-relaxed">
            An architectural breakdown of an e-commerce platform blending Three.js WebGL 3D product exploration, an optimistic zero-latency UI, serverless Web3Forms transactional workflows, and an authentic Indian food brand design system.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://github.com/shivam349/mithila-makhana-3d-store"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-earth-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
            >
              <span>GitHub Repository</span>
              <span>↗</span>
            </a>
            <Link
              href="/"
              className="px-5 py-2.5 bg-white hover:bg-makhana-50 text-earth-800 border border-earth-200 text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-2"
            >
              <span>Explore Live Store</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* System Architecture Diagram (SVG / Box Layout) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-earth-200/80 shadow-sm space-y-6">
          <div className="border-b border-earth-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-makhana-700">
              HIGH-LEVEL ARCHITECTURE
            </span>
            <h2 className="text-2xl font-serif font-bold text-earth-900 mt-0.5">
              Client, Serverless & Edge Pipeline
            </h2>
          </div>

          {/* Architecture Visual Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {/* Layer 1 */}
            <div className="p-5 rounded-2xl bg-makhana-50/60 border border-makhana-200/80 flex flex-col justify-between space-y-3">
              <span className="text-xs font-mono font-bold text-makhana-800 uppercase">
                01 · Client Tier
              </span>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-earth-900">Next.js 14 Client</h3>
                <p className="text-xs text-earth-600">React Three Fiber (WebGL), GSAP ScrollTriggers, CartContext state.</p>
              </div>
              <span className="text-[10px] text-earth-500 bg-white py-1 rounded border border-makhana-200">
                0ms Optimistic Render
              </span>
            </div>

            {/* Layer 2 */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-earth-200 flex flex-col justify-between space-y-3">
              <span className="text-xs font-mono font-bold text-earth-700 uppercase">
                02 · Hosting & Edge
              </span>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-earth-900">Vercel Edge Network</h3>
                <p className="text-xs text-earth-600">Static generation (SSG), edge caching, WebP local asset delivery.</p>
              </div>
              <span className="text-[10px] text-earth-500 bg-white py-1 rounded border border-earth-200">
                Global Edge CDN
              </span>
            </div>

            {/* Layer 3 */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-earth-200 flex flex-col justify-between space-y-3">
              <span className="text-xs font-mono font-bold text-earth-700 uppercase">
                03 · API & Database
              </span>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-earth-900">Node / MongoDB</h3>
                <p className="text-xs text-earth-600">REST API on Render with 3-second timeout protection fallback.</p>
              </div>
              <span className="text-[10px] text-earth-500 bg-white py-1 rounded border border-earth-200">
                Non-blocking Background Sync
              </span>
            </div>

            {/* Layer 4 */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase">
                04 · Notifications
              </span>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-earth-900">Web3Forms Engine</h3>
                <p className="text-xs text-earth-600">Transactional order dispatch directly to merchant mailbox.</p>
              </div>
              <span className="text-[10px] text-emerald-800 bg-white py-1 rounded border border-emerald-200 font-semibold">
                shivamgarg1515@gmail.com
              </span>
            </div>
          </div>
        </section>

        {/* Technical Deep Dives (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Product Experience */}
          <div className="bg-white rounded-3xl p-8 border border-earth-200/80 shadow-sm space-y-4">
            <span className="text-xs font-mono font-bold text-makhana-700 uppercase">
              EXPERIENCE ARCHITECTURE
            </span>
            <h3 className="text-xl font-serif font-bold text-earth-900">
              3D Product Viewer → Cart → Checkout
            </h3>
            <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
              The 3D interactive viewer is implemented using <code>@react-three/fiber</code> and <code>@react-three/drei</code>. Instead of relying on heavy multi-megabyte GLTF assets that choke mobile bandwidth, custom mathematical geometries (octahedrons, icosahedrons, and particle rings) are rendered via hardware-accelerated WebGL with dynamic specular shading.
            </p>
            <ul className="space-y-2 text-xs text-earth-700 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-makhana-600 font-bold">✓</span>
                <span>Bounded OrbitControls preventing camera clipping (`minDistance: 2.5, maxDistance: 7.0`).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-makhana-600 font-bold">✓</span>
                <span>Interactive inspection hotspots mapping origin, texture, roasting, and vacuum seal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-makhana-600 font-bold">✓</span>
                <span>Client-side persistent cart synchronization with localStorage and instantaneous drawer open.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Performance Strategy */}
          <div className="bg-white rounded-3xl p-8 border border-earth-200/80 shadow-sm space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
              PERFORMANCE STRATEGY
            </span>
            <h3 className="text-xl font-serif font-bold text-earth-900">
              Zero Cold-Start Blocking & Fallbacks
            </h3>
            <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
              Free-tier cloud backends (like Render) suffer from 50-60 second spin-up latency on cold starts. Blocking the user with a loading spinner destroys conversion rates and user trust.
            </p>
            <ul className="space-y-2 text-xs text-earth-700 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Instant Optimistic Catalog:</strong> Default verified products render immediately at 0ms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>3-Second AbortController:</strong> Background fetches abort gracefully after 3 seconds if sleeping.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Local WebP Image Pipeline:</strong> Self-hosted 80–120KB WebP files with inline SVG fallbacks.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Design System */}
          <div className="bg-white rounded-3xl p-8 border border-earth-200/80 shadow-sm space-y-4">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase">
              DESIGN SYSTEM
            </span>
            <h3 className="text-xl font-serif font-bold text-earth-900">
              Modern Indian Food Brand Aesthetics
            </h3>
            <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
              Departing from generic tech SaaS styling (cold blue gradients, glowing borders, heavy glassmorphism), the store utilizes a bespoke earthy palette tailored to the agricultural terroir of Mithila:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-3 bg-[#FFF8F0] rounded-xl border border-makhana-200">
                <p className="font-mono font-bold text-makhana-800">#FFF8F0</p>
                <p className="text-[10px] text-earth-500">Makhana Cream</p>
              </div>
              <div className="p-3 bg-makhana-500 text-white rounded-xl shadow-2xs">
                <p className="font-mono font-bold">#C67C2E</p>
                <p className="text-[10px] text-makhana-100">Roasted Gold</p>
              </div>
              <div className="p-3 bg-earth-900 text-white rounded-xl shadow-2xs">
                <p className="font-mono font-bold">#3A250F</p>
                <p className="text-[10px] text-earth-300">Terracotta Earth</p>
              </div>
            </div>
          </div>

          {/* Section 4: Engineering Decisions */}
          <div className="bg-white rounded-3xl p-8 border border-earth-200/80 shadow-sm space-y-4">
            <span className="text-xs font-mono font-bold text-earth-700 uppercase">
              KEY DECISIONS
            </span>
            <h3 className="text-xl font-serif font-bold text-earth-900">
              Why Serverless Web3Forms Over SMTP?
            </h3>
            <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
              Exposing SMTP credentials or client-side email endpoints introduces major vulnerabilities and spam liabilities. By utilizing Web3Forms with an environment-injected access key and honeypot anti-spam fields:
            </p>
            <ul className="space-y-2 text-xs text-earth-700 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-makhana-600 font-bold">✓</span>
                <span>Zero client secrets exposed; keys remain strictly protected in environment variables.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-makhana-600 font-bold">✓</span>
                <span>No dependency on dedicated SMTP daemon servers or complex email microservices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-makhana-600 font-bold">✓</span>
                <span>Guaranteed notification delivery directly to `shivamgarg1515@gmail.com`.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
