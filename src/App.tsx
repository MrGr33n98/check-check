import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import CompanyDetail from '@/pages/CompanyDetail'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import CompanyRegistrationPage from '@/pages/CompanyRegistrationPage'
import CategoriesPage from '@/pages/CategoriesPage'
import CategoryPage from '@/pages/CategoryPage'
import AdminDashboardPage from '@/pages/AdminDashboardPage'
import AdminMembersPage from '@/pages/AdminMembersPage'
import AdminAccessesPage from '@/pages/AdminAccessesPage'
import AdminSponsoredPage from '@/pages/AdminSponsoredPage'
import AdminArticlesPage from '@/pages/AdminArticlesPage'
import AdminLeadsPage from '@/pages/AdminLeadsPage'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/categoria/:id" element={<CategoryPage />} />
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
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/members" element={<AdminMembersPage />} />
            <Route path="/admin/accesses" element={<AdminAccessesPage />} />
            <Route path="/admin/sponsored" element={<AdminSponsoredPage />} />
            <Route path="/admin/articles" element={<AdminArticlesPage />} />
            <Route path="/admin/leads" element={<AdminLeadsPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App