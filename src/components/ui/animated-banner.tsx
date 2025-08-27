import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface BannerCompany {
  id: number;
  name: string;
  logo: string;
  rating: number;
  city: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

// Mock data - em produção viria do Active Admin
const mockBannerCompanies: BannerCompany[] = [
  {
    id: 1,
    name: 'SolarTech RJ',
    logo: '/logos/solartech.png',
    rating: 4.8,
    city: 'Rio de Janeiro',
    isActive: true
  },
  {
    id: 2,
    name: 'EcoSolar SP',
    logo: '/logos/ecosolar.png',
    rating: 4.6,
    city: 'São Paulo',
    isActive: true
  },
  {
    id: 3,
    name: 'SunPower MG',
    logo: '/logos/sunpower.png',
    rating: 4.9,
    city: 'Belo Horizonte',
    isActive: true
  },
  {
    id: 4,
    name: 'GreenEnergy RS',
    logo: '/logos/greenenergy.png',
    rating: 4.7,
    city: 'Porto Alegre',
    isActive: true
  },
  {
    id: 5,
    name: 'SolarMax PR',
    logo: '/logos/solarmax.png',
    rating: 4.5,
    city: 'Curitiba',
    isActive: true
  }
];

interface AnimatedBannerProps {
  duration?: number; // duração em segundos
  speed?: number; // velocidade da animação
}

const AnimatedBanner: React.FC<AnimatedBannerProps> = ({ 
  duration = 30
}) => {
  const [companies, setCompanies] = useState<BannerCompany[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Filtrar apenas empresas ativas
    const activeCompanies = mockBannerCompanies.filter(company => company.isActive);
    
    // Duplicar a lista para criar efeito contínuo
    const duplicatedCompanies = [...activeCompanies, ...activeCompanies];
    setCompanies(duplicatedCompanies);
  }, []);

  if (!isVisible || companies.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div 
        className="flex items-center space-x-8"
        style={{
          animation: `scroll ${duration}s linear infinite`,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        {companies.map((company, index) => (
          <div 
            key={`${company.id}-${index}`}
            className="flex items-center space-x-3 whitespace-nowrap min-w-max px-4"
          >
            {/* Logo placeholder - em produção seria a imagem real */}
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-500 font-bold text-sm">
                {company.name.charAt(0)}
              </span>
            </div>
            
            {/* Nome da empresa */}
            <span className="font-semibold text-sm">
              {company.name}
            </span>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-medium">
                {company.rating}
              </span>
            </div>
            
            {/* Cidade */}
            <span className="text-sm opacity-90">
              {company.city}
            </span>
            
            {/* Separador */}
            <div className="w-px h-6 bg-white/30 mx-4"></div>
          </div>
        ))}
      </div>
      
      {/* Botão para fechar o banner */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        aria-label="Fechar banner"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `
      }} />
    </div>
  );
};

export default AnimatedBanner;