import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { utmTracker, UTMParameters } from '../utils/utmTracking';

interface PromotionalBanner {
  id: number;
  title: string;
  background_color: string;
  text_color: string;
  url: string;
  provider_name?: string;
  provider_logo?: string;
  display_order: number;
  position: string;
  final_url: string;
  is_external: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface BannerSliderProps {
  position?: string;
  autoRotate?: boolean;
  rotationInterval?: number;
  showControls?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const BannerSlider: React.FC<BannerSliderProps> = ({
  position = 'homepage',
  autoRotate = true,
  rotationInterval = 5000,
  showControls = true,
  showCloseButton = true,
  className = ''
}) => {
  const [banners, setBanners] = useState<PromotionalBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/promotional_banners/by_position/${position}`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setBanners(data.data);
          setError(null);
        } else {
          setBanners([]);
          setError(data.error || 'No banners available');
        }
      } catch (err) {
        console.error('Error fetching promotional banners:', err);
        setError('Failed to load banners');
        setBanners([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [position]);

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
    if (banners.length > 0 && banners[currentIndex]) {
      const banner = banners[currentIndex];
      
      const registerImpression = async () => {
        try {
          // Register impression via API
          await fetch(`/api/v1/promotional_banners/${banner.id}/impression`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          // Track UTM impression
          const utmParams: UTMParameters = {
            utm_source: banner.utm_source,
            utm_medium: banner.utm_medium,
            utm_campaign: banner.utm_campaign,
            utm_term: banner.utm_term,
            utm_content: banner.utm_content
          };
          
          utmTracker.trackImpression(
            banner.id,
            banner.title,
            banner.provider_name,
            utmParams
          );
        } catch (err) {
          console.error('Error registering impression:', err);
        }
      };

      registerImpression();
    }
  }, [currentIndex, banners]);

  const handleBannerClick = async (banner: PromotionalBanner) => {
    try {
      // Register click via API
      const response = await fetch(`/api/v1/promotional_banners/${banner.id}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      // Track UTM click
      const utmParams: UTMParameters = {
        utm_source: banner.utm_source,
        utm_medium: banner.utm_medium,
        utm_campaign: banner.utm_campaign,
        utm_term: banner.utm_term,
        utm_content: banner.utm_content
      };
      
      const finalUrl = data.success && data.redirect_url ? data.redirect_url : banner.final_url;
      
      utmTracker.trackClick(
        banner.id,
        banner.title,
        finalUrl,
        banner.provider_name,
        utmParams
      );
      
      // Navigate to URL
      if (banner.is_external) {
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = finalUrl;
      }
    } catch (err) {
      console.error('Error registering click:', err);
      
      // Fallback: still track and navigate
      const utmParams: UTMParameters = {
        utm_source: banner.utm_source,
        utm_medium: banner.utm_medium,
        utm_campaign: banner.utm_campaign,
        utm_term: banner.utm_term,
        utm_content: banner.utm_content
      };
      
      utmTracker.trackClick(
        banner.id,
        banner.title,
        banner.final_url,
        banner.provider_name,
        utmParams
      );
      
      if (banner.is_external) {
        window.open(banner.final_url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = banner.final_url;
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
    localStorage.setItem('promotional-banner-closed', 'true');
  };

  // Check if user previously closed the banner
  useEffect(() => {
    const wasClosed = localStorage.getItem('promotional-banner-closed');
    if (wasClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  // Don't render if not visible, loading, error, or no banners
  if (!isVisible || isLoading || error || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        className="relative w-full py-3 px-4 cursor-pointer transition-all duration-300 hover:opacity-90"
        style={{
          backgroundColor: currentBanner.background_color,
          color: currentBanner.text_color
        }}
        onClick={() => handleBannerClick(currentBanner)}
      >
        {/* Banner Content */}
        <div className="flex items-center justify-center text-center">
          <div className="flex items-center space-x-2">
            {currentBanner.provider_logo && (
              <img 
                src={currentBanner.provider_logo} 
                alt={currentBanner.provider_name || 'Provider'}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="font-medium text-sm md:text-base">
              {currentBanner.title}
            </span>
            {currentBanner.is_external && (
              <ExternalLink className="w-4 h-4 ml-1" />
            )}
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
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Next banner"
            >
              <ChevronRight className="w-4 h-4" />
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white/80 scale-110' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerSlider;