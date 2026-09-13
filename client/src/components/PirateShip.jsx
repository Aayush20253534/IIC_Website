import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sampleWaveHeight, sampleWaveSlopeX, sampleWaveSlopeZ } from "../lib/waves";

const SHIP_X = 2.6;
const SHIP_Z = -0.2;
const WATER_LEVEL = -0.8;

export default function PirateShip() {
  const groupRef = useRef(null);
  const { scene } = useGLTF("/pirate_ship.glb");

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.z, 1);
    const scale = 9.8 / maxDim;
    clone.scale.setScalar(scale);
    const scaled = new THREE.Box3().setFromObject(clone);
    const center = scaled.getCenter(new THREE.Vector3());
    clone.position.set(-center.x, -scaled.min.y - 1.5, -center.z);
    return clone;
  }, [scene]);

  useEffect(() => {
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const mat of materials) {
          if (mat.isMeshStandardMaterial) {
            mat.envMapIntensity = 1.6;
            mat.roughness = Math.max(0.28, mat.roughness * 0.85);
            mat.metalness = Math.min(0.75, mat.metalness + 0.15);
            mat.needsUpdate = true;
          }
        }
      }
    });
  }, [model]);

  useFrame(({ clock }, rawDelta) => {
    const ship = groupRef.current;
    if (!ship) return;
    const time = clock.elapsedTime;
    const dt = Math.min(rawDelta, 0.05);

    // Sample dynamic Gerstner wave buoyant motion
    const targetY = WATER_LEVEL + sampleWaveHeight(SHIP_X, SHIP_Z, time);
    const targetPitch = -sampleWaveSlopeZ(SHIP_X, SHIP_Z, time) * 0.38;
    const targetRoll = sampleWaveSlopeX(SHIP_X, SHIP_Z, time) * 0.44;
    const damping = 1 - Math.exp(-3.5 * dt);

    ship.position.y = THREE.MathUtils.lerp(ship.position.y, targetY, damping);
    ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, targetPitch, damping);
    ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, targetRoll, damping);
  });

  return (
    <group ref={groupRef} position={[SHIP_X, WATER_LEVEL, SHIP_Z]} rotation-y={-0.42}>
      <primitive object={model} />
      {/* Shipboard Warm Lantern Glow for rich depth */}
      <pointLight position={[0, 2.5, 0.8]} intensity={6.5} distance={15} decay={2} color="#FFD166" />
      <pointLight position={[0, 4.0, -1.8]} intensity={4.5} distance={12} decay={2} color="#F4A261" />
    </group>
  );
}

useGLTF.preload("/pirate_ship.glb");
