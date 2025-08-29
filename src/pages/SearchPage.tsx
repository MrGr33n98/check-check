import React, { useState, useCallback } from 'react';
import AdvancedSearch from '../components/search/AdvancedSearch';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, MapPin, Phone, Globe, Award } from 'lucide-react';

// Interface para os filtros de busca
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

// Interface para empresa
interface Company {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: string;
  services: string[];
  certifications: string[];
  priceRange: [number, number];
  phone: string;
  website: string;
  description: string;
  image: string;
  bannerImage?: string;
}

// Dados mockados de empresas
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Solar Tech Florianópolis',
    location: 'Florianópolis, SC',
    rating: 4.8,
    reviewCount: 127,
    experience: '5-10-anos',
    services: ['instalacao-residencial', 'instalacao-comercial', 'manutencao'],
    certifications: ['crea', 'inmetro', 'aneel'],
    priceRange: [25000, 80000],
    phone: '(48) 3333-4444',
    website: 'www.solartechfloripa.com.br',
    description: 'Especializada em sistemas fotovoltaicos residenciais e comerciais com mais de 8 anos de experiência.',
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    name: 'Energia Limpa Sul',
    location: 'São José, SC',
    rating: 4.6,
    reviewCount: 89,
    experience: '2-5-anos',
    services: ['instalacao-residencial', 'consultoria-tecnica', 'monitoramento'],
    certifications: ['crea', 'iso-9001'],
    priceRange: [18000, 65000],
    phone: '(48) 2222-3333',
    website: 'www.energialimpasul.com.br',
    description: 'Soluções completas em energia solar com foco na sustentabilidade e economia.',
    image: '/api/placeholder/300/200'
  },
  {
    id: '3',
    name: 'Fotovoltaica Premium',
    location: 'Palhoça, SC',
    rating: 4.9,
    reviewCount: 203,
    experience: '10-anos',
    services: ['instalacao-comercial', 'energia-off-grid', 'manutencao', 'monitoramento'],
    certifications: ['crea', 'inmetro', 'aneel', 'iso-9001', 'iso-14001'],
    priceRange: [35000, 150000],
    phone: '(48) 4444-5555',
    website: 'www.fotovoltaicapremium.com.br',
    description: 'Líder em sistemas fotovoltaicos de grande porte com certificações internacionais.',
    image: '/api/placeholder/300/200'
  }
];

