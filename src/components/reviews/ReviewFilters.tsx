import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Star, X } from 'lucide-react';

export interface FilterState {
  sortBy: 'recent' | 'helpful' | 'rating_high' | 'rating_low';
  rating: number; // 0 for all
  keyword: string;
}

interface ReviewFiltersProps {
  initialFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ initialFilters, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const keywordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSortChange = (value: FilterState['sortBy']) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (value: string) => {
    const rating = parseInt(value, 10);
    const newFilters = { ...filters, rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setFilters(prev => ({ ...prev, keyword }));

    if (keywordTimeoutRef.current) {
      clearTimeout(keywordTimeoutRef.current);
    }

    keywordTimeoutRef.current = setTimeout(() => {
      onFilterChange({ ...filters, keyword });
    }, 300); // Debounce keyword search
  };
  
  const clearKeyword = () => {
    const newFilters = { ...filters, keyword: '' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  useEffect(() => {
    return () => {
      if (keywordTimeoutRef.current) {
        clearTimeout(keywordTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Keyword Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search reviews..."
            value={filters.keyword}
            onChange={handleKeywordChange}
            className="pl-10"
          />
          {filters.keyword && (
            <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0" onClick={clearKeyword}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Sort By */}
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
            <SelectItem value="rating_high">Highest Rating</SelectItem>
            <SelectItem value="rating_low">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter by Rating */}
        <Select value={String(filters.rating)} onValueChange={handleRatingChange}>
          <SelectTrigger>
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars & up</SelectItem>
            <SelectItem value="3">3 Stars & up</SelectItem>
            <SelectItem value="2">2 Stars & up</SelectItem>
            <SelectItem value="1">1 Star & up</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ReviewFilters;
