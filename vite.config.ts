import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_API_URL?.replace(/\/api\/v1$/, '');

  return {
    plugins: [react()],
    server: {
      hmr: {
        clientPort: 5173,
        overlay: false
      },
      port: 5173,
      host: true,
      proxy: {
        '/api': apiProxyTarget
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
  }
})
