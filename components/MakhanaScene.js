'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { isWebGLAvailable } from '@/lib/webglUtils';
import MobileHeroImage from './viewers/MobileHeroImage';
import TabletHeroCSSViewer from './viewers/TabletHeroCSSViewer';

// Dynamically import desktop 3D component ONLY for desktop (> 1024px).
// Tablet and mobile never load or evaluate Three.js / React Three Fiber.
const DesktopHeroScene = dynamic(() => import('./3d/DesktopHeroScene'), {
  ssr: false,
  loading: () => <MobileHeroImage />,
});

export default function MakhanaScene({ classNameProp = '' }) {
  // Device tier: 'mobile' (<= 768px) | 'tablet' (769px - 1024px) | 'desktop' (> 1024px)
  // Default to 'mobile' on SSR to guarantee zero heavy Three.js initialization
  const [deviceTier, setDeviceTier] = useState('mobile');

  useEffect(() => {
    const updateDeviceTier = () => {
      const width = window.innerWidth;
      // FINAL HERO DEVICE STRATEGY:
      // > 1024px: Desktop 3D scene (Three.js/Fiber if WebGL supported)
      // 769px - 1024px: Tablet CSS Depth Viewer (CSS 3D transforms, zero WebGL)
      // <= 768px: Mobile static hero image (pure CSS entrance, zero WebGL)
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

  return (
    <div className={`w-full h-full rounded-3xl overflow-hidden ${classNameProp}`}>
      {deviceTier === 'desktop' ? (
        <DesktopHeroScene fallback={<TabletHeroCSSViewer />} />
      ) : deviceTier === 'tablet' ? (
        <TabletHeroCSSViewer />
      ) : (
        <MobileHeroImage />
      )}
    </div>
  );
}
