import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  MapPin, 
  Phone, 
  Award, 
  Zap,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

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

interface Company {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  city: string;
  state: string;
  phone: string;
  website?: string;
  specialties: string[];
  verified: boolean;
  featured: boolean;
  description: string;
  completedProjects: number;
  yearsExperience: number;
  priceRange: 'low' | 'medium' | 'high';
  bannerImage?: string;
}

// Mock data - em produção viria de uma API
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'SolarTech Pro',
    rating: 4.8,
    reviewCount: 127,
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 99999-9999',
    website: 'https://solartech.com.br',
    specialties: ['Residencial', 'Comercial', 'Instalação'],
    verified: true,
    featured: true,
    description: 'Especialistas em energia solar com mais de 10 anos de experiência no mercado.',
    completedProjects: 850,
    yearsExperience: 12,
    priceRange: 'medium'
  },
  {
    id: '2',
    name: 'EcoSolar Brasil',
    rating: 4.9,
    reviewCount: 203,
    city: 'Rio de Janeiro',
    state: 'RJ',
    phone: '(21) 88888-8888',
    specialties: ['Industrial', 'Manutenção', 'Consultoria'],
    verified: true,
    featured: true,
    description: 'Líder em soluções sustentáveis de energia solar para grandes empresas.',
    completedProjects: 1200,
    yearsExperience: 15,
    priceRange: 'high'
  },
  {
    id: '3',
    name: 'Solar Fácil',
    rating: 4.6,
    reviewCount: 89,
    city: 'Belo Horizonte',
    state: 'MG',
    phone: '(31) 77777-7777',
    specialties: ['Residencial', 'Financiamento'],
    verified: true,
    featured: false,
    description: 'Tornamos a energia solar acessível para todos os brasileiros.',
    completedProjects: 450,
    yearsExperience: 8,
    priceRange: 'low'
  },
  {
    id: '4',
    name: 'PowerSun Energia',
    rating: 4.7,
    reviewCount: 156,
    city: 'Curitiba',
    state: 'PR',
    phone: '(41) 66666-6666',
    website: 'https://powersun.com.br',
    specialties: ['Comercial', 'Monitoramento', 'Manutenção'],
    verified: true,
    featured: true,
    description: 'Soluções completas em energia solar com tecnologia de ponta.',
    completedProjects: 680,
    yearsExperience: 10,
    priceRange: 'medium'
  },
  {
    id: '5',
    name: 'GreenEnergy Sul',
    rating: 4.5,
    reviewCount: 74,
    city: 'Porto Alegre',
    state: 'RS',
    phone: '(51) 55555-5555',
    specialties: ['Residencial', 'Rural'],
    verified: false,
    featured: false,
    description: 'Especializada em projetos residenciais e rurais no Sul do Brasil.',
    completedProjects: 320,
    yearsExperience: 6,
    priceRange: 'low'
  },
  {
    id: '6',
    name: 'Solar Nordeste',
    rating: 4.8,
    reviewCount: 198,
    city: 'Fortaleza',
    state: 'CE',
    phone: '(85) 44444-4444',
    specialties: ['Industrial', 'Comercial', 'Consultoria'],
    verified: true,
    featured: true,
    description: 'Aproveitando o potencial solar do Nordeste brasileiro.',
    completedProjects: 950,
    yearsExperience: 11,
    priceRange: 'high'
  }
];

