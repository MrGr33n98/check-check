export interface Review {
  id: number;
  companyId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  projectType: 'residential' | 'commercial' | 'industrial';
  projectSize: string;
  installationDate: string;
  wouldRecommend: boolean;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  companyResponse?: {
    message: string;
    respondedAt: string;
    respondedBy: string;
  };
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recommendationRate: number;
  verifiedReviews: number;
}

export interface ReviewFilters {
  rating?: string;
  projectType?: string;
  verified?: boolean;
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
  dateRange?: string;
}

export interface CreateReviewData {
  companyId: number;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  projectType: 'residential' | 'commercial' | 'industrial';
  projectSize: string;
  installationDate: string;
  wouldRecommend: boolean;
  images?: File[];
}