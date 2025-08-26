import { Star, Filter, X } from 'lucide-react';
import { ReviewFilters as ReviewFiltersType } from '@/types/reviews';

interface ReviewFiltersProps {
  filters: ReviewFiltersType;
  onFiltersChange: (filters: ReviewFiltersType) => void;
  totalReviews: number;
}

const ReviewFilters = ({ filters, onFiltersChange, totalReviews }: ReviewFiltersProps) => {
  const sortOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'oldest', label: 'Mais antigas' },
    { value: 'highest', label: 'Maior avaliação' },
    { value: 'lowest', label: 'Menor avaliação' },
    { value: 'helpful', label: 'Mais úteis' }
  ];

  const projectTypes = [
    { value: 'residential', label: 'Residencial' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'industrial', label: 'Industrial' }
  ];

  const handleRatingFilter = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating
    });
  };

  const handleProjectTypeFilter = (type: string) => {
    onFiltersChange({
      ...filters,
      projectType: filters.projectType === type ? undefined : type
    });
  };

  const handleVerifiedFilter = () => {
    onFiltersChange({
      ...filters,
      verified: filters.verified === true ? undefined : true
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      sortBy: 'newest'
    });
  };

  const activeFiltersCount = [
    filters.rating,
    filters.projectType,
    filters.verified
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Título e Contador */}
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {totalReviews} {totalReviews === 1 ? 'Avaliação' : 'Avaliações'}
          </h3>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
              Limpar filtros ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Ordenação */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as any })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-6 space-y-4">
        {/* Filtro por Estrelas */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Filtrar por avaliação</h4>
          <div className="flex flex-wrap gap-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingFilter(rating)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  filters.rating === rating
                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
              >
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                {rating}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por Tipo de Projeto */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Tipo de projeto</h4>
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleProjectTypeFilter(type.value)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors border-2 ${
                  filters.projectType === type.value
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por Verificação */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Outros filtros</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleVerifiedFilter}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors border-2 ${
                filters.verified === true
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent'
              }`}
            >
              <Filter className="w-4 h-4" />
              Apenas verificadas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;