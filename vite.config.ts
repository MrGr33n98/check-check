import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    },
    port: 5173,
    host: true
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
  }
})