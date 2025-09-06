import { useApi } from './useApi';
import { BannersService, type Banner, type BannerList } from '@/lib/api';

export type PromoBanner = Banner;

export const usePromoBanners = (position?: Banner['position']) => {
  const apiCall = () =>
    position
      ? BannersService.getBannersByPosition(position)
      : BannersService.getBanners();

  const { data, loading, error } = useApi<BannerList, []>(apiCall, []);

  const banners = data?.data ?? [];

  const getBannerByPosition = (pos: Banner['position']) =>
    banners.find(banner => banner.position === pos);

  return {
    banners,
    loading,
    error,
    getBannerByPosition
  };
};
