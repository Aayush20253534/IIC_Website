import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLWaterCanvas({
  className = "w-full h-full",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 260;

    // Scene, camera and renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      1000
    );

    camera.position.set(0, 34, 66);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "default",
    });

    renderer.setSize(width, height);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.25)
    );

    container.appendChild(renderer.domElement);

    // Ocean lighting
    const ambientLight = new THREE.AmbientLight(
      0x0369a1,
      1.6
    );

    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      0xfff5e6,
      3.2
    );

    dirLight.position.set(25, 45, 30);

    scene.add(dirLight);

    // Particle texture
    const canvas = document.createElement("canvas");

    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
      16,
      16,
      0,
      16,
      16,
      16
    );

    gradient.addColorStop(
      0,
      "rgba(255, 255, 255, 1)"
    );

    gradient.addColorStop(
      0.35,
      "rgba(2, 132, 199, 0.85)"
    );

    gradient.addColorStop(
      0.75,
      "rgba(7, 89, 133, 0.3)"
    );

    gradient.addColorStop(
      1,
      "rgba(0, 0, 0, 0)"
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    // GPU ocean particle matrix
    const cols = 56;
    const rows = 16;

    const count = cols * rows;

    const separation = 4.6;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(
      count * 3
    );

    const ratios = new Float32Array(count);

    let i = 0;

    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const x =
          (ix - cols / 2) * separation;

        const z =
          (iy - rows / 2) * separation;

        positions[i * 3] = x;

        positions[i * 3 + 1] = 0;

        positions[i * 3 + 2] = z;

        ratios[i] = iy / rows;

        i++;
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    geometry.setAttribute(
      "aRatio",
      new THREE.BufferAttribute(
        ratios,
        1
      )
    );

    // Ocean shader
    const customWaterMaterial =
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: {
            value: 0,
          },

          uTexture: {
            value: texture,
          },

          uColorDeep: {
            value: new THREE.Color(
              0x010c1c
            ),
          },

          uColorFoam: {
            value: new THREE.Color(
              0x0284c7
            ),
          },

          uColorCrest: {
            value: new THREE.Color(
              0xfde047
            ),
          },
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

            float wave =
              sin(
                pos.x * 0.055 +
                uTime * 1.2
              ) * 2.8 +

              cos(
                pos.z * 0.09 +
                uTime * 0.9
              ) * 2.2 +

              sin(
                (pos.x + pos.z) * 0.04 +
                uTime * 1.5
              ) * 1.5;

            pos.y += wave;

            vec3 baseCol = mix(
              uColorDeep,
              uColorFoam,
              aRatio
            );

            if (wave > 2.6) {
              float crestWeight =
                clamp(
                  (wave - 2.6) / 2.0,
                  0.0,
                  1.0
                );

              vColor = mix(
                baseCol,
                uColorCrest,
                crestWeight * 0.7
              );
            } else {
              vColor = baseCol;
            }

            vec4 mvPosition =
              modelViewMatrix *
              vec4(pos, 1.0);

            gl_PointSize =
              clamp(
                320.0 /
                  -mvPosition.z,
                2.5,
                7.0
              );

            gl_Position =
              projectionMatrix *
              mvPosition;
          }
        `,

        fragmentShader: `
          uniform sampler2D uTexture;

          varying vec3 vColor;

          void main() {
            vec4 tex =
              texture2D(
                uTexture,
                gl_PointCoord
              );

            if (tex.a < 0.05)
              discard;

            gl_FragColor =
              vec4(
                vColor * tex.rgb,
                tex.a * 0.92
              );
          }
        `,

        transparent: true,

        blending:
          THREE.AdditiveBlending,

        depthWrite: false,
      });

    const particles = new THREE.Points(
      geometry,
      customWaterMaterial
    );

    scene.add(particles);

    /*
     * Low-poly galleon fleet removed.
     *
     * This was the ugly white-sail /
     * brown-box boat visible over the page.
     *
     * The proper PirateShip GLB in
     * OceanHeroBackground remains untouched.
     */

    let animationFrameId = null;

    let isVisible = true;

    let isTabActive =
      !document.hidden;

    let time = 0;

    const animate = () => {
      if (
        !isVisible ||
        !isTabActive
      ) {
        animationFrameId = null;

        return;
      }

      animationFrameId =
        requestAnimationFrame(
          animate
        );

      time += 0.035;

      customWaterMaterial.uniforms.uTime.value =
        time;

      // Gentle cinematic camera sway
      camera.position.x =
        Math.sin(
          time * 0.15
        ) * 3.5;

      camera.lookAt(
        0,
        0,
        0
      );

      renderer.render(
        scene,
        camera
      );
    };

    // Pause rendering when off-screen
    const observer =
      new IntersectionObserver(
        ([entry]) => {
          isVisible =
            entry.isIntersecting;

          if (
            isVisible &&
            isTabActive &&
            !animationFrameId
          ) {
            animate();
          }
        },
        {
          threshold: 0.05,
        }
      );

    observer.observe(container);

    const handleVisibilityChange =
      () => {
        isTabActive =
          !document.hidden;

        if (
          isVisible &&
          isTabActive &&
          !animationFrameId
        ) {
          animate();
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    animate();

    const handleResize = () => {
      if (!container) return;

      width =
        container.clientWidth ||
        800;

      height =
        container.clientHeight ||
        260;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      observer.disconnect();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (animationFrameId) {
        cancelAnimationFrame(
          animationFrameId
        );
      }

      if (
        renderer.domElement &&
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }

      geometry.dispose();

      customWaterMaterial.dispose();

      texture.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    />
  );
}