
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import EnhancedHomePage from '@/pages/EnhancedHomePage';
import CompanyDetail from '@/pages/CompanyDetail';
import BlogPage from '@/pages/BlogPage';
import BlogArticlePage from '@/pages/BlogArticlePage';
import CompanyRegistrationPage from '@/pages/CompanyRegistrationPage';
import SearchResultsPage from '@/pages/SearchResultsPage';
import SearchPage from '@/pages/SearchPage';
import ReviewsPage from '@/pages/ReviewsPage';
import AboutPage from '@/pages/AboutPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import CategoriesPage from '@/pages/CategoriesPage';
import EnhancedCategoryPage from '@/pages/EnhancedCategoryPage';
import LoginPage from '@/pages/LoginPage';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import DashboardPage from '@/pages/DashboardPage';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import CompanyCustomizationPage from '@/pages/CompanyCustomizationPage';
import LeadsManagementPage from '@/pages/LeadsManagementPage';
import PendingApprovalPage from '@/pages/PendingApprovalPage';
import BannerManager from '@/components/admin/BannerManager';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EnhancedHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/categorias/:slug" element={<EnhancedCategoryPage />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/company/:companyId/reviews" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogArticlePage />} />
          <Route path="/empresa/cadastro" element={<CompanyRegistrationPage />} />
          <Route path="/buscar" element={<SearchResultsPage />} />
          <Route path="/busca-avancada" element={<SearchPage />} />
          <Route path="/encontrar-empresas" element={<SearchResultsPage />} />
          <Route path="/avaliar-empresa" element={<SearchResultsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/como-funciona" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/termos" element={<TermsOfServicePage />} />
          <Route 
            path="/empresa/dashboard" 
            element={
              <ProtectedRoute requiredRole="empresa">
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/empresa/analytics" 
            element={
              <ProtectedRoute requiredRole="empresa">
                <AnalyticsDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/empresa/customizar" 
            element={
              <ProtectedRoute requiredRole="empresa">
                <CompanyCustomizationPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/empresa/leads" 
            element={
              <ProtectedRoute requiredRole="empresa">
                <LeadsManagementPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/empresa/pending" element={<PendingApprovalPage />} />
          <Route 
            path="/admin/banners" 
            element={
              <ProtectedRoute requiredRole="empresa">
                <BannerManager />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;