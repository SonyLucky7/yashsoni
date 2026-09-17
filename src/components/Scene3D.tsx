'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const meshRef3 = useRef<THREE.Mesh>(null);
  const meshRef4 = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x * viewport.width * 0.15;
    const my = state.pointer.y * viewport.height * 0.15;

    // Lerp mouse
    mouseRef.current.x += (mx - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (my - mouseRef.current.y) * 0.05;

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15 + mouseRef.current.y * 0.02;
      meshRef.current.rotation.y = Math.cos(t * 0.2) * 0.2 + mouseRef.current.x * 0.02;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = Math.cos(t * 0.4) * 0.2;
      meshRef2.current.rotation.z = Math.sin(t * 0.3) * 0.15;
      meshRef2.current.position.y = Math.cos(t * 0.6) * 0.2 + 0.5;
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.y = t * 0.15;
      meshRef3.current.rotation.x = Math.sin(t * 0.25) * 0.1;
      meshRef3.current.position.y = Math.sin(t * 0.4 + 1) * 0.25 - 0.8;
    }
    if (meshRef4.current) {
      meshRef4.current.rotation.z = t * 0.1;
      meshRef4.current.rotation.x = Math.cos(t * 0.2) * 0.15;
      meshRef4.current.position.y = Math.cos(t * 0.35) * 0.2 + 1.5;
    }
  });

  return (
    <>
      {/* Main sphere — distorted glass */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} position={[2.5, 0, -1]} scale={1.8}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.8}
            distort={0.25}
            speed={2}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      {/* Torus — wireframe */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef2} position={[-3, 1, -2]} scale={0.8}>
          <torusGeometry args={[1, 0.3, 16, 48]} />
          <meshStandardMaterial
            color="#e0e0e0"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Octahedron — glass */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={meshRef3} position={[4, -1.5, -3]} scale={0.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#cccccc"
            transparent
            opacity={0.25}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Small dodecahedron — accent */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh ref={meshRef4} position={[-2, 2, -4]} scale={0.4}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2}
            transparent
            opacity={0.4}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}

function DataParticles() {
  const count = 500;
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#d4d4d4'),
      new THREE.Color('#999999'),
      new THREE.Color('#ffffff'),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.03}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.2} color="#cccccc" />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />

        <FloatingGeometry />
        <DataParticles />
        <GridPlane />
        <Stars radius={50} depth={50} count={1000} factor={2} fade speed={0.5} />

        <fog attach="fog" args={['#0a0a0a', 8, 25]} />
      </Canvas>
    </div>
  );
}