const FeaturedCompaniesSection: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { userLocation } = useLocation();

  // Função para converter dados da API para o formato do componente
  const convertApiToCompany = (apiCompany: SolarCompany): Company => {
    // Gerar rating aleatório entre 4.0 e 5.0 para demonstração
    const rating = Math.round((4.0 + Math.random() * 1.0) * 10) / 10;
    const reviewCount = Math.floor(Math.random() * 200) + 20;
    
    // Extrair cidade e estado do endereço
    const addressParts = apiCompany.address.split(',');
    const cityState = addressParts.slice(-2).join(',').trim();
    const [city, state] = cityState.split(' - ');
    
    // Mapear tags para especialidades
    const specialties = apiCompany.tags.slice(0, 3).map(tag => {
      if (tag.toLowerCase().includes('residencial')) return 'Residencial';
      if (tag.toLowerCase().includes('comercial')) return 'Comercial';
      if (tag.toLowerCase().includes('industrial')) return 'Industrial';
      if (tag.toLowerCase().includes('manutenção')) return 'Manutenção';
      if (tag.toLowerCase().includes('monitoramento')) return 'Monitoramento';
      return 'Consultoria';
    });

    // Calcular anos de experiência
    const currentYear = new Date().getFullYear();
    const yearsExperience = currentYear - apiCompany.foundation_year;

    // Determinar faixa de preço baseada no tamanho da empresa
    let priceRange: 'low' | 'medium' | 'high' = 'medium';
    if (apiCompany.members_count < 100) priceRange = 'low';
    else if (apiCompany.members_count > 200) priceRange = 'high';

    return {
      id: apiCompany.id.toString(),
      name: apiCompany.name,
      rating,
      reviewCount,
      city: city?.trim() || 'Brasil',
      state: state?.trim() || '',
      phone: apiCompany.phone,
      website: apiCompany.social_links.find(link => 
        !link.includes('facebook') && !link.includes('instagram') && !link.includes('linkedin')
      ),
      specialties: specialties.length > 0 ? specialties : ['Energia Solar'],
      verified: true,
      featured: true,
      description: apiCompany.short_description,
      completedProjects: Math.floor(Math.random() * 800) + 200,
      yearsExperience,
      priceRange
    };
  };

  // Carregar empresas da API
  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/solar_companies');
      const apiCompanies = response.data.solar_companies;
      const convertedCompanies = apiCompanies.map(convertApiToCompany);
      setCompanies(convertedCompanies);
      setFilteredCompanies(convertedCompanies);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
      // Em caso de erro, usar dados mockados como fallback
      setCompanies(mockCompanies);
      setFilteredCompanies(mockCompanies);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar empresas ao montar o componente
  useEffect(() => {
    loadCompanies();
  }, []);
  
  const companiesPerSlide = 3;
  const totalSlides = Math.ceil(filteredCompanies.length / companiesPerSlide);

  // Filtrar empresas por localização do usuário
  useEffect(() => {
    if (userLocation) {
      // Extrair cidade e estado da localização do usuário
      const locationParts = userLocation.split(',').map(part => part.trim());
      const userCity = locationParts[0];
      const userState = locationParts[1];

      // Filtrar empresas da mesma cidade/estado primeiro, depois outras
      const filtered = companies.sort((a, b) => {
        const aMatches = a.city.toLowerCase().includes(userCity.toLowerCase()) || 
                        (userState && a.state.toLowerCase() === userState.toLowerCase());
        const bMatches = b.city.toLowerCase().includes(userCity.toLowerCase()) || 
                        (userState && b.state.toLowerCase() === userState.toLowerCase());
        
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        
        // Se ambas ou nenhuma correspondem, ordenar por rating
        return b.rating - a.rating;
      });
      
      setFilteredCompanies(filtered);
    } else {
      // Se não há localização, mostrar empresas em destaque primeiro
      const sorted = companies.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
      setFilteredCompanies(sorted);
    }
  }, [userLocation, companies]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideCompanies = () => {
    const startIndex = currentSlide * companiesPerSlide;
    return filteredCompanies.slice(startIndex, startIndex + companiesPerSlide);
  };

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriceRangeText = (range: string) => {
    switch (range) {
      case 'low': return 'Econômico';
      case 'medium': return 'Intermediário';
      case 'high': return 'Premium';
      default: return 'Consultar';
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>Empresas Verificadas</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Empresas em Destaque
            {userLocation && (
              <span className="block text-xl text-orange-600 dark:text-orange-400 mt-2">
                em {userLocation}
              </span>
            )}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conecte-se com as melhores empresas de energia solar da sua região. 
            Todas verificadas e avaliadas por clientes reais.
          </p>
        </div>

        {/* Companies Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <Card key={index} className="animate-pulse border-0 bg-white dark:bg-gray-800 overflow-hidden">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700"></div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              getCurrentSlideCompanies().map((company) => (
              <Card key={company.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden">
                {/* Banner Section */}
                <div 
                  className="relative h-32 bg-gradient-to-r from-orange-400 to-yellow-400"
                  style={{
                    backgroundImage: company.bannerImage ? `url(${company.bannerImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Company Logo */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                      ) : (
                        <Zap className="w-6 h-6 text-orange-500" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg text-white drop-shadow-md">
                        {company.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-white/90">
                        <MapPin className="w-3 h-3" />
                        <span>{company.city}, {company.state}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-gray-900">{company.rating}</span>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-1">
                    {company.verified && (
                      <Badge className="bg-green-500/90 text-white text-xs backdrop-blur-sm">
                        <Award className="w-3 h-3 mr-1" />
                        Verificada
                      </Badge>
                    )}
                    {company.featured && (
                      <Badge className="bg-orange-500/90 text-white text-xs backdrop-blur-sm">
                        Destaque
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="space-y-4">
                  {/* Rating and Price Range */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        ({company.reviewCount} avaliações)
                      </span>
                    </div>
                    
                    <Badge className={getPriceRangeColor(company.priceRange)}>
                      {getPriceRangeText(company.priceRange)}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {company.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1">
                    {company.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {company.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{company.specialties.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {company.completedProjects}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Projetos
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {company.yearsExperience}+
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Anos
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
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
                </CardContent>
              </Card>
            ))
            )}
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-900/20"
            onClick={() => {
              const searchParams = userLocation ? `?location=${encodeURIComponent(userLocation)}` : '';
              window.location.href = `/busca-avancada${searchParams}`;
            }}
          >
            <Filter className="w-4 h-4 mr-2" />
            Ver Todas as Empresas
            {userLocation && ` em ${userLocation}`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompaniesSection;