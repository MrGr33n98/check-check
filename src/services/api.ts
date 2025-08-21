import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authApi = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => 
    api.post('/auth/logout'),
  
  register: (userData: { email: string; password: string; name: string; role: string }) => 
    api.post('/auth/register', userData),
  
  resetPassword: (email: string) => 
    api.post('/auth/password/reset', { email }),
};

// Category endpoints
export const categoriesApi = {
  getAll: (params?: { page?: number; per_page?: number; sort?: string; order?: string }) => 
    api.get('/categories', { params }),
  
  getById: (id: number) => 
    api.get(`/categories/${id}`),
  
  create: (categoryData: {
    name: string;
    description: string;
    long_description?: string;
    featured?: boolean;
    features?: string[];
  }) => 
    api.post('/categories', categoryData),
  
  update: (id: number, categoryData: {
    name?: string;
    description?: string;
    long_description?: string;
    featured?: boolean;
    features?: string[];
  }) => 
    api.put(`/categories/${id}`, categoryData),
  
  delete: (id: number) => 
    api.delete(`/categories/${id}`),
};

// Solutions/Companies endpoints
export const solutionsApi = {
  getAll: (params?: { 
    category_id?: number; 
    featured?: boolean; 
    page?: number; 
    per_page?: number; 
    sort?: string; 
    order?: string; 
    search?: string 
  }) => 
    api.get('/solutions', { params }),
  
  getById: (id: number) => 
    api.get(`/solutions/${id}`),
  
  create: (solutionData: {
    name: string;
    company: string;
    description: string;
    long_description?: string;
    featured?: boolean;
    tags?: string[];
    website?: string;
    category_ids?: number[];
  }) => 
    api.post('/solutions', solutionData),
  
  update: (id: number, solutionData: {
    name?: string;
    company?: string;
    description?: string;
    long_description?: string;
    featured?: boolean;
    tags?: string[];
    website?: string;
    category_ids?: number[];
  }) => 
    api.put(`/solutions/${id}`, solutionData),
  
  delete: (id: number) => 
    api.delete(`/solutions/${id}`),
};

// User management endpoints
export const usersApi = {
  getAll: (params?: { role?: string; active?: boolean; page?: number; per_page?: number }) => 
    api.get('/users', { params }),
  
  getById: (id: number) => 
    api.get(`/users/${id}`),
  
  update: (id: number, userData: { name?: string; email?: string }) => 
    api.put(`/users/${id}`, userData),
  
  delete: (id: number) => 
    api.delete(`/users/${id}`),
  
  activate: (id: number) => 
    api.put(`/users/${id}/activate`),
  
  deactivate: (id: number) => 
    api.put(`/users/${id}/deactivate`),
};

// Reviews endpoints
export const reviewsApi = {
  getAll: (params?: { solution_id?: number; user_id?: number; rating?: number; page?: number; per_page?: number }) => 
    api.get('/reviews', { params }),
  
  create: (reviewData: { solution_id: number; rating: number; title: string; comment: string }) => 
    api.post('/reviews', reviewData),
  
  update: (id: number, reviewData: { rating?: number; title?: string; comment?: string }) => 
    api.put(`/reviews/${id}`, reviewData),
  
  delete: (id: number) => 
    api.delete(`/reviews/${id}`),
};

// Statistics endpoints
export const statisticsApi = {
  getCategories: () => api.get('/statistics/categories'),
  getSolutions: () => api.get('/statistics/solutions'),
  getUsers: () => api.get('/statistics/users'),
};

// Search endpoint
export const searchApi = {
  search: (query: string, type: 'categories' | 'solutions' | 'all' = 'all') => 
    api.get('/search', { params: { q: query, type } }),
};

export default api;