// Serviço para gerenciar banners customizáveis por cidade
// Em produção, isso seria integrado com o Active Admin/API backend

export interface BannerConfig {
  id: string;
  city: string;
  title: string;
  description: string;
  companyName: string;
  companyLogo?: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  textColor: string;
  animation: 'slideDown' | 'bounceIn' | 'fadeIn';
  position: 'top' | 'center' | 'bottom';
  isActive: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  displayDuration?: number; // em segundos
  maxDisplaysPerDay?: number;
  targetAudience?: 'all' | 'new_users' | 'returning_users';
}

// Dados mockados - em produção viriam do Active Admin
const mockBanners: BannerConfig[] = [
  {
    id: '1',
    city: 'São Paulo',
    title: '⚡ Energia Solar em São Paulo',
    description: 'Economize até 95% na conta de luz com nossos painéis solares premium!',
    companyName: 'SolarTech SP',
    companyLogo: '🌞',
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/company/solartech-sp',
    backgroundColor: 'from-blue-500 to-green-500',
    textColor: 'text-white',
    animation: 'slideDown',
    position: 'top',
    isActive: true,
    isPremium: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    displayDuration: 10,
    maxDisplaysPerDay: 3,
    targetAudience: 'all'
  },
  {
    id: '2',
    city: 'Rio de Janeiro',
    title: '🏖️ Energia Solar no Rio',
    description: 'Aproveite o sol carioca para gerar sua própria energia limpa!',
    companyName: 'Solar Rio',
    companyLogo: '☀️',
    ctaText: 'Ver Projetos',
    ctaLink: '/company/solar-rio',
    backgroundColor: 'from-orange-400 to-yellow-500',
    textColor: 'text-white',
    animation: 'bounceIn',
    position: 'center',
    isActive: true,
    isPremium: true,
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    displayDuration: 8,
    maxDisplaysPerDay: 5,
    targetAudience: 'new_users'
  },
  {
    id: '3',
    city: 'Belo Horizonte',
    title: '⛰️ Solar em BH',
    description: 'Instalação rápida e garantia de 25 anos. Financiamento em até 120x!',
    companyName: 'MG Solar',
    companyLogo: '🔋',
    ctaText: 'Simular Economia',
    ctaLink: '/company/mg-solar',
    backgroundColor: 'from-green-600 to-blue-600',
    textColor: 'text-white',
    animation: 'fadeIn',
    position: 'bottom',
    isActive: false,
    isPremium: true,
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
    displayDuration: 12,
    maxDisplaysPerDay: 2,
    targetAudience: 'returning_users'
  }
];

// Simula delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class BannerService {
  private static banners: BannerConfig[] = [...mockBanners];

  // Buscar banner por cidade
  static async getBannerByCity(city: string): Promise<BannerConfig | null> {
    await delay(300); // Simula latência da API
    
    const normalizedCity = city.toLowerCase().trim();
    const banner = this.banners.find(
      b => b.city.toLowerCase() === normalizedCity && b.isActive
    );
    
    return banner || null;
  }

  // Listar todos os banners
  static async getAllBanners(): Promise<BannerConfig[]> {
    await delay(500);
    return [...this.banners];
  }

  // Criar novo banner
  static async createBanner(bannerData: Omit<BannerConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<BannerConfig> {
    await delay(800);
    
    const newBanner: BannerConfig = {
      ...bannerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.banners.push(newBanner);
    return newBanner;
  }

  // Atualizar banner
  static async updateBanner(id: string, updates: Partial<BannerConfig>): Promise<BannerConfig | null> {
    await delay(600);
    
    const index = this.banners.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    this.banners[index] = {
      ...this.banners[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return this.banners[index];
  }

  // Deletar banner
  static async deleteBanner(id: string): Promise<boolean> {
    await delay(400);
    
    const index = this.banners.findIndex(b => b.id === id);
    if (index === -1) return false;
    
    this.banners.splice(index, 1);
    return true;
  }

  // Ativar/Desativar banner
  static async toggleBannerStatus(id: string): Promise<BannerConfig | null> {
    await delay(300);
    
    const banner = this.banners.find(b => b.id === id);
    if (!banner) return null;
    
    banner.isActive = !banner.isActive;
    banner.updatedAt = new Date().toISOString();
    
    return banner;
  }

  // Buscar banners por empresa (para planos premium)
  static async getBannersByCompany(companyName: string): Promise<BannerConfig[]> {
    await delay(400);
    
    return this.banners.filter(
      b => b.companyName.toLowerCase().includes(companyName.toLowerCase())
    );
  }

  // Registrar visualização do banner (para analytics)
  static async recordBannerView(bannerId: string, city: string): Promise<void> {
    await delay(100);
    
    // Em produção, isso salvaria no banco de dados para analytics
    console.log(`Banner ${bannerId} visualizado em ${city} às ${new Date().toISOString()}`);
  }

  // Registrar clique no banner
  static async recordBannerClick(bannerId: string, city: string): Promise<void> {
    await delay(100);
    
    // Em produção, isso salvaria no banco de dados para analytics
    console.log(`Banner ${bannerId} clicado em ${city} às ${new Date().toISOString()}`);
  }
}

export default BannerService;