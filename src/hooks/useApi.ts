import { useQuery } from '@tanstack/react-query';

/**
 * Hook customizado para encapsular a lógica de chamada de API.
 * @param apiCall A função do serviço de API a ser chamada.
 * @param params Os parâmetros a serem passados para a função de API.
 */
export function useApi<T, P extends any[]>(
  apiCall: (...params: P) => Promise<T | null>,
  params: P
) {
  const enabled = params.every(p => p !== undefined && p !== null);

  const { data, isLoading, error } = useQuery<T | null, Error>({
    queryKey: [apiCall.name, ...params],
    queryFn: () => apiCall(...params),
    enabled,
  });

  return {
    data: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}
