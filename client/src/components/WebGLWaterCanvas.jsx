import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLWaterCanvas({ className = "w-full h-full" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 200;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 35, 55);
    camera.lookAt(0, -5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // High-Density Full-Width Ocean Particle Grid
    const cols = 140;
    const rows = 36;
    const count = cols * rows;
    const separation = 2.2;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const initialY = new Float32Array(count);
    const velocities = new Float32Array(count);

    // Water Particle Palette
    const colorDeep = new THREE.Color(0x0284c7); // Deep ocean cyan-blue
    const colorFoam = new THREE.Color(0x38bdf8); // Ocean foam bright blue
    const colorCrest = new THREE.Color(0xe0f2fe); // White crest highlight

    let i = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const x = (ix - cols / 2) * separation;
        const z = (iy - rows / 2) * separation;
        const y = 0;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        initialY[i] = y;
        velocities[i] = 0;

        const ratio = iy / rows;
        const col = colorDeep.clone().lerp(colorFoam, ratio);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;

        i++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Texture for Soft Fluid Droplet / Shimmer
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.8)");
    gradient.addColorStop(0.8, "rgba(2, 132, 199, 0.2)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 3.2,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction for Fluid Ripples
    let mouseX = 0;
    let mouseZ = 0;
    let isHovered = false;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseX = nx * (cols * separation * 0.45);
      mouseZ = -ny * (rows * separation * 0.45);
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop with Multi-frequency Hydrodynamic Sine Waves
    let animationFrameId;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.035;

      const pos = geometry.attributes.position.array;
      const col = geometry.attributes.color.array;

      let idx = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const x = pos[idx * 3];
          const z = pos[idx * 3 + 2];

          // Hydrodynamic wave formula
          const baseWave =
            Math.sin(ix * 0.22 + time * 1.2) * 2.8 +
            Math.cos(iy * 0.35 + time * 0.9) * 2.2 +
            Math.sin((ix + iy) * 0.15 + time * 1.5) * 1.5;

          // Mouse Fluid Ripple Physics
          let ripple = 0;
          if (isHovered) {
            const dx = x - mouseX;
            const dz = z - mouseZ;
            const dist = Math.sqrt(dx * dx + dz * dz);
            if (dist < 18) {
              ripple = Math.sin(dist * 0.6 - time * 4) * (18 - dist) * 0.35;
            }
          }

          const targetY = baseWave + ripple;
          velocities[idx] += (targetY - pos[idx * 3 + 1]) * 0.12;
          velocities[idx] *= 0.85; // Damping
          pos[idx * 3 + 1] += velocities[idx];

          // Dynamic Shimmer on Wave Crests
          const currentY = pos[idx * 3 + 1];
          if (currentY > 3.0) {
            col[idx * 3] = colorCrest.r;
            col[idx * 3 + 1] = colorCrest.g;
            col[idx * 3 + 2] = colorCrest.b;
          } else {
            const ratio = iy / rows;
            const baseCol = colorDeep.clone().lerp(colorFoam, ratio);
            col[idx * 3] = baseCol.r;
            col[idx * 3 + 1] = baseCol.g;
            col[idx * 3 + 2] = baseCol.b;
          }

          idx++;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Gentle camera sway
      camera.position.x = Math.sin(time * 0.2) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 200;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`relative overflow-hidden ${className}`} />;
}
