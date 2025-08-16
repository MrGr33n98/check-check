// Utility functions for filtering and sorting company data

/**
 * Filter companies based on search term
 * @param companies Array of companies
 * @param searchTerm Search term to filter by
 * @returns Filtered array of companies
 */
export const filterCompaniesBySearch = (companies: any[], searchTerm: string): any[] => {
  if (!searchTerm) return companies;
  
  const term = searchTerm.toLowerCase();
  return companies.filter(company => 
    company.name.toLowerCase().includes(term) ||
    company.location.toLowerCase().includes(term) ||
    company.description.toLowerCase().includes(term) ||
    (company.specialties && company.specialties.some((s: string) => s.toLowerCase().includes(term)))
  );
};

/**
 * Filter companies by location
 * @param companies Array of companies
 * @param location Location to filter by
 * @returns Filtered array of companies
 */
export const filterCompaniesByLocation = (companies: any[], location: string): any[] => {
  if (location === 'all') return companies;
  return companies.filter(company => company.location === location);
};

/**
 * Filter companies by minimum capacity
 * @param companies Array of companies
 * @param minCapacity Minimum capacity to filter by
 * @returns Filtered array of companies
 */
export const filterCompaniesByCapacity = (companies: any[], minCapacity: string): any[] => {
  if (!minCapacity) return companies;
  const min = parseFloat(minCapacity);
  return companies.filter(company => company.installed_capacity_mw >= min);
};

/**
 * Sort companies by specified criteria
 * @param companies Array of companies
 * @param sortBy Sorting criteria
 * @returns Sorted array of companies
 */
export const sortCompanies = (companies: any[], sortBy: string): any[] => {
  const sorted = [...companies];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'capacity':
      return sorted.sort((a, b) => b.installed_capacity_mw - a.installed_capacity_mw);
    case 'reviews':
      return sorted.sort((a, b) => b.review_count - a.review_count);
    default:
      return sorted;
  }
};

/**
 * Get unique locations from companies
 * @param companies Array of companies
 * @returns Array of unique locations
 */
export const getUniqueLocations = (companies: any[]): string[] => {
  const locations = companies.map(company => company.location);
  return [...new Set(locations)].sort();
};

/**
 * Filter and sort companies based on multiple criteria
 * @param companies Array of companies
 * @param searchTerm Search term to filter by
 * @param location Location to filter by
 * @param minCapacity Minimum capacity to filter by
 * @param sortBy Sorting criteria
 * @returns Filtered and sorted array of companies
 */
export const filterAndSortCompanies = (
  companies: any[],
  searchTerm: string,
  location: string,
  minCapacity: string,
  sortBy: string
): any[] => {
  let filtered = filterCompaniesBySearch(companies, searchTerm);
  filtered = filterCompaniesByLocation(filtered, location);
  filtered = filterCompaniesByCapacity(filtered, minCapacity);
  return sortCompanies(filtered, sortBy);
};