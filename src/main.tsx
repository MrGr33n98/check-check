import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Import these
import { routes } from './App.tsx' // Import routes from App.tsx
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import * as Sentry from '@sentry/react'
import './globals.css'
import './index.css'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
})

// Create the router instance with future flags
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} /> {/* Render RouterProvider */}
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
