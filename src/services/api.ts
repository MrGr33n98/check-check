export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  featured?: boolean;
  image_url?: string;
  banner_image_url?: string;
  children?: Category[];
}

export interface Provider {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  country?: string;
  address?: string;
  phone?: string;
  foundation_year?: number;
  members_count?: number;
  status: string;
  premium: boolean;
  premium_effect_active?: boolean;
  tags: string[];
  social_links?: any;
  categories: Category[];
  logo_url?: string;
  cover_image_url?: string;
  rating: number;
  review_count: number;
  installed_capacity_mw: number;
  location: string;
  specialties: string[];
}

export interface ProvidersResponse {
  providers: Provider[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

class ApiService {
  async getCategories(signal?: AbortSignal): Promise<Category[]> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // The API might return the data nested, e.g., { data: [...] }. Adjust if needed.
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error;
      }
      console.error("Error fetching categories:", error);
      return []; // Return empty array on other errors
    }
  }

  async getCategoryBySlug(slug: string, signal?: AbortSignal): Promise<Category | null> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${slug}`, { signal });
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Category not found
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Assuming the backend returns the category object directly
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error; // Re-throw abort errors so the calling component can handle them
      }
      console.error("Error fetching category by slug:", error);
      throw error; // Re-throw other errors as well
    }
  }

  async getProviders(params?: {
    category_id?: number;
    category_slug?: string;
    sort_by?: 'rating' | 'capacity' | 'reviews';
    limit?: number;
    page?: number;
  }, signal?: AbortSignal): Promise<ProvidersResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
      if (params?.category_slug) queryParams.append('category_slug', params.category_slug);
      if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());

      const response = await fetch(`${import.meta.env.VITE_API_URL}/providers/search?${queryParams.toString()}`, { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        providers: data.results || [],
        total: data.pagination?.total_count || 0,
        page: data.pagination?.current_page || 1,
        per_page: data.pagination?.per_page || 0,
        total_pages: data.pagination?.total_pages || 0,
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error; // Re-throw abort errors
      }
      console.error("Error fetching providers:", error);
      throw error; // Re-throw other errors
    }
  }

  async getProviderBySlug(slug: string): Promise<Provider | null> {
    const mockProviders = this.getMockProviders();
    return mockProviders.providers.find(provider => provider.slug === slug) || null;
  }

  private getMockCategories(): Category[] {
    return [
      {
        id: 1,
        name: 'Geração Distribuída',
        slug: 'geracao-distribuida',
        description: 'Sistemas de geração distribuída permitem que a eletricidade seja produzida próximo ao local de consumo, geralmente em telhados de residências e empresas. Essa abordagem descentralizada aumenta a eficiência energética e reduz as perdas na transmissão.',
        featured: true
      },
      {
        id: 2,
        name: 'Usinas Solares de Grande Porte',
        slug: 'usinas-solares',
        description: 'Usinas solares de grande porte são instalações industriais que geram eletricidade em larga escala para o fornecimento à rede elétrica. Essas usinas podem ocupar grandes áreas e produzir energia para milhares de consumidores.',
        featured: true
      },
      {
        id: 3,
        name: 'Armazenamento de Energia',
        slug: 'armazenamento',
        description: 'Sistemas de armazenamento de energia solar permitem acumular a eletricidade gerada pelos painéis fotovoltaicos para uso posterior, aumentando a autonomia energética e a eficiência do sistema.',
        featured: true
      },
      {
        id: 4,
        name: 'Energia Off-Grid',
        slug: 'off-grid',
        description: 'Sistemas off-grid são soluções energéticas independentes que não se conectam à rede elétrica convencional. Ideais para áreas remotas, propriedades rurais ou aplicações específicas onde o acesso à rede é difícil ou economicamente inviável.',
        featured: true
      },
      {
        id: 5,
        name: 'Eficiência Energética',
        slug: 'eficiencia',
        description: 'A eficiência energética envolve o uso de tecnologias e práticas que reduzem o consumo de energia mantendo o mesmo nível de conforto e produtividade. Em sistemas solares, isso inclui equipamentos de alta eficiência e gestão inteligente do consumo.',
        featured: true
      },
      {
        id: 6,
        name: 'Financiamento e Crédito Solar',
        slug: 'financiamento',
        description: 'Soluções de financiamento permitem que residências e empresas adotem energia solar com investimento acessível. Opções incluem empréstimos, leasing, PPAs (Power Purchase Agreements) e linhas de crédito especiais.',
        featured: true
      },
      {
        id: 7,
        name: 'Comunidades de Energia',
        slug: 'comunidades',
        description: 'Comunidades de energia solar permitem que grupos de consumidores compartilhem os benefícios da geração solar, mesmo sem condições ideais de instalação individual. Essa abordagem colaborativa democratiza o acesso à energia limpa.',
        featured: true
      },
      {
        id: 8,
        name: 'Sustentabilidade e ESG',
        slug: 'sustentabilidade',
        description: 'A energia solar é um componente essencial das estratégias de sustentabilidade e ESG (Environmental, Social, Governance). Empresas e investidores cada vez mais consideram a geração solar como fator crítico para responsabilidade ambiental.',
        featured: true
      },
      {
        id: 9,
        name: 'Inovação e Novas Tecnologias',
        slug: 'inovacao',
        description: 'O setor solar está em constante evolução com novas tecnologias como células de perovskita, bifaciais, flutuantes e sistemas de rastreamento solar. Essas inovações prometem maior eficiência e menor custo de geração.',
        featured: true
      }
    ];
  }

  private getMockProviders(params?: {
    category_id?: number;
    category_slug?: string;
    sort_by?: 'rating' | 'capacity' | 'reviews';
    limit?: number;
    page?: number;
  }): ProvidersResponse {
    const mockProviders: Provider[] = [
      {
        id: 1,
        name: 'SolarTech Brasil',
        slug: 'solartech-brasil',
        short_description: 'Líder em soluções solares residenciais e comerciais',
        description: 'A SolarTech Brasil é uma empresa pioneira no mercado de energia solar, oferecendo soluções completas para residências e empresas.',
        country: 'Brasil',
        address: 'São Paulo, SP',
        phone: '(11) 99999-9999',
        foundation_year: 2015,
        members_count: 150,
        status: 'active',
        premium: true,
        tags: ['capacity:500MW', 'location:São Paulo', 'experience:8 anos'],
        social_links: {},
        categories: [{ id: 1, name: 'Geração Distribuída', slug: 'geracao-distribuida' }],
        logo_url: '/logos/solartech.png',
        cover_image_url: '/covers/solartech.jpg',
        rating: 4.8,
        review_count: 245,
        installed_capacity_mw: 500,
        location: 'São Paulo',
        specialties: ['Residencial', 'Comercial', 'Industrial']
      },
      {
        id: 2,
        name: 'EcoSolar Energia',
        slug: 'ecosolar-energia',
        short_description: 'Especialista em usinas solares de grande porte',
        description: 'A EcoSolar Energia atua no desenvolvimento de usinas solares de grande porte e soluções de armazenamento.',
        country: 'Brasil',
        address: 'Rio de Janeiro, RJ',
        phone: '(21) 88888-8888',
        foundation_year: 2012,
        members_count: 200,
        status: 'active',
        premium: true,
        tags: ['capacity:1200MW', 'location:Rio de Janeiro', 'experience:11 anos'],
        social_links: {},
        categories: [{ id: 2, name: 'Usinas Solares de Grande Porte', slug: 'usinas-solares' }],
        logo_url: '/logos/ecosolar.png',
        cover_image_url: '/covers/ecosolar.jpg',
        rating: 4.9,
        review_count: 189,
        installed_capacity_mw: 1200,
        location: 'Rio de Janeiro',
        specialties: ['Usinas', 'Armazenamento', 'Grid-Scale']
      },
      {
        id: 3,
        name: 'GreenPower Solutions',
        slug: 'greenpower-solutions',
        short_description: 'Inovação em sistemas off-grid e armazenamento',
        description: 'A GreenPower Solutions é especializada em sistemas off-grid e soluções de armazenamento de energia.',
        country: 'Brasil',
        address: 'Belo Horizonte, MG',
        phone: '(31) 77777-7777',
        foundation_year: 2018,
        members_count: 80,
        status: 'active',
        premium: false,
        tags: ['capacity:150MW', 'location:Belo Horizonte', 'experience:5 anos'],
        social_links: {},
        categories: [{ id: 3, name: 'Armazenamento de Energia', slug: 'armazenamento' }, { id: 4, name: 'Energia Off-Grid', slug: 'off-grid' }],
        logo_url: '/logos/greenpower.png',
        cover_image_url: '/covers/greenpower.jpg',
        rating: 4.6,
        review_count: 127,
        installed_capacity_mw: 150,
        location: 'Belo Horizonte',
        specialties: ['Off-Grid', 'Baterias', 'Sistemas Híbridos']
      },
      {
        id: 4,
        name: 'Solar Nordeste',
        slug: 'solar-nordeste',
        short_description: 'Especialista em energia solar para o Nordeste brasileiro',
        description: 'A Solar Nordeste aproveita o alto potencial solar da região para oferecer as melhores soluções energéticas.',
        country: 'Brasil',
        address: 'Fortaleza, CE',
        phone: '(85) 66666-6666',
        foundation_year: 2016,
        members_count: 120,
        status: 'active',
        premium: true,
        tags: ['capacity:800MW', 'location:Fortaleza', 'experience:7 anos'],
        social_links: {},
        categories: [{ id: 1, name: 'Geração Distribuída', slug: 'geracao-distribuida' }, { id: 2, name: 'Usinas Solares de Grande Porte', slug: 'usinas-solares' }],
        logo_url: '/logos/solarnordeste.png',
        cover_image_url: '/covers/solarnordeste.jpg',
        rating: 4.7,
        review_count: 203,
        installed_capacity_mw: 800,
        location: 'Fortaleza',
        specialties: ['Residencial', 'Comercial', 'Usinas']
      },
      {
        id: 5,
        name: 'CleanTech Innovations',
        slug: 'cleantech-innovations',
        short_description: 'Tecnologias avançadas em eficiência energética',
        description: 'A CleanTech Innovations desenvolve tecnologias avançadas para maximizar a eficiência energética em sistemas solares.',
        country: 'Brasil',
        address: 'Curitiba, PR',
        phone: '(41) 55555-5555',
        foundation_year: 2019,
        members_count: 60,
        status: 'active',
        premium: false,
        tags: ['capacity:100MW', 'location:Curitiba', 'experience:4 anos'],
        social_links: {},
        categories: [{ id: 5, name: 'Eficiência Energética', slug: 'eficiencia' }, { id: 9, name: 'Inovação e Novas Tecnologias', slug: 'inovacao' }],
        logo_url: '/logos/cleantech.png',
        cover_image_url: '/covers/cleantech.jpg',
        rating: 4.5,
        review_count: 89,
        installed_capacity_mw: 100,
        location: 'Curitiba',
        specialties: ['Eficiência', 'IoT', 'Smart Grid']
      }
    ];

    // Filtrar por categoria se especificado
    let filteredProviders = mockProviders;
    if (params?.category_id) {
      filteredProviders = mockProviders.filter(provider => 
        provider.categories.some(cat => cat.id === params.category_id)
      );
    }
    if (params?.category_slug) {
      filteredProviders = mockProviders.filter(provider => 
        provider.categories.some(cat => cat.slug === params.category_slug)
      );
    }

    // Ordenar se especificado
    if (params?.sort_by) {
      switch (params.sort_by) {
        case 'rating':
          filteredProviders.sort((a, b) => b.rating - a.rating);
          break;
        case 'capacity':
          filteredProviders.sort((a, b) => b.installed_capacity_mw - a.installed_capacity_mw);
          break;
        case 'reviews':
          filteredProviders.sort((a, b) => b.review_count - a.review_count);
          break;
      }
    }

    // Aplicar limite se especificado
    const limit = params?.limit || filteredProviders.length;
    const page = params?.page || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProviders = filteredProviders.slice(startIndex, endIndex);

    return {
      providers: paginatedProviders,
      total: filteredProviders.length,
      page: page,
      per_page: limit,
      total_pages: Math.ceil(filteredProviders.length / limit)
    };
  }
}

export default new ApiService();