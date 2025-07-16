import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Updated: 2025-07-10 - Removed vite-tsconfig-paths dependency
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}) 