const SearchPage: React.FC = () => {
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies);
  const [isLoading, setIsLoading] = useState(false);
  const [, setCurrentFilters] = useState<SearchFilters | null>(null);

  const handleSearch = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true);
    setCurrentFilters(filters);
    
    // Simular delay de busca
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockCompanies];
    
    // Filtrar por query
    if (filters.query) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        company.description.toLowerCase().includes(filters.query.toLowerCase())
      );
    }
    
    // Filtrar por localização
    if (filters.location && !filters.location.includes('Florianópolis')) {
      filtered = filtered.filter(company => 
        company.location.toLowerCase().includes(filters.location.toLowerCase().replace('📍 ', ''))
      );
    }
    
    // Filtrar por avaliação
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      filtered = filtered.filter(company => company.rating >= minRating);
    }
    
    // Filtrar por experiência
    if (filters.experience.length > 0) {
      filtered = filtered.filter(company => 
        filters.experience.includes(company.experience)
      );
    }
    
    // Filtrar por serviços
    if (filters.services.length > 0) {
      filtered = filtered.filter(company => 
        filters.services.some(service => company.services.includes(service))
      );
    }
    
    // Filtrar por certificações
    if (filters.certifications.length > 0) {
      filtered = filtered.filter(company => 
        filters.certifications.some(cert => company.certifications.includes(cert))
      );
    }
    
    // Filtrar por faixa de preço
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100000) {
      filtered = filtered.filter(company => 
        company.priceRange[0] >= filters.priceRange[0] && 
        company.priceRange[1] <= filters.priceRange[1]
      );
    }
    
    setFilteredCompanies(filtered);
    setIsLoading(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilteredCompanies(mockCompanies);
    setCurrentFilters(null);
  }, []);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getServiceLabel = (serviceId: string) => {
    const serviceMap: { [key: string]: string } = {
      'instalacao-residencial': 'Instalação Residencial',
      'instalacao-comercial': 'Instalação Comercial',
      'manutencao': 'Manutenção',
      'monitoramento': 'Monitoramento',
      'energia-off-grid': 'Energia Off-Grid',
      'consultoria-tecnica': 'Consultoria Técnica'
    };
    return serviceMap[serviceId] || serviceId;
  };

  const getCertificationLabel = (certId: string) => {
    const certMap: { [key: string]: string } = {
      'crea': 'CREA',
      'inmetro': 'INMETRO',
      'aneel': 'ANEEL',
      'iso-9001': 'ISO 9001',
      'iso-14001': 'ISO 14001',
      'abgd': 'ABGD'
    };
    return certMap[certId] || certId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Encontre as Melhores Empresas de Energia Solar
          </h1>
          <p className="text-gray-600">
            Compare preços, avaliações e serviços das principais empresas de energia solar do Brasil
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar com filtros */}
          <div className="w-[280px] flex-shrink-0">
            <div className="sticky top-8">
              <AdvancedSearch
                onSearch={handleSearch}
                onClear={handleClearFilters}
                isLoading={isLoading}
                resultsCount={filteredCompanies.length}
              />
            </div>
          </div>

          {/* Lista de resultados */}
          <div className="flex-1">
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCompanies.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="text-gray-400 mb-4">
                        <Globe className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Nenhuma empresa encontrada
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Tente ajustar os filtros para encontrar mais resultados
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredCompanies.map((company) => (
                    <Card key={company.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <CardContent className="p-0">
                        {/* Banner de fundo com logo sobreposto */}
                        <div className="relative h-32 mb-4">
                          {/* Banner de fundo */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage: company.bannerImage 
                                ? `url(${company.bannerImage})` 
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                          />
                          {/* Overlay escurecido para melhor legibilidade */}
                          <div className="absolute inset-0 bg-black bg-opacity-40" />
                          
                          {/* Logo da empresa sobreposto */}
                          <div className="absolute top-4 left-4 flex items-center gap-3">
                            <div className="w-16 h-16 rounded-lg bg-white p-2 shadow-lg">
                              <img
                                src={company.image}
                                alt={company.name}
                                className="w-full h-full rounded object-cover"
                              />
                            </div>
                            <div className="text-white">
                              <h3 className="text-lg font-semibold drop-shadow-md">
                                {company.name}
                              </h3>
                              <div className="flex items-center gap-1 text-sm drop-shadow-md">
                                <MapPin className="w-3 h-3" />
                                <span>{company.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Rating no canto superior direito */}
                          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-3 py-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-sm">{company.rating}</span>
                              <span className="text-gray-500 text-xs">({company.reviewCount})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-6 pb-6">
                          <div className="flex gap-6">

                          {/* Informações principais */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="text-sm text-gray-600 mb-2">
                                  {formatPrice(company.priceRange[0])} - {formatPrice(company.priceRange[1])}
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4 text-sm">
                              {company.description}
                            </p>

                            {/* Serviços */}
                            <div className="mb-3">
                              <div className="flex flex-wrap gap-2">
                                {company.services.slice(0, 3).map((service) => (
                                  <Badge key={service} variant="secondary" className="text-xs">
                                    {getServiceLabel(service)}
                                  </Badge>
                                ))}
                                {company.services.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{company.services.length - 3} mais
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Certificações */}
                            <div className="mb-4">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-600" />
                                <div className="flex flex-wrap gap-1">
                                  {company.certifications.map((cert) => (
                                    <Badge key={cert} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                      {getCertificationLabel(cert)}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Contato */}
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span>{company.phone}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe className="w-4 h-4" />
                                <span>{company.website}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;