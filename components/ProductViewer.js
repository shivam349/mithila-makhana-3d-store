'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function ProductModel({ color = '#f59e0b', product = 'classic' }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  const getGeometry = () => {
    switch (product) {
      case 'masala':
        return <octahedronGeometry args={[1.3, 4]} />;
      case 'honey':
        return <dodecahedronGeometry args={[1.1, 0]} />;
      case 'premium':
        return <icosahedronGeometry args={[1.4, 8]} />;
      default:
        return <icosahedronGeometry args={[1.2, 8]} />;
    }
  };

  return (
    <Float speed={2.2} rotationIntensity={0.8} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshPhongMaterial
          color={color}
          emissive={new THREE.Color(color).multiplyScalar(0.7)}
          emissiveIntensity={0.4}
          shininess={90}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function ParticleRing({ productColor = '#f59e0b' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={1.8} position={[(i - 2.5) * 1.2, 0, 0]}>
          <mesh
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 2.4,
              0,
              Math.sin((i / 6) * Math.PI * 2) * 2.4,
            ]}
          >
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshPhongMaterial
              color={productColor}
              emissive={new THREE.Color(productColor).multiplyScalar(0.5)}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Camera controller helper for zoom controls
function CameraController({ zoomTrigger }) {
  const { camera } = useThree();
  useFrame(() => {
    if (zoomTrigger === 'in' && camera.position.z > 3) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, camera.position.z - 0.5, 0.1);
    } else if (zoomTrigger === 'out' && camera.position.z < 6.5) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, camera.position.z + 0.5, 0.1);
    } else if (zoomTrigger === 'reset') {
      camera.position.lerp(new THREE.Vector3(0, 0, 5), 0.1);
    }
  });
  return null;
}

export default function ProductViewer({
  product = 'classic',
  color = '#C67C2E',
  classNameProp = '',
}) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoomAction, setZoomAction] = useState(null);
  const controlsRef = useRef();

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

  return (
    <div className={`relative w-full h-full flex flex-col ${classNameProp}`}>
      {/* 3D Canvas Canvas Area */}
      <div className="relative flex-1 w-full h-full min-h-[380px]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 48 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.85} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-8, -8, 8]} intensity={0.8} color={color} />
          <pointLight position={[0, 5, 3]} intensity={0.5} />

          <group>
            <ProductModel color={color} product={product} />
            <ParticleRing productColor={color} />
            <Sparkles count={100} scale={4.2} size={2.2} speed={0.25} color={color} />
          </group>

          <CameraController zoomTrigger={zoomAction} />

          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={7.0}
            autoRotate={autoRotate}
            autoRotateSpeed={3.5}
            maxPolarAngle={Math.PI / 1.3}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>

        {/* Floating Controls Overlay (Top Right) */}
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
              autoRotate ? 'bg-makhana-100 text-makhana-800 font-bold' : 'text-earth-600 hover:bg-earth-100'
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

        {/* Interactive Hotspot Details Popup (When Selected) */}
        {activeHotspot && (
          <div className="absolute bottom-16 left-4 right-4 z-20 max-w-sm mx-auto bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-makhana-300 shadow-xl animate-fade-in space-y-1">
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

      {/* Feature 3: Interactive Hotspots Strip Beneath Canvas */}
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
