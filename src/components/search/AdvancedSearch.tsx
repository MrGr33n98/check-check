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
    <div className="space-y-4">
      {/* Header com contador de resultados */}
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtros</span>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        {resultsCount > 0 && (
          <span className="text-sm text-gray-500">
            {resultsCount} {resultsCount === 1 ? 'empresa' : 'empresas'}
          </span>
        )}
      </div>

      {/* Campos de busca */}
      <Card className="border border-gray-100 shadow-sm">
        <CardContent className="p-0 divide-y divide-gray-100">
          {/* Campo de busca por texto */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar empresas..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Seções de filtro */}
          <FilterSection
            title="Localização"
            icon={<MapPin className="w-4 h-4" />}
            sectionKey="location"
          >
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Digite uma cidade..."
                  value={filters.location}
                  onChange={(e) => handleLocationSearch(e.target.value)}
                  className="pl-9 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </FilterSection>

          <FilterSection
            title="Serviços"
            icon={<Briefcase className="w-4 h-4" />}
            sectionKey="services"
          >
            <div className="space-y-2">
              {SERVICE_OPTIONS.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={filters.services.includes(service.id)}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      services: toggleArrayFilter(prev.services, service.id)
                    }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{service.icon} {service.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Avaliações"
            icon={<Star className="w-4 h-4" />}
            sectionKey="ratings"
          >
            <div className="space-y-2">
              {RATING_OPTIONS.map((rating) => (
                <label
                  key={rating.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(rating.id)}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      ratings: toggleNumberArrayFilter(prev.ratings, rating.id)
                    }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{rating.icon}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Experiência"
            icon={<Clock className="w-4 h-4" />}
            sectionKey="experience"
          >
            <div className="space-y-2">
              {EXPERIENCE_OPTIONS.map((exp) => (
                <label
                  key={exp.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={filters.experience.includes(exp.id)}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      experience: toggleArrayFilter(prev.experience, exp.id)
                    }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{exp.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Certificações"
            icon={<Award className="w-4 h-4" />}
            sectionKey="certifications"
          >
            <div className="space-y-2">
              {CERTIFICATION_OPTIONS.map((cert) => (
                <label
                  key={cert.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={filters.certifications.includes(cert.id)}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      certifications: toggleArrayFilter(prev.certifications, cert.id)
                    }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{cert.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </CardContent>
      </Card>

      {/* Botão de limpar filtros */}
      {getActiveFiltersCount() > 0 && (
        <Button
          variant="outline"
          className="w-full text-gray-600 border-gray-200"
          onClick={clearAllFilters}
          disabled={isLoading}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Limpar filtros
        </Button>
      )}
    </div>
);
};

export default AdvancedSearch;