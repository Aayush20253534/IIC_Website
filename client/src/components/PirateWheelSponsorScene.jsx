import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ChevronLeft, ChevronRight, Compass, ShieldCheck, Ship, Sparkles } from "lucide-react";
import { SPONSOR_STREAM_ITEMS } from "../data/sponsorsData";

// ---------- Highly Detailed 3D Pirate Ship Wheel Mesh Component ----------
function DetailedPirateHelm({ targetRotationZ }) {
  const wheelGroupRef = useRef();
  const currentRotationZ = useRef(0);

  // Procedural Materials for Aged Mahogany Wood & Polished Brass/Iron
  const materials = useMemo(() => {
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x3d1c08,
      roughness: 0.42,
      metalness: 0.12,
      bumpScale: 0.04,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xdfb76c,
      roughness: 0.24,
      metalness: 0.94,
    });

    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x222933,
      roughness: 0.38,
      metalness: 0.82,
    });

    const silverStarMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.18,
      metalness: 0.95,
    });

    return { woodMat, brassMat, ironMat, silverStarMat };
  }, []);

  // 8 Spoke Angles
  const SPOKE_COUNT = 8;
  const spokes = useMemo(() => {
    return Array.from({ length: SPOKE_COUNT }, (_, i) => (i * 2 * Math.PI) / SPOKE_COUNT);
  }, []);

  useFrame((state, delta) => {
    if (!wheelGroupRef.current) return;

    // Smooth LERP towards scroll/drag target rotation
    currentRotationZ.current += (targetRotationZ - currentRotationZ.current) * Math.min(1, delta * 6.5);
    wheelGroupRef.current.rotation.z = currentRotationZ.current;

    // Gentle nautical idle pitch & roll sway
    const time = state.clock.getElapsedTime();
    wheelGroupRef.current.rotation.x = Math.sin(time * 0.8) * 0.04 + 0.08;
    wheelGroupRef.current.rotation.y = Math.cos(time * 0.6) * 0.06;
  });

  return (
    <group ref={wheelGroupRef} scale={1.22} position={[0, 0, 0]}>
      {/* 1. Central Heavy Brass Hub */}
      <mesh material={materials.brassMat} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 0.28, 32]} />
      </mesh>

      {/* Hub Flange Rings */}
      <mesh material={materials.ironMat} position={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
      </mesh>
      <mesh material={materials.ironMat} position={[0, 0, -0.12]}>
        <cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
      </mesh>

      {/* Central Compass Star Medallion (Front Cap) */}
      <mesh material={materials.silverStarMat} position={[0, 0, 0.16]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 8]} />
      </mesh>
      <mesh material={materials.brassMat} position={[0, 0, 0.18]}>
        <coneGeometry args={[0.08, 0.08, 4]} />
      </mesh>

      {/* Perimeter Hub Bolts */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 2 * Math.PI) / 8;
        return (
          <mesh
            key={`hub-bolt-${i}`}
            material={materials.brassMat}
            position={[Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, 0.15]}
          >
            <cylinderGeometry args={[0.024, 0.024, 0.03, 8]} />
          </mesh>
        );
      })}

      {/* 2. Inner Wooden Rim (Felloes) */}
      <mesh material={materials.woodMat} position={[0, 0, 0]}>
        <torusGeometry args={[1.42, 0.11, 24, 64]} />
      </mesh>

      {/* 3. Outer Iron / Brass Reinforcement Hoop Band */}
      <mesh material={materials.brassMat} position={[0, 0, 0]}>
        <torusGeometry args={[1.52, 0.035, 20, 64]} />
      </mesh>
      <mesh material={materials.ironMat} position={[0, 0, 0]}>
        <torusGeometry args={[1.34, 0.028, 20, 64]} />
      </mesh>

      {/* 4. Radial Turned Mahogany Spokes & Lathe Handles */}
      {spokes.map((angle, i) => (
        <group key={`spoke-handle-${i}`} rotation={[0, 0, angle]}>
          {/* Inner Spoke Shaft (Center Hub to Rim) */}
          <mesh material={materials.woodMat} position={[0, 0.76, 0]}>
            <cylinderGeometry args={[0.065, 0.085, 1.1, 16]} />
          </mesh>

          {/* Spoke Ornamental Brass Collar Rings */}
          <mesh material={materials.brassMat} position={[0, 0.44, 0]}>
            <torusGeometry args={[0.078, 0.022, 12, 24]} />
          </mesh>
          <mesh material={materials.brassMat} position={[0, 1.15, 0]}>
            <torusGeometry args={[0.068, 0.02, 12, 24]} />
          </mesh>

          {/* Rim Joint Iron Rivet Studs */}
          <mesh material={materials.ironMat} position={[0, 1.44, 0.11]}>
            <sphereGeometry args={[0.032, 12, 12]} />
          </mesh>
          <mesh material={materials.ironMat} position={[0, 1.44, -0.11]}>
            <sphereGeometry args={[0.032, 12, 12]} />
          </mesh>

          {/* Outer Ergonomic Hand-Grip (Handle Protruding past the Rim) */}
          <mesh material={materials.woodMat} position={[0, 1.82, 0]}>
            <cylinderGeometry args={[0.075, 0.055, 0.52, 16]} />
          </mesh>

          {/* Lathe Bulb Contour on Handle */}
          <mesh material={materials.woodMat} position={[0, 1.95, 0]}>
            <sphereGeometry args={[0.088, 16, 16]} />
          </mesh>

          {/* Brass Handle Pommel End Cap */}
          <mesh material={materials.brassMat} position={[0, 2.12, 0]}>
            <sphereGeometry args={[0.072, 16, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ---------- Main Interactive Sponsor Scene with 3D Wheel ----------
export default function PirateWheelSponsorScene() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetRotationZ, setTargetRotationZ] = useState(0);
  const isDragging = useRef(false);
  const startMouseX = useRef(0);
  const startRotationZ = useRef(0);

  const sponsorCount = SPONSOR_STREAM_ITEMS.length;
  const currentSponsor = SPONSOR_STREAM_ITEMS[activeIndex] || SPONSOR_STREAM_ITEMS[0];

  // Rotate wheel when user scrolls past this section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (rect.height + windowHeight);
        const rotationAngle = -progress * Math.PI * 4;
        setTargetRotationZ(rotationAngle);

        // Map scroll rotation to active sponsor index
        const index = Math.abs(Math.floor(progress * sponsorCount * 2.2)) % sponsorCount;
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sponsorCount]);

  // Touch & Mouse Drag to Turn the Helm Directly
  const handlePointerDown = (e) => {
    isDragging.current = true;
    startMouseX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startRotationZ.current = targetRotationZ;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startMouseX.current;
    const newRot = startRotationZ.current + deltaX * 0.012;
    setTargetRotationZ(newRot);

    const stepAngle = (2 * Math.PI) / sponsorCount;
    const newIdx = Math.abs(Math.round(-newRot / stepAngle)) % sponsorCount;
    setActiveIndex(newIdx);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % sponsorCount;
    setActiveIndex(nextIdx);
    setTargetRotationZ((prev) => prev - (2 * Math.PI) / sponsorCount);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + sponsorCount) % sponsorCount;
    setActiveIndex(prevIdx);
    setTargetRotationZ((prev) => prev + (2 * Math.PI) / sponsorCount);
  };

  return (
    <section
      ref={containerRef}
      id="sponsors-helm"
      className="relative w-full min-h-[90vh] py-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center items-center select-none"
    >
      {/* Section Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#030d1c]/80 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-mono uppercase tracking-[0.25em] mb-3 shadow-[0_0_18px_rgba(56,189,248,0.2)]">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Voyage Armada Helm</span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#F8FAFC] tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
          Sailing With The Fleet
        </h2>
        <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent mx-auto mt-4" />
        <p className="font-montserrat text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto mt-3 font-light">
          Scroll or turn the flagship helm to explore the partner armada powering Renaissance 2026.
        </p>
      </div>

      {/* Main Interactive Grid: 3D Pirate Helm (Left/Center) + Active Sponsor Dossier (Right) */}
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: 3D Pirate Ship Wheel Canvas */}
        <div
          className="lg:col-span-6 h-[380px] sm:h-[480px] w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {/* Ambient Glow behind the Wheel */}
          <div className="absolute w-72 h-72 rounded-full bg-[#38BDF8]/10 blur-[90px] pointer-events-none" />

          <Canvas
            camera={{ position: [0, 0, 4.8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full"
          >
            {/* Studio Lights for Metallic Glints and Wood Tone */}
            <ambientLight intensity={1.1} />
            <directionalLight position={[5, 8, 5]} intensity={3.2} color="#ffffff" />
            <directionalLight position={[-6, -4, 3]} intensity={1.8} color="#38bdf8" />
            <pointLight position={[0, 0, 3]} intensity={1.4} color="#ffd480" />

            <DetailedPirateHelm targetRotationZ={targetRotationZ} />
          </Canvas>

          {/* Interactive Drag Hint */}
          <div className="absolute bottom-2 px-3 py-1 rounded-full bg-[#020610]/80 border border-white/10 text-[10px] font-mono text-[#94A3B8] tracking-widest uppercase pointer-events-none backdrop-blur-md">
            Drag to Rotate Helm
          </div>
        </div>

        {/* Right Column: Active Sponsor Showcase Card */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#030d1c]/90 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            {/* Top Badge & Fleet Index */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentSponsor.tier}
              </span>

              <span className="font-mono text-xs text-[#94A3B8] tracking-widest">
                0{activeIndex + 1} / 0{sponsorCount}
              </span>
            </div>

            {/* Sponsor High-Res Logo Frame */}
            <div className="w-full h-44 sm:h-52 bg-[#020610]/95 p-6 rounded-2xl border border-white/10 flex items-center justify-center shadow-inner group mb-6 overflow-hidden relative">
              <img
                src={currentSponsor.image}
                alt={currentSponsor.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Sponsor Info */}
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-1">
              {currentSponsor.name}
            </h3>
            <p className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider mb-3">
              {currentSponsor.category}
            </p>
            <p className="font-montserrat text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light mb-6">
              {currentSponsor.description}
            </p>

            {/* Interactive Steering Controls */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#38BDF8] hover:text-[#020610] text-[#F8FAFC] flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label="Previous Sponsor"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#38BDF8] hover:text-[#020610] text-[#F8FAFC] flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label="Next Sponsor"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Jump Thumbnail Dots */}
              <div className="flex items-center gap-1.5">
                {SPONSOR_STREAM_ITEMS.map((_, dotIdx) => (
                  <button
                    key={`dot-${dotIdx}`}
                    onClick={() => {
                      setActiveIndex(dotIdx);
                      setTargetRotationZ(-dotIdx * ((2 * Math.PI) / sponsorCount));
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === dotIdx
                        ? "bg-[#38BDF8] w-6 shadow-[0_0_8px_#38bdf8]"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to sponsor ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
