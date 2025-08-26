
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import EnhancedHomePage from '@/pages/EnhancedHomePage';
import CompanyDetail from '@/pages/CompanyDetail';
import BlogPage from '@/pages/BlogPage';
import BlogArticlePage from '@/pages/BlogArticlePage';
import CompanyRegistrationPage from '@/pages/CompanyRegistrationPage';
import SearchResultsPage from '@/pages/SearchResultsPage';
import ReviewsPage from '@/pages/ReviewsPage';
import AboutPage from '@/pages/AboutPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import CategoriesPage from '@/pages/CategoriesPage';
import CategoryPage from '@/pages/CategoryPage';
import EnhancedCategoryPage from '@/pages/EnhancedCategoryPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EnhancedHomePage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/categorias/:slug" element={<EnhancedCategoryPage />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/company/:companyId/reviews" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogArticlePage />} />
          <Route path="/empresa/cadastro" element={<CompanyRegistrationPage />} />
          <Route path="/buscar" element={<SearchResultsPage />} />
          <Route path="/encontrar-empresas" element={<SearchResultsPage />} />
          <Route path="/avaliar-empresa" element={<SearchResultsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/como-funciona" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/termos" element={<TermsOfServicePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;