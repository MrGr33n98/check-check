from 'react';
import { usePromoBanners } from '../../hooks/usePromoBanners';
import PromoBanner from './PromoBanner';

export const SidebarBanner: React.FC = () => {
  const { getBannerByPosition, loading, error } = usePromoBanners();
  
  console.log('SidebarBanner - loading:', loading, 'error:', error);
  
  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-gray-300 rounded mb-3"></div>
        <div className="h-3 bg-gray-300 rounded mb-6"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    );
  }
  
  if (error) {
    return null; // Não mostrar nada se houver erro
  }
  
  const sidebarBanner = getBannerByPosition('sidebar');
  
  console.log('SidebarBanner - banner found:', sidebarBanner);
  
  if (!sidebarBanner) {
    console.log('SidebarBanner - no banner found for sidebar position');
    return null; // Não mostrar nada se não houver banner
  }
  
  return (
    <div className="mb-6">
      <PromoBanner banner={sidebarBanner} />
    </div>
  );
};

export default SidebarBanner;