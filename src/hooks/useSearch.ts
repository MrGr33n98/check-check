import { useState } from 'react';

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

// Base URL da API Rails - ajuste conforme necessário
const API_BASE_URL = 'http://localhost:3000/api/v1';

export const useSearch = () => {
  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const searchCompanies = async (filters: SearchFilters) => {
    setIsLoading(true);
    
    try {
      // Construir parâmetros da URL
      const params = new URLSearchParams();
      
      if (filters.query) params.append('query', filters.query);
      if (filters.location) params.append('location', filters.location);
      if (filters.rating > 0) params.append('rating', filters.rating.toString());
      if (filters.services.length > 0) params.append('services', filters.services.join(','));
      
      // Adicionar parâmetros de ordenação
      params.append('sort_by', 'rating'); // Padrão por rating
      params.append('per_page', '20');
      
      const response = await fetch(`${API_BASE_URL}/providers/search?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      
      // Mapear dados da API para o formato esperado pelo frontend
      const mappedResults = data.results.map(provider => ({
        id: provider.id,
        name: provider.name,
        location: provider.address || provider.location || 'Localização não informada',
        rating: provider.rating || 0,
        price: provider.price || 0,
        certifications: provider.certifications || [],
        services: provider.services || [],
        experience: provider.experience || '0 anos',
        availability: provider.availability || 'Consultar disponibilidade',
        short_description: provider.short_description,
        phone: provider.phone,
        address: provider.address,
        logo_url: provider.logo_url,
        review_count: provider.review_count || 0,
        specialties: provider.specialties || []
      }));

      setResults(mappedResults);
      setTotalResults(data.pagination.total_count);
    } catch (error) {
      console.error('Erro na busca:', error);
      
      // Fallback para dados mock em caso de erro
      const mockResults = generateMockResults(filters);
      setResults(mockResults);
      setTotalResults(mockResults.length);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setResults([]);
    setTotalResults(0);
  };

  return {
    results,
    isLoading,
    totalResults,
    searchCompanies,
    clearSearch
  };
};

// Função para gerar resultados mock baseados nos filtros (fallback)
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