// Mock data based on the provided seed data
export const mockUsers = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@solarenergy.com',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Moderator',
    email: 'moderator@solarenergy.com',
    role: 'moderator',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'User',
    email: 'user@solarenergy.com',
    role: 'user',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const mockCompanies = [
  {
    id: 1,
    name: 'SolarCo 1',
    location: 'Location 1',
    installed_capacity_mw: 10.5,
    status: 'active',
    user_id: 2,
    created_at: '2024-01-01T00:00:00Z',
    description: 'Leading solar energy provider with over 10 years of experience in renewable energy solutions.',
    phone: '+1 (555) 123-4567',
    website: 'https://solarco1.com',
    rating: 4.2,
    review_count: 15
  },
  {
    id: 2,
    name: 'SunPower Solutions',
    location: 'California, USA',
    installed_capacity_mw: 25.8,
    status: 'active',
    user_id: 2,
    created_at: '2024-01-02T00:00:00Z',
    description: 'Innovative solar technology company specializing in residential and commercial installations.',
    phone: '+1 (555) 234-5678',
    website: 'https://sunpowersolutions.com',
    rating: 4.7,
    review_count: 32
  },
  {
    id: 3,
    name: 'Green Energy Corp',
    location: 'Texas, USA',
    installed_capacity_mw: 18.3,
    status: 'active',
    user_id: 2,
    created_at: '2024-01-03T00:00:00Z',
    description: 'Sustainable energy solutions for a greener future. Serving residential and commercial clients.',
    phone: '+1 (555) 345-6789',
    website: 'https://greenenergycorp.com',
    rating: 4.0,
    review_count: 8
  },
  {
    id: 4,
    name: 'Solar Innovations LLC',
    location: 'Florida, USA',
    installed_capacity_mw: 32.1,
    status: 'active',
    user_id: 2,
    created_at: '2024-01-04T00:00:00Z',
    description: 'Cutting-edge solar panel technology and installation services across the Southeast.',
    phone: '+1 (555) 456-7890',
    website: 'https://solarinnovations.com',
    rating: 4.5,
    review_count: 24
  }
];

export const mockReviews = [
  {
    id: 1,
    solar_company_id: 1,
    user_id: 3,
    rating: 4,
    comment: 'Great service',
    status: 'pending',
    created_at: '2024-01-15T00:00:00Z',
    user_name: 'User'
  },
  {
    id: 2,
    solar_company_id: 1,
    user_id: 3,
    rating: 5,
    comment: 'Excellent installation and customer support. Highly recommended!',
    status: 'approved',
    created_at: '2024-01-20T00:00:00Z',
    user_name: 'John Smith'
  },
  {
    id: 3,
    solar_company_id: 2,
    user_id: 3,
    rating: 5,
    comment: 'Outstanding quality and professional service. The team was knowledgeable and efficient.',
    status: 'approved',
    created_at: '2024-01-25T00:00:00Z',
    user_name: 'Sarah Johnson'
  },
  {
    id: 4,
    solar_company_id: 2,
    user_id: 3,
    rating: 4,
    comment: 'Good experience overall. Installation was completed on time.',
    status: 'approved',
    created_at: '2024-01-30T00:00:00Z',
    user_name: 'Mike Davis'
  }
];

export const mockCategories = [
  {
    id: 1,
    name: 'Solar Guides'
  },
  {
    id: 2,
    name: 'Installation Tips'
  },
  {
    id: 3,
    name: 'Maintenance'
  }
];

export const mockContent = [
  {
    id: 1,
    solar_company_id: 1,
    user_id: 2,
    title: 'Solar Guide',
    content_type: 'guide',
    body: 'Installation guide',
    category_id: 1,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    solar_company_id: 2,
    user_id: 2,
    title: 'Complete Solar Installation Guide',
    content_type: 'guide',
    body: 'A comprehensive guide covering everything you need to know about solar panel installation, from planning to maintenance.',
    category_id: 1,
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 3,
    solar_company_id: 3,
    user_id: 2,
    title: 'Solar Panel Maintenance Tips',
    content_type: 'article',
    body: 'Learn how to properly maintain your solar panels to ensure maximum efficiency and longevity.',
    category_id: 3,
    created_at: '2024-01-15T00:00:00Z'
  }
];

export const mockBadges = [
  {
    id: 1,
    name: 'Top Contributor',
    description: 'For active users',
    badgeable_type: 'User',
    badgeable_id: 3
  },
  {
    id: 2,
    name: 'Verified Installer',
    description: 'Certified solar installation company',
    badgeable_type: 'Company',
    badgeable_id: 1
  },
  {
    id: 3,
    name: 'Premium Partner',
    description: 'Premium solar energy partner',
    badgeable_type: 'Company',
    badgeable_id: 2
  }
];

export const mockCampaigns = [
  {
    id: 1,
    solar_company_id: 1,
    user_id: 2,
    title: 'Summer Campaign',
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T00:00:00Z',
    created_at: '2024-05-15T00:00:00Z'
  },
  {
    id: 2,
    solar_company_id: 2,
    user_id: 2,
    title: 'Winter Savings Campaign',
    start_date: '2024-12-01T00:00:00Z',
    end_date: '2025-02-28T00:00:00Z',
    created_at: '2024-11-15T00:00:00Z'
  }
];

