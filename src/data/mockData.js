// Mock data based on the provided seed data
export const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@solarenergy.com',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Company Moderator',
    email: 'moderator@solarenergy.com',
    role: 'moderator',
    created_at: '2024-01-01T00:00:00Z',
    companyId: 1
  },
  {
    id: 3,
    name: 'Regular User',
    email: 'user@solarenergy.com',
    role: 'user',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Another Company',
    email: 'moderator2@solarenergy.com',
    role: 'moderator',
    created_at: '2024-01-02T00:00:00Z',
    companyId: 2
  }
];

export const mockCompanies = [
  {
    id: 1,
    name: 'SolarCo 1',
    location: 'São Paulo, SP',
    installed_capacity_mw: 10.5,
    status: 'active',
    user_id: 2,
    created_at: '2024-01-01T00:00:00Z',
    description: 'Leading solar energy provider with over 10 years of experience in renewable energy solutions.',
    phone: '+55 (11) 99999-9999',
    website: 'https://solarco1.com.br',
    rating: 4.2,
    review_count: 15,
    specialties: ['Residencial', 'Comercial', 'Industrial'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ABGD'],
    service_areas: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Paraná'],
    foundedYear: 2013,
    employeeCount: '50-100',
    logo: '/assets/images/company-logo.png',
    coverImage: '/assets/images/company-cover.jpg'
  },
  {
    id: 2,
    name: 'SunPower Solutions',
    location: 'Rio de Janeiro, RJ',
    installed_capacity_mw: 25.8,
    status: 'active',
    user_id: 4,
    created_at: '2024-01-02T00:00:00Z',
    description: 'Innovative solar technology company specializing in residential and commercial installations.',
    phone: '+55 (21) 98888-8888',
    website: 'https://sunpowersolutions.com.br',
    rating: 4.7,
    review_count: 32,
    specialties: ['Residencial', 'Comercial'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001'],
    service_areas: ['Rio de Janeiro', 'São Paulo', 'Minas Gerais'],
    foundedYear: 2015,
    employeeCount: '100-200',
    logo: '/assets/images/sunpower-logo.png',
    coverImage: '/assets/images/sunpower-cover.jpg'
  },
  {
    id: 3,
    name: 'Green Energy Corp',
    location: 'Belo Horizonte, MG',
    installed_capacity_mw: 18.3,
    status: 'active',
    user_id: 5,
    created_at: '2024-01-03T00:00:00Z',
    description: 'Sustainable energy solutions for a greener future. Serving residential and commercial clients.',
    phone: '+55 (31) 97777-7777',
    website: 'https://greenenergycorp.com.br',
    rating: 4.0,
    review_count: 8,
    specialties: ['Residencial', 'Rural'],
    certifications: ['INMETRO', 'ANEEL'],
    service_areas: ['Minas Gerais', 'São Paulo', 'Rio de Janeiro'],
    foundedYear: 2015,
    employeeCount: '20-50',
    logo: '/assets/images/greenenergy-logo.png',
    coverImage: '/assets/images/greenenergy-cover.jpg'
  },
  {
    id: 4,
    name: 'Solar Innovations LLC',
    location: 'Porto Alegre, RS',
    installed_capacity_mw: 32.1,
    status: 'active',
    user_id: 6,
    created_at: '2024-01-04T00:00:00Z',
    description: 'Cutting-edge solar panel technology and installation services across the Southeast.',
    phone: '+55 (51) 96666-6666',
    website: 'https://solarinnovations.com.br',
    rating: 4.5,
    review_count: 24,
    specialties: ['Comercial', 'Industrial'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ISO 14001'],
    service_areas: ['Rio Grande do Sul', 'Santa Catarina', 'Paraná'],
    foundedYear: 2015,
    employeeCount: '100-200',
    logo: '/assets/images/solarinnovations-logo.png',
    coverImage: '/assets/images/solarinnovations-cover.jpg'
  }
];

export const mockReviews = [
  {
    id: 1,
    solar_company_id: 1,
    user_id: 3,
    rating: 4,
    comment: 'Great service and professional installation. The team was punctual and respectful.',
    status: 'approved',
    created_at: '2024-01-15T00:00:00Z',
    user_name: 'Regular User'
  },
  {
    id: 2,
    solar_company_id: 1,
    user_id: 3,
    rating: 5,
    comment: 'Excellent installation and customer support. Highly recommended! The system is working perfectly and our energy bill dropped significantly.',
    status: 'approved',
    created_at: '2024-01-20T00:00:00Z',
    user_name: 'João Silva'
  },
  {
    id: 3,
    solar_company_id: 2,
    user_id: 3,
    rating: 5,
    comment: 'Outstanding quality and professional service. The team was knowledgeable and efficient. They explained everything clearly and the installation was completed ahead of schedule.',
    status: 'approved',
    created_at: '2024-01-25T00:00:00Z',
    user_name: 'Maria Santos'
  },
  {
    id: 4,
    solar_company_id: 2,
    user_id: 3,
    rating: 4,
    comment: 'Good experience overall. Installation was completed on time. The only minor issue was a small delay in the paperwork, but it was resolved quickly.',
    status: 'approved',
    created_at: '2024-01-30T00:00:00Z',
    user_name: 'Carlos Oliveira'
  },
  {
    id: 5,
    solar_company_id: 3,
    user_id: 3,
    rating: 3,
    comment: 'Decent service. The installation was fine but the post-installation support could be better. Had to call a few times for small issues.',
    status: 'approved',
    created_at: '2024-02-05T00:00:00Z',
    user_name: 'Ana Costa'
  },
  {
    id: 6,
    solar_company_id: 4,
    user_id: 3,
    rating: 5,
    comment: 'Fantastic company! Professional from start to finish. The consultation was thorough, the installation was seamless, and the results exceeded our expectations.',
    status: 'approved',
    created_at: '2024-02-10T00:00:00Z',
    user_name: 'Pedro Ferreira'
  }
];

export const mockCategories = [
  {
    id: 1,
    name: 'Solar Guides'
  },
  {
    id: 2,
    name: 'Installation Tips'
  },
  {
    id: 3,
    name: 'Maintenance'
  },
  {
    id: 4,
    name: 'Financing'
  },
  {
    id: 5,
    name: 'Technology'
  }
];

export const mockContent = [
  {
    id: 1,
    solar_company_id: 1,
    user_id: 2,
    title: 'Complete Guide to Residential Solar Installation',
    content_type: 'guide',
    body: 'A comprehensive guide covering everything you need to know about residential solar panel installation, from planning to maintenance. This guide includes information on system sizing, equipment selection, permitting, installation process, and long-term maintenance.',
    category_id: 1,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    solar_company_id: 2,
    user_id: 4,
    title: 'Commercial Solar: Maximizing ROI',
    content_type: 'guide',
    body: 'Learn how to maximize your return on investment with commercial solar installations. This guide covers system design for commercial properties, financing options, tax incentives, and performance monitoring.',
    category_id: 1,
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 3,
    solar_company_id: 3,
    user_id: 5,
    title: 'Solar Panel Maintenance Best Practices',
    content_type: 'article',
    body: 'Learn how to properly maintain your solar panels to ensure maximum efficiency and longevity. This article covers cleaning schedules, inspection checklists, performance monitoring, and troubleshooting common issues.',
    category_id: 3,
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 4,
    solar_company_id: 4,
    user_id: 6,
    title: 'Understanding Solar Financing Options',
    content_type: 'article',
    body: 'A detailed overview of solar financing options including loans, leases, and power purchase agreements (PPAs). Learn about the pros and cons of each option, qualification requirements, and how to choose the best financing for your situation.',
    category_id: 4,
    created_at: '2024-01-20T00:00:00Z'
  },
  {
    id: 5,
    solar_company_id: 1,
    user_id: 2,
    title: 'Latest Advances in Solar Panel Technology',
    content_type: 'article',
    body: 'Stay up-to-date with the latest advances in solar panel technology. This article covers new cell technologies, efficiency improvements, durability enhancements, and emerging trends in the solar industry.',
    category_id: 5,
    created_at: '2024-01-25T00:00:00Z'
  }
];

export const mockBadges = [
  {
    id: 1,
    name: 'Top Contributor',
    description: 'For active users who regularly engage with the platform',
    badgeable_type: 'User',
    badgeable_id: 3
  },
  {
    id: 2,
    name: 'Verified Installer',
    description: 'Certified solar installation company',
    badgeable_type: 'Company',
    badgeable_id: 1
  },
  {
    id: 3,
    name: 'Premium Partner',
    description: 'Premium solar energy partner with advanced certifications',
    badgeable_type: 'Company',
    badgeable_id: 2
  },
  {
    id: 4,
    name: 'Eco Champion',
    description: 'Company committed to sustainable practices',
    badgeable_type: 'Company',
    badgeable_id: 3
  },
  {
    id: 5,
    name: 'Innovation Leader',
    description: 'Company using cutting-edge solar technology',
    badgeable_type: 'Company',
    badgeable_id: 4
  }
];

export const mockCampaigns = [
  {
    id: 1,
    solar_company_id: 1,
    user_id: 2,
    title: 'Summer Solar Savings',
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T00:00:00Z',
    created_at: '2024-05-15T00:00:00Z'
  },
  {
    id: 2,
    solar_company_id: 2,
    user_id: 4,
    title: 'Winter Energy Efficiency',
    start_date: '2024-12-01T00:00:00Z',
    end_date: '2025-02-28T00:00:00Z',
    created_at: '2024-11-15T00:00:00Z'
  },
  {
    id: 3,
    solar_company_id: 3,
    user_id: 5,
    title: 'Spring Installation Special',
    start_date: '2024-09-01T00:00:00Z',
    end_date: '2024-11-30T00:00:00Z',
    created_at: '2024-08-15T00:00:00Z'
  }
];

// Additional mock data for conversion points
export const mockConversionPoints = [
  {
    id: 'guide',
    title: 'Guia Completo de Energia Solar',
    description: 'Baixe nosso guia gratuito com tudo que você precisa saber sobre energia solar',
    icon: 'Download',
    color: 'bg-blue-500',
    cta: 'Baixar Guia Grátis',
    leadMagnet: 'Guia PDF - Como Escolher o Sistema Solar Ideal'
  },
  {
    id: 'consultation',
    title: 'Consultoria Gratuita',
    description: 'Agende uma consultoria gratuita com nossos especialistas',
    icon: 'Calendar',
    color: 'bg-green-500',
    cta: 'Agendar Consultoria',
    leadMagnet: 'Consultoria Gratuita de 30 minutos'
  },
  {
    id: 'calculator',
    title: 'Calculadora de Economia',
    description: 'Calcule quanto você pode economizar com energia solar',
    icon: 'Calculator',
    color: 'bg-orange-500',
    cta: 'Calcular Economia',
    leadMagnet: 'Relatório Personalizado de Economia'
  },
  {
    id: 'webinar',
    title: 'Webinar Exclusivo',
    description: 'Participe do nosso webinar sobre tendências em energia solar',
    icon: 'FileText',
    color: 'bg-purple-500',
    cta: 'Inscrever-se',
    leadMagnet: 'Acesso ao Webinar + Material Complementar'
  }
];

