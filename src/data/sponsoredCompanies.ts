// Mock data for sponsored companies based on the Sponsored model
export interface SponsoredCompany {
  id: number;
  title: string;
  description?: string;
  link_url: string;
  position: 'header' | 'sidebar' | 'footer' | 'category_page' | 'solution_page';
  status: 'draft' | 'active' | 'paused' | 'expired';
  starts_at: string;
  ends_at: string;
  priority: number;
  square_banner?: string;
  rectangular_banner?: string;
  logo?: string;
  rating?: number;
  categories: string[];
}

// Helper function to check if a sponsored company is currently active
export const isActiveSponsored = (company: SponsoredCompany): boolean => {
  const now = new Date();
  const startDate = new Date(company.starts_at);
  const endDate = new Date(company.ends_at);
  
  return company.status === 'active' && 
         startDate <= now && 
         endDate >= now;
};

// Mock sponsored companies data
export const sponsoredCompanies: SponsoredCompany[] = [
  {
    id: 1,
    title: "SolarTech Pro",
    description: "Líder em soluções solares residenciais",
    link_url: "/empresa/solartech-pro",
    position: "header",
    status: "active",
    starts_at: "2024-01-01T00:00:00Z",
    ends_at: "2024-12-31T23:59:59Z",
    priority: 1,
    logo: "https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=ST",
    rating: 4.8,
    categories: ["Residencial", "Comercial"]
  },
  {
    id: 2,
    title: "EcoEnergy Solutions",
    description: "Energia limpa para empresas",
    link_url: "/empresa/ecoenergy-solutions",
    position: "header",
    status: "active",
    starts_at: "2024-01-15T00:00:00Z",
    ends_at: "2024-06-30T23:59:59Z",
    priority: 2,
    logo: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=EE",
    rating: 4.9,
    categories: ["Comercial", "Industrial"]
  },
  {
    id: 3,
    title: "GreenPower Brasil",
    description: "Instalações solares premium",
    link_url: "/empresa/greenpower-brasil",
    position: "header",
    status: "active",
    starts_at: "2024-02-01T00:00:00Z",
    ends_at: "2024-08-31T23:59:59Z",
    priority: 3,
    logo: "https://via.placeholder.com/80x80/059669/FFFFFF?text=GP",
    rating: 4.7,
    categories: ["Residencial"]
  },
  {
    id: 4,
    title: "Solar Innovations",
    description: "Tecnologia solar avançada",
    link_url: "/empresa/solar-innovations",
    position: "header",
    status: "active",
    starts_at: "2024-01-10T00:00:00Z",
    ends_at: "2024-07-31T23:59:59Z",
    priority: 4,
    logo: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=SI",
    rating: 4.6,
    categories: ["Industrial", "Comercial"]
  },
  {
    id: 5,
    title: "CleanTech Energy",
    description: "Soluções sustentáveis completas",
    link_url: "/empresa/cleantech-energy",
    position: "header",
    status: "active",
    starts_at: "2024-01-20T00:00:00Z",
    ends_at: "2024-09-30T23:59:59Z",
    priority: 5,
    logo: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=CT",
    rating: 4.5,
    categories: ["Residencial", "Comercial"]
  },
  {
    id: 6,
    title: "SunMax Sistemas",
    description: "Máxima eficiência energética",
    link_url: "/empresa/sunmax-sistemas",
    position: "header",
    status: "active",
    starts_at: "2024-02-15T00:00:00Z",
    ends_at: "2024-12-31T23:59:59Z",
    priority: 6,
    logo: "https://via.placeholder.com/80x80/EF4444/FFFFFF?text=SM",
    rating: 4.4,
    categories: ["Industrial"]
  },
  {
    id: 7,
    title: "PowerSolar Group",
    description: "Grupo líder em energia solar",
    link_url: "/empresa/powersolar-group",
    position: "header",
    status: "active",
    starts_at: "2024-01-05T00:00:00Z",
    ends_at: "2024-11-30T23:59:59Z",
    priority: 7,
    logo: "https://via.placeholder.com/80x80/06B6D4/FFFFFF?text=PS",
    rating: 4.8,
    categories: ["Comercial", "Residencial"]
  },
  {
    id: 8,
    title: "Energia Verde Plus",
    description: "Mais economia, menos impacto",
    link_url: "/empresa/energia-verde-plus",
    position: "header",
    status: "active",
    starts_at: "2024-03-01T00:00:00Z",
    ends_at: "2024-10-31T23:59:59Z",
    priority: 8,
    logo: "https://via.placeholder.com/80x80/84CC16/FFFFFF?text=EV",
    rating: 4.3,
    categories: ["Residencial"]
  }
];

// Get only active sponsored companies
export const getActiveSponsoredCompanies = (): SponsoredCompany[] => {
  return sponsoredCompanies
    .filter(isActiveSponsored)
    .sort((a, b) => a.priority - b.priority);
};