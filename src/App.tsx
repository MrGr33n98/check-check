import React, { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import Spinner from '@/components/ui/spinner';

const Layout = lazy(() => import('@/components/layout/Layout'));
const PageBackground = lazy(() => import('@/components/ui/PageBackground'));
const EnhancedHomePage = lazy(() => import('@/pages/EnhancedHomePage'));
const CompanyDetail = lazy(() => import('@/pages/CompanyDetail'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogArticlePage = lazy(() => import('@/pages/BlogArticlePage'));
const CompanyRegistrationPage = lazy(() => import('@/pages/CompanyRegistrationPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const ReviewsPage = lazy(() => import('@/pages/ReviewsPage'));
const CompanyReviewPage = lazy(() => import('@/pages/CompanyReviewPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'));
const EnhancedCategoryPage = lazy(() => import('@/pages/EnhancedCategoryPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ProtectedRoute = lazy(() => import('@/components/layout/ProtectedRoute'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const AnalyticsDashboard = lazy(() => import('@/pages/AnalyticsDashboard'));
const CompanyCustomizationPage = lazy(() => import('@/pages/CompanyCustomizationPage'));
const LeadsManagementPage = lazy(() => import('@/pages/LeadsManagementPage'));
const PendingApprovalPage = lazy(() => import('@/pages/PendingApprovalPage'));
const BannerManager = lazy(() => import('@/components/admin/BannerManager'));

type LazyComponent = React.LazyExoticComponent<React.ComponentType<any>>;

const loadable = (Component: LazyComponent) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);

const protectedLoadable = (Component: LazyComponent, requiredRole: string) => (
  <Suspense fallback={<Spinner />}>
    <ProtectedRoute requiredRole={requiredRole}>
      <Component />
    </ProtectedRoute>
  </Suspense>
);

// Define routes as an array of objects
export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Spinner />}>
        <PageBackground />
        <Layout>
          <Outlet /> {/* This is where nested routes will render */}
        </Layout>
      </Suspense>
    ),
    children: [
      { index: true, element: loadable(EnhancedHomePage) }, // Render EnhancedHomePage at the root path
      { path: 'login', element: loadable(LoginPage) },
      { path: 'categorias', element: loadable(CategoriesPage) },
      { path: 'categorias/:slug', element: loadable(EnhancedCategoryPage) },
      { path: 'company/:id', element: loadable(CompanyDetail) },
      { path: 'company/:companyId/reviews', element: loadable(ReviewsPage) },
      { path: 'empresas/:slug/avaliar', element: loadable(CompanyReviewPage) }, // New route
      { path: 'blog', element: loadable(BlogPage) },
      { path: 'blog/:id', element: loadable(BlogArticlePage) },
      { path: 'empresa/cadastro', element: loadable(CompanyRegistrationPage) },
      { path: 'busca-avancada', element: loadable(SearchPage) },
      { path: 'sobre', element: loadable(AboutPage) },
      { path: 'como-funciona', element: loadable(HowItWorksPage) },
      { path: 'faq', element: loadable(FAQPage) },
      { path: 'contato', element: loadable(ContactPage) },
      { path: 'privacidade', element: loadable(PrivacyPolicyPage) },
      { path: 'termos', element: loadable(TermsOfServicePage) },
      { path: 'empresa/dashboard', element: protectedLoadable(DashboardPage, 'empresa') },
      { path: 'empresa/analytics', element: protectedLoadable(AnalyticsDashboard, 'empresa') },
      { path: 'empresa/customizar', element: protectedLoadable(CompanyCustomizationPage, 'empresa') },
      { path: 'empresa/leads', element: protectedLoadable(LeadsManagementPage, 'empresa') },
      { path: 'empresa/pending', element: loadable(PendingApprovalPage) },
      { path: 'admin/banners', element: protectedLoadable(BannerManager, 'empresa') },
    ],
  },
];