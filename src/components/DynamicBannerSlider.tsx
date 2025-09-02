import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { usePromoBanners, PromoBanner } from '@/hooks/usePromoBanners';

interface DynamicBannerSliderProps {
  position: 'header' | 'sidebar' | 'footer';
  className?: string;
}

const DynamicBannerSlider: React.FC<DynamicBannerSliderProps> = ({
  position,
  className = ''
}) => {
  const { banners, loading, error } = usePromoBanners(position);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (loading) return <div>Loading banners...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isVisible || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const containerStyle: React.CSSProperties = {
    backgroundColor: currentBanner.background_color,
    color: currentBanner.text_color,
    textAlign: currentBanner.text_align,
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    aspectRatio: '16 / 9',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '24px',
  };

  const overlayStyle: React.CSSProperties = {
    display: currentBanner.overlay_enabled ? 'block' : 'none',
    position: 'absolute',
    inset: 0,
    backgroundColor: currentBanner.overlay_color,
    opacity: currentBanner.overlay_opacity / 100,
    zIndex: 1,
  };

  const buttonStyle = (isPrimary: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.2,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '3.5em',
    transition: 'transform 0.2s ease',
    backgroundColor: isPrimary ? currentBanner.text_color : 'transparent',
    color: isPrimary ? currentBanner.background_color : currentBanner.text_color,
    border: isPrimary ? '2px solid transparent' : `2px solid ${currentBanner.text_color}`,
  });

  return (
    <div className={`promo-banner-container ${className}`} style={containerStyle}>
      {currentBanner.background_image_url && (
        <img src={currentBanner.background_image_url} alt={currentBanner.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      )}
      <div style={overlayStyle}></div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        {currentBanner.show_title && <h2>{currentBanner.title}</h2>}
        {currentBanner.show_subtitle && <p>{currentBanner.subtitle}</p>}
        <div>
          {currentBanner.button_text && (
            <a href={currentBanner.button_url} style={buttonStyle(true)}>{currentBanner.button_text}</a>
          )}
          {currentBanner.button_secondary_text && (
            <a href={currentBanner.button_secondary_url} style={buttonStyle(false)}>{currentBanner.button_secondary_text}</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicBannerSlider;
