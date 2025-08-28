import { useState, useEffect } from 'react';

/**
 * Hook customizado para encapsular a lógica de chamada de API.
 * @param apiCall A função do serviço de API a ser chamada.
 * @param params Os parâmetros a serem passados para a função de API.
 */
export function useApi<T, P extends any[]>(
  apiCall: (...params: P) => Promise<T | null>,
  params: P
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Usamos JSON.stringify para memoizar os parâmetros. 
  // Isso garante que o useEffect só será executado quando os valores dos parâmetros mudarem.
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    // Alguns parâmetros podem ser undefined inicialmente (ex: slug da URL).
    // Verificamos se todos os parâmetros necessários estão presentes.
    const hasMissingParams = params.some(p => p === undefined || p === null);
    if (hasMissingParams) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall(...params);
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey, apiCall]); // Adicionamos apiCall às dependências

  return { data, loading, error };
}
