import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, SlidersHorizontal } from 'lucide-react';
import CompanyCard from './CompanyCard';

const CompanyList = ({ companies, searchTerm, onCompanySelect }) => {
  const [sortBy, setSortBy] = useState('name');
  const [filterLocation, setFilterLocation] = useState('all');
  const [minCapacity, setMinCapacity] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique locations for filter
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(companies.map(company => company.location))];
    return uniqueLocations.sort();
  }, [companies]);

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      // Search filter
      const matchesSearch = !searchTerm || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Location filter
      const matchesLocation = filterLocation === 'all' || company.location === filterLocation;

      // Capacity filter
      const matchesCapacity = !minCapacity || company.installed_capacity_mw >= parseFloat(minCapacity);

      return matchesSearch && matchesLocation && matchesCapacity;
    });

    // Sort companies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'capacity':
          return b.installed_capacity_mw - a.installed_capacity_mw;
        case 'reviews':
          return b.review_count - a.review_count;
        default:
          return 0;
      }
    });

    return filtered;
  }, [companies, searchTerm, sortBy, filterLocation, minCapacity]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Solar Energy Companies
            </h2>
            <p className="text-gray-600">
              {filteredAndSortedCompanies.length} companies found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Company Name</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="capacity">Highest Capacity</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Capacity (MW)
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSortBy('name');
                    setFilterLocation('all');
                    setMinCapacity('');
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Company Grid */}
        {filteredAndSortedCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCompanies.map(company => (
              <CompanyCard
                key={company.id}
                company={company}
                onViewDetails={onCompanySelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyList;

