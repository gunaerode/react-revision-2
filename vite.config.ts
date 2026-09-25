import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      // The lesson playground compiles TSX in the browser with the `typescript`
      // package. Its source has a Node-only require("source-map-support") inside
      // a try/catch - point it at an empty module so the browser bundle resolves.
      'source-map-support': fileURLToPath(new URL('./src/components/runner/empty-module.ts', import.meta.url)),
    },
  },
  build: {
    // The in-browser TypeScript compiler is one big lazy-loaded chunk (~3 MB,
    // loaded only when a playground opens), so raise the size warning limit.
    chunkSizeWarningLimit: 4000,
  },
})
