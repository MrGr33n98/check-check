import React from 'react';
import { useLocation } from 'react-router-dom';
import { LocationProvider } from '@/contexts/LocationContext';
import DynamicBannerSlider from '@/components/DynamicBannerSlider';
import EnhancedHeader from '@/components/layout/EnhancedHeader';

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
        {/* Dynamic Banners */}
        <DynamicBannerSlider 
          autoRotate={true}
          rotationInterval={5000}
          showControls={true}
          showCloseButton={true}
          height="200px"
          className="mb-4"
        />
        
        {/* Enhanced Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <EnhancedHeader />
        </div>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">SolarFinder</h3>
              <p className="text-sm text-muted-foreground">
                Encontre as melhores empresas de energia solar do Brasil.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/sobre">Sobre</a></li>
                <li><a href="/como-funciona">Como Funciona</a></li>
                <li><a href="/contato">Contato</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/privacidade">Privacidade</a></li>
                <li><a href="/termos">Termos</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Para Empresas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/empresa/cadastro">Cadastrar Empresa</a></li>
                <li><a href="/login">Login</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 SolarFinder. Todos os direitos reservados.
          </div>
        </div>
      </footer>
      </div>
    </LocationProvider>
  );
};

export default Layout;