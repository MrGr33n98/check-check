import { useState } from 'react';

interface SearchFilters {
  query: string;
  location: string;
  radius: number;
  priceRange: [number, number];
  rating: number;
  certifications: string[];
  services: string[];
  experience: string;
  availability: string;
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
  availability: string;
}

export const useSearch = () => {
  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const searchCompanies = async (filters: SearchFilters) => {
    setIsLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock de resultados filtrados
      const mockResults = generateMockResults(filters);
      setResults(mockResults);
      setTotalResults(mockResults.length);
    } catch (error) {
      console.error('Erro na busca:', error);
      setResults([]);
      setTotalResults(0);
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

// Função para gerar resultados mock baseados nos filtros
const generateMockResults = (filters: SearchFilters): Company[] => {
  // Mock data seria substituído por chamada real à API
  const mockCompanies: Company[] = [
    {
      id: 1,
      name: 'Solar Tech Pro',
      location: 'São Paulo, SP',
      rating: 4.8,
      price: 45000,
      certifications: ['INMETRO', 'CREA'],
      services: ['Instalação Residencial', 'Manutenção'],
      experience: '5-10 anos',
      availability: 'Até 1 semana'
    }
    // Mais empresas mock...
  ];

  return mockCompanies.filter(company => {
    // Aplicar filtros
    if (filters.query && !company.name.toLowerCase().includes(filters.query.toLowerCase())) {
      return false;
    }
    if (filters.rating > 0 && company.rating < filters.rating) {
      return false;
    }
    // Mais lógica de filtros...
    return true;
  });
};