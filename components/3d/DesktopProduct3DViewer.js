'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import CanvasErrorBoundary from './CanvasErrorBoundary';

function ProductModel({ color = '#f59e0b', product = 'classic' }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
  });

  const getGeometry = () => {
    switch (product) {
      case 'masala':
        return <octahedronGeometry args={[1.3, 2]} />;
      case 'honey':
        return <dodecahedronGeometry args={[1.1, 0]} />;
      case 'premium':
      case 'organic':
        return <icosahedronGeometry args={[1.3, 2]} />;
      default:
        return <icosahedronGeometry args={[1.2, 2]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshPhongMaterial
          color={color}
          emissive={new THREE.Color(color).multiplyScalar(0.7)}
          emissiveIntensity={0.4}
          shininess={90}
        />
      </mesh>
    </Float>
  );
}

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

export default function DesktopProduct3DViewer({
  product = 'classic',
  color = '#C67C2E',
  autoRotate = true,
  zoomAction = null,
  controlsRef,
  fallback = null,
}) {
  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        style={{ width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.85} />
        <pointLight position={[10, 10, 10]} intensity={1.1} />
        <pointLight position={[-8, -8, 8]} intensity={0.8} color={color} />
        <pointLight position={[0, 5, 3]} intensity={0.5} />

        <group>
          <ProductModel color={color} product={product} />
        </group>

        <CameraController zoomTrigger={zoomAction} />

        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={7.0}
          autoRotate={autoRotate}
          autoRotateSpeed={3.0}
          maxPolarAngle={Math.PI / 1.3}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
