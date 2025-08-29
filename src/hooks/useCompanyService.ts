import { useState } from 'react';
import { api } from '@/services/api';
import { Company, CompanyFormData } from '@/types/company';

export const useCompanyService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCompanies = async (): Promise<Company[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/companies');
      return response.data;
    } catch (err) {
      setError('Erro ao carregar empresas');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCompanyById = async (id: number): Promise<Company> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (err) {
      setError('Erro ao carregar empresa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (data: CompanyFormData): Promise<Company> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/companies', data);
      return response.data;
    } catch (err) {
      setError('Erro ao criar empresa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (id: number, data: CompanyFormData): Promise<Company> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/companies/${id}`, data);
      return response.data;
    } catch (err) {
      setError('Erro ao atualizar empresa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/companies/${id}`);
    } catch (err) {
      setError('Erro ao excluir empresa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};