// Mock data for dashboard analytics inspired by G2's partner dashboard

export const dashboardAnalytics = {
  overview: {
    totalLeads: 156,
    totalReviews: 24,
    averageRating: 4.2,
    profileViews: 1247,
    conversionRate: 12.5,
    responseTime: '2.3 hours',
    averageIntentionScore: 67,
    conversionPointLeads: 89
  },
  
  monthlyStats: [
    { month: 'Jan', leads: 12, reviews: 3, views: 89, conversionPoints: 8 },
    { month: 'Feb', leads: 18, reviews: 2, views: 124, conversionPoints: 12 },
    { month: 'Mar', leads: 25, reviews: 4, views: 156, conversionPoints: 18 },
    { month: 'Apr', leads: 22, reviews: 3, views: 178, conversionPoints: 15 },
    { month: 'May', leads: 31, reviews: 5, views: 203, conversionPoints: 22 },
    { month: 'Jun', leads: 28, reviews: 4, views: 189, conversionPoints: 19 },
    { month: 'Jul', leads: 35, reviews: 6, views: 234, conversionPoints: 25 },
    { month: 'Aug', leads: 42, reviews: 7, views: 267, conversionPoints: 30 },
    { month: 'Sep', leads: 38, reviews: 5, views: 245, conversionPoints: 27 },
    { month: 'Oct', leads: 45, reviews: 8, views: 289, conversionPoints: 32 },
    { month: 'Nov', leads: 52, reviews: 9, views: 312, conversionPoints: 38 },
    { month: 'Dec', leads: 48, reviews: 7, views: 298, conversionPoints: 35 }
  ],

  leadSources: [
    { source: 'Organic Search', count: 45, percentage: 28.8 },
    { source: 'Direct Traffic', count: 38, percentage: 24.4 },
    { source: 'Conversion Points', count: 35, percentage: 22.4 },
    { source: 'Social Media', count: 22, percentage: 14.1 },
    { source: 'Referrals', count: 16, percentage: 10.3 }
  ],

  conversionPointsData: [
    { type: 'Guia PDF', leads: 32, conversionRate: 15.2 },
    { type: 'Calculadora', leads: 28, conversionRate: 12.8 },
    { type: 'Consultoria', leads: 18, conversionRate: 8.5 },
    { type: 'Webinar', leads: 11, conversionRate: 5.2 }
  ],

  intentionScoreDistribution: [
    { range: '80-100 (Alto)', count: 23, percentage: 14.7 },
    { range: '60-79 (Médio-Alto)', count: 45, percentage: 28.8 },
    { range: '40-59 (Médio)', count: 52, percentage: 33.3 },
    { range: '20-39 (Baixo)', count: 36, percentage: 23.1 }
  ],

  recentLeads: [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      propertyType: 'Residencial',
      energyBill: 350,
      status: 'new',
      createdAt: '2024-01-15T10:30:00Z',
      message: 'Interessado em sistema de 5kW para residência',
      intentionScore: 85,
      budget: '15k_30k',
      purchaseIntention: 'ready_to_buy',
      leadSource: 'website',
      decisionMaker: 'yes',
      financingInterest: 'cash',
      previousQuotes: 'none',
      specificRequirements: 'Instalação em telhado de cerâmica',
      roofType: 'ceramic',
      roofArea: 120,
      currentEnergySource: 'grid',
      installationUrgency: '1-3_months'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@empresa.com',
      phone: '(11) 88888-8888',
      propertyType: 'Comercial',
      energyBill: 1200,
      status: 'contacted',
      createdAt: '2024-01-14T14:20:00Z',
      message: 'Preciso de orçamento para escritório de 200m²',
      intentionScore: 72,
      budget: '30k_50k',
      purchaseIntention: 'next_3_months',
      leadSource: 'conversion_point',
      decisionMaker: 'partial',
      financingInterest: 'financing',
      previousQuotes: '1-2',
      specificRequirements: 'Necessário backup para equipamentos críticos',
      roofType: 'concrete',
      roofArea: 200,
      currentEnergySource: 'grid',
      installationUrgency: '3-6_months'
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      phone: '(11) 77777-7777',
      propertyType: 'Residencial',
      energyBill: 280,
      status: 'qualified',
      createdAt: '2024-01-13T09:15:00Z',
      message: 'Casa de 120m², telhado voltado para o sul',
      intentionScore: 68,
      budget: '15k_30k',
      purchaseIntention: 'next_6_months',
      leadSource: 'organic_search',
      decisionMaker: 'yes',
      financingInterest: 'installments',
      previousQuotes: '3-5',
      specificRequirements: 'Integração com ar condicionado',
      roofType: 'metal',
      roofArea: 100,
      currentEnergySource: 'grid',
      installationUrgency: '6-12_months'
    },
    {
      id: 4,
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 66666-6666',
      propertyType: 'Rural',
      energyBill: 800,
      status: 'proposal_sent',
      createdAt: '2024-01-12T16:45:00Z',
      message: 'Fazenda com alto consumo energético',
      intentionScore: 91,
      budget: 'above_50k',
      purchaseIntention: 'ready_to_buy',
      leadSource: 'referral',
      decisionMaker: 'yes',
      financingInterest: 'cash',
      previousQuotes: 'more_than_5',
      specificRequirements: 'Sistema off-grid com baterias',
      roofType: 'other',
      roofArea: 500,
      currentEnergySource: 'generator',
      installationUrgency: 'asap'
    },
    {
      id: 5,
      name: 'Pedro Ferreira',
      email: 'pedro@email.com',
      phone: '(11) 55555-5555',
      propertyType: 'Comercial',
      energyBill: 2500,
      status: 'closed_won',
      createdAt: '2024-01-11T11:30:00Z',
      message: 'Indústria pequena, interessado em economia',
      intentionScore: 95,
      budget: 'above_50k',
      purchaseIntention: 'ready_to_buy',
      leadSource: 'conversion_point',
      decisionMaker: 'yes',
      financingInterest: 'leasing',
      previousQuotes: 'none',
      specificRequirements: 'Monitoramento remoto e manutenção contratada',
      roofType: 'fiber_cement',
      roofArea: 300,
      currentEnergySource: 'grid',
      installationUrgency: '1-3_months'
    }
  ],

  reviewsOverTime: [
    { month: 'Jan', rating: 4.1, count: 2 },
    { month: 'Feb', rating: 4.0, count: 1 },
    { month: 'Mar', rating: 4.3, count: 3 },
    { month: 'Apr', rating: 4.2, count: 2 },
    { month: 'May', rating: 4.4, count: 4 },
    { month: 'Jun', rating: 4.1, count: 3 },
    { month: 'Jul', rating: 4.5, count: 5 },
    { month: 'Aug', rating: 4.3, count: 4 },
    { month: 'Sep', rating: 4.2, count: 3 },
    { month: 'Oct', rating: 4.6, count: 6 },
    { month: 'Nov', rating: 4.4, count: 5 },
    { month: 'Dec', rating: 4.3, count: 4 }
  ],

  competitorAnalysis: [
    { name: 'SolarTech Pro', rating: 4.1, reviews: 89, marketShare: 15.2 },
    { name: 'Green Energy Solutions', rating: 3.9, reviews: 67, marketShare: 12.8 },
    { name: 'EcoSolar Brasil', rating: 4.3, reviews: 134, marketShare: 18.5 },
    { name: 'Solar Power Plus', rating: 4.0, reviews: 78, marketShare: 11.9 }
  ],

  topKeywords: [
    { keyword: 'energia solar residencial', searches: 1250, ranking: 3 },
    { keyword: 'painel solar preço', searches: 980, ranking: 5 },
    { keyword: 'instalação energia solar', searches: 750, ranking: 2 },
    { keyword: 'sistema fotovoltaico', searches: 650, ranking: 4 },
    { keyword: 'energia solar comercial', searches: 520, ranking: 6 },
    { keyword: 'kit energia solar', searches: 480, ranking: 7 },
    { keyword: 'placa solar preço', searches: 420, ranking: 8 }
  ]
};

