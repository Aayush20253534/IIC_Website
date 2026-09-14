import React, { useRef } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Environment, Lightformer } from "@react-three/drei";

import * as THREE from "three";

import Ocean from "./Ocean";

function CameraParallax() {
  const { camera, pointer } = useThree();

  const target = useRef(new THREE.Vector3());

  const lookAt = useRef(new THREE.Vector3(2.0, 1.4, 0));

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);

    const damping = 1 - Math.exp(-2.5 * dt);

    target.current.set(
      13.5 + pointer.x * 1.6,
      5.8 + pointer.y * 0.6,
      16.5 + pointer.x * 0.4
    );

    camera.position.lerp(target.current, damping);

    camera.lookAt(lookAt.current);
  });

  return null;
}

function Moon() {
  return (
    <group position={[-28, 28, -50]}>
      <mesh>
        <sphereGeometry args={[5.2, 32, 32]} />

        <meshBasicMaterial color="#FFF5D6" fog={false} />
      </mesh>

      <pointLight
        intensity={22}
        distance={90}
        decay={2}
        color="#C5A25F"
      />
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#02060E"]} />

      <fogExp2 attach="fog" args={["#020710", 0.015]} />

      <ambientLight intensity={0.5} color="#334E68" />

      {/* Celestial directional lighting */}
      <directionalLight
        position={[-14, 24, 12]}
        intensity={3.2}
        color="#FCE7B0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Environment resolution={128}>
        <Lightformer
          intensity={2.2}
          color="#FBBF24"
          position={[-12, 15, -8]}
          scale={[12, 12, 1]}
        />

        <Lightformer
          intensity={1.2}
          color="#0284C7"
          position={[10, 5, 2]}
          rotation-y={-Math.PI / 2}
          scale={[20, 5, 1]}
        />
      </Environment>

      <Moon />

      <Ocean />

      <CameraParallax />
    </>
  );
}

export default function OceanHeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [13.5, 5.8, 16.5],
          fov: 42,
          near: 0.1,
          far: 180,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>

      {/* Left vignette keeps foreground content readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/90 via-[#050B14]/40 to-transparent pointer-events-none hidden lg:block" />

      {/* Vertical cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-[#050B14]/30 pointer-events-none" />
    </div>
  );
}