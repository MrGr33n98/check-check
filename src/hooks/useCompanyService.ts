import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/middleware/authMiddleware';
import { Company, CompanyFormData } from '@/types/company';

export const useCompanyService = () => {
  const queryClient = useQueryClient();

  const getCompanies = () =>
    useQuery<Company[], Error>({
      queryKey: ['companies'],
      queryFn: async () => {
        const response = await api.get('/companies');
        return response.data;
      },
    });

  const getCompanyById = (id: number) =>
    useQuery<Company, Error>({
      queryKey: ['company', id],
      queryFn: async () => {
        const response = await api.get(`/companies/${id}`);
        return response.data;
      },
      enabled: !!id,
    });

  const createCompany = useMutation<Company, Error, CompanyFormData>({
    mutationFn: async (data: CompanyFormData) => {
      const response = await api.post('/companies', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });

  const updateCompany = useMutation<Company, Error, { id: number; data: CompanyFormData }>({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/companies/${id}`, data);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', variables.id] });
    },
  });

  const deleteCompany = useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await api.delete(`/companies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });

  return {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};
