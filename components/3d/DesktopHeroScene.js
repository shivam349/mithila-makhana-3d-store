'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CanvasErrorBoundary from './CanvasErrorBoundary';

function PremiumMakhanaHeroModel() {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    // 1. Slow, elegant continuous rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      // 2. Subtle, natural vertical float (just a few pixels)
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
    }

    // 5. Subtle mouse parallax lerping (disabled on touch/extreme angles)
    if (groupRef.current) {
      const targetRotationX = -state.pointer.y * 0.15;
      const targetRotationY = state.pointer.x * 0.22;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.04);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 4. Soft realistic contact shadow beneath product */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 32]} />
        <meshBasicMaterial color="#2A170B" opacity={0.14} transparent />
      </mesh>

      {/* Main Artisan Makhana Kernel (Optimized Detail 2 Geometry) */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.35, 2]} />
        {/* Soft, premium natural organic food material - no neon/glow */}
        <meshStandardMaterial
          color="#FFFDF7"
          roughness={0.65}
          metalness={0.05}
          bumpScale={0.05}
        />
      </mesh>
    </group>
  );
}

// 3. Soft Studio Light Rig simulating premium product photography
function StudioLighting() {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current) {
      // Gentle subtle moving highlight across the surface
      lightRef.current.position.x = 4 + Math.sin(state.clock.elapsedTime * 0.4) * 1.2;
      lightRef.current.position.y = 5 + Math.cos(state.clock.elapsedTime * 0.3) * 0.8;
    }
  });

  return (
    <>
      {/* Soft warm ambient fill */}
      <ambientLight intensity={0.9} color="#FFFBF0" />

      {/* Primary key light - soft warm photographic studio light */}
      <directionalLight
        ref={lightRef}
        position={[4, 5, 5]}
        intensity={1.2}
        color="#FFF9E6"
      />

      {/* Gentle cool fill light for photographic contrast */}
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#E8EDF5" />

      {/* Subtle warm rim light to define kernel contours */}
      <pointLight position={[0, -3, -3]} intensity={0.5} color="#F5DCC8" />
    </>
  );
}

export default function DesktopHeroScene({ fallback = null }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        style={{ width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 2]}
      >
        <StudioLighting />
        <PremiumMakhanaHeroModel />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
