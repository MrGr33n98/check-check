import { useState, useEffect } from 'react';
import { Search, MapPin, Filter, X, Star } from 'lucide-react';

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

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const AdvancedSearch = ({ onSearch, onClear, isLoading = false }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    radius: 50,
    priceRange: [0, 200000],
    rating: 0,
    certifications: [],
    services: [],
    experience: '',
    availability: ''
  });

  const [showFilters, setShowFilters] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Mock data para sugestões
  const certificationOptions = [
    'INMETRO',
    'CREA',
    'ABNT NBR 16690',
    'NR-35',
    'NR-10',
    'ISO 9001'
  ];

  const serviceOptions = [
    'Instalação Residencial',
    'Instalação Comercial',
    'Instalação Industrial',
    'Manutenção',
    'Monitoramento',
    'Consultoria',
    'Financiamento'
  ];

  const experienceOptions = [
    'Menos de 1 ano',
    '1-3 anos',
    '3-5 anos',
    '5-10 anos',
    'Mais de 10 anos'
  ];

  const availabilityOptions = [
    'Imediato',
    'Até 1 semana',
    'Até 1 mês',
    'Até 3 meses'
  ];

  // Carregar histórico de busca do localStorage
  useEffect(() => {
    const loadSearchHistory = () => {
      try {
        const history = localStorage.getItem('searchHistory');
        if (history) {
          const parsedHistory = JSON.parse(history);
          if (Array.isArray(parsedHistory)) {
            setSearchHistory(parsedHistory);
          }
        }
      } catch (error) {
        console.error('Error loading search history:', error);
        setSearchHistory([]);
      }
    };
    
    loadSearchHistory();
  }, []);

  // Simular geolocalização e sugestões de localização
  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
    
    if (value.length > 2) {
      // Mock de sugestões de localização
      const mockSuggestions = [
        'São Paulo, SP',
        'Rio de Janeiro, RJ',
        'Belo Horizonte, MG',
        'Curitiba, PR',
        'Porto Alegre, RS',
        'Salvador, BA',
        'Brasília, DF',
        'Fortaleza, CE'
      ].filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(mockSuggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSearch = () => {
    // Salvar no histórico
    if (filters.query && !searchHistory.includes(filters.query)) {
      const newHistory = [filters.query, ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }

    onSearch(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      location: '',
      radius: 50,
      priceRange: [0, 200000],
      rating: 0,
      certifications: [],
      services: [],
      experience: '',
      availability: ''
    });
    onClear();
  };

  const handleArrayFilter = (field: 'certifications' | 'services', value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Em uma aplicação real, você faria reverse geocoding aqui
          setFilters(prev => ({ ...prev, location: 'Sua localização atual' }));
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  };

  const activeFiltersCount = [
    filters.location,
    filters.rating > 0,
    filters.certifications.length > 0,
    filters.services.length > 0,
    filters.experience,
    filters.availability,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 200000
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Busca Principal */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar empresas de energia solar..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          
          {/* Histórico de Busca */}
          {searchHistory.length > 0 && filters.query === '' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
              <div className="p-3 border-b border-gray-100">
                <span className="text-sm text-gray-500 font-medium">Buscas recentes</span>
              </div>
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => setFilters(prev => ({ ...prev, query: term }))}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  <Search className="inline w-4 h-4 mr-2 text-gray-400" />
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cidade, estado ou CEP..."
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <button
            onClick={getCurrentLocation}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
            title="Usar minha localização"
          >
            <MapPin className="w-5 h-5" />
          </button>

          {/* Sugestões de Localização */}
          {locationSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
              {locationSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, location: suggestion }));
                    setLocationSuggestions([]);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  <MapPin className="inline w-4 h-4 mr-2 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-lg font-medium transition-colors ${
              showFilters || activeFiltersCount > 0
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Filtros Avançados */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Filtros Avançados</h3>
            <button
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
            >
              <X className="w-4 h-4" />
              Limpar filtros
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Raio de Busca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raio de busca: {filters.radius}km
              </label>
              <input
                type="range"
                min="5"
                max="200"
                value={filters.radius}
                onChange={(e) => setFilters(prev => ({ ...prev, radius: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5km</span>
                <span>200km</span>
              </div>
            </div>

            {/* Faixa de Preço */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faixa de preço
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [Number(e.target.value), prev.priceRange[1]] 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="text-gray-500">até</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [prev.priceRange[0], Number(e.target.value)] 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Avaliação Mínima */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avaliação mínima
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFilters(prev => ({ ...prev, rating: star }))}
                    className={`p-1 ${star <= filters.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Experiência */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiência
              </label>
              <select
                value={filters.experience}
                onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Qualquer</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Disponibilidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilidade
              </label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Qualquer</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Certificações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Certificações
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {certificationOptions.map((cert) => (
                <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.certifications.includes(cert)}
                    onChange={(e) => handleArrayFilter('certifications', cert, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cert}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Serviços */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Serviços oferecidos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.services.includes(service)}
                    onChange={(e) => handleArrayFilter('services', service, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;