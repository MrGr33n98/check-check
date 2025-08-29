import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { api } from '@/middleware/authMiddleware';

interface SearchFilters {
  query: string;
  location: string;
  radius: number;
  priceRange: [number, number];
  rating: number;
  ratings: number[];
  certifications: string[];
  services: string[];
  experience: string[];
  availability: string;
  deviceTarget?: string;
}

interface Company {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  certifications: string[];
  services: string[];
  experience: string;
  availability?: string;
  short_description?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  review_count?: number;
  specialties?: string[];
}

interface SearchResponse {
  results: Company[];
  pagination: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  };
}

export const useSearch = () => {
  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const debouncedSearch = useCallback(
    debounce(async (filters: SearchFilters) => {
      setIsLoading(true);
      try {
        const params: Record<string, any> = {
          location: filters.location || undefined,
          query: filters.query || undefined,
          services: filters.services && filters.services.length > 0 ? filters.services.join(',') : undefined,
          rating: filters.rating && filters.rating > 0 ? filters.rating : undefined,
          page: 1,
          per_page: 20
        };

        const response = await api.get<SearchResponse>('/providers/search', { params });
        const data = response.data;
        setResults(data.results || []);
        setTotalResults(data.pagination?.total_count || (data.results ? data.results.length : 0));
      } catch (error) {
        console.error('Erro na busca:', error);
        setResults([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const searchCompanies = (filters: SearchFilters) => {
    if (!filters.location.trim()) {
      clearSearch();
      return;
    }
    setIsLoading(true);
    debouncedSearch(filters);
  };

  const clearSearch = () => {
    setResults([]);
    setTotalResults(0);
    setIsLoading(false);
  };

  return {
    results,
    isLoading,
    totalResults,
    searchCompanies,
    clearSearch
  };
};

// Função para gerar resultados mock baseados nos filtros
const generateMockResults = (filters: SearchFilters): Company[] => {
  const mockCompanies: Company[] = [
    {
      id: 1,
      name: 'Solar Paulista Energia',
      location: 'São Paulo, SP',
      rating: 4.8,
      price: 35000,
      certifications: ['INMETRO', 'ANEEL', 'ISO 9001'],
      services: ['Residencial', 'Comercial', 'Industrial'],
      experience: '15 anos',
      availability: 'Até 1 semana',
      short_description: 'Líder em energia solar no estado de São Paulo com mais de 15 anos de experiência.',
      phone: '+55 (11) 3456-7890',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP',
      review_count: 127
    },
    {
      id: 2,
      name: 'Rio Solar Energy',
      location: 'Rio de Janeiro, RJ',
      rating: 4.6,
      price: 28000,
      certifications: ['INMETRO', 'ANEEL', 'ISO 9001'],
      services: ['Residencial', 'Comercial', 'Condomínios'],
      experience: '12 anos',
      availability: 'Até 2 semanas',
      short_description: 'Empresa carioca pioneira em energia solar fotovoltaica.',
      phone: '+55 (21) 2345-6789',
      address: 'Av. Atlântica, 1702 - Copacabana, Rio de Janeiro - RJ',
      review_count: 89
    },
    {
      id: 3,
      name: 'Minas Solar Tech',
      location: 'Belo Horizonte, MG',
      rating: 4.4,
      price: 22000,
      certifications: ['INMETRO', 'ANEEL'],
      services: ['Residencial', 'Rural', 'Pequenas Empresas'],
      experience: '10 anos',
      availability: 'Até 1 semana',
      short_description: 'Empresa mineira especializada em soluções sustentáveis de energia solar.',
      phone: '+55 (31) 3234-5678',
      address: 'Av. Afonso Pena, 1377 - Centro, Belo Horizonte - MG',
      review_count: 56
    },
    {
      id: 4,
      name: 'Nordeste Solar',
      location: 'Salvador, BA',
      rating: 4.7,
      price: 42000,
      certifications: ['INMETRO', 'ANEEL', 'ISO 9001', 'ISO 14001'],
      services: ['Industrial', 'Comercial', 'Usinas Solares'],
      experience: '13 anos',
      availability: 'Até 3 semanas',
      short_description: 'Aproveitando o potencial solar único do Nordeste brasileiro.',
      phone: '+55 (71) 3123-4567',
      address: 'Av. Tancredo Neves, 1632 - Caminho das Árvores, Salvador - BA',
      review_count: 94
    },
    {
      id: 5,
      name: 'Amazônia Solar Verde',
      location: 'Manaus, AM',
      rating: 4.3,
      price: 18000,
      certifications: ['INMETRO', 'ANEEL', 'Certificação Ambiental'],
      services: ['Residencial', 'Comunidades Remotas', 'Projetos Sustentáveis'],
      experience: '8 anos',
      availability: 'Até 2 semanas',
      short_description: 'Energia solar sustentável para a Amazônia.',
      phone: '+55 (92) 3012-3456',
      address: 'Av. Eduardo Ribeiro, 620 - Centro, Manaus - AM',
      review_count: 42
    }
  ];

  return mockCompanies.filter(company => {
    // Aplicar filtros de busca
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesName = company.name.toLowerCase().includes(query);
      const matchesDescription = company.short_description?.toLowerCase().includes(query);
      if (!matchesName && !matchesDescription) return false;
    }
    
    if (filters.location) {
      const location = filters.location.toLowerCase();
      const matchesLocation = company.location.toLowerCase().includes(location) ||
                             company.address?.toLowerCase().includes(location);
      if (!matchesLocation) return false;
    }
    
    if (filters.rating > 0 && company.rating < filters.rating) {
      return false;
    }
    
    if (filters.services.length > 0) {
      const hasMatchingService = filters.services.some(service =>
        company.services.some(companyService =>
          companyService.toLowerCase().includes(service.toLowerCase())
        )
      );
      if (!hasMatchingService) return false;
    }
    
    return true;
  });
};