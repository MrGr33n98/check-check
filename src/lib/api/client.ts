import type { BannerList } from './types';

const baseUrl = (import.meta.env.VITE_API_URL || '').replace('/api/v1', '');

async function request(path: string): Promise<BannerList> {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw new Error('Falha ao carregar banners');
  }
  return response.json();
}

export const BannersService = {
  getBanners(): Promise<BannerList> {
    return request('/banners');
  },
  getBannersByPosition(position: string): Promise<BannerList> {
    return request(`/banners/by_position/${position}`);
  }
};

export type { Banner, BannerList } from './types';
