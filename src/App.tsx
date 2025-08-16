import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import CompanyDetail from '@/pages/CompanyDetail'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import CompanyRegistrationPage from '@/pages/CompanyRegistrationPage'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="moderator">
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/company-registration" element={<CompanyRegistrationPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App