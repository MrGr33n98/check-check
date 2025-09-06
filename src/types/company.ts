export interface Company {
  id: number;
  name: string;
  description: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  status: 'active' | 'pending';
  logo?: string;
  services: string[];
  ratings: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  verified?: boolean;
}

export interface CompanyFormData {
  name: string;
  description: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  services: string[];
  logo?: File;
}