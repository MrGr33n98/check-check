import { useState, useEffect } from 'react';
import BannerService from '@/services/bannerService';

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
    const fetchBanners = async () => {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;

      const url = apiUrl
        ? position
          ? `${apiUrl}/promotional_banners/by_position/${position}`
          : `${apiUrl}/promotional_banners`
        : '';

      try {
        if (!apiUrl) {
          throw new Error('VITE_API_URL não configurada');
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Falha ao carregar banners');
        }

        const data = await response.json();
        setBanners(data.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
        try {
          const mock = await BannerService.getAllBanners();
          const mapped: PromoBanner[] = mock.map((b, index) => ({
            id: Number(b.id) || index,
            title: b.title,
            subtitle: b.description,
            button_text: b.ctaText,
            button_url: b.ctaLink,
            background_color: b.backgroundColor,
            text_color: b.textColor,
            position: b.position === 'top' ? 'header' : b.position === 'center' ? 'sidebar' : 'footer',
            priority: b.isPremium ? 1 : 0,
            background_image_url: b.companyLogo,
            show_title: true,
            show_subtitle: !!b.description,
            overlay_enabled: false,
            overlay_color: '#000000',
            overlay_opacity: 0.5,
            text_align: 'left'
          }));
          setBanners(mapped);
          setError('Exibindo banners mockados');
        } catch (mockErr) {
          console.error('Error loading mock banners:', mockErr);
          setBanners([
            {
              id: 0,
              title: 'Confira nossas ofertas',
              background_color: '#f3f3f3',
              text_color: '#333333',
              position: position === 'header' || position === 'footer' ? position : 'sidebar',
              priority: 0,
              show_title: true,
              show_subtitle: false,
              overlay_enabled: false,
              overlay_color: '#000000',
              overlay_opacity: 0.5,
              text_align: 'left'
            }
          ]);
          setError('Não foi possível carregar os banners. Exibindo banner padrão.');
        }
      } finally {
        setLoading(false);
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

