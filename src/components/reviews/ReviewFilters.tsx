import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { ReviewFilters } from '../../types/reviews';

interface ReviewFiltersProps {
  onFiltersChange?: (filters: ReviewFilters) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<ReviewFilters>({
    sortBy: 'newest'
  });

  const handleFilterChange = (key: keyof ReviewFilters, value: string | number | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: ReviewFilters = { rating: '', sortBy: 'newest', dateRange: 'all' };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Avaliação mínima</label>
          <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)} placeholder="Todas as avaliações">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as avaliações</SelectItem>
              <SelectItem value="5">5 estrelas</SelectItem>
              <SelectItem value="4">4+ estrelas</SelectItem>
              <SelectItem value="3">3+ estrelas</SelectItem>
              <SelectItem value="2">2+ estrelas</SelectItem>
              <SelectItem value="1">1+ estrelas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Ordenar por</label>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)} placeholder="Mais recentes">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigas</SelectItem>
              <SelectItem value="highest">Maior avaliação</SelectItem>
              <SelectItem value="lowest">Menor avaliação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Período</label>
          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)} placeholder="Todos os períodos">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={clearFilters} className="w-full">
          Limpar filtros
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewFilters;