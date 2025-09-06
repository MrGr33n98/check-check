import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      clientPort: 5173,
      overlay: false
    },
    port: 5173,
    host: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
    }
  },
  define: {
    // Enable eval() only in development
    __DEV__: process.env.NODE_ENV === 'development'
  },
  css: {
    postcss: './postcss.config.js'
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  }
})