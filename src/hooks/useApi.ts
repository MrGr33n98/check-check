import { useQuery } from '@tanstack/react-query';

/**
 * Hook customizado para encapsular a lógica de chamada de API.
 * @param apiCall A função do serviço de API a ser chamada.
 * @param params Os parâmetros a serem passados para a função de API.
 */
export function useApi<T, P extends unknown[]>(
  apiCall: (...params: P) => Promise<T>,
  params?: P
) {
  const actualParams = (params ?? []) as P;
  const enabled = actualParams.every(p => p !== undefined && p !== null);
  const paramsKey = JSON.stringify(actualParams);

  const { data, isLoading, error } = useQuery<T, Error>({
    queryKey: [apiCall.name || 'apiCall', paramsKey],
    queryFn: () => apiCall(...actualParams),
    enabled,
  });

  return {
    data: (data ?? null) as T | null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}
