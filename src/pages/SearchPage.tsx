import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdvancedSearch from '../components/search/AdvancedSearch';
import PromoBannerSidebar from '../components/banners/PromoBannerSidebar';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Star, MapPin, Phone, Globe, Award, ArrowRight, Zap } from 'lucide-react';

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

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setCurrentFilters] = useState<SearchFilters | null>(null);
  const [initialLocation, setInitialLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(8); // Max 8 companies per page
  const [totalCompanies, setTotalCompanies] = useState(0);

  const convertApiToCompany = (apiCompany: any): Company => {
    const rating = apiCompany.rating || Math.round((4.0 + Math.random() * 1.0) * 10) / 10;
    const reviewCount = apiCompany.review_count || Math.floor(Math.random() * 200) + 20;
    const serviceSet = new Set<string>();
    if (apiCompany.tags) {
      apiCompany.tags.forEach((tag: string) => {
        const lowerTag = tag.toLowerCase();
        if (lowerTag.includes('residencial')) serviceSet.add('instalacao-residencial');
        if (lowerTag.includes('comercial')) serviceSet.add('instalacao-comercial');
        if (lowerTag.includes('industrial')) serviceSet.add('instalacao-industrial');
        if (lowerTag.includes('manutenção')) serviceSet.add('manutencao');
        if (lowerTag.includes('monitoramento')) serviceSet.add('monitoramento');
      });
    }
    const services = Array.from(serviceSet);
    if (services.length === 0) services.push('consultoria-tecnica');
    const certifications = ['crea'];
    if (apiCompany.foundation_year <= 2015) certifications.push('inmetro');
    if (apiCompany.members_count > 100) certifications.push('aneel');
    if (apiCompany.members_count > 200) certifications.push('iso-9001');
    let priceRange: [number, number] = [15000, 50000];
    if (apiCompany.members_count > 100) priceRange = [25000, 80000];
    if (apiCompany.members_count > 200) priceRange = [35000, 150000];
    const currentYear = new Date().getFullYear();
    const yearsInBusiness = currentYear - apiCompany.foundation_year;
    let experience = '2-5-anos';
    if (yearsInBusiness >= 10) experience = '10-anos';
    else if (yearsInBusiness >= 5) experience = '5-10-anos';
    const logoUrl = apiCompany.logo_url ? apiCompany.logo_url : '/api/placeholder/300/200';

    return {
      id: apiCompany.id,
      name: apiCompany.name,
      location: apiCompany.address ? 
        apiCompany.address.split(',').slice(-2).join(',').trim() : 
        apiCompany.country || 'Brasil',
      rating,
      reviewCount,
      experience,
      services: services.length > 0 ? services : ['instalacao-residencial'],
      certifications,
      priceRange,
      phone: apiCompany.phone || '(11) 0000-0000',
      website: apiCompany.social_links?.find((link: string) => 
        !link.includes('facebook') && !link.includes('instagram') && !link.includes('linkedin')
      ) || 'www.exemplo.com.br',
      description: apiCompany.short_description || apiCompany.title || 'Empresa de energia solar',
      image: logoUrl,
      bannerImage: apiCompany.banner_image_url ? apiCompany.banner_image_url : undefined
    };
  };

  const loadCompanies = async (searchParams: any = {}, page: number = 1, perPage: number = companiesPerPage, retries = 3, delay = 1000) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/providers/search', {
        params: { ...searchParams, page, per_page: perPage }
      });
      // Assuming the API returns a direct array of companies for now
      const companies = Array.isArray(response.data.results)
        ? response.data.results.map(convertApiToCompany)
        : [];
      setFilteredCompanies(companies);
      setTotalCompanies(response.data.pagination.total_count || 0);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
      if (retries > 0) {
        setTimeout(() => loadCompanies(searchParams, page, perPage, retries - 1, delay * 2), delay + Math.random() * 1000);
      } else {
        setFilteredCompanies([]);
        setTotalCompanies(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const locationParam = searchParams.get('location');
    const queryParam = searchParams.get('q');
    
    if (locationParam) {
      setInitialLocation(locationParam);
      loadCompanies({ 
        search: queryParam || '', 
        location: locationParam 
      }, currentPage, companiesPerPage);
    } else {
      loadCompanies({}, currentPage, companiesPerPage);
    }
  }, [searchParams, currentPage, companiesPerPage]); // Add currentPage and companiesPerPage to dependencies

  const handleSearch = useCallback(async (filters: SearchFilters) => {
    setCurrentFilters(filters);
    setCurrentPage(1); // Reset to first page on new search
    const searchParams: any = {};
    if (filters.query) {
      searchParams.query = filters.query; // Changed from 'search' to 'query' to match backend
    }
    if (filters.location && !filters.location.includes('Florianópolis')) {
      const location = filters.location.replace('📍 ', '');
      searchParams.location = location;
    }
    if (filters.services && filters.services.length > 0) {
      searchParams.services = filters.services.join(',');
    }
    if (filters.ratings && filters.ratings.length > 0) {
      // Send the highest selected rating to the backend
      searchParams.rating = Math.max(...filters.ratings);
    }
    // Note: Backend needs to be updated to handle 'experience' and 'certifications'
    // For now, we'll send them, but they won't have an effect until backend is updated.
    if (filters.experience && filters.experience.length > 0) {
      searchParams.experience = filters.experience.join(',');
    }
    if (filters.certifications && filters.certifications.length > 0) {
      searchParams.certifications = filters.certifications.join(',');
    }

    await loadCompanies(searchParams, 1, companiesPerPage);
  }, [companiesPerPage]);

  const handleClearFilters = useCallback(() => {
    setCurrentFilters(null);
    setCurrentPage(1); // Reset to first page on clear filters
    loadCompanies({}, 1, companiesPerPage);
  }, [companiesPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar com filtros */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <AdvancedSearch
                onSearch={handleSearch}
                onClear={handleClearFilters}
                isLoading={isLoading}
                resultsCount={filteredCompanies.length}
                initialLocation={initialLocation}
              />
            </div>
          </aside>

          {/* Lista de resultados */}
          <main className="lg:col-span-6 space-y-6">
            {isLoading ? (
              [1, 2, 3].map((i) => (
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
              ))
            ) : filteredCompanies.length === 0 ? (
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
                    <div className="relative h-32 mb-4">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: company.bannerImage 
                            ? `url(${company.bannerImage})` 
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40" />
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
                        </div>
                      </div>
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
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <MapPin className="w-3 h-3" />
                              <span>{company.location}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 text-sm">
                          {company.description}
                        </p>
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
          </main>

          {/* Banner lateral direito */}
          <aside className="lg:col-span-3">
            <div className="space-y-6">
              <PromoBannerSidebar />
            </div>
          </aside>
        </div>

        {/* Pagination Controls */}
        {totalCompanies > 0 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            {[...Array(Math.ceil(totalCompanies / companiesPerPage))].map((_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalCompanies / companiesPerPage)}
            >
              Próxima
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
