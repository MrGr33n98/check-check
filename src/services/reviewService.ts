import { api } from '@/middleware/authMiddleware';

export type ProviderLite = {
  id: number;
  slug: string;
  name: string;
  city: string;
  state: string; // UF (2 letras)
  logo_url?: string;
  avg_rating?: number; // 0–5
  reviews_count?: number;
  verified?: boolean;
};

export type ReviewPayload = {
  rating: 1|2|3|4|5;
  title?: string;
  body: string; // >= 80 chars
  pros?: string;
  cons?: string;
  would_recommend: boolean;
  source?: 'compare-solar-web';
};

export interface ProvidersForReviewResponse {
  providers: ProviderLite[];
  meta: {
    page: number;
    per: number;
    total: number;
  };
}

import { logError } from '@/utils/log';

class ReviewService {
  async fetchProvidersForReview(params?: {
    page?: number;
    per?: number;
    query?: string;
    state?: string;
    min_rating?: number;
    verified?: boolean;
  }): Promise<ProvidersForReviewResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('approved', 'true'); // Only approved companies
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per) queryParams.append('per', params.per.toString());
      if (params?.query) queryParams.append('query', params.query);
      if (params?.state) queryParams.append('state', params.state);
      if (params?.min_rating) queryParams.append('min_rating', params.min_rating.toString());
      if (params?.verified) queryParams.append('verified', params.verified.toString());

      const response = await api.get(`/providers?${queryParams.toString()}`);
      return response.data; // Assuming backend returns { providers: [...], meta: {...} }
    } catch (error) {
      logError(error, "Error fetching providers for review:");
      throw error;
    }
  }

  async fetchProviderBySlug(slug: string): Promise<ProviderLite> {
    try {
      const response = await api.get(`/providers/${slug}`);
      return response.data; // Assuming backend returns single provider object
    } catch (error) {
      logError(error, `Error fetching provider by slug ${slug}:`);
      throw error;
    }
  }

  async createReview(providerId: number, reviewPayload: ReviewPayload): Promise<any> {
    try {
      const response = await api.post(`/reviews`, { review: { ...reviewPayload, provider_id: providerId } });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        return { ok: false, errors: error.response.data.errors };
      }
      logError(error, `Error creating review for provider ${providerId}:`);
      throw error;
    }
  }
}

export default new ReviewService();
