import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: `${API_BASE_URL}`,
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

// Leads endpoints
export const leadsApi = {
  getAll: (params?: { 
    status?: string; 
    source?: string; 
    date_from?: string; 
    date_to?: string; 
    search?: string;
    page?: number; 
    per_page?: number; 
  }) => 
    api.get('/leads', { params }),
  
  getById: (id: number) => 
    api.get(`/leads/${id}`),
  
  create: (leadData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    source: string;
    status: string;
    score?: number;
    notes?: string;
  }) => 
    api.post('/leads', leadData),
  
  update: (id: number, leadData: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    source?: string;
    status?: string;
    score?: number;
    notes?: string;
  }) => 
    api.put(`/leads/${id}`, leadData),
  
  delete: (id: number) => 
    api.delete(`/leads/${id}`),
};

// Members endpoints
export const membersApi = {
  getAll: (params?: { 
    status?: string; 
    plan?: string; 
    date_from?: string; 
    date_to?: string; 
    search?: string;
    page?: number; 
    per_page?: number; 
  }) => 
    api.get('/members', { params }),
  
  getById: (id: number) => 
    api.get(`/members/${id}`),
  
  create: (memberData: {
    name: string;
    email: string;
    plan: string;
    status: string;
    subscription_start: string;
    subscription_end: string;
    payment_status: string;
  }) => 
    api.post('/members', memberData),
  
  update: (id: number, memberData: {
    name?: string;
    email?: string;
    plan?: string;
    status?: string;
    subscription_start?: string;
    subscription_end?: string;
    payment_status?: string;
  }) => 
    api.put(`/members/${id}`, memberData),
  
  delete: (id: number) => 
    api.delete(`/members/${id}`),
  
  activate: (id: number) => 
    api.put(`/members/${id}/activate`),
  
  deactivate: (id: number) => 
    api.put(`/members/${id}/deactivate`),
};

// Sponsored companies endpoints
export const sponsoredApi = {
  getAll: (params?: { 
    status?: string; 
    tier?: string; 
    date_from?: string; 
    date_to?: string; 
    search?: string;
    page?: number; 
    per_page?: number; 
  }) => 
    api.get('/sponsored_companies', { params }),
  
  getById: (id: number) => 
    api.get(`/sponsored_companies/${id}`),
  
  create: (sponsoredData: {
    name: string;
    description: string;
    website: string;
    tier: string;
    status: string;
    start_date: string;
    end_date: string;
    contact_email: string;
    contact_phone?: string;
  }) => 
    api.post('/sponsored_companies', sponsoredData),
  
  update: (id: number, sponsoredData: {
    name?: string;
    description?: string;
    website?: string;
    tier?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    contact_email?: string;
    contact_phone?: string;
  }) => 
    api.put(`/sponsored_companies/${id}`, sponsoredData),
  
  delete: (id: number) => 
    api.delete(`/sponsored_companies/${id}`),
};

// Product access endpoints
export const accessApi = {
  getAll: (params?: { 
    role?: string; 
    is_active?: boolean; 
    date_from?: string; 
    date_to?: string; 
    search?: string;
    page?: number; 
    per_page?: number; 
  }) => 
    api.get('/product_accesses', { params }),
  
  getById: (id: number) => 
    api.get(`/product_accesses/${id}`),
  
  create: (accessData: {
    user_id: string;
    product_id: string;
    role: string;
    expires_at: string;
    is_active: boolean;
  }) => 
    api.post('/product_accesses', accessData),
  
  update: (id: number, accessData: {
    user_id?: string;
    product_id?: string;
    role?: string;
    expires_at?: string;
    is_active?: boolean;
  }) => 
    api.put(`/product_accesses/${id}`, accessData),
  
  delete: (id: number) => 
    api.delete(`/product_accesses/${id}`),
};

export default api;