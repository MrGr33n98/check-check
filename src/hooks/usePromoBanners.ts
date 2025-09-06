import { useApi } from './useApi';
import { BannersService, type Banner, type BannerList } from '@/lib/api';
import BannerService from '@/services/bannerService';

export type PromoBanner = Banner;

export const usePromoBanners = (position?: Banner['position']) => {
  const apiCall = async (): Promise<{ banners: PromoBanner[]; error: string | null }> => {
    try {
      // Chamada principal usando o cliente gerado (OpenAPI)
      const res: BannerList = position
        ? await BannersService.getBannersByPosition(position)
        : await BannersService.getBanners();

      const banners = res?.data ?? [];
      return { banners, error: null };
    } catch (err) {
      // Fallback: tenta carregar banners mockados
      try {
        const mock = await BannerService.getAllBanners();
        const mapped: PromoBanner[] = mock.map((b: any, index: number) =>
          ({
            id: Number(b.id) || index,
            title: b.title,
            subtitle: b.description,
            button_text: b.ctaText,
            button_url: b.ctaLink,
            background_color: b.backgroundColor,
            text_color: b.textColor,
            position:
              b.position === 'top'
                ? 'header'
                : b.position === 'center'
                ? 'sidebar'
                : 'footer',
            priority: b.isPremium ? 1 : 0,
            background_image_url: b.companyLogo,
            show_title: true,
            show_subtitle: !!b.description,
            overlay_enabled: false,
            overlay_color: '#000000',
            overlay_opacity: 0.5,
            text_align: 'left',
          } as PromoBanner)
        );

        return { banners: mapped, error: 'Exibindo banners mockados' };
      } catch {
        // Último fallback: banner padrão mínimo
        const fallback: PromoBanner = {
          id: 0,
          title: 'Confira nossas ofertas',
          subtitle: undefined as any,
          button_text: undefined as any,
          button_url: undefined as any,
          background_color: '#f3f3f3',
          text_color: '#333333',
          position: (position === 'header' || position === 'footer' ? position : 'sidebar') as PromoBanner['position'],
          priority: 0,
          background_image_url: undefined as any,
          show_title: true,
          show_subtitle: false,
          overlay_enabled: false,
          overlay_color: '#000000',
          overlay_opacity: 0.5,
          text_align: 'left',
        } as PromoBanner;

        return {
          banners: [fallback],
          error: 'Não foi possível carregar os banners. Exibindo banner padrão.',
        };
      }
    }
  };

  const { data, loading, error } = useApi<{ banners: PromoBanner[]; error: string | null }, []>(
    apiCall,
    []
  );

  const banners = data?.banners ?? [];

  const getBannerByPosition = (pos: Banner['position']): PromoBanner | undefined =>
    banners.find(b => b.position === pos);

  return {
    banners,
    loading,
    error: error ?? data?.error ?? null,
    getBannerByPosition,
  };
};
