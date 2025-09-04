export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user' | 'empresa';
  created_at: string;
  companyId?: number;
  corporate_email?: boolean;
  company_name?: string;
  position?: string;
  approved?: boolean;
  company?: Company;
}

export interface Company {
  id: number;
  name: string;
  location: string;
  installed_capacity_mw: number;
  status: 'active' | 'pending' | 'inactive';
  user_id: number;
  created_at: string;
  description: string;
  phone: string;
  website: string;
  rating: number;
  review_count: number;
  specialties?: string[];
  certifications?: string[];
  service_areas?: string[];
  // Additional fields for company profile
  foundedYear?: number;
  employeeCount?: string;
  logo?: string;
  coverImage?: string;
  bannerImage?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  businessHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'rural';
  energyBill: number;
  timeline: string;
  message: string;
  intentionScore: number;
  budget: string;
  purchaseIntention: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  leadSource: string;
  companyId: number;
  created_at: string;
  // Additional fields for lead tracking
  decisionMaker?: string;
  financingInterest?: string;
  previousQuotes?: string;
  specificRequirements?: string;
  roofType?: string;
  roofArea?: number;
  currentEnergySource?: string;
  installationUrgency?: string;
}

export interface Review {
  id: number;
  solar_company_id: number;
  user_id: number;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user_name: string;
}

export interface ConversionPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  cta: string;
  leadMagnet: string;
}

export interface Category {
  id: number;
  name: string;
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

export interface Campaign {
  id: number;
  solar_company_id: number;
  user_id: number;
  title: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface DashboardAnalytics {
  overview: {
    totalLeads: number;
    totalReviews: number;
    averageRating: number;
    profileViews: number;
    conversionRate: number;
    responseTime: string;
    averageIntentionScore: number;
    conversionPointLeads: number;
  };
  monthlyStats: {
    month: string;
    leads: number;
    reviews: number;
    views: number;
    conversionPoints: number;
  }[];
  leadSources: {
    source: string;
    count: number;
    percentage: number;
  }[];
  conversionPointsData: {
    type: string;
    leads: number;
    conversionRate: number;
  }[];
  intentionScoreDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
  recentLeads: Lead[];
  reviewsOverTime: {
    month: string;
    rating: number;
    count: number;
  }[];
  competitorAnalysis: {
    name: string;
    rating: number;
    reviews: number;
    marketShare: number;
  }[];
  topKeywords: {
    keyword: string;
    searches: number;
    ranking: number;
  }[];
}

export interface CompanyProfile extends Company {
  foundedYear: number;
  employeeCount: string;
  serviceAreas: string[];
  certifications: string[];
  specialties: string[];
  logo: string;
  coverImage: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

// Interface for form data in CompanyRegistrationPage
export interface CompanyRegistrationFormData {
  userName: string;
  userEmail: string;
  userPasswordConfirmation: string;
  companyName: string;
  cnpj: string;
  foundedYear: string;
  employeeCount: string;
  businessType: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  country: string;
  serviceAreas: string[];
  servicesOffered: string[];
  specialties: string[];
  certifications: string[];
  experienceYears: string;
  projectsCompleted: string;
  installedCapacityMW: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  logo: File | null;
  coverImage: File | null;
  documents: File[];
  licenses: File[];
  portfolioImages: File[];
}

// Interface for select options
export interface SelectOption {
  value: string;
  label: string;
}

// Interface for file input change event
export interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList | null;
  };
}