import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.SENTRY_AUTH_TOKEN && sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: { assets: './dist/**' },
    }),
  ].filter(Boolean),
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
  }
})