export const WAVES = [
  { directionX: 0.95, directionZ: 0.31, steepness: 0.15, wavelength: 28.0, speed: 1.15 },
  { directionX: 0.58, directionZ: 0.81, steepness: 0.12, wavelength: 16.5, speed: 1.45 },
  { directionX: -0.38, directionZ: 0.92, steepness: 0.09, wavelength: 9.2, speed: 1.85 },
  { directionX: 0.76, directionZ: -0.65, steepness: 0.07, wavelength: 5.8, speed: 2.2 },
  { directionX: -0.65, directionZ: -0.76, steepness: 0.05, wavelength: 3.4, speed: 2.6 },
  { directionX: 0.28, directionZ: 0.96, steepness: 0.04, wavelength: 2.1, speed: 3.1 },
];

export function sampleWaveHeight(x, z, time) {
  let height = 0;
  for (const wave of WAVES) {
    const dirLen = Math.hypot(wave.directionX, wave.directionZ) || 1;
    const dx = wave.directionX / dirLen;
    const dz = wave.directionZ / dirLen;
    const k = (2 * Math.PI) / wave.wavelength;
    const amplitude = wave.steepness / k;
    const phase = k * (dx * x + dz * z) + time * wave.speed;
    height += amplitude * Math.sin(phase);
  }
  return height;
}

export function sampleWaveSlopeX(x, z, time) {
  let slope = 0;
  for (const wave of WAVES) {
    const dirLen = Math.hypot(wave.directionX, wave.directionZ) || 1;
    const dx = wave.directionX / dirLen;
    const dz = wave.directionZ / dirLen;
    const k = (2 * Math.PI) / wave.wavelength;
    const phase = k * (dx * x + dz * z) + time * wave.speed;
    slope += wave.steepness * dx * Math.cos(phase);
  }
  return slope;
}

export function sampleWaveSlopeZ(x, z, time) {
  let slope = 0;
  for (const wave of WAVES) {
    const dirLen = Math.hypot(wave.directionX, wave.directionZ) || 1;
    const dx = wave.directionX / dirLen;
    const dz = wave.directionZ / dirLen;
    const k = (2 * Math.PI) / wave.wavelength;
    const phase = k * (dx * x + dz * z) + time * wave.speed;
    slope += wave.steepness * dz * Math.cos(phase);
  }
  return slope;
}
