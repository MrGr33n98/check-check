import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useFilterParams<T>(defaults: T): [T, (newFilters: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<T>({ ...defaults });

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: any = { ...defaults };
    for (const [key, value] of searchParams.entries()) {
      initialFilters[key] = value;
    }
    setFilters(initialFilters);
  }, []);

  // Update URL when filters change
  const updateFilters = (newFilters: T) => {
    setFilters(newFilters);
    
    // Update URL params
    const newParams = new URLSearchParams();
    Object.entries(newFilters as any).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newParams.set(key, String(value));
      }
    });
    setSearchParams(newParams);
  };

  return [filters, updateFilters];
}