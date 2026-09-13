import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Ocean from "./Ocean";

const SHIP_LAYOUT = [
  { position: [-4.55, -0.38, 0.05], rotation: [0, 0.28, -0.015], phase: 0.2 },
  { position: [0, -0.34, -0.4], rotation: [0, 0.08, 0.01], phase: 1.9 },
  { position: [4.55, -0.4, 0.12], rotation: [0, -0.22, 0.018], phase: 3.5 },
];

const smoothstep = (value) => value * value * (3 - 2 * value);

function Ship({ groupRef, position, rotation }) {
  const { scene } = useGLTF("/pirate_ship.glb");

  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = false;
      node.receiveShadow = false;

      if (node.material) {
        const liftMaterial = (source) => {
          const material = source.clone();
          material.roughness = Math.min(material.roughness ?? 0.7, 0.72);
          material.metalness = Math.min(material.metalness ?? 0.1, 0.28);
          material.envMapIntensity = 1.28;

          if ("emissive" in material) {
            material.emissive = new THREE.Color("#3a1a06");
            material.emissiveIntensity = 0.44;
          }
          return material;
        };

        node.material = Array.isArray(node.material)
          ? node.material.map(liftMaterial)
          : liftMaterial(node.material);
      }
    });

    return clone;
  }, [scene]);

  useEffect(
    () => () => {
      model.traverse((node) => {
        if (!node.isMesh || !node.material) return;
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((material) => material.dispose());
      });
    },
    [model],
  );

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={0.255}>
      <primitive object={model} />
    </group>
  );
}

function FleetMotion({ shipRefs, transitionKey, transitionDirection }) {
  const visualTime = useRef(0);
  const previousTransitionKey = useRef(transitionKey);
  const transition = useRef({
    active: false,
    elapsed: 0,
    direction: 0,
  });

  useEffect(() => {
    if (previousTransitionKey.current === transitionKey) return;

    previousTransitionKey.current = transitionKey;
    transition.current = {
      active: true,
      elapsed: 0,
      direction: transitionDirection || 1,
    };
  }, [transitionDirection, transitionKey]);

  useFrame(({ camera }, delta) => {
    // If the GPU misses a frame, elapsedTime-based motion jumps ahead. Capping
    // the simulation step makes the fleet slow imperceptibly instead of
    // visibly stuttering, while preserving the exact same swell/roll motion.
    const simulationDelta = Math.min(delta, 1 / 30);
    visualTime.current += simulationDelta;
    const t = visualTime.current;

    if (transition.current.active) {
      transition.current.elapsed += simulationDelta;
    }

    SHIP_LAYOUT.forEach((ship, slotIndex) => {
      const group = shipRefs.current[slotIndex];
      if (!group) return;

      const { position, rotation, phase } = ship;
      const localTime = t + phase;
      const primarySwell = Math.sin(localTime * 0.61);
      const secondarySwell = Math.sin(localTime * 1.13 + phase * 0.63);
      const chop = Math.sin(localTime * 2.17 + slotIndex * 1.37);
      const quarteringSea = Math.cos(localTime * 0.43 + phase * 1.41);

      const heave = primarySwell * 0.1 + secondarySwell * 0.034 + chop * 0.012;
      const pitch =
        Math.cos(localTime * 0.54 + phase * 0.2) * 0.027 +
        secondarySwell * 0.008 +
        chop * 0.003;
      const roll =
        Math.sin(localTime * 0.49 + phase * 1.15) * 0.039 +
        quarteringSea * 0.012 +
        chop * 0.0035;

      let carouselX = 0;
      let carouselZ = 0;
      let carouselYaw = 0;
      let carouselHeel = 0;
      let carouselLift = 0;

      if (transition.current.active) {
        const duration = 1.16;
        const stagger = slotIndex * 0.045;
        const rawProgress = Math.max(
          0,
          Math.min(
            1,
            (transition.current.elapsed - stagger) / (duration - stagger),
          ),
        );
        const travel = Math.sin(rawProgress * Math.PI);
        const easedTravel = smoothstep(Math.min(1, rawProgress * 1.08));
        const direction = transition.current.direction;

        carouselX = -direction * travel * (0.82 + slotIndex * 0.055);
        carouselZ = -travel * 0.24 + Math.sin(rawProgress * Math.PI * 2) * 0.045;
        carouselYaw = -direction * travel * 0.105;
        carouselHeel = direction * travel * 0.047;
        carouselLift =
          Math.sin(rawProgress * Math.PI * 2) * 0.025 * (1 - easedTravel * 0.2);
      }

      group.position.x =
        position[0] +
        Math.sin(localTime * 0.22 + slotIndex) * 0.035 +
        carouselX;
      group.position.y = position[1] + heave + carouselLift;
      group.position.z =
        position[2] + Math.cos(localTime * 0.29 + phase) * 0.022 + carouselZ;

      group.rotation.x = rotation[0] + pitch;
      group.rotation.y =
        rotation[1] + Math.sin(localTime * 0.24) * 0.009 + carouselYaw;
      group.rotation.z = rotation[2] + roll + carouselHeel;
    });

    if (transition.current.active && transition.current.elapsed >= 1.16) {
      transition.current.active = false;
    }

    // Keep the original subtle camera drift, but run it inside the same frame
    // callback so React Three Fiber only dispatches one animation callback for
    // the entire fleet instead of one per ship plus one for the camera.
    camera.position.x = Math.sin(t * 0.12) * 0.12;
    camera.position.y = 4.4 + Math.sin(t * 0.17) * 0.035;
    camera.lookAt(0, 0.45, -1.0);
  });

  return null;
}

function Fleet({ transitionKey, transitionDirection }) {
  const shipRefs = useRef([]);

  return (
    <>
      <color attach="background" args={["#02070d"]} />
      <fog attach="fog" args={["#03101a", 17, 58]} />

      <ambientLight color="#547b9b" intensity={0.74} />
      <hemisphereLight color="#a5c9df" groundColor="#02060a" intensity={1.02} />
      <directionalLight position={[-8, 11, 8]} color="#b9ddf2" intensity={2.75} />
      <directionalLight position={[8, 7, 4]} color="#ffc06a" intensity={1.32} />

      <Environment resolution={32}>
        <Lightformer
          intensity={4.5}
          color="#ffd08a"
          position={[-4, 7, 5]}
          scale={[7, 7, 1]}
        />
        <Lightformer
          intensity={2.2}
          color="#69c8ef"
          position={[8, 4, 1]}
          rotation-y={-Math.PI / 2}
          scale={[9, 4, 1]}
        />
      </Environment>

      <Ocean variant="sponsor" />

      {SHIP_LAYOUT.map((ship, index) => (
        <Ship
          key={index}
          {...ship}
          groupRef={(node) => {
            shipRefs.current[index] = node;
          }}
        />
      ))}

      <FleetMotion
        shipRefs={shipRefs}
        transitionKey={transitionKey}
        transitionDirection={transitionDirection}
      />
    </>
  );
}

export default function SponsorVoyageScene({
  transitionKey = 0,
  transitionDirection = 0,
}) {
  const hostRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "220px 0px", threshold: 0.01 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="sponsor-voyage-canvas-shell" aria-hidden="true">
      <Canvas
        className="sponsor-voyage-canvas"
        dpr={[0.72, 1]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump",
          stencil: false,
        }}
        camera={{ position: [0, 4.4, 13.1], fov: 41, near: 0.1, far: 150 }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.46;
        }}
      >
        <Suspense fallback={null}>
          <Fleet
            transitionKey={transitionKey}
            transitionDirection={transitionDirection}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/pirate_ship.glb");
