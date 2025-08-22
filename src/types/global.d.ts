// Global types for the admin system

export type Status = 'novo' | 'ativo' | 'inativo' | 'suspenso' | 'expirado' | 'contatado' | 'qualificado' | 'convertido' | 'descartado';
export type Role = 'admin' | 'moderator' | 'user' | 'company';
export type PlanType = 'basico' | 'pro' | 'enterprise';
export type LeadSource = 'site' | 'redes' | 'indicacao' | 'webinar';
export type PaymentStatus = 'pago' | 'pendente' | 'atrasado';
export type SponsoredTier = 'bronze' | 'prata' | 'ouro' | 'diamante';

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// Lead entity
export interface Lead extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  status: Status;
  score: number;
  lastContact?: string;
  notes?: string;
}

// Member entity
export interface Member extends BaseEntity {
  name: string;
  email: string;
  plan: PlanType;
  status: Status;
  subscriptionStart: string;
  subscriptionEnd: string;
  paymentStatus: PaymentStatus;
  profileUrl?: string;
}

// Sponsored company entity
export interface SponsoredCompany extends BaseEntity {
  name: string;
  description: string;
  website: string;
  tier: SponsoredTier;
  status: Status;
  startDate: string;
  endDate: string;
  contactEmail: string;
  contactPhone?: string;
}

// Product access entity
export interface ProductAccess extends BaseEntity {
  userId: string;
  productId: string;
  role: Role;
  expiresAt: string;
  isActive: boolean;
  userName: string;
  productName: string;
}

// Filter interfaces
export interface BaseFilters {
  search?: string;
  status?: Status;
  dateFrom?: string;
  dateTo?: string;
}

export interface LeadFilters extends BaseFilters {
  source?: LeadSource;
}

export interface MemberFilters extends BaseFilters {
  plan?: PlanType;
  paymentStatus?: PaymentStatus;
}

export interface SponsoredFilters extends BaseFilters {
  tier?: SponsoredTier;
}

export interface AccessFilters extends BaseFilters {
  role?: Role;
  isActive?: boolean;
}