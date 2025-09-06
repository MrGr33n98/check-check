import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { utmTracker, UTMParameters } from '../../utils/utmTracking';

interface PromotionalBanner {
  id: number;
  title: string;
  description: string;
  cta_text: string;
  url: string;
  image_url: string;
  background_color: string;
  text_color: string;
  provider_name?: string;
  provider_logo?: string;
  final_url: string;
  is_external: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface PromoBannerSidebarProps {
  position: string;
  className?: string;
}

const PromoBannerSidebar: React.FC<PromoBannerSidebarProps> = ({ position, className = '' }) => {
  const [banner, setBanner] = useState<PromotionalBanner | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/promotional_banners/by_position/${position}?limit=1`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setBanner(data.data[0]);
          setError(null);
        } else {
          setBanner(null);
          setError(data.error || 'No banner available for this position');
        }
      } catch (err) {
        console.error(`Error fetching banner for position ${position}:`, err);
        setError('Failed to load banner');
        setBanner(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, [position]);

  useEffect(() => {
    if (banner) {
      const registerImpression = async () => {
        try {
          await fetch(`/api/v1/promotional_banners/${banner.id}/impression`, { method: 'POST' });
          const utmParams: UTMParameters = {
            utm_source: banner.utm_source,
            utm_medium: banner.utm_medium,
            utm_campaign: banner.utm_campaign,
            utm_term: banner.utm_term,
            utm_content: banner.utm_content
          };
          utmTracker.trackImpression(banner.id, banner.title, banner.provider_name, utmParams);
        } catch (err) {
          console.error('Error registering impression:', err);
        }
      };
      registerImpression();
    }
  }, [banner]);

  const handleBannerClick = async () => {
    if (!banner) return;
    try {
      const response = await fetch(`/api/v1/promotional_banners/${banner.id}/click`, { method: 'POST' });
      const data = await response.json();
      const finalUrl = data.success && data.redirect_url ? data.redirect_url : banner.final_url;
      
      const utmParams: UTMParameters = {
        utm_source: banner.utm_source,
        utm_medium: banner.utm_medium,
        utm_campaign: banner.utm_campaign,
        utm_term: banner.utm_term,
        utm_content: banner.utm_content
      };
      utmTracker.trackClick(banner.id, banner.title, finalUrl, banner.provider_name, utmParams);

      if (banner.is_external) {
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = finalUrl;
      }
    } catch (err) {
      console.error('Error registering click:', err);
      // Fallback navigation
      if (banner.is_external) {
        window.open(banner.final_url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = banner.final_url;
      }
    }
  };

  const closeBanner = () => {
    setIsVisible(false);
    sessionStorage.setItem(`promo-banner-${position}-closed`, 'true');
  };

  useEffect(() => {
    const wasClosed = sessionStorage.getItem(`promo-banner-${position}-closed`);
    if (wasClosed === 'true') {
      setIsVisible(false);
    }
  }, [position]);

  if (!isVisible || isLoading || error || !banner) {
    return null;
  }

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg ${className}`} style={{ backgroundColor: banner.background_color, color: banner.text_color }}>
      <button
        onClick={closeBanner}
        className="absolute top-2 right-2 p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-10"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="cursor-pointer" onClick={handleBannerClick}>
        {banner.image_url && (
          <img src={banner.image_url} alt={banner.title} className="w-full h-32 object-cover" />
        )}
        <div className="p-4">
          <h4 className="font-bold text-lg">{banner.title}</h4>
          <p className="text-sm mt-1 mb-3">{banner.description}</p>
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold" style={{ backgroundColor: banner.text_color, color: banner.background_color }}>
            {banner.cta_text}
            {banner.is_external && <ExternalLink className="w-4 h-4 ml-2" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBannerSidebar;
