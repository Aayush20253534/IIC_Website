import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WAVES } from "../lib/waves";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec3 vViewPosition;
  varying float vWaveHeight;
  varying float vCrest;

  vec3 gerstner(vec2 direction, float steepness, float wavelength, float speed, vec3 position, inout vec3 tangent, inout vec3 binormal) {
    float k = 6.28318530718 / wavelength;
    float amplitude = steepness / k;
    float phase = k * dot(direction, position.xz) + uTime * speed;
    float s = sin(phase);
    float c = cos(phase);
    tangent += vec3(-direction.x * direction.x * steepness * s, direction.x * steepness * c, -direction.x * direction.y * steepness * s);
    binormal += vec3(-direction.x * direction.y * steepness * s, direction.y * steepness * c, -direction.y * direction.y * steepness * s);
    return vec3(direction.x * amplitude * c, amplitude * s, direction.y * amplitude * c);
  }

  void main() {
    vec3 p = vec3(position.x, 0.0, -position.y);
    vec3 tangent = vec3(1.0, 0.0, 0.0);
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    vec3 offset = vec3(0.0);

    ${WAVES.map((wave) => `offset += gerstner(normalize(vec2(${wave.directionX.toFixed(3)}, ${wave.directionZ.toFixed(3)})), ${wave.steepness.toFixed(3)}, ${wave.wavelength.toFixed(3)}, ${wave.speed.toFixed(3)}, p, tangent, binormal);`).join("\n    ")}

    p += offset;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorldPosition = world.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normalize(cross(binormal, tangent)));
    vWaveHeight = offset.y;
    vCrest = smoothstep(0.40, 1.15, offset.y);
    
    vec4 mvPosition = viewMatrix * world;
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uAbyssalColor;
  uniform vec3 uDeepColor;
  uniform vec3 uSurfaceColor;
  uniform vec3 uTranslucentColor;
  uniform vec3 uFoamColor;
  uniform vec3 uMoonDirection;
  uniform vec3 uMoonColor;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uWarmReflectionStrength;
  uniform vec3 uWarmReflectionColor;

  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec3 vViewPosition;
  varying float vWaveHeight;
  varying float vCrest;

  // Procedural 2D noise for organic micro-ripples and foam
  float hash(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    // 1. High-frequency normal perturbation (Micro-ripples)
    vec2 uvCoord = vWorldPosition.xz * 0.4;
    float n1 = noise(uvCoord + vec2(uTime * 0.31, uTime * 0.22));
    float microWave = n1 * 0.105;
    
    vec3 normal = normalize(vWorldNormal + vec3(microWave, 0.0, microWave));
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 moonDir = normalize(uMoonDirection);

    // 2. Accurate Fresnel effect with Schlick approximation
    float ndotv = max(dot(normal, viewDir), 0.0);
    float fresnel = 0.04 + 0.96 * pow(1.0 - ndotv, 5.0);

    // 3. Dual Specular Highlights (Moon glint + broad sheen)
    vec3 halfVec = normalize(moonDir + viewDir);
    float ndoth = max(dot(normal, halfVec), 0.0);
    float moonSpecularSharp = pow(ndoth, 120.0);
    float moonSpecularBroad = pow(ndoth, 24.0);
    vec3 specularLight = uMoonColor * (moonSpecularSharp * 2.8 + moonSpecularBroad * 0.6);

    // 4. Subsurface Scattering in wave crests
    float sss = pow(max(dot(viewDir, -moonDir), 0.0), 3.0) * max(0.0, vWaveHeight + 0.3) * 0.8;
    vec3 waterBody = mix(uAbyssalColor, uDeepColor, smoothstep(-1.2, 0.4, vWaveHeight));
    waterBody = mix(waterBody, uSurfaceColor, smoothstep(0.0, 0.8, vWaveHeight));
    waterBody += uTranslucentColor * sss * 0.7;

    // 5. Dynamic Organic Seafoam Generation
    float foamNoise = noise(vWorldPosition.xz * 3.4 + vec2(uTime * 0.18, -uTime * 0.24));
    float combinedFoamNoise = foamNoise * 0.5 + 0.5;
    
    float crestFoam = smoothstep(0.42, 0.85, vCrest + combinedFoamNoise * 0.35);
    float turbulentFoam = smoothstep(0.72, 0.98, combinedFoamNoise + (1.0 - ndotv) * 0.25) * vCrest;
    float totalFoam = clamp(crestFoam + turbulentFoam * 0.6, 0.0, 1.0);

    // 6. Color Composition
    vec3 finalColor = mix(waterBody, uSurfaceColor * 1.3, fresnel * 0.7);
    finalColor += specularLight;
    finalColor = mix(finalColor, uFoamColor, totalFoam * 0.75);

    // Warm ship-light streaks. These are intentionally broad and broken up by
    // moving noise so the light feels reflected by waves instead of painted on.
    float shipBand =
      exp(-pow((vWorldPosition.x + 4.55) * 0.62, 2.0)) +
      exp(-pow(vWorldPosition.x * 0.62, 2.0)) +
      exp(-pow((vWorldPosition.x - 4.55) * 0.62, 2.0));
    float reflectionDepth = exp(-pow((vWorldPosition.z - 1.2) * 0.095, 2.0));
    float reflectionRipple = 0.5 + 0.5 * sin(vWorldPosition.z * 3.6 - uTime * 2.1 + vWorldPosition.x * 0.38);
    float reflectionBreakup = 0.42 + 0.58 * smoothstep(0.08, 0.9, combinedFoamNoise * 0.68 + reflectionRipple * 0.32);
    float warmReflection = shipBand * reflectionDepth * reflectionBreakup * uWarmReflectionStrength;
    finalColor += uWarmReflectionColor * warmReflection * (0.45 + fresnel * 0.9);

    // 7. Distance & Depth Atmospheric Fog
    float depth = length(vWorldPosition - cameraPosition);
    float fogFactor = smoothstep(uFogNear, uFogFar, depth);
    finalColor = mix(finalColor, uFogColor, fogFactor);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function Ocean({ variant = "default" }) {
  const materialRef = useRef(null);
  const uniforms = useMemo(() => {
    const sponsor = variant === "sponsor";

    return {
      uTime: { value: 0 },
      uAbyssalColor: { value: new THREE.Color(sponsor ? "#010711" : "#01050A") },
      uDeepColor: { value: new THREE.Color(sponsor ? "#05243A" : "#031326") },
      uSurfaceColor: { value: new THREE.Color(sponsor ? "#0B526A" : "#083344") },
      uTranslucentColor: { value: new THREE.Color(sponsor ? "#20A4C4" : "#0E7490") },
      uFoamColor: { value: new THREE.Color(sponsor ? "#F7FBFF" : "#E0E7FF") },
      uMoonDirection: { value: new THREE.Vector3(-0.45, 0.82, 0.35) },
      uMoonColor: { value: new THREE.Color(sponsor ? "#D9EEFF" : "#FCE7B0") },
      uFogColor: { value: new THREE.Color(sponsor ? "#03111C" : "#020710") },
      uFogNear: { value: sponsor ? 38 : 30 },
      uFogFar: { value: sponsor ? 145 : 120 },
      uWarmReflectionStrength: { value: sponsor ? 0.92 : 0 },
      uWarmReflectionColor: { value: new THREE.Color("#FFB458") },
    };
  }, [variant]);

  useFrame(({ clock }) => {
    if (materialRef.current?.uniforms?.uTime) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh position-y={-0.8} receiveShadow>
      <planeGeometry args={[200, 200, 96, 96]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
