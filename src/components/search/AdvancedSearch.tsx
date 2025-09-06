import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/middleware/authMiddleware';
import { Company } from '@/types/company';
import CompanyCard from '@/components/company/CompanyCard';
import { Loader2, Search, ListFilter, MapPin, Star, Zap } from 'lucide-react';

interface Category {
  id: number;
  name: string;
}

interface SearchFilters {
  query: string;
  location: string;
  category: string;
  minRating: number;
  services: string[];
  sortBy: 'relevance' | 'rating' | 'name';
}

const AdvancedSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || 'all',
    minRating: Number(searchParams.get('minRating')) || 0,
    services: searchParams.getAll('services'),
    sortBy: (searchParams.get('sortBy') as SearchFilters['sortBy']) || 'relevance',
  });

  const fetchInitialData = useCallback(async () => {
    try {
      const [catResponse, servicesResponse] = await Promise.all([
        api.get('/categories'),
        api.get('/services/all'), // Assuming an endpoint to get all possible services
      ]);
      setCategories(catResponse.data);
      setAvailableServices(servicesResponse.data);
    } catch (err) {
      console.error("Failed to fetch filter data", err);
    }
  }, []);

  const performSearch = useCallback(async (currentFilters: SearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        q: currentFilters.query,
        location: currentFilters.location,
        category: currentFilters.category,
        minRating: String(currentFilters.minRating),
        sortBy: currentFilters.sortBy,
      });
      currentFilters.services.forEach(service => params.append('services[]', service));
      
      const response = await api.get('/companies/search', { params });
      setResults(response.data.results || []);
      
      // Update URL without re-rendering
      navigate(`?${params.toString()}`, { replace: true });

    } catch (err) {
      setError('Failed to fetch search results.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    performSearch(filters);
  }, [performSearch]); // Only runs on initial load due to useCallback dependencies

  const handleFilterChange = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    const newServices = checked
      ? [...filters.services, service]
      : filters.services.filter(s => s !== service);
    handleFilterChange('services', newServices);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(filters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ListFilter className="w-5 h-5" /> Filters</CardTitle>
            </CardHeader>
            <CardContent as="form" onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={filters.category} onValueChange={(v) => handleFilterChange('category', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2"><Star className="w-4 h-4" /> Minimum Rating</label>
                <div className="flex items-center gap-2">
                  <Slider
                    min={0} max={5} step={0.5}
                    value={[filters.minRating]}
                    onValueChange={([v]) => handleFilterChange('minRating', v)}
                  />
                  <span className="text-sm font-bold w-8 text-center">{filters.minRating.toFixed(1)}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2"><Zap className="w-4 h-4" /> Services</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {availableServices.map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={filters.services.includes(service)}
                        onCheckedChange={(checked) => handleServiceChange(service, !!checked)}
                      />
                      <label htmlFor={`service-${service}`} className="text-sm">{service}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6 flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Company name or keyword..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Location (e.g., city)"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          {/* Sort and Results */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">{results.length} companies found</p>
            <Select value={filters.sortBy} onValueChange={(v) => {
              const newFilters = { ...filters, sortBy: v as SearchFilters['sortBy'] };
              setFilters(newFilters);
              performSearch(newFilters);
            }}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Sort by Relevance</SelectItem>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="mt-2 text-gray-500">Searching...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map(company => <CompanyCard key={company.id} company={company} />)}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No results found</h3>
              <p className="text-gray-500">Try adjusting your search filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdvancedSearch;
