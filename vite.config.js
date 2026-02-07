import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Production optimizations
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  // Development server
  server: {
    port: 5174,
    strictPort: false,
    host: true,
    open: true
  },
  
  // Preview server
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: true
  }
})
