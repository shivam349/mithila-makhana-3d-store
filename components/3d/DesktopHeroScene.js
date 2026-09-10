'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import CanvasErrorBoundary from './CanvasErrorBoundary';

function MakhanaKernel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.22;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
      <mesh ref={meshRef}>
        {/* Detail 2 generates an organic, smooth kernel with ~80 polygons instead of 1.3 million */}
        <icosahedronGeometry args={[1.2, 2]} />
        <meshPhongMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.6}
          shininess={100}
        />
      </mesh>
    </Float>
  );
}

function SurroundingParticles() {
  return (
    <group>
      <Float speed={1.8} rotationIntensity={0.8} position={[-2.5, 1.8, -1.8]}>
        <mesh>
          <sphereGeometry args={[0.38, 14, 14]} />
          <meshPhongMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.8} position={[2.5, -1, -2]}>
        <mesh>
          <sphereGeometry args={[0.42, 14, 14]} />
          <meshPhongMaterial color="#fb923c" emissive="#f97316" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} position={[1, 2.2, -1.5]}>
        <mesh>
          <sphereGeometry args={[0.3, 14, 14]} />
          <meshPhongMaterial color="#fed7aa" emissive="#f97316" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.6} position={[-1.8, -1.8, -1]}>
        <mesh>
          <sphereGeometry args={[0.26, 14, 14]} />
          <meshPhongMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={1.9} rotationIntensity={0.9} position={[1.8, 1, -2]}>
        <mesh>
          <sphereGeometry args={[0.35, 14, 14]} />
          <meshPhongMaterial color="#f97316" emissive="#d97706" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function DesktopHeroScene({ fallback = null }) {
  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.75} />
        <pointLight position={[8, 8, 8]} intensity={1.1} />
        <pointLight position={[-8, -8, 8]} intensity={0.8} color="#f59e0b" />
        <pointLight position={[0, 0, 3]} intensity={0.7} color="#fbbf24" />

        <group>
          <MakhanaKernel />
          <SurroundingParticles />
          <Sparkles count={40} scale={4.5} size={2.2} speed={0.3} color="#fbbf24" />
        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
