import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLWaterCanvas({ className = "w-full h-full" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 260;

    // Scene, Camera, Renderer (Optimized for low-end devices)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 34, 66);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Low-end GPU optimization
      powerPreference: "default",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0x0ea5e9, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 3.2);
    dirLight.position.set(25, 45, 30);
    scene.add(dirLight);

    // Particle Texture for Soft Luminous Droplets
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.35, "rgba(56, 189, 248, 0.85)");
    gradient.addColorStop(0.75, "rgba(2, 132, 199, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    // 100% GPU VERTEX SHADER OCEAN MATRIX (Runs at 60/120 FPS on all low-end devices)
    const cols = 56;
    const rows = 16;
    const count = cols * rows;
    const separation = 4.6;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const ratios = new Float32Array(count);

    let i = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const x = (ix - cols / 2) * separation;
        const z = (iy - rows / 2) * separation;
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        ratios[i] = iy / rows;
        i++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRatio", new THREE.BufferAttribute(ratios, 1));

    // Custom GLSL Shader Material (Zero CPU-to-GPU uploads per frame)
    const customWaterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uColorDeep: { value: new THREE.Color(0x021c3b) }, // Deep sapphire abyss
        uColorFoam: { value: new THREE.Color(0x0ea5e9) }, // Electric ocean cyan
        uColorCrest: { value: new THREE.Color(0xfde047) }, // Starlight gold glint
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uColorDeep;
        uniform vec3 uColorFoam;
        uniform vec3 uColorCrest;
        attribute float aRatio;
        varying vec3 vColor;

        void main() {
          vec3 pos = position;
          
          // Multi-harmonic hydrodynamic wave formula on GPU
          float wave = sin(pos.x * 0.055 + uTime * 1.2) * 2.8 +
                       cos(pos.z * 0.09 + uTime * 0.9) * 2.2 +
                       sin((pos.x + pos.z) * 0.04 + uTime * 1.5) * 1.5;
          pos.y += wave;

          // Color blending based on wave crests & starlight reflections
          vec3 baseCol = mix(uColorDeep, uColorFoam, aRatio);
          if (wave > 2.6) {
            float crestWeight = clamp((wave - 2.6) / 2.0, 0.0, 1.0);
            vColor = mix(baseCol, uColorCrest, crestWeight * 0.7);
          } else {
            vColor = baseCol;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = clamp(320.0 / -mvPosition.z, 2.5, 7.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;

        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          if (tex.a < 0.05) discard;
          gl_FragColor = vec4(vColor * tex.rgb, tex.a * 0.92);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, customWaterMaterial);
    scene.add(particles);

    // ==========================================
    // 3D SAILING FLEET GALLEONS (2.6x SCALE)
    // ==========================================
    const shipMaterials = {
      hull: new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.65 }),
      cabin: new THREE.MeshStandardMaterial({ color: 0x27160c, roughness: 0.75 }),
      goldTrim: new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.25, metalness: 0.9 }),
      mast: new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.65 }),
      sail: new THREE.MeshStandardMaterial({ color: 0xfbf7ed, roughness: 0.85, side: THREE.DoubleSide }),
      flag: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2, metalness: 0.9 }),
    };

    const shipGeometries = {
      hull: new THREE.BoxGeometry(6.0, 1.6, 2.5),
      cabin: new THREE.BoxGeometry(2.1, 1.3, 2.3),
      keel: new THREE.BoxGeometry(6.2, 0.25, 0.45),
      bowsprit: new THREE.CylinderGeometry(0.1, 0.16, 3.2, 5),
      mainMast: new THREE.CylinderGeometry(0.12, 0.16, 6.6, 5),
      foreMast: new THREE.CylinderGeometry(0.1, 0.14, 5.2, 5),
      mizzenMast: new THREE.CylinderGeometry(0.09, 0.12, 4.4, 5),
      mainSail: new THREE.CylinderGeometry(2.0, 2.0, 2.2, 7, 1, true, 0, Math.PI * 0.75),
      foreSail: new THREE.CylinderGeometry(1.6, 1.6, 1.7, 7, 1, true, 0, Math.PI * 0.75),
      mizzenSail: new THREE.CylinderGeometry(1.3, 1.3, 1.5, 7, 1, true, 0, Math.PI * 0.75),
      flag: new THREE.ConeGeometry(0.35, 0.9, 4),
    };

    function createLowPolyGalleonMesh() {
      const group = new THREE.Group();

      const hull = new THREE.Mesh(shipGeometries.hull, shipMaterials.hull);
      hull.position.y = 0.6;
      group.add(hull);

      const cabin = new THREE.Mesh(shipGeometries.cabin, shipMaterials.cabin);
      cabin.position.set(-1.9, 1.5, 0);
      group.add(cabin);

      const keel = new THREE.Mesh(shipGeometries.keel, shipMaterials.goldTrim);
      keel.position.set(0, 1.45, 0);
      group.add(keel);

      const bow = new THREE.Mesh(shipGeometries.bowsprit, shipMaterials.mast);
      bow.position.set(4.0, 1.1, 0);
      bow.rotation.z = -Math.PI / 3.8;
      group.add(bow);

      // Main Mast
      const mainMast = new THREE.Mesh(shipGeometries.mainMast, shipMaterials.mast);
      mainMast.position.set(0.35, 4.1, 0);
      group.add(mainMast);

      const mainSail = new THREE.Mesh(shipGeometries.mainSail, shipMaterials.sail);
      mainSail.position.set(0.35, 4.2, 0.4);
      mainSail.rotation.y = Math.PI / 2;
      group.add(mainSail);

      const flag = new THREE.Mesh(shipGeometries.flag, shipMaterials.flag);
      flag.position.set(0.35, 7.5, 0);
      flag.rotation.z = Math.PI / 2;
      group.add(flag);

      // Fore Mast
      const foreMast = new THREE.Mesh(shipGeometries.foreMast, shipMaterials.mast);
      foreMast.position.set(2.3, 3.4, 0);
      group.add(foreMast);

      const foreSail = new THREE.Mesh(shipGeometries.foreSail, shipMaterials.sail);
      foreSail.position.set(2.3, 3.5, 0.35);
      foreSail.rotation.y = Math.PI / 2;
      group.add(foreSail);

      // Mizzen Mast
      const mizzenMast = new THREE.Mesh(shipGeometries.mizzenMast, shipMaterials.mast);
      mizzenMast.position.set(-1.9, 3.0, 0);
      group.add(mizzenMast);

      const mizzenSail = new THREE.Mesh(shipGeometries.mizzenSail, shipMaterials.sail);
      mizzenSail.position.set(-1.9, 3.1, 0.3);
      mizzenSail.rotation.y = Math.PI / 2;
      group.add(mizzenSail);

      return group;
    }

    // 3 Grand Galleons Sailing Across the Matrix
    const ships = [
      { mesh: createLowPolyGalleonMesh(), x: -65, z: -6, speed: 0.11, scale: 2.6, phase: 0 },
      { mesh: createLowPolyGalleonMesh(), x: 0, z: 5, speed: 0.10, scale: 2.8, phase: 1.8 },
      { mesh: createLowPolyGalleonMesh(), x: 65, z: -4, speed: 0.12, scale: 2.5, phase: 3.6 },
    ];

    ships.forEach((s) => {
      s.mesh.scale.setScalar(s.scale);
      scene.add(s.mesh);
    });

    // Pure math wave sampling for ships only (Evaluated 3 times per frame, ~0.001ms)
    function sampleWave(wx, wz, t) {
      return (
        Math.sin(wx * 0.055 + t * 1.2) * 2.8 +
        Math.cos(wz * 0.09 + t * 0.9) * 2.2 +
        Math.sin((wx + wz) * 0.04 + t * 1.5) * 1.5
      );
    }

    // Animation Loop
    let animationFrameId = null;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let time = 0;

    const animate = () => {
      if (!isVisible || !isTabActive) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      time += 0.035;

      // Update GPU Uniform (Zero CPU write to vertex buffers)
      customWaterMaterial.uniforms.uTime.value = time;

      // Update 3D Floating Ships
      const boundX = (cols * separation) / 2 + 25;
      ships.forEach((ship) => {
        ship.x += ship.speed;
        if (ship.x > boundX) {
          ship.x = -boundX;
        }

        const y0 = sampleWave(ship.x, ship.z, time);
        const yAhead = sampleWave(ship.x + 3.0, ship.z, time);
        const ySide = sampleWave(ship.x, ship.z + 2.0, time);

        const pitch = Math.atan2(yAhead - y0, 3.0) * 0.65;
        const roll = Math.atan2(ySide - y0, 2.0) * 0.55;

        ship.mesh.position.set(ship.x, y0 + 0.8, ship.z);
        ship.mesh.rotation.z = -pitch;
        ship.mesh.rotation.x = roll;
        ship.mesh.rotation.y = Math.sin(time * 0.8 + ship.phase) * 0.08;
      });

      // Subtle camera sway
      camera.position.x = Math.sin(time * 0.15) * 3.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // IntersectionObserver to sleep when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabActive && !animationFrameId) {
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isVisible && isTabActive && !animationFrameId) {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 260;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      ships.forEach((s) => scene.remove(s.mesh));
      Object.values(shipGeometries).forEach((g) => g.dispose());
      Object.values(shipMaterials).forEach((m) => m.dispose());

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      customWaterMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`relative overflow-hidden ${className}`} />;
}

