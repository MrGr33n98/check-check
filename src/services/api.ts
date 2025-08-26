const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  featured?: boolean;
  image_url?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

class ApiService {
  async getCategories(): Promise<Category[]> {
    try {
      // Tentando buscar as categorias da API
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories from API, using mock data:', error);
      // Se falhar, retorna os dados mockados
      return this.getMockCategories();
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      // Tentando buscar a categoria específica da API
      const response = await fetch(`${API_BASE_URL}/categories/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch category: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching category ${slug} from API:`, error);
      // Se falhar, tenta encontrar nos dados mockados
      const mockCategories = this.getMockCategories();
      return mockCategories.find(category => category.slug === slug) || null;
    }
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
}

export default new ApiService();