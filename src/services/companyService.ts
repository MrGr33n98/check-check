import { api } from '@/middleware/authMiddleware';

export interface Company {
  id: number;
  name: string;
  title?: string;
  short_description?: string;
  country?: string;
  address?: string;
  phone?: string;
  foundation_year?: number;
  members_count?: number;
  revenue?: string;
  social_links?: string[];
  tags?: string[];
  status: string;
  created_at?: string;
  updated_at?: string;
  // Campos calculados/derivados para compatibilidade
  location?: string;
  description?: string;
  rating?: number;
  review_count?: number;
  specialties?: string[];
  certifications?: string[];
  service_areas?: string[];
  foundedYear?: number;
  employeeCount?: string;
  installed_capacity_mw?: number;
}

export interface Review {
  id: number;
  solar_company_id: number;
  user_id: number;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  user_name?: string;
}

export interface Content {
  id: number;
  solar_company_id: number;
  user_id: number;
  title: string;
  content_type: string;
  body: string;
  category_id: number;
  created_at: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  badgeable_type: string;
  badgeable_id: number;
}

export interface CompaniesResponse {
  companies: Company[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

class CompanyService {
  async getCompanies(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    country?: string;
    tag?: string;
    status?: string;
  }): Promise<CompaniesResponse> {
    try {
      const response = await api.get('/solar_companies', { params });
      const data = response.data;
      
      // Mapear os dados da API Rails para o formato esperado
      const companies = data.solar_companies?.map(this.mapCompanyData) || [];
      
      return {
        companies,
        total: data.pagination?.total_count || companies.length,
        page: data.pagination?.current_page || 1,
        per_page: data.pagination?.per_page || 10,
        total_pages: Math.ceil((data.pagination?.total_count || companies.length) / (data.pagination?.per_page || 10))
      };
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  }

  async getCompanyById(id: number): Promise<Company | null> {
    try {
      const response = await api.get(`/solar_companies/${id}`);
      return this.mapCompanyData(response.data);
    } catch (error) {
      console.error(`Error fetching company ${id}:`, error);
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  private mapCompanyData(rawData: any): Company {
    return {
      id: rawData.id,
      name: rawData.name,
      title: rawData.title,
      short_description: rawData.short_description,
      country: rawData.country,
      address: rawData.address,
      phone: rawData.phone,
      foundation_year: rawData.foundation_year,
      members_count: rawData.members_count,
      revenue: rawData.revenue,
      social_links: rawData.social_links || [],
      tags: rawData.tags || [],
      status: rawData.status,
      created_at: rawData.created_at,
      updated_at: rawData.updated_at,
      // Campos mapeados para compatibilidade
      location: rawData.address || rawData.country,
      description: rawData.short_description,
      rating: 4.5, // Valor padrão até implementar sistema de avaliações
      review_count: 0, // Valor padrão até implementar sistema de avaliações
      specialties: rawData.tags || [],
      certifications: [],
      service_areas: rawData.country ? [rawData.country] : [],
      foundedYear: rawData.foundation_year,
      employeeCount: rawData.members_count ? `${rawData.members_count}` : undefined,
      installed_capacity_mw: 0 // Valor padrão até ter esse campo
    };
  }

  async getCompanyReviews(companyId: number, params?: {
    page?: number;
    per_page?: number;
    status?: string;
  }): Promise<ReviewsResponse> {
    try {
      const response = await api.get(`/solar_companies/${companyId}/reviews`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for company ${companyId}:`, error);
      throw error;
    }
  }

  async getCompanyContent(companyId: number, params?: {
    page?: number;
    per_page?: number;
    content_type?: string;
  }): Promise<{ content: Content[] }> {
    try {
      const response = await api.get(`/solar_companies/${companyId}/content`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching content for company ${companyId}:`, error);
      throw error;
    }
  }

  async getCompanyBadges(companyId: number): Promise<{ badges: Badge[] }> {
    try {
      const response = await api.get(`/solar_companies/${companyId}/badges`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching badges for company ${companyId}:`, error);
      throw error;
    }
  }

  async createCompany(companyData: Partial<Company>): Promise<Company> {
    try {
      const response = await api.post('/solar_companies', companyData);
      return response.data;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  }

  async updateCompany(id: number, companyData: Partial<Company>): Promise<Company> {
    try {
      const response = await api.put(`/solar_companies/${id}`, companyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating company ${id}:`, error);
      throw error;
    }
  }

  async deleteCompany(id: number): Promise<void> {
    try {
      await api.delete(`/solar_companies/${id}`);
    } catch (error) {
      console.error(`Error deleting company ${id}:`, error);
      throw error;
    }
  }
}

export default new CompanyService();