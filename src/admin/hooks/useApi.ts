import { useState, useEffect } from 'react';
import api from '@/services/api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(endpoint: string, params?: Record<string, any>): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await api.get(endpoint, { params });
        setState({ data: response.data, loading: false, error: null });
      } catch (error: any) {
        setState({
          data: null,
          loading: false,
          error: error.response?.data?.message || error.message || 'Erro desconhecido',
        });
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return state;
}