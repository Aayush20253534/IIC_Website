import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PirateFloatingArtifacts } from "../components/PirateFloatingArtifacts";

function hexToVec3(hex) {
    const n = parseInt(hex.slice(1), 16);
    return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

function ThreeBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ---------- Renderer & Scene Setup (Ultra-optimized for Low-End GPUs) ----------
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
        });
        const initialDpr = Math.min(window.devicePixelRatio || 1, 1.0);
        renderer.setPixelRatio(initialDpr);
        renderer.shadowMap.enabled = false; // Disable unused shadow maps

        const scene = new THREE.Scene();
        // Transparent scene so AdisyonShader ocean abyss wave background is visible underneath
        scene.fog = new THREE.Fog(0x020610, 2, 28);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 80);
        camera.position.set(0, 0, 3);
        scene.add(camera);

        // ---------- Geometry / Water Bubble Particles (Balanced 300 Points) ----------
        const count = 300;
        const positions = [];
        const sizes = [];
        for (let i = 0; i < count; i++) {
            positions.push(2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1);
            sizes.push(18 + 20 * Math.random());
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
                    x: window.innerWidth * initialDpr,
                    y: window.innerHeight * initialDpr,
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
        scene.add(points);

        // ---------- Streamlined Specular Lighting (Low GPU Instruction Overhead) ----------
        const ambientLight = new THREE.AmbientLight(0x152e4d, 1.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xfff2d6, 4.5);
        dirLight.position.set(6, 14, 10);
        scene.add(dirLight);

        // Dynamic Moving Specular Point Light for Sharp Metallic Glints & Shimmer
        const glintPointLight = new THREE.PointLight(0xfff3a1, 5.5, 35);
        glintPointLight.position.set(2, 4, 6);
        scene.add(glintPointLight);

        // ---------- 3D Floating Pirate Artifacts (Consolidated High-Performance Stream) ----------
        const pirateArtifacts = new PirateFloatingArtifacts(scene, { count: 14 });

        // ---------- Animations & Zero-Allocation Math ----------
        const DUST_ALPHA = 0.68;
        const DRIFT_SPEED = 0.35;
        const shiftVec = new THREE.Vector3();

        let appearStart = null;
        let appearAnimFrameId = null;
        let mainAnimFrameId = null;
        let isTabVisible = true;
        let isPausedByRoute = false;

        function smootherstep(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function appearIn(now) {
            if (appearStart === null) appearStart = now;
            const t = Math.min(1, (now - appearStart) / 2000);
            const eased = smootherstep(t);
            uniforms.iAlpha.value = eased * DUST_ALPHA;
            if (t < 1) {
                appearAnimFrameId = requestAnimationFrame(appearIn);
            }
        }
        appearAnimFrameId = requestAnimationFrame(appearIn);

        function flyPoints() {
            uniforms.iTime.value = performance.now() / 1000;
            shiftVec.copy(camera.position).multiplyScalar(0.002 * DRIFT_SPEED);
            uniforms.iShift.value.add(shiftVec);
        }

        // ---------- Scroll Tracking (Throttled & Reflow-Free) ----------
        let scrollProgress = 0;
        let isScrollTicking = false;
        const updateScroll = () => {
            if (!isScrollTicking) {
                isScrollTicking = true;
                requestAnimationFrame(() => {
                    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
                    scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
                    isScrollTicking = false;
                });
            }
        };
        window.addEventListener("scroll", updateScroll, { passive: true });

        // Reset scroll state on route transition
        const onResetArtifacts = () => {
            scrollProgress = 0;
            pirateArtifacts.group.scale.setScalar(1.0);
            pirateArtifacts.group.position.y = 0;
        };
        window.addEventListener("reset-artifacts", onResetArtifacts);

        // ---------- 30 FPS Throttled Render Loop ----------
        const TARGET_FPS = 30;
        const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
        let lastRenderTime = 0;

        function animate() {
            if (!isTabVisible || isPausedByRoute) {
                mainAnimFrameId = null;
                return;
            }
            mainAnimFrameId = requestAnimationFrame(animate);

            const nowMs = performance.now();
            const elapsedSinceLastRender = nowMs - lastRenderTime;

            // Frame Throttle: Lock background 3D canvas strictly to 30 FPS for low-end device performance
            if (elapsedSinceLastRender < FRAME_INTERVAL_MS) {
                return;
            }
            const delta = Math.min(0.1, elapsedSinceLastRender / 1000);
            lastRenderTime = nowMs - (elapsedSinceLastRender % FRAME_INTERVAL_MS);

            const now = nowMs / 1000;
            flyPoints();

            // Dynamic Moving Specular Highlights across Tumbling Gold Artifacts
            glintPointLight.position.x = Math.sin(now * 1.1) * 7;
            glintPointLight.position.y = Math.cos(now * 0.8) * 5 + 1.5;
            glintPointLight.position.z = 4.5 + Math.sin(now * 0.6) * 3;

            // Fade out and lift 3D artifacts as user scrolls down towards the footer
            if (scrollProgress > 0.4) {
                const fadeOut = Math.max(0, 1 - (scrollProgress - 0.4) / 0.45);
                pirateArtifacts.group.scale.setScalar(fadeOut);
                pirateArtifacts.group.position.y = (scrollProgress - 0.4) * 3.5;
            } else {
                pirateArtifacts.group.scale.setScalar(1.0);
                pirateArtifacts.group.position.y = 0;
            }

            // Update 3D Floating Pirate Artifacts with Delta Normalization
            pirateArtifacts.update(now, delta);

            // Direct Fast GPU Render (Zero post-processing convolution passes)
            renderer.render(scene, camera);
        }

        function onVisibilityChange() {
            isTabVisible = !document.hidden;
            if (isTabVisible && !isPausedByRoute && !mainAnimFrameId) {
                mainAnimFrameId = requestAnimationFrame(animate);
            }
        }
        document.addEventListener("visibilitychange", onVisibilityChange);

        function onCustomPause(e) {
            isPausedByRoute = Boolean(e?.detail?.pause);
            if (!isPausedByRoute && isTabVisible && !mainAnimFrameId) {
                mainAnimFrameId = requestAnimationFrame(animate);
            } else if (isPausedByRoute && mainAnimFrameId) {
                cancelAnimationFrame(mainAnimFrameId);
                mainAnimFrameId = null;
            }
        }
        window.addEventListener("three-bg-pause", onCustomPause);

        // ---------- Resize Listener ----------
        function onResize() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const dpr = 1.0; // Strictly clamp DPR to 1.0 for high FPS on low-end GPUs

            renderer.setPixelRatio(dpr);
            renderer.setSize(w, h, false);

            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            uniforms.iResolution.value = { x: w * dpr, y: h * dpr };
            updateScroll();
        }

        window.addEventListener("resize", onResize);
        onResize();
        animate();

        // ---------- Cleanup on Unmount ----------
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", updateScroll);
            window.removeEventListener("reset-artifacts", onResetArtifacts);
            window.removeEventListener("three-bg-pause", onCustomPause);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            if (appearAnimFrameId) cancelAnimationFrame(appearAnimFrameId);
            if (mainAnimFrameId) cancelAnimationFrame(mainAnimFrameId);

            pirateArtifacts.dispose();
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
