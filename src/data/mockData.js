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
    name: 'Solar Paulista',
    location: 'São Paulo, SP',
    installed_capacity_mw: 45.2,
    status: 'active',
    user_id: 2,
    created_at: '2024-01-01T00:00:00Z',
    description: 'Líder em energia solar no estado de São Paulo com mais de 15 anos de experiência. Especializada em soluções residenciais, comerciais e industriais de alta qualidade.',
    phone: '+55 (11) 3456-7890',
    website: 'https://solarpaulista.com.br',
    rating: 4.8,
    review_count: 127,
    specialties: ['Residencial', 'Comercial', 'Industrial'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ABGD', 'CRESESB'],
    service_areas: ['São Paulo', 'Grande São Paulo', 'Interior de SP'],
    foundedYear: 2009,
    employeeCount: '200-500',
    logo: '/assets/images/solar-paulista-logo.png',
    coverImage: '/assets/images/solar-paulista-cover.jpg',
    city: 'São Paulo',
    state: 'SP',
    cep: '01310-100'
  },
  {
    id: 2,
    name: 'Rio Solar Energy',
    location: 'Rio de Janeiro, RJ',
    installed_capacity_mw: 38.7,
    status: 'active',
    user_id: 4,
    created_at: '2024-01-02T00:00:00Z',
    description: 'Empresa carioca pioneira em energia solar fotovoltaica. Atendemos desde residências até grandes complexos comerciais com tecnologia de ponta e garantia estendida.',
    phone: '+55 (21) 2345-6789',
    website: 'https://riosolarenergy.com.br',
    rating: 4.6,
    review_count: 89,
    specialties: ['Residencial', 'Comercial', 'Condomínios'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ISO 14001'],
    service_areas: ['Rio de Janeiro', 'Niterói', 'Região dos Lagos'],
    foundedYear: 2012,
    employeeCount: '100-200',
    logo: '/assets/images/rio-solar-logo.png',
    coverImage: '/assets/images/rio-solar-cover.jpg',
    city: 'Rio de Janeiro',
    state: 'RJ',
    cep: '20040-020'
  },
  {
    id: 3,
    name: 'Minas Solar Tech',
    location: 'Belo Horizonte, MG',
    installed_capacity_mw: 29.4,
    status: 'active',
    user_id: 5,
    created_at: '2024-01-03T00:00:00Z',
    description: 'Empresa mineira especializada em soluções sustentáveis de energia solar. Focamos em projetos personalizados com excelente custo-benefício para residências e empresas.',
    phone: '+55 (31) 3234-5678',
    website: 'https://minassolartech.com.br',
    rating: 4.4,
    review_count: 56,
    specialties: ['Residencial', 'Rural', 'Pequenas Empresas'],
    certifications: ['INMETRO', 'ANEEL', 'ABGD'],
    service_areas: ['Belo Horizonte', 'Região Metropolitana', 'Interior de MG'],
    foundedYear: 2014,
    employeeCount: '50-100',
    logo: '/assets/images/minas-solar-logo.png',
    coverImage: '/assets/images/minas-solar-cover.jpg',
    city: 'Belo Horizonte',
    state: 'MG',
    cep: '30112-000'
  },
  {
    id: 4,
    name: 'Nordeste Solar',
    location: 'Salvador, BA',
    installed_capacity_mw: 52.1,
    status: 'active',
    user_id: 6,
    created_at: '2024-01-04T00:00:00Z',
    description: 'Aproveitando o potencial solar único do Nordeste brasileiro. Somos especialistas em grandes projetos solares e temos a maior capacidade instalada da região.',
    phone: '+55 (71) 3123-4567',
    website: 'https://nordestesolar.com.br',
    rating: 4.7,
    review_count: 94,
    specialties: ['Industrial', 'Comercial', 'Usinas Solares'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ISO 14001', 'CRESESB'],
    service_areas: ['Bahia', 'Sergipe', 'Alagoas', 'Pernambuco'],
    foundedYear: 2011,
    employeeCount: '300-500',
    logo: '/assets/images/nordeste-solar-logo.png',
    coverImage: '/assets/images/nordeste-solar-cover.jpg',
    city: 'Salvador',
    state: 'BA',
    cep: '40070-110'
  },
  {
    id: 5,
    name: 'Amazônia Solar Verde',
    location: 'Manaus, AM',
    installed_capacity_mw: 21.8,
    status: 'active',
    user_id: 7,
    created_at: '2024-01-05T00:00:00Z',
    description: 'Energia solar sustentável para a Amazônia. Desenvolvemos soluções ecológicas que respeitam o meio ambiente e atendem comunidades remotas e centros urbanos.',
    phone: '+55 (92) 3012-3456',
    website: 'https://amazoniasolar.com.br',
    rating: 4.3,
    review_count: 42,
    specialties: ['Residencial', 'Comunidades Remotas', 'Projetos Sustentáveis'],
    certifications: ['INMETRO', 'ANEEL', 'Certificação Ambiental'],
    service_areas: ['Amazonas', 'Roraima', 'Acre', 'Rondônia'],
    foundedYear: 2016,
    employeeCount: '20-50',
    logo: '/assets/images/amazonia-solar-logo.png',
    coverImage: '/assets/images/amazonia-solar-cover.jpg',
    city: 'Manaus',
    state: 'AM',
    cep: '69020-160'
  },
  {
    id: 6,
    name: 'Sul Solar Energia',
    location: 'Porto Alegre, RS',
    installed_capacity_mw: 34.6,
    status: 'active',
    user_id: 8,
    created_at: '2024-01-06T00:00:00Z',
    description: 'Empresa gaúcha com foco em inovação e qualidade. Oferecemos soluções completas em energia solar com tecnologia alemã e atendimento personalizado.',
    phone: '+55 (51) 3345-6789',
    website: 'https://sulsolarenergia.com.br',
    rating: 4.5,
    review_count: 73,
    specialties: ['Residencial', 'Comercial', 'Agronegócio'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'TÜV'],
    service_areas: ['Rio Grande do Sul', 'Santa Catarina', 'Paraná'],
    foundedYear: 2013,
    employeeCount: '100-200',
    logo: '/assets/images/sul-solar-logo.png',
    coverImage: '/assets/images/sul-solar-cover.jpg',
    city: 'Porto Alegre',
    state: 'RS',
    cep: '90010-150'
  },
  {
    id: 7,
    name: 'Centro-Oeste Solar',
    location: 'Brasília, DF',
    installed_capacity_mw: 28.9,
    status: 'active',
    user_id: 9,
    created_at: '2024-01-07T00:00:00Z',
    description: 'Atendendo o coração do Brasil com energia limpa. Especialistas em projetos governamentais e comerciais de grande porte na região Centro-Oeste.',
    phone: '+55 (61) 3234-5678',
    website: 'https://centrooestesolar.com.br',
    rating: 4.6,
    review_count: 61,
    specialties: ['Comercial', 'Governamental', 'Industrial'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ISO 14001'],
    service_areas: ['Distrito Federal', 'Goiás', 'Mato Grosso', 'Mato Grosso do Sul'],
    foundedYear: 2015,
    employeeCount: '50-100',
    logo: '/assets/images/centro-oeste-solar-logo.png',
    coverImage: '/assets/images/centro-oeste-solar-cover.jpg',
    city: 'Brasília',
    state: 'DF',
    cep: '70040-010'
  },
  {
    id: 8,
    name: 'Paraná Solar Tech',
    location: 'Curitiba, PR',
    installed_capacity_mw: 31.2,
    status: 'active',
    user_id: 10,
    created_at: '2024-01-08T00:00:00Z',
    description: 'Tecnologia paranaense a serviço da energia solar. Desenvolvemos soluções inteligentes com monitoramento em tempo real e máxima eficiência.',
    phone: '+55 (41) 3123-4567',
    website: 'https://paranasolartech.com.br',
    rating: 4.4,
    review_count: 85,
    specialties: ['Residencial', 'Comercial', 'Monitoramento Inteligente'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ABGD'],
    service_areas: ['Paraná', 'Santa Catarina', 'São Paulo'],
    foundedYear: 2014,
    employeeCount: '75-150',
    logo: '/assets/images/parana-solar-logo.png',
    coverImage: '/assets/images/parana-solar-cover.jpg',
    city: 'Curitiba',
    state: 'PR',
    cep: '80010-000'
  },
  {
    id: 9,
    name: 'Ceará Solar Power',
    location: 'Fortaleza, CE',
    installed_capacity_mw: 41.7,
    status: 'active',
    user_id: 11,
    created_at: '2024-01-09T00:00:00Z',
    description: 'Aproveitando o excelente potencial solar do Ceará. Líderes em projetos de grande escala e pioneiros em energia solar no Nordeste.',
    phone: '+55 (85) 3012-3456',
    website: 'https://cearasolarpower.com.br',
    rating: 4.8,
    review_count: 112,
    specialties: ['Industrial', 'Usinas Solares', 'Comercial'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ISO 14001', 'CRESESB'],
    service_areas: ['Ceará', 'Rio Grande do Norte', 'Piauí', 'Maranhão'],
    foundedYear: 2010,
    employeeCount: '200-300',
    logo: '/assets/images/ceara-solar-logo.png',
    coverImage: '/assets/images/ceara-solar-cover.jpg',
    city: 'Fortaleza',
    state: 'CE',
    cep: '60160-230'
  },
  {
    id: 10,
    name: 'Espírito Santo Solar',
    location: 'Vitória, ES',
    installed_capacity_mw: 26.3,
    status: 'active',
    user_id: 12,
    created_at: '2024-01-10T00:00:00Z',
    description: 'Energia solar capixaba com qualidade e tradição. Atendemos residências, comércios e indústrias com soluções personalizadas e suporte técnico especializado.',
    phone: '+55 (27) 3345-6789',
    website: 'https://essolar.com.br',
    rating: 4.3,
    review_count: 48,
    specialties: ['Residencial', 'Comercial', 'Industrial'],
    certifications: ['INMETRO', 'ANEEL', 'ISO 9001'],
    service_areas: ['Espírito Santo', 'Sul da Bahia', 'Norte do Rio de Janeiro'],
    foundedYear: 2017,
    employeeCount: '30-75',
    logo: '/assets/images/es-solar-logo.png',
    coverImage: '/assets/images/es-solar-cover.jpg',
    city: 'Vitória',
    state: 'ES',
    cep: '29010-120'
  },
  {
    id: 11,
    name: 'Sergipe Solar Solutions',
    location: 'Aracaju, SE',
    installed_capacity_mw: 19.8,
    status: 'active',
    user_id: 13,
    created_at: '2024-01-11T00:00:00Z',
    description: 'Soluções solares sergipanas com foco em sustentabilidade. Oferecemos projetos econômicos e eficientes para todos os tipos de clientes.',
    phone: '+55 (79) 3234-5678',
    website: 'https://sergipesolar.com.br',
    rating: 4.2,
    review_count: 35,
    specialties: ['Residencial', 'Pequenas Empresas', 'Rural'],
    certifications: ['INMETRO', 'ANEEL', 'ABGD'],
    service_areas: ['Sergipe', 'Alagoas', 'Sul da Bahia'],
    foundedYear: 2018,
    employeeCount: '20-50',
    logo: '/assets/images/sergipe-solar-logo.png',
    coverImage: '/assets/images/sergipe-solar-cover.jpg',
    city: 'Aracaju',
    state: 'SE',
    cep: '49010-390'
  },
  {
    id: 12,
    name: 'Solar Paulista Energia',
    location: 'São Paulo, SP',
    installed_capacity_mw: 55.4,
    status: 'active',
    user_id: 14,
    created_at: '2024-01-12T00:00:00Z',
    description: 'Empresa líder em energia solar no estado de São Paulo com mais de 15 anos de experiência. Especializada em soluções residenciais, comerciais e industriais de alta qualidade.',
    phone: '+55 (11) 3456-7890',
    website: 'https://solarpaulistaenergia.com.br',
    rating: 4.9,
    review_count: 198,
    specialties: ['Instalação Residencial', 'Instalação Comercial', 'Instalação Industrial'],
    certifications: ['CREA', 'INMETRO', 'ANEEL', 'ISO 9001'],
    service_areas: ['São Paulo', 'Grande São Paulo', 'Interior de SP', 'Campinas'],
    foundedYear: 2009,
    employeeCount: '500+',
    logo: '/assets/images/solar-paulista-energia-logo.png',
    coverImage: '/assets/images/solar-paulista-energia-cover.jpg',
    city: 'São Paulo',
    state: 'SP',
    cep: '01310-200'
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
  },
  {
    id: 15,
    solar_company_id: 12,
    user_id: 3,
    rating: 5,
    comment: 'Excelente empresa! A Solar Paulista Energia superou todas as minhas expectativas. Equipe muito profissional, instalação impecável e o sistema está funcionando perfeitamente. Recomendo!',
    status: 'approved',
    created_at: '2024-02-15T00:00:00Z',
    user_name: 'Ana Carolina'
  },
  {
    id: 16,
    solar_company_id: 12,
    user_id: 3,
    rating: 4,
    comment: 'Muito boa experiência com a Solar Paulista Energia. A equipe técnica é competente e o atendimento é excelente. O projeto foi entregue no prazo e está gerando a energia esperada.',
    status: 'approved',
    created_at: '2024-02-20T00:00:00Z',
    user_name: 'Roberto Santos'
  },
  {
    id: 17,
    solar_company_id: 12,
    user_id: 3,
    rating: 5,
    comment: 'Empresa top! Desde o primeiro contato até a finalização do projeto, tudo foi perfeito. A Solar Paulista Energia tem uma equipe muito preparada e o pós-venda é excelente.',
    status: 'approved',
    created_at: '2024-02-25T00:00:00Z',
    user_name: 'Mariana Lima'
  },
  {
    id: 18,
    solar_company_id: 12,
    user_id: 3,
    rating: 5,
    comment: 'Recomendo 100%! A Solar Paulista Energia fez um trabalho excepcional na minha residência. Profissionais qualificados, equipamentos de primeira linha e suporte técnico impecável.',
    status: 'approved',
    created_at: '2024-03-01T00:00:00Z',
    user_name: 'Carlos Eduardo'
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
  },
  {
    id: 15,
    solar_company_id: 12,
    user_id: 14,
    title: 'Guia Completo de Energia Solar Residencial',
    content_type: 'guide',
    body: 'Um guia abrangente sobre energia solar residencial, cobrindo desde o dimensionamento do sistema até a instalação e manutenção. Inclui dicas práticas para maximizar a economia na conta de luz.',
    category_id: 1,
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: 16,
    solar_company_id: 12,
    user_id: 14,
    title: 'Como Escolher os Melhores Painéis Solares',
    content_type: 'article',
    body: 'Descubra os critérios essenciais para escolher os painéis solares ideais para seu projeto. Analisamos eficiência, durabilidade, garantia e custo-benefício dos principais fabricantes.',
    category_id: 1,
    created_at: '2024-02-10T00:00:00Z'
  },
  {
    id: 17,
    solar_company_id: 12,
    user_id: 14,
    title: 'Manutenção Preventiva de Sistemas Solares',
    content_type: 'guide',
    body: 'Aprenda como manter seu sistema solar funcionando com máxima eficiência. Dicas de limpeza, inspeção e cuidados que prolongam a vida útil dos equipamentos.',
    category_id: 3,
    created_at: '2024-02-15T00:00:00Z'
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

