import React from 'react';
import ConversionPoints from '@/components/ui/conversion-points';
import CategoriesSection from '@/components/ui/categories-section';
import BusinessServicesSection from '@/components/ui/business-services-section';
import TrustIndicatorsSection from '@/components/ui/trust-indicators-section';
import FeaturedCompaniesSection from '@/components/ui/featured-companies-section';
import NewsletterSection from '@/components/ui/newsletter-section';
import HeroSection from '@/components/ui/hero-section';
import { mockCompanies, mockConversionPoints } from '@/data/mockData';
import { useLeads } from '@/hooks/useLeads';
import { useNavigate } from 'react-router-dom';

// Mock categories data for the popular categories section
const mockCategories = [
  {
    id: 1,
    name: 'Geração Distribuída',
    description: 'Sistemas de energia solar conectados à rede elétrica',
    image: '/placeholder-solar-rooftop.jpg',
    path: '/categorias/geracao-distribuida'
  },
  {
    id: 2,
    name: 'Energia Comercial',
    description: 'Soluções para empresas e comércios',
    image: '/placeholder-solar-commercial.jpg',
    path: '/categorias/comercial'
  },
  {
    id: 3,
    name: 'Energia Residencial',
    description: 'Sistemas para casas e apartamentos',
    image: '/placeholder-solar-residential.jpg',
    path: '/categorias/residencial'
  },
  {
    id: 4,
    name: 'Armazenamento de Energia',
    description: 'Baterias e sistemas de acumulação de energia',
    image: '/placeholder-solar-battery.jpg',
    path: '/categorias/armazenamento'
  }
];

// Mock data for business services
const businessServices = [
  {
    id: 1,
    title: 'Cadastrar Empresa',
    description: 'Adicione sua empresa à nossa plataforma',
    icon: '🏢',
    path: '/empresa/cadastro'
  },
  {
    id: 2,
    title: 'Painel de Controle',
    description: 'Gerencie seus leads e avaliações',
    icon: '📊',
    path: '/empresa/dashboard'
  },
  {
    id: 3,
    title: 'Recursos Empresariais',
    description: 'Ferramentas para impulsionar seu negócio',
    icon: '⚙️',
    path: '/empresa/recursos'
  },
  {
    id: 4,
    title: 'Suporte Especializado',
    description: 'Ajuda dedicada para parceiros',
    icon: '💬',
    path: '/empresa/suporte'
  }
];

// Mock data for trust indicators
const trustIndicators = [
  { id: 1, value: '50.000+', label: 'Usuários Atendidos' },
  { id: 2, value: '300+', label: 'Empresas Verificadas' },
  { id: 3, value: '2.500+', label: 'Avaliações Reais' }
];

const EnhancedHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addLead } = useLeads();

  const handleLeadCapture = (leadData: any) => {
    const newLead = {
      id: Date.now(),
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || '',
      address: '',
      propertyType: 'residential' as const,
      energyBill: 0,
      timeline: 'Em até 3 meses',
      message: `Interesse em: ${leadData.leadMagnet}`,
      intentionScore: 75,
      budget: 'Até R$ 50.000',
      purchaseIntention: 'high',
      status: 'new' as const,
      leadSource: 'Conversion Point',
      companyId: 0,
      created_at: new Date().toISOString()
    };

    addLead(newLead);
    
    alert('Obrigado! Você receberá o material em seu e-mail em breve.');
  };

  const handleRequestQuote = (company: any) => {
    navigate(`/company/${company.id}?openLead=true`);
  };

  const handleCompanySelect = (companyId: number) => {
    navigate(`/company/${companyId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title="Encontre as melhores empresas de energia solar na sua cidade"
        subtitle="Compare, avalie e escolha com segurança"
      />

      {/* Popular Categories Section */}
      <CategoriesSection categories={mockCategories} />

      {/* For Companies Section */}
      <BusinessServicesSection services={businessServices} />

      {/* Trust Indicators Section */}
      <TrustIndicatorsSection indicators={trustIndicators} />

      {/* Conversion Points Section */}
      <ConversionPoints 
        conversionPoints={mockConversionPoints}
        onLeadCapture={handleLeadCapture}
      />

      {/* Featured Companies Section */}
      <FeaturedCompaniesSection 
        companies={mockCompanies.slice(0, 3)}
        onCompanySelect={handleCompanySelect}
        onRequestQuote={handleRequestQuote}
      />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default EnhancedHomePage;