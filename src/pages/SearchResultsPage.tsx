import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import CityBanner from '@/components/banners/CityBanner';
import HelpSection from '@/components/sections/HelpSection';
import { useSearch } from '@/hooks/useSearch';
import { Star, MapPin, Phone, Mail, Award, Clock, ArrowRight } from 'lucide-react';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const { results, isLoading, totalResults, searchCompanies, clearSearch } = useSearch();
  const [sortBy, setSortBy] = useState('relevance');
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    // Executar busca inicial baseada nos parâmetros da URL
    const initialQuery = searchParams.get('q') || '';
    const initialLocation = searchParams.get('location') || '';
    
    setCurrentLocation(initialLocation);
    
    if (initialQuery || initialLocation) {
      searchCompanies({
        query: initialQuery,
        location: initialLocation,
        radius: 50,
        priceRange: [0, 100000],
        rating: 0,
        ratings: [],
        certifications: [],
        services: [],
        experience: [],
        availability: '',
        deviceTarget: ''
      });
    }
  }, [searchParams]);

  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'rating', label: 'Melhor avaliação' },
    { value: 'price_low', label: 'Menor preço' },
    { value: 'price_high', label: 'Maior preço' },
    { value: 'distance', label: 'Distância' }
  ];

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Busca Avançada */}
        <AdvancedSearch 
          onSearch={(filters) => {
            searchCompanies(filters);
            setCurrentLocation(filters.location);
          }}
          onClear={clearSearch}
          isLoading={isLoading}
        />

        {/* Banner Customizável por Cidade */}
        <CityBanner 
          city={currentLocation}
          onBannerClick={(bannerId: string) => {
            console.log('Banner clicado:', bannerId);
            // Aqui você pode implementar ações específicas como:
            // - Redirecionar para página da empresa
            // - Aplicar filtros específicos
            // - Abrir modal de contato
          }}
          onBannerClose={(bannerId: string) => {
            console.log('Banner fechado:', bannerId);
            // Aqui você pode implementar tracking de fechamento
          }}
        />

        {/* Resultados */}
        {totalResults > 0 && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {totalResults} {totalResults === 1 ? 'empresa encontrada' : 'empresas encontradas'}
                </h2>
                <p className="text-gray-600">
                  Empresas de energia solar na sua região
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Ordenar por:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lista de Resultados */}
        {!isLoading && sortedResults.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedResults.map((company) => (
              <div key={company.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {company.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(company.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {company.rating} (127 avaliações)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{company.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>{company.certifications.length} certificações</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.services.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                  {company.services.length > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{company.services.length - 3} mais
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      R$ {company.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">a partir de</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                    <Link
                      to={`/company/${company.id}`}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Ver detalhes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado Vazio - Seção de Ajuda */}
        {!isLoading && totalResults === 0 && (
          <div>
            <div className="text-center py-8 mb-8">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhuma empresa encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                Tente ajustar os filtros ou expandir a área de busca
              </p>
              <button
                onClick={clearSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Limpar filtros
              </button>
            </div>
            
            <HelpSection 
              title="Não encontrou o que procura?"
              subtitle="Nossa equipe pode ajudar você a encontrar a empresa perfeita para seu projeto específico de energia solar."
              showContactForm={true}
              variant="default"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;