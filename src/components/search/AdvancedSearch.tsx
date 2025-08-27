import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Award, 
  Briefcase, 
  Filter,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';

// Interfaces
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

interface AdvancedSearchProps {
  onSearch?: (filters: SearchFilters) => void;
  onClear?: () => void;
  isLoading?: boolean;
  resultsCount?: number;
}

// Dados de configuração
const SERVICE_OPTIONS = [
  { id: 'instalacao-residencial', label: 'Instalação Residencial', icon: '🏠' },
  { id: 'instalacao-comercial', label: 'Instalação Comercial', icon: '🏢' },
  { id: 'manutencao', label: 'Manutenção', icon: '🔧' },
  { id: 'monitoramento', label: 'Monitoramento', icon: '📊' },
  { id: 'energia-off-grid', label: 'Energia Off-Grid', icon: '🔋' },
  { id: 'consultoria-tecnica', label: 'Consultoria Técnica', icon: '💡' }
];

const EXPERIENCE_OPTIONS = [
  { id: '0-2-anos', label: '0-2 anos' },
  { id: '2-5-anos', label: '2-5 anos' },
  { id: '5-10-anos', label: '5-10 anos' },
  { id: '10-anos', label: '10+ anos' }
];

const RATING_OPTIONS = [
  { id: 5, label: '5 estrelas', icon: '⭐⭐⭐⭐⭐' },
  { id: 4, label: '4+ estrelas', icon: '⭐⭐⭐⭐' },
  { id: 3, label: '3+ estrelas', icon: '⭐⭐⭐' },
  { id: 2, label: '2+ estrelas', icon: '⭐⭐' }
];

