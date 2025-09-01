import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import AdvancedSearch from '../components/search/AdvancedSearch';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Star, MapPin, Phone, Globe, Award, ArrowRight } from 'lucide-react';

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

// Interface para empresa da API
interface SolarCompany {
  id: number;
  name: string;
  title: string;
  short_description: string;
  country: string;
  address: string;
  phone: string;
  foundation_year: number;
  members_count: number;
  revenue: string;
  social_links: string[];
  tags: string[];
  status: string;
}

// Interface para empresa (formato do frontend)
interface Company {
  id: number;
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
  const [searchParams] = useSearchParams();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setCurrentFilters] = useState<SearchFilters | null>(null);
  const [initialLocation, setInitialLocation] = useState('');

  // Função para converter dados da API para o formato do frontend
  const convertApiToCompany = (apiCompany: SolarCompany): Company => {
    // Gerar rating aleatório entre 4.0 e 5.0 para demonstração
    const rating = Math.round((4.0 + Math.random() * 1.0) * 10) / 10;
    const reviewCount = Math.floor(Math.random() * 200) + 20;
    
    // Mapear tags para serviços (removendo duplicatas)
    const serviceSet = new Set<string>();
    apiCompany.tags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      if (lowerTag.includes('residencial')) serviceSet.add('instalacao-residencial');
      if (lowerTag.includes('comercial')) serviceSet.add('instalacao-comercial');
      if (lowerTag.includes('industrial')) serviceSet.add('instalacao-industrial');
      if (lowerTag.includes('manutenção')) serviceSet.add('manutencao');
      if (lowerTag.includes('monitoramento')) serviceSet.add('monitoramento');
    });
    
    const services = Array.from(serviceSet);
    if (services.length === 0) services.push('consultoria-tecnica');

    // Certificações baseadas no ano de fundação e tamanho da empresa
    const certifications = ['crea'];
    if (apiCompany.foundation_year <= 2015) certifications.push('inmetro');
    if (apiCompany.members_count > 100) certifications.push('aneel');
    if (apiCompany.members_count > 200) certifications.push('iso-9001');

    // Faixa de preço baseada no tamanho da empresa
    let priceRange: [number, number] = [15000, 50000];
    if (apiCompany.members_count > 100) priceRange = [25000, 80000];
    if (apiCompany.members_count > 200) priceRange = [35000, 150000];

    // Experiência baseada no ano de fundação
    const currentYear = new Date().getFullYear();
    const yearsInBusiness = currentYear - apiCompany.foundation_year;
    let experience = '2-5-anos';
    if (yearsInBusiness >= 10) experience = '10-anos';
    else if (yearsInBusiness >= 5) experience = '5-10-anos';

    return {
      id: apiCompany.id,
      name: apiCompany.name,
      location: apiCompany.address.split(',').slice(-2).join(',').trim() || apiCompany.country,
      rating,
      reviewCount,
      experience,
      services: services.length > 0 ? services : ['instalacao-residencial'],
      certifications,
      priceRange,
      phone: apiCompany.phone,
      website: apiCompany.social_links.find(link => 
        !link.includes('facebook') && !link.includes('instagram') && !link.includes('linkedin')
      ) || 'www.exemplo.com.br',
      description: apiCompany.short_description,
      image: '/api/placeholder/300/200'
    };
  };

  // Carregar empresas da API
  const loadCompanies = async (searchParams: any = {}) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/solar_companies', {
        params: searchParams
      });
      
      const companies = response.data.solar_companies.map(convertApiToCompany);
      setFilteredCompanies(companies);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
      // Em caso de erro, usar dados mockados como fallback
      setFilteredCompanies(mockCompanies);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar empresas ao montar o componente e verificar parâmetros da URL
  useEffect(() => {
    const locationParam = searchParams.get('location');
    const queryParam = searchParams.get('q');
    
    if (locationParam) {
      setInitialLocation(locationParam);
      // Fazer busca automática com a localização e query da URL
      loadCompanies({ 
        search: queryParam || '', 
        location: locationParam 
      });
    } else {
      loadCompanies();
    }
  }, [searchParams]);

  const handleSearch = useCallback(async (filters: SearchFilters) => {
    setCurrentFilters(filters);
    
    // Preparar parâmetros de busca para a API
    const searchParams: any = {};
    
    if (filters.query) {
      searchParams.search = filters.query;
    }
    
    if (filters.location && !filters.location.includes('Florianópolis')) {
      // Extrair cidade/estado da localização
      const location = filters.location.replace('📍 ', '');
      searchParams.location = location;
    }
    
    // Carregar empresas com filtros da API
    await loadCompanies(searchParams);
  }, []);

  const handleClearFilters = useCallback(() => {
    setCurrentFilters(null);
    loadCompanies(); // Recarregar todas as empresas
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
      'instalacao-industrial': 'Instalação Industrial',
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar com filtros */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <AdvancedSearch
                onSearch={handleSearch}
                onClear={handleClearFilters}
                isLoading={isLoading}
                resultsCount={filteredCompanies.length}
                initialLocation={initialLocation}
              />
            </div>
          </div>

          {/* Lista de resultados */}
          <div className="lg:col-span-6">
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
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span>{company.phone}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe className="w-4 h-4" />
                                <span>{company.website}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                className="flex-1 bg-orange-500 hover:bg-orange-600"
                                onClick={() => {
                                  if (company.phone) {
                                    window.open(`tel:${company.phone}`, '_self');
                                  }
                                }}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Contatar
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1" asChild>
                                <Link to={`/company/${company.id}`}>
                                  Ver Perfil
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                              </Button>
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

          {/* Banner lateral direito */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gradient-to-br from-blue-600 to-purple-700">
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                    <div className="relative p-6 h-full flex flex-col justify-center text-white">
                      <h3 className="text-xl font-bold mb-4">
                        Sua Empresa Aqui!
                      </h3>
                      <p className="text-sm mb-6 opacity-90">
                        Alcance milhares de clientes interessados em energia solar. 
                        Cadastre sua empresa e apareça nos primeiros resultados.
                      </p>
                      <div className="space-y-3">
                        <button className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                          Cadastrar Empresa
                        </button>
                        <button className="w-full border border-white text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                          Saiba Mais
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Banner adicional menor */}
              <Card className="mt-6 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-r from-green-500 to-teal-600">
                    <div className="relative p-4 h-full flex flex-col justify-center text-white text-center">
                      <h4 className="text-lg font-bold mb-2">
                        💡 Dica do Especialista
                      </h4>
                      <p className="text-sm opacity-90">
                        Compare pelo menos 3 orçamentos antes de decidir. 
                        Economia pode chegar a 95% na conta de luz!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;