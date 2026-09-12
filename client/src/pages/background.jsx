import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { CopyShader } from "three/addons/shaders/CopyShader.js";
import { PirateFloatingArtifacts } from "../components/PirateFloatingArtifacts";

function hexToVec3(hex) {
    const n = parseInt(hex.slice(1), 16);
    return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };

function ThreeBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ---------- Renderer & Scene Setup ----------
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x020610);
        scene.fog = new THREE.Fog(0x020610, 1, 24);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 80);
        camera.position.set(0, 0, 3);
        camera.layers.enable(LAYERS.TORUS_SCENE);
        camera.layers.enable(LAYERS.BLOOM_SCENE);
        camera.layers.enable(LAYERS.ENTIRE_SCENE);
        scene.add(camera);

        // ---------- Geometry / Water Bubble Particles (Reduced & Calmed) ----------
        const count = 260;
        const positions = [];
        const sizes = [];
        for (let i = 0; i < count; i++) {
            positions.push(2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1);
            sizes.push(16 + 18 * Math.random());
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

        const uniforms = {
            iTime: { value: 0 },
            iShift: { value: new THREE.Vector3() },
            iAlpha: { value: 0 },
            iAnimation: { value: new THREE.Vector3(0, 0, 0) },
            iResolution: {
                value: {
                    x: window.innerWidth * window.devicePixelRatio,
                    y: window.innerHeight * window.devicePixelRatio,
                },
            },
            uDepth: { value: 3.7 },
            uCool: { value: hexToVec3("#0a4b8c") },
            uWarm: { value: hexToVec3("#38bdf8") },
        };

        const vertexShader = `
      attribute float size;
      uniform float iTime;
      uniform vec3 iShift;
      uniform vec2 iResolution;
      uniform vec3 iAnimation;
      uniform float uDepth;
      varying float transparency;
      varying float warmness;

      vec3 warp3d(vec3 pos, float t) {
          float curv = 0.9, a = 1.9, b = 0.25, b2 = 0.03, c = 0.02;
          pos *= 2.;
          pos.x += curv * sin(c * t + a * pos.y) + t * b2;
          pos.y += curv * cos(c * t + a * pos.x);
          pos.z += curv * cos(c * t + a * pos.y);
          pos.z += curv * sin(c * t + a * pos.x) + t * b;
          pos.z = abs(pos.z);
          return pos.xyz;
      }

      void main() {
          vec3 v = warp3d(position, iTime);
          v = uDepth * (2. * fract(v + iShift) - 1.) + iAnimation;
          vec4 vpos = modelViewMatrix * vec4(v, 1.);
          transparency = step(length(v), uDepth);
          warmness = step(.75, fract(size * 7.13));
          gl_PointSize = size * iResolution.y / 1000. / -vpos.z;
          gl_Position = projectionMatrix * vpos;
      }
    `;

        const fragmentShader = `
      varying float transparency; 
      varying float warmness;
      uniform float iAlpha; 
      uniform vec3 uCool; 
      uniform vec3 uWarm;

      void main() {
          vec3 color = mix(uCool * .8, uWarm * .8, warmness);
          float tex = smoothstep(1., .3, length(2. * gl_PointCoord - 1.));
          gl_FragColor = vec4(tex * color, tex * transparency * iAlpha);
      }
    `;

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
        });
        material.stencil = false;

        const points = new THREE.Points(geometry, material);
        points.position.set(0, 0, -1);
        points.layers.enable(LAYERS.ENTIRE_SCENE);
        scene.add(points);

        // ---------- Underwater Lighting for 3D Pirate Artifacts ----------
        const ambientLight = new THREE.AmbientLight(0x1e3a5f, 1.4);
        ambientLight.layers.enable(LAYERS.ENTIRE_SCENE);
        ambientLight.layers.enable(LAYERS.BLOOM_SCENE);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffeedb, 3.8);
        dirLight.position.set(6, 14, 10);
        dirLight.layers.enable(LAYERS.ENTIRE_SCENE);
        dirLight.layers.enable(LAYERS.BLOOM_SCENE);
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0x0369a1, 2.2);
        fillLight.position.set(-8, -6, 6);
        fillLight.layers.enable(LAYERS.ENTIRE_SCENE);
        fillLight.layers.enable(LAYERS.BLOOM_SCENE);
        scene.add(fillLight);

        // ---------- 3D Floating Pirate Artifacts (Gold Coins, Hooks, Eyepatches, Pure Diamonds) ----------
        const pirateArtifacts = new PirateFloatingArtifacts(scene, { count: 13 });
        pirateArtifacts.group.traverse((child) => {
            if (child.isMesh || child.isGroup) {
                child.layers.enable(LAYERS.ENTIRE_SCENE);
                child.layers.enable(LAYERS.BLOOM_SCENE);
            }
        });

        // ---------- Postprocessing (Unified Single Composer - Zero Flickering) ----------
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        // Underwater Bloom for Golden Coin glints and particle sparkles
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.35, // strength
            0.4,  // radius
            0.6   // threshold
        );
        composer.addPass(bloomPass);

        composer.addPass(new ShaderPass(GammaCorrectionShader));

        // ---------- Animations ----------
        const DUST_ALPHA = 0.68;
        const DRIFT_SPEED = 0.4;

        let appearStart = null;
        let appearAnimFrameId = null;
        let mainAnimFrameId = null;

        function smootherstep(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function appearIn(now) {
            if (appearStart === null) appearStart = now;
            const t = Math.min(1, (now - appearStart) / 2200);
            const eased = smootherstep(t);
            uniforms.iAlpha.value = eased * DUST_ALPHA;
            if (t < 1) {
                appearAnimFrameId = requestAnimationFrame(appearIn);
            }
        }
        appearAnimFrameId = requestAnimationFrame(appearIn);

        function flyPoints() {
            uniforms.iTime.value = performance.now() / 1000;
            uniforms.iShift.value.add(camera.position.clone().multiplyScalar(0.0022 * DRIFT_SPEED));
        }

        function animate() {
            mainAnimFrameId = requestAnimationFrame(animate);

            const now = performance.now() / 1000;
            flyPoints();

            // Update 3D Floating Pirate Artifacts (natural underwater drift with zero mouse interference)
            pirateArtifacts.update(now);

            composer.render();
        }

        // ---------- Resize Listener ----------
        function onResize() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const dpr = window.devicePixelRatio;

            renderer.setPixelRatio(dpr);
            renderer.setSize(w, h, false);

            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            composer.setPixelRatio(dpr);
            composer.setSize(w, h);

            uniforms.iResolution.value = { x: w * dpr, y: h * dpr };
        }

        window.addEventListener("resize", onResize);
        onResize();
        animate();

        // ---------- Cleanup on Unmount ----------
        return () => {
            window.removeEventListener("resize", onResize);
            if (appearAnimFrameId) cancelAnimationFrame(appearAnimFrameId);
            if (mainAnimFrameId) cancelAnimationFrame(mainAnimFrameId);

            pirateArtifacts.dispose();
            composer.dispose();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}

export default ThreeBackground;
