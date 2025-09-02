import React from 'react';
import { useLocation } from 'react-router-dom';
import { LocationProvider } from '@/contexts/LocationContext';
import DynamicBannerSlider from '@/components/DynamicBannerSlider';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import Footer from '@/components/layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  // Ajuste: somente páginas de dashboard devem ocultar header/footer, não a página de cadastro
  const isDashboard = location.pathname.startsWith('/empresa/') && location.pathname !== '/empresa/cadastro';

  if (isDashboard) {
    // For dashboard pages, just render children without header/footer
    return <>{children}</>;
  }

  return (
    <LocationProvider>
      <div className="min-h-screen bg-transparent relative z-10">
        {/* Enhanced Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <EnhancedHeader />
        </div>

      {/* Main content */}
      <main className="flex-1 pt-4">
        {children}
      </main>

      {/* Modern Footer */}
      <Footer />
      </div>
    </LocationProvider>
  );
};

export default Layout;