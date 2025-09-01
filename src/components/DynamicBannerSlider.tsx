import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

interface DynamicBanner {
  id: number;
  title: string;
  description: string;
  link_url: string;
  display_order: number;
  active: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface DynamicBannerSliderProps {
  autoRotate?: boolean;
  rotationInterval?: number;
  showControls?: boolean;
  showCloseButton?: boolean;
  className?: string;
  height?: string;
}

const DynamicBannerSlider: React.FC<DynamicBannerSliderProps> = ({
  autoRotate = true,
  rotationInterval = 5000,
  showControls = true,
  showCloseButton = true,
  className = '',
  height = '200px'
}) => {
  const [banners, setBanners] = useState<DynamicBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/v1/dynamic_banners/active');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          setBanners(data.data);
          setError(null);
        } else {
          setBanners([]);
          setError('No banners available');
        }
      } catch (err) {
        console.error('Error fetching dynamic banners:', err);
        setError('Failed to load banners');
        setBanners([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to prevent immediate re-renders
    const timeoutId = setTimeout(fetchBanners, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, banners.length, rotationInterval]);

  // Register impression when banner is displayed
  useEffect(() => {
    if (banners.length > 0 && currentIndex >= 0) {
      const currentBanner = banners[currentIndex];
      registerImpression(currentBanner.id);
    }
  }, [currentIndex, banners]);

  const registerImpression = async (bannerId: number) => {
    try {
      await fetch(`/api/v1/dynamic_banners/${bannerId}/impression`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error('Error registering impression:', err);
    }
  };

  const handleBannerClick = async (banner: DynamicBanner) => {
    try {
      // Register click via API
      await fetch(`/api/v1/dynamic_banners/${banner.id}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Navigate to URL
      const finalUrl = banner.link_url;
      
      if (finalUrl.startsWith('http')) {
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = finalUrl;
      }
    } catch (err) {
      console.error('Error registering click:', err);
      
      // Fallback: still navigate
      if (banner.link_url.startsWith('http')) {
        window.open(banner.link_url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = banner.link_url;
      }
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const closeBanner = () => {
    setIsVisible(false);
    // Store in localStorage to remember user preference
    localStorage.setItem('dynamic-banner-closed', 'true');
  };

  // Check if user previously closed the banner
  useEffect(() => {
    const wasClosed = localStorage.getItem('dynamic-banner-closed');
    if (wasClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  // Don't render if not visible or loading
  if (!isVisible || isLoading) {
    return null;
  }

  // Use default banner if no banners or error
  const defaultBanner: DynamicBanner = {
    id: 0,
    title: 'SolarFinder - Encontre as Melhores Empresas',
    description: 'Conectamos você com as melhores empresas de energia solar do Brasil. Compare preços, avaliações e encontre a solução perfeita!',
    link_url: '/empresa/cadastro',
    display_order: 1,
    active: true,
    image_url: '/api/placeholder/800/200',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const displayBanners = (error || banners.length === 0) ? [defaultBanner] : banners;

  const currentBanner = displayBanners[currentIndex] || displayBanners[0] || defaultBanner;

  return (
    <div className={`relative w-full overflow-hidden rounded-lg shadow-lg ${className}`}>
      <div 
        className="relative w-full cursor-pointer transition-all duration-300 hover:opacity-95"
        style={{ height }}
        onClick={() => currentBanner && handleBannerClick(currentBanner)}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentBanner?.image_url || '/api/placeholder/800/200'})`
          }}
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center text-white max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
              {currentBanner?.title || 'SolarFinder'}
            </h2>
            <p className="text-lg md:text-xl opacity-90 drop-shadow-md">
              {currentBanner?.description || 'Encontre as melhores empresas de energia solar'}
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors">
                Saiba mais
                {currentBanner?.link_url?.startsWith('http') && (
                  <ExternalLink className="w-4 h-4 ml-2" />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {showControls && banners.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
              aria-label="Next banner"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeBanner();
            }}
            className="absolute right-4 top-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white scale-110 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicBannerSlider;