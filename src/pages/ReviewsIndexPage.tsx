import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import reviewService, { ProviderLite } from '@/services/reviewService';
import { getPlaceholderImage } from '@/utils/imageFallback';

const ReviewsIndexPage: React.FC = () => {
  const [companies, setCompanies] = useState<ProviderLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [minRatingFilter, setMinRatingFilter] = useState('all');
  const [verifiedFilter, setVerifiedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const companiesPerPage = 12;

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = {
        page: currentPage,
        per: companiesPerPage,
      };
      if (searchTerm) params.query = searchTerm;
      if (stateFilter !== 'all') params.state = stateFilter;
      if (minRatingFilter !== 'all') params.min_rating = parseInt(minRatingFilter);
      if (verifiedFilter !== 'all') params.verified = verifiedFilter === 'true';

      const response = await reviewService.fetchProvidersForReview(params);
      setCompanies(response.providers);
      setTotalPages(response.meta ? Math.ceil(response.meta.total / companiesPerPage) : 1);
    } catch (err) {
      console.error("Failed to fetch companies for review:", err);
      setError("Erro ao carregar empresas. Tente novamente.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, companiesPerPage, searchTerm, stateFilter, minRatingFilter, verifiedFilter]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleStateFilterChange = (value: string) => {
    setStateFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleMinRatingFilterChange = (value: string) => {
    setMinRatingFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleVerifiedFilterChange = (value: string) => {
    setVerifiedFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const stateOptions = [
    { value: 'all', label: 'Todos os Estados' },
    { value: 'AC', label: 'Acre' }, { value: 'AL', label: 'Alagoas' }, { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' }, { value: 'BA', label: 'Bahia' }, { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' }, { value: 'ES', label: 'Espírito Santo' }, { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' }, { value: 'MT', label: 'Mato Grosso' }, { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' }, { value: 'PA', label: 'Pará' }, { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' }, { value: 'PE', label: 'Pernambuco' }, { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'RN', label: 'Rio Grande do Norte' }, { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' }, { value: 'RR', label: 'Roraima' }, { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' }, { value: 'SE', label: 'Sergipe' }, { value: 'TO', label: 'Tocantins' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'Todas as Avaliações' },
    { value: '5', label: '5 Estrelas' },
    { value: '4', label: '4+ Estrelas' },
    { value: '3', label: '3+ Estrelas' },
    { value: '2', label: '2+ Estrelas' },
    { value: '1', label: '1+ Estrelas' },
  ];

  const verifiedOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'true', label: 'Verificadas' },
    { value: 'false', label: 'Não Verificadas' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Ajude outras pessoas: avalie uma empresa de energia solar
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Busque por nome da empresa, cidade ou estado"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            <Select value={stateFilter} onValueChange={handleStateFilterChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={minRatingFilter} onValueChange={handleMinRatingFilterChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Avaliação média" />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={verifiedFilter} onValueChange={handleVerifiedFilterChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Com verificadas" />
              </SelectTrigger>
              <SelectContent>
                {verifiedOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(companiesPerPage)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">{error}</div>
        ) : companies.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            Nenhuma empresa encontrada com os critérios de busca/filtro.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src={company.logo_url || getPlaceholderImage(80, 80)} 
                      alt={company.name} 
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  </div>
                  <CardTitle className="text-lg text-center mb-2">{company.name}</CardTitle>
                  <p className="text-sm text-gray-600 text-center mb-2">{company.city} - {company.state}</p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{company.avg_rating?.toFixed(1) || 'N/A'}</span>
                    <span className="text-xs text-gray-500">({company.reviews_count || 0})</span>
                  </div>
                  {company.verified && (
                    <div className="flex justify-center mb-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" /> Verificada
                      </Badge>
                    </div>
                  )}
                  <Link to={`/avaliar/${company.slug}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Avaliar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && typeof totalPages === 'number' && !isNaN(totalPages) && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </Button>
            {[...Array(totalPages)].map((_, index) => (
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
              disabled={currentPage === totalPages}
            >
              Próxima <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsIndexPage;
