import { useState, useEffect } from 'react';

export interface PromoBanner {
  id: number;
  title: string;
  subtitle?: string;
  button_text?: string;
  button_url?: string;
  button_secondary_text?: string;
  button_secondary_url?: string;
  background_color: string;
  text_color: string;
  position: 'sidebar' | 'header' | 'footer';
  priority: number;
  background_image_url?: string;
  // New fields
  show_title: boolean;
  show_subtitle: boolean;
  overlay_enabled: boolean;
  overlay_color: string;
  overlay_opacity: number;
  text_align: 'left' | 'center' | 'right';
}

export const usePromoBanners = (position?: string) => {
  const [banners, setBanners] = useState<PromoBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async (retries = 3, delay = 1000) => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
        const url = position
          ? `${apiUrl}/promotional_banners/by_position/${position}`
          : `${apiUrl}/promotional_banners`;
        
        console.log('Fetching banners from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Falha ao carregar banners');
        }
        
        const data = await response.json();
        console.log('Banners received:', data);
        setBanners(data.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
        if (retries > 0) {
          setTimeout(() => fetchBanners(retries - 1, delay * 2), delay + Math.random() * 1000);
        } else {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
          setLoading(false);
        }
      }
    };

    fetchBanners();
  }, [position]);

  const getBannerByPosition = (pos: string): PromoBanner | undefined => {
    return banners.find(banner => banner.position === pos);
  };

  return {
    banners,
    loading,
    error,
    getBannerByPosition
  };
};

