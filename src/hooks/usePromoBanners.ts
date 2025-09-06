import BannerService from '@/services/bannerService';
import { useQuery } from '@tanstack/react-query';

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
  const query = useQuery({
    queryKey: ['promoBanners', position],
    queryFn: async (): Promise<{ banners: PromoBanner[]; error: string | null }> => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = apiUrl
        ? position
          ? `${apiUrl.replace('/api/v1', '')}/banners/by_position/${position}`
          : `${apiUrl.replace('/api/v1', '')}/banners`
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
        const mappedBanners = data.data.map((banner: any) => ({
          ...banner,
          background_image_url: banner.image_url,
        }));
        return { banners: mappedBanners, error: null };
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
          return { banners: mapped, error: 'Exibindo banners mockados' };
        } catch (mockErr) {
          console.error('Error loading mock banners:', mockErr);
          return {
            banners: [
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
            ],
            error: 'Não foi possível carregar os banners. Exibindo banner padrão.',
          };
        }
      }
    },
  });

  const getBannerByPosition = (pos: string): PromoBanner | undefined => {
    return query.data?.banners.find(banner => banner.position === pos);
  };

  return {
    banners: query.data?.banners ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : query.data?.error ?? null,
    getBannerByPosition,
  };
};

