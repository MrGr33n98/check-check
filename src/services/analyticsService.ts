const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export interface AnalyticsData {
  id: number;
  provider_id: number;
  date: string;
  leads: number;
  page_views: number;
  conversions: number;
  conversion_rate: number;
  monthly_growth: number;
  average_rating: number;
  total_reviews: number;
  profile_views: number;
  intent_score: number;
  conversion_points_leads: number;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsSummary {
  total_leads: number;
  total_page_views: number;
  total_conversions: number;
  average_conversion_rate: number;
  monthly_growth: number;
  period_start: string;
  period_end: string;
  comparison?: {
    previous_period_leads: number;
    previous_period_page_views: number;
    previous_period_conversions: number;
    leads_growth: number;
    page_views_growth: number;
    conversions_growth: number;
  };
}

export interface DashboardData {
  overview: {
    total_leads: number;
    total_page_views: number;
    total_conversions: number;
    conversion_rate: number;
  };
  leads_chart: Array<{
    date: string;
    leads: number;
    conversions: number;
  }>;
  conversion_sources: Array<{
    source: string;
    leads: number;
    percentage: number;
  }>;
  monthly_comparison: {
    current_month: {
      leads: number;
      page_views: number;
      conversions: number;
    };
    previous_month: {
      leads: number;
      page_views: number;
      conversions: number;
    };
    growth: {
      leads: number;
      page_views: number;
      conversions: number;
    };
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

class AnalyticsService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async getAnalytics(providerId: number, limit: number = 30): Promise<AnalyticsData[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/providers/${providerId}/analytics?limit=${limit}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`);
      }

      const result: ApiResponse<AnalyticsData[]> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Return mock data as fallback
      return this.getMockAnalytics();
    }
  }

  async getAnalyticsSummary(
    providerId: number,
    startDate?: string,
    endDate?: string
  ): Promise<AnalyticsSummary> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);

      const response = await fetch(
        `${API_BASE_URL}/providers/${providerId}/analytics/summary?${params.toString()}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics summary: ${response.status}`);
      }

      const result: ApiResponse<AnalyticsSummary> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      // Return mock data as fallback
      return this.getMockSummary();
    }
  }

  async getDashboardData(providerId: number): Promise<DashboardData> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/providers/${providerId}/analytics/dashboard`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.status}`);
      }

      const result: ApiResponse<DashboardData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Return mock data as fallback
      return this.getMockDashboardData();
    }
  }

  async createAnalytics(
    providerId: number,
    analyticsData: Partial<AnalyticsData>
  ): Promise<AnalyticsData> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/providers/${providerId}/analytics`,
        {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ analytic: analyticsData }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create analytics: ${response.status}`);
      }

      const result: ApiResponse<AnalyticsData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating analytics:', error);
      throw error;
    }
  }

  async updateAnalytics(
    providerId: number,
    analyticsId: number,
    analyticsData: Partial<AnalyticsData>
  ): Promise<AnalyticsData> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/providers/${providerId}/analytics/${analyticsId}`,
        {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ analytic: analyticsData }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update analytics: ${response.status}`);
      }

      const result: ApiResponse<AnalyticsData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error updating analytics:', error);
      throw error;
    }
  }

  // Mock data methods for fallback
  private getMockAnalytics(): AnalyticsData[] {
    const today = new Date();
    const mockData: AnalyticsData[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      mockData.push({
        id: i + 1,
        provider_id: 1,
        date: date.toISOString().split('T')[0],
        leads: Math.floor(Math.random() * 10) + 1,
        page_views: Math.floor(Math.random() * 100) + 20,
        conversions: Math.floor(Math.random() * 5) + 1,
        conversion_rate: Math.random() * 30 + 10,
        monthly_growth: Math.random() * 20 - 10,
        average_rating: Math.random() * 2 + 3,
        total_reviews: Math.floor(Math.random() * 50) + 10,
        profile_views: Math.floor(Math.random() * 50) + 10,
        intent_score: Math.random() * 100,
        conversion_points_leads: Math.floor(Math.random() * 3),
        created_at: date.toISOString(),
        updated_at: date.toISOString(),
      });
    }

    return mockData;
  }

  private getMockSummary(): AnalyticsSummary {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    return {
      total_leads: 147,
      total_page_views: 2340,
      total_conversions: 35,
      average_conversion_rate: 23.8,
      monthly_growth: 15.3,
      period_start: startDate.toISOString().split('T')[0],
      period_end: endDate.toISOString().split('T')[0],
      comparison: {
        previous_period_leads: 128,
        previous_period_page_views: 2100,
        previous_period_conversions: 30,
        leads_growth: 14.8,
        page_views_growth: 11.4,
        conversions_growth: 16.7,
      },
    };
  }

  private getMockDashboardData(): DashboardData {
    const today = new Date();
    const leadsChart = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      leadsChart.push({
        date: date.toISOString().split('T')[0],
        leads: Math.floor(Math.random() * 10) + 1,
        conversions: Math.floor(Math.random() * 5) + 1,
      });
    }

    return {
      overview: {
        total_leads: 147,
        total_page_views: 2340,
        total_conversions: 35,
        conversion_rate: 23.8,
      },
      leads_chart: leadsChart,
      conversion_sources: [
        { source: 'Busca Orgânica', leads: 65, percentage: 44.2 },
        { source: 'Referência Direta', leads: 42, percentage: 28.6 },
        { source: 'Redes Sociais', leads: 25, percentage: 17.0 },
        { source: 'Campanhas Pagas', leads: 15, percentage: 10.2 },
      ],
      monthly_comparison: {
        current_month: {
          leads: 47,
          page_views: 780,
          conversions: 12,
        },
        previous_month: {
          leads: 41,
          page_views: 700,
          conversions: 10,
        },
        growth: {
          leads: 14.6,
          page_views: 11.4,
          conversions: 20.0,
        },
      },
    };
  }
}

export default new AnalyticsService();