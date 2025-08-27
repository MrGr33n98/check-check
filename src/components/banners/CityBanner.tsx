import React, { useState, useEffect } from 'react';
import { X, MapPin, Star, Award, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BannerService, BannerConfig } from '@/services/bannerService';

interface CityBannerProps {
  city: string;
  onBannerClick?: (bannerId: string) => void;
  onBannerClose?: (bannerId: string) => void;
}

const CityBanner: React.FC<CityBannerProps> = ({ city, onBannerClick, onBannerClose }) => {
  const [banner, setBanner] = useState<BannerConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBanner = async () => {
      if (!city) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const cityBanner = await BannerService.getBannerByCity(city);
        
        if (cityBanner) {
          setBanner(cityBanner);
          // Registrar visualização
          await BannerService.recordBannerView(cityBanner.id, city);
          // Pequeno delay para animação
          setTimeout(() => setIsVisible(true), 100);
        }
      } catch (error) {
        console.error('Erro ao carregar banner:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanner();
  }, [city]);

  const handleBannerClick = async () => {
    if (banner) {
      // Registrar clique
      await BannerService.recordBannerClick(banner.id, city);
      onBannerClick?.(banner.id);
      // Redirecionar para a página da empresa
      window.open(banner.ctaLink, '_blank');
    }
  };

  const handleClose = () => {
    if (banner) {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        setBanner(null);
        onBannerClose?.(banner.id);
      }, 300);
    }
  };

  // Auto-close banner após displayDuration (se configurado)
  useEffect(() => {
    if (banner && banner.displayDuration && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, banner.displayDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [banner, isVisible]);

  if (isLoading || !banner || !isVisible) {
    return null;
  }

  const getPositionClasses = () => {
    switch (banner.position) {
      case 'top':
        return 'top-4';
      case 'center':
        return 'top-1/2 -translate-y-1/2';
      case 'bottom':
        return 'bottom-4';
      default:
        return 'top-4';
    }
  };

  const getAnimationClasses = () => {
    if (isClosing) return 'animate-fade-out';
    
    switch (banner.animation) {
      case 'slideDown':
        return 'animate-slide-down';
      case 'bounceIn':
        return 'animate-bounce-in';
      case 'fadeIn':
        return 'animate-fade-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div className={`fixed right-4 z-50 ${getPositionClasses()} ${getAnimationClasses()}`}>
      <Card className={`w-80 shadow-2xl border-0 overflow-hidden ${banner.textColor}`}>
        {/* Background com gradiente */}
        <div className={`bg-gradient-to-r ${banner.backgroundColor} p-4 relative`}>
          {/* Botão de fechar */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className={`absolute top-2 right-2 ${banner.textColor} hover:bg-white/20 h-6 w-6 p-0`}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Conteúdo do banner */}
          <div className="pr-8">
            {/* Localização */}
            <div className="flex items-center gap-1 mb-2 opacity-90">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{banner.city}</span>
            </div>

            {/* Título */}
            <h3 className="text-lg font-bold mb-2 leading-tight">
              {banner.title}
            </h3>

            {/* Descrição */}
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              {banner.description}
            </p>

            {/* Informações da empresa */}
            {banner.isPremium && (
              <div className="bg-white/10 rounded-lg p-3 mb-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  {banner.companyLogo && (
                    <span className="text-2xl">{banner.companyLogo}</span>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{banner.companyName}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs opacity-90">Empresa Premium</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
                    <Award className="h-3 w-3 mr-1" />
                    Certificada
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
                    Verificada
                  </Badge>
                </div>
              </div>
            )}

            {/* Call to Action */}
            <Button
              onClick={handleBannerClick}
              className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-lg"
              size="sm"
            >
              {banner.ctaText}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Indicador de tempo restante (se configurado) */}
        {banner.displayDuration && (
          <div className="h-1 bg-gray-200">
            <div 
              className="h-full bg-white/50 transition-all duration-1000 ease-linear"
              style={{
                animation: `shrink ${banner.displayDuration}s linear forwards`
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default CityBanner;