export const companyProfile = {
  id: 1,
  name: 'SolarCo 1',
  description: 'Leading solar energy provider with over 10 years of experience in renewable energy solutions. We specialize in residential, commercial, and industrial solar installations with a focus on quality, reliability, and customer satisfaction.',
  location: 'São Paulo, SP',
  installed_capacity_mw: 10.5,
  phone: '+55 (11) 99999-9999',
  email: 'contato@solarco1.com.br',
  website: 'https://www.solarco1.com.br',
  foundedYear: 2013,
  employeeCount: '50-100',
  serviceAreas: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Paraná'],
  certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ABGD'],
  specialties: ['Residencial', 'Comercial', 'Industrial'],
  logo: '/assets/images/company-logo.png',
  coverImage: '/assets/images/company-cover.jpg',
  socialMedia: {
    facebook: 'https://facebook.com/solarco1',
    instagram: 'https://instagram.com/solarco1',
    linkedin: 'https://linkedin.com/company/solarco1'
  },
  businessHours: {
    monday: '08:00-18:00',
    tuesday: '08:00-18:00',
    wednesday: '08:00-18:00',
    thursday: '08:00-18:00',
    friday: '08:00-18:00',
    saturday: '08:00-12:00',
    sunday: 'Fechado'
  },
  status: 'active',
  user_id: 2,
  created_at: '2024-01-01T00:00:00Z',
  rating: 4.2,
  review_count: 15
};

