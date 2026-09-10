'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { isWebGLAvailable } from '@/lib/webglUtils';
import MobileProductImage from './viewers/MobileProductImage';
import TabletProductCSSViewer from './viewers/TabletProductCSSViewer';

const PRODUCT_ASSETS = {
  classic: {
    image: '/images/products/classic-makhana.webp',
    fallback: '/images/products/classic-makhana.png',
    name: 'Classic Roasted Makhana',
  },
  masala: {
    image: '/images/products/masala-makhana.webp',
    fallback: '/images/products/masala-makhana.png',
    name: 'Masala Spiced Makhana',
  },
  organic: {
    image: '/images/products/premium-organic.webp',
    fallback: '/images/products/premium-organic.png',
    name: 'Premium Organic Jumbo',
  },
  premium: {
    image: '/images/products/premium-organic.webp',
    fallback: '/images/products/premium-organic.png',
    name: 'Premium Organic Jumbo',
  },
  honey: {
    image: '/images/products/honey-makhana.webp',
    fallback: '/images/products/honey-makhana.png',
    name: 'Honey Glazed Makhana',
  },
};

// Dynamically import desktop 3D viewer component ONLY for desktop (> 1024px).
// Tablet and mobile never load or evaluate Three.js / React Three Fiber.
const DesktopProduct3DViewer = dynamic(() => import('./3d/DesktopProduct3DViewer'), {
  ssr: false,
  loading: () => null,
});

export default function ProductViewer({
  product = 'classic',
  color = '#C67C2E',
  classNameProp = '',
}) {
  // Device tier: 'mobile' (<= 768px) | 'tablet' (769px - 1024px) | 'desktop' (> 1024px)
  // Default to 'mobile' on SSR to ensure zero heavy initialization
  const [deviceTier, setDeviceTier] = useState('mobile');
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo' (desktop only)
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoomAction, setZoomAction] = useState(null);
  const controlsRef = useRef();

  const asset = PRODUCT_ASSETS[product] || PRODUCT_ASSETS.classic;

  const hotspots = [
    {
      id: 'origin',
      title: 'Wetland Harvest',
      badge: 'GI Provenance',
      desc: 'Sourced directly from freshwater lotus ponds in Darbhanga & Madhubani, Bihar.',
      icon: '🪷',
    },
    {
      id: 'texture',
      title: 'Crisp Expanded Puff',
      badge: 'High Fiber',
      desc: 'Uniform cellular structure delivering a light, crunch-rich texture without oil.',
      icon: '✨',
    },
    {
      id: 'roast',
      title: 'Slow Dry-Roasted',
      badge: 'Zero Frying',
      desc: 'Carefully popped over high heat with natural salts—never deep fried.',
      icon: '🔥',
    },
    {
      id: 'fresh',
      title: 'Vacuum Sealed',
      badge: 'Freshness Lock',
      desc: 'Packaged immediately at source to protect moisture-free crunchiness.',
      icon: '📦',
    },
  ];

  useEffect(() => {
    const updateDeviceTier = () => {
      const width = window.innerWidth;
      // FINAL DEVICE STRATEGY:
      // > 1024px: Desktop (Three.js 3D if WebGL supported)
      // 769px - 1024px: Tablet (CSS 3D perspective transforms, zero WebGL)
      // <= 768px: Mobile (Static local product image + CSS transitions, zero WebGL)
      if (width > 1024 && isWebGLAvailable()) {
        setDeviceTier('desktop');
      } else if (width > 768) {
        setDeviceTier('tablet');
      } else {
        setDeviceTier('mobile');
      }
    };

    updateDeviceTier();
    window.addEventListener('resize', updateDeviceTier);
    return () => window.removeEventListener('resize', updateDeviceTier);
  }, []);

  const handleZoom = (action) => {
    setZoomAction(action);
    setTimeout(() => setZoomAction(null), 300);
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    handleZoom('reset');
    setActiveHotspot(null);
  };

  const isDesktop = deviceTier === 'desktop';
  const isTablet = deviceTier === 'tablet';
  const isMobile = deviceTier === 'mobile';

  // Desktop 3D render condition
  const shouldRenderDesktop3D = isDesktop && viewMode === '3d';

  return (
    <div className={`relative w-full h-full flex flex-col ${classNameProp}`}>
      {/* Viewer Canvas / Photo Area */}
      <div className="relative flex-1 w-full h-full min-h-[380px]">
        {shouldRenderDesktop3D ? (
          <>
            <DesktopProduct3DViewer
              product={product}
              color={color}
              autoRotate={autoRotate}
              zoomAction={zoomAction}
              controlsRef={controlsRef}
              fallback={<TabletProductCSSViewer asset={asset} />}
            />

            {/* Desktop Floating Controls Overlay */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-earth-200/80 shadow-sm">
              <button
                type="button"
                onClick={() => handleZoom('in')}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-earth-700 hover:bg-earth-100 font-bold text-base transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleZoom('out')}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-earth-700 hover:bg-earth-100 font-bold text-base transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                  autoRotate
                    ? 'bg-makhana-100 text-makhana-800 font-bold'
                    : 'text-earth-600 hover:bg-earth-100'
                }`}
                title={autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
                aria-label="Toggle Auto Rotation"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs text-earth-600 hover:bg-earth-100 transition-colors"
                title="Reset View"
                aria-label="Reset View"
              >
                ↺
              </button>
            </div>
          </>
        ) : isTablet ? (
          <TabletProductCSSViewer asset={asset} />
        ) : (
          <MobileProductImage asset={asset} />
        )}

        {/* View Toggle on Desktop Only (> 1024px: 3D vs Studio Photo) */}
        {isDesktop && (
          <div className="absolute top-4 left-4 z-20 flex items-center bg-white/90 backdrop-blur-md p-1 rounded-xl border border-earth-200 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === '3d'
                  ? 'bg-makhana-600 text-white shadow-xs'
                  : 'text-earth-700 hover:bg-earth-100'
              }`}
            >
              ✨ 3D View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('photo')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'photo'
                  ? 'bg-makhana-600 text-white shadow-xs'
                  : 'text-earth-700 hover:bg-earth-100'
              }`}
            >
              📷 Studio Photo
            </button>
          </div>
        )}

        {/* Interactive Hotspot Details Popup (When Selected) */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-4 right-4 z-20 max-w-sm mx-auto bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-makhana-300 shadow-xl animate-fade-in space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeHotspot.icon}</span>
                <h4 className="font-serif font-bold text-sm text-earth-900">
                  {activeHotspot.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="text-earth-400 hover:text-earth-700 text-xs p-1"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-earth-600 leading-relaxed pt-1">
              {activeHotspot.desc}
            </p>
            <span className="inline-block mt-1 text-[10px] font-semibold text-makhana-700 bg-makhana-50 px-2 py-0.5 rounded-full border border-makhana-200">
              {activeHotspot.badge}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Hotspots Strip Beneath Visual */}
      <div className="px-4 py-3 bg-white/90 backdrop-blur-sm border-t border-earth-200/70 z-10">
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          {hotspots.map((h) => {
            const isActive = activeHotspot?.id === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveHotspot(isActive ? null : h)}
                className={`flex-1 py-1.5 px-2.5 rounded-xl text-left transition-all text-xs flex items-center gap-1.5 whitespace-nowrap border ${
                  isActive
                    ? 'bg-makhana-600 text-white border-makhana-600 shadow-xs'
                    : 'bg-earth-50/70 hover:bg-makhana-50 text-earth-800 border-earth-200/70'
                }`}
              >
                <span>{h.icon}</span>
                <span className="font-medium text-[11px] truncate">{h.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