const CERTIFICATION_OPTIONS = [
  { id: 'crea', label: 'CREA', description: 'Conselho Regional de Engenharia' },
  { id: 'inmetro', label: 'INMETRO', description: 'Instituto Nacional de Metrologia' },
  { id: 'aneel', label: 'ANEEL', description: 'Agência Nacional de Energia Elétrica' },
  { id: 'iso-9001', label: 'ISO 9001', description: 'Sistema de Gestão da Qualidade' },
  { id: 'iso-14001', label: 'ISO 14001', description: 'Sistema de Gestão Ambiental' },
  { id: 'abgd', label: 'ABGD', description: 'Associação Brasileira de Geração Distribuída' }
];

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ 
  onSearch, 
  onClear, 
  isLoading = false,
  resultsCount = 0
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
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

  const [expandedSections, setExpandedSections] = useState({
    services: true,
    price: true,
    ratings: true,
    experience: true,
    certifications: false,
    location: true
  });

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  // Simulação de sugestões de localização (integração futura com IBGE)
  const LOCATION_SUGGESTIONS = [
    '📍 São Paulo, SP',
    '📍 Rio de Janeiro, RJ',
    '📍 Belo Horizonte, MG',
    '📍 Porto Alegre, RS',
    '📍 Curitiba, PR',
    '📍 Salvador, BA',
    '📍 Fortaleza, CE',
    '📍 Brasília, DF',
    '📍 Recife, PE',
    '📍 Goiânia, GO'
  ];

  // Detectar localização do usuário (simulado)
  useEffect(() => {
    // Simulação de detecção por IP
    const userLocation = '📍 Florianópolis, SC';
    if (!filters.location) {
      setFilters(prev => ({ ...prev, location: userLocation }));
    }
  }, []);

  // Busca automática quando filtros mudam
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onSearch) {
        onSearch(filters);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, onSearch]);

  const handleLocationSearch = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
    
    if (value.length > 2) {
      const filtered = LOCATION_SUGGESTIONS.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  }, []);

  const toggleArrayFilter = useCallback((array: string[], value: string) => {
    return array.includes(value) 
      ? array.filter(item => item !== value)
      : [...array, value];
  }, []);

  const toggleNumberArrayFilter = useCallback((array: number[], value: number) => {
    return array.includes(value) 
      ? array.filter(item => item !== value)
      : [...array, value];
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      query: '',
      location: '',
      radius: 50,
      priceRange: [15000, 120000],
      rating: 0,
      ratings: [],
      certifications: [],
      services: [],
      experience: [],
      availability: '',
      deviceTarget: ''
    });
    onClear?.();
  }, [onClear]);

  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.query) count++;
    if (filters.location && !filters.location.includes('Florianópolis')) count++;
    if (filters.ratings.length > 0) count++;
    if (filters.experience.length > 0) count++;
    if (filters.services.length > 0) count++;
    if (filters.certifications.length > 0) count++;
    if (filters.priceRange[0] !== 15000 || filters.priceRange[1] !== 120000) count++;
    return count;
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }> = ({ title, icon, sectionKey, children }) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-600">{icon}</div>
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {expandedSections[sectionKey] ? 
          <ChevronUp className="w-4 h-4 text-gray-500" /> : 
          <ChevronDown className="w-4 h-4 text-gray-500" />
        }
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header com contador de resultados */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Filtros Avançados</h2>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {getActiveFiltersCount()} filtros ativos
            </Badge>
          )}
        </div>
        
        {resultsCount > 0 && (
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">{resultsCount}</span> empresas encontradas
          </div>
        )}
      </div>

      {/* Busca principal */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar empresas de energia solar..."
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="pl-10 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filtros principais */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-0">
          {/* Localização */}
          <FilterSection 
            title="Localização" 
            icon={<MapPin className="w-4 h-4" />} 
            sectionKey="location"
          >
            <div className="relative">
              <Input
                placeholder="Digite sua cidade ou estado..."
                value={filters.location}
                onChange={(e) => handleLocationSearch(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, location: suggestion }));
                        setShowLocationSuggestions(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FilterSection>

          {/* Tipos de Serviço */}
          <FilterSection 
            title="Tipos de Serviço" 
            icon={<Briefcase className="w-4 h-4" />} 
            sectionKey="services"
          >
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((service) => (
                <Badge
                  key={service.id}
                  variant={filters.services.includes(service.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    filters.services.includes(service.id) 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    services: toggleArrayFilter(prev.services, service.id)
                  }))}
                >
                  <span className="mr-1">{service.icon}</span>
                  {service.label}
                </Badge>
              ))}
            </div>
          </FilterSection>

          {/* Faixa de Preço */}
          <FilterSection 
            title="Faixa de Preço" 
            icon={<span className="text-sm">💰</span>} 
            sectionKey="price"
          >
            <div className="space-y-4">
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: value as [number, number] 
                  }))}
                  min={5000}
                  max={200000}
                  step={5000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </FilterSection>

          {/* Avaliações */}
          <FilterSection 
            title="Avaliação Mínima" 
            icon={<Star className="w-4 h-4" />} 
            sectionKey="ratings"
          >
            <div className="space-y-2">
              {RATING_OPTIONS.map((rating) => (
                <label key={rating.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(rating.id)}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      ratings: toggleNumberArrayFilter(prev.ratings, rating.id)
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{rating.icon}</span>
                  <span className="text-sm text-gray-700">{rating.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Experiência */}
          <FilterSection 
            title="Experiência da Empresa" 
            icon={<Clock className="w-4 h-4" />} 
            sectionKey="experience"
          >
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_OPTIONS.map((exp) => (
                <Badge
                  key={exp.id}
                  variant={filters.experience.includes(exp.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    filters.experience.includes(exp.id) 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    experience: toggleArrayFilter(prev.experience, exp.id)
                  }))}
                >
                  ⏳ {exp.label}
                </Badge>
              ))}
            </div>
          </FilterSection>

          {/* Certificações */}
          <FilterSection 
            title="Certificações" 
            icon={<Award className="w-4 h-4" />} 
            sectionKey="certifications"
          >
            <div className="space-y-2">
              {CERTIFICATION_OPTIONS.map((cert) => (
                <label key={cert.id} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.certifications.includes(cert.id)}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      certifications: toggleArrayFilter(prev.certifications, cert.id)
                    }))}
                    className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{cert.label}</div>
                    <div className="text-xs text-gray-500">{cert.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>
        </CardContent>
      </Card>

      {/* Botão Limpar Filtros */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="flex items-center gap-2 border-gray-300 hover:border-red-400 hover:text-red-600 hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar Filtros
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Buscando empresas...</span>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;