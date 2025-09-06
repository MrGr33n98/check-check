import { Outlet, RouteObject } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBackground from '@/components/ui/PageBackground';
import EnhancedHomePage from '@/pages/EnhancedHomePage';
import CompanyDetail from '@/pages/CompanyDetail';
import BlogPage from '@/pages/BlogPage';
import BlogArticlePage from '@/pages/BlogArticlePage';
import CompanyRegistrationPage from '@/pages/CompanyRegistrationPage';
import SearchPage from '@/pages/SearchPage';
import ReviewsPage from '@/pages/ReviewsPage';
import CompanyReviewPage from '@/pages/CompanyReviewPage'; // New import
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

// Define routes as an array of objects
export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <PageBackground />
        <Layout>
          <Outlet /> {/* This is where nested routes will render */}
        </Layout>
      </>
    ),
    children: [
      { index: true, element: <EnhancedHomePage /> }, // Render EnhancedHomePage at the root path
      { path: 'login', element: <LoginPage /> },
      { path: 'categorias', element: <CategoriesPage /> },
      { path: 'categorias/:slug', element: <EnhancedCategoryPage /> },
      { path: 'company/:id', element: <CompanyDetail /> },
      { path: 'company/:companyId/reviews', element: <ReviewsPage /> },
      { path: 'empresas/:slug/avaliar', element: <CompanyReviewPage /> }, // New route
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:id', element: <BlogArticlePage /> },
      { path: 'empresa/cadastro', element: <CompanyRegistrationPage /> },
      { path: 'busca-avancada', element: <SearchPage /> },
      { path: 'sobre', element: <AboutPage /> },
      { path: 'como-funciona', element: <HowItWorksPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'contato', element: <ContactPage /> },
      { path: 'privacidade', element: <PrivacyPolicyPage /> },
      { path: 'termos', element: <TermsOfServicePage /> },
      {
        path: 'empresa/dashboard',
        element: (
          <ProtectedRoute requiredRole="empresa">
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'empresa/analytics',
        element: (
          <ProtectedRoute requiredRole="empresa">
            <AnalyticsDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'empresa/customizar',
        element: (
          <ProtectedRoute requiredRole="empresa">
            <CompanyCustomizationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'empresa/leads',
        element: (
          <ProtectedRoute requiredRole="empresa">
            <LeadsManagementPage />
          </ProtectedRoute>
        ),
      },
      { path: 'empresa/pending', element: <PendingApprovalPage /> },
      {
        path: 'admin/banners',
        element: (
          <ProtectedRoute requiredRole="empresa">
            <BannerManager />
          </ProtectedRoute>
        ),
      },
    ],
  },
];