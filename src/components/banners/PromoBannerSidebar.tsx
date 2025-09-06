import React, { useState, useEffect } from 'react';
import { usePromoBanners } from '@/hooks/usePromoBanners';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromoBannerSidebar: React.FC = () => {
  const { banners, loading, error } = usePromoBanners('sidebar');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure banners is an array before using it in useEffect
  useEffect(() => {
    if (!Array.isArray(banners) || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banners]);

  // Conditional rendering for loading, error, and empty states
  if (loading) {
    return (
      <div className="relative w-full p-6 rounded-xl overflow-hidden flex flex-col items-center justify-center aspect-square max-w-sm mx-auto bg-gray-200 animate-pulse">
        <p className="text-center font-semibold mb-2">Carregando banners...</p>
        <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mt-4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full p-6 rounded-xl overflow-hidden flex flex-col items-center justify-center aspect-square max-w-sm mx-auto bg-red-100 text-red-700">
        <p className="text-center font-semibold mb-2">Erro ao carregar banners.</p>
        <p className="text-center text-sm">{error}</p>
      </div>
    );
  }

  if (!Array.isArray(banners) || banners.length === 0) {
    return (
      <div className="relative w-full p-6 rounded-xl overflow-hidden flex flex-col items-center justify-center aspect-square max-w-sm mx-auto bg-gray-100 text-gray-600">
        <p className="text-center font-semibold mb-2">Nenhum banner disponível.</p>
        <p className="text-center text-sm">Verifique as configurações ou adicione novos banners.</p>
      </div>
    );
  }

  // If we reach here, banners is guaranteed to be a non-empty array
  const banner = banners[currentIndex];

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: banner.background_color,
    backgroundImage: banner.background_image_url
      ? `url(${banner.background_image_url})`
      : `linear-gradient(135deg, ${banner.background_color || '#667eea'} 0%, ${banner.background_color || '#764ba2'} 100%)`, // Fallback gradient
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: banner.text_color,
    textAlign: banner.text_align as React.CSSProperties['textAlign'],
  };

  const overlayStyle: React.CSSProperties = {
    display: banner.overlay_enabled ? 'block' : 'none',
    position: 'absolute',
    inset: 0,
    backgroundColor: banner.overlay_color,
    opacity: banner.overlay_opacity / 100,
    zIndex: 1,
    borderRadius: 'inherit',
  };

  const buttonStyle = (isPrimary: boolean): React.CSSProperties => ({
    backgroundColor: isPrimary ? banner.text_color : 'transparent',
    color: isPrimary ? banner.background_color : banner.text_color,
    border: `2px solid ${banner.text_color}`,
  });

  return (
    <div style={containerStyle} className="relative w-full p-6 rounded-xl overflow-hidden flex flex-col items-center justify-center aspect-square max-w-sm mx-auto">
      <div style={overlayStyle}></div>
      <div className="relative z-10 flex flex-col h-full text-center">
        {banner.show_title && <h3 className="text-xl font-bold mb-2">{banner.title}</h3>}
        {banner.show_subtitle && <p className="text-sm opacity-90 mb-4 flex-grow">{banner.subtitle}</p>}
        <div className="mt-auto flex flex-col space-y-2 w-full">
            {banner.button_text && (
                <Link to={banner.button_url || '#'} className="w-full py-2 px-4 rounded-lg font-semibold transition-transform transform hover:scale-105" style={buttonStyle(true)}>
                    {banner.button_text}
                </Link>
            )}
            {banner.button_secondary_text && (
                <Link to={banner.button_secondary_url || '#'} className="w-full py-2 px-4 rounded-lg font-semibold transition-transform transform hover:scale-105" style={buttonStyle(false)}>
                          {banner.button_secondary_text}
                      </Link>
                  )}
              </div>
            </div>

            {banners.length > 1 && (
              <>
                <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full z-20 hover:bg-black/50">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full z-20 hover:bg-black/50">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        );
};

export default PromoBannerSidebar;