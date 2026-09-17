import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const frontendRoot = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(frontendRoot, '..')
const renaissanceClientRoot = path.join(
  repositoryRoot,
  'RENAISSANCE-ECELL-2026',
  'client',
)

const sharedDependencies = [
  '@gsap/react',
  '@react-three/drei',
  '@react-three/fiber',
  'canvas-confetti',
  'clsx',
  'framer-motion',
  'gsap',
  'lenis',
  'lucide-react',
  'react',
  'react-dom',
  'react-icons',
  'react-router-dom',
  'tailwind-merge',
  'three',
  'three-stdlib',
]

export default defineConfig({
  plugins: [react()],
  // Renaissance keeps its existing public assets and source tree, while the
  // root IIC Vite process remains the only frontend server/build.
  publicDir: path.join(renaissanceClientRoot, 'public'),
  resolve: {
    // External Renaissance source must use the root frontend's dependency
    // instances, especially React, to prevent duplicate-runtime hook errors.
    dedupe: sharedDependencies,
  },
  optimizeDeps: {
    include: sharedDependencies,
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['iic.mnnit.ac.in'],
    fs: {
      allow: [repositoryRoot],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/node_modules/three/') ||
            id.includes('/node_modules/@react-three/') ||
            id.includes('/node_modules/three-stdlib/')
          ) {
            return 'three'
          }

          if (id.includes('/node_modules/framer-motion/')) {
            return 'framer'
          }
        },
      },
    },
  },
})
