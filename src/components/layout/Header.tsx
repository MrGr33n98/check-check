import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 lg:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-24 w-24 bg-primary rounded-lg" /> {/* Larger placeholder for logo */}
            <span className="text-lg lg:text-xl font-bold text-foreground hidden sm:block">
              SolarFinder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors font-medium flex items-center px-3 py-2"
              >
                Categorias
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              {isCategoriesOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-background border rounded-md shadow-lg py-2 z-50">
                  <div className="grid grid-cols-1 gap-1 px-2">
                    <Link 
                      to="/categoria/geracao-distribuida" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Geração Distribuída
                    </Link>
                    <Link 
                      to="/categoria/usinas-solares" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Usinas Solares de Grande Porte
                    </Link>
                    <Link 
                      to="/categoria/armazenamento" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Armazenamento de Energia
                    </Link>
                    <Link 
                      to="/categoria/off-grid" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Energia Off-Grid
                    </Link>
                    <Link 
                      to="/categoria/eficiencia" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Eficiência Energética
                    </Link>
                    <Link 
                      to="/categoria/financiamento" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Financiamento e Crédito Solar
                    </Link>
                    <Link 
                      to="/categoria/comunidades" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Comunidades de Energia
                    </Link>
                    <Link 
                      to="/categoria/sustentabilidade" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Sustentabilidade e ESG
                    </Link>
                    <Link 
                      to="/categoria/inovacao" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Inovação e Novas Tecnologias
                    </Link>
                  </div>
                  <div className="border-t mt-2 pt-2 px-4 py-2">
                    <Link 
                      to="/categorias" 
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Ver todas as categorias
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsBusinessOpen(true)}
              onMouseLeave={() => setIsBusinessOpen(false)}
            >
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors font-medium flex items-center px-3 py-2"
              >
                Para empresas
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              {isBusinessOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-background border rounded-md shadow-lg py-2 z-50">
                  <div className="grid grid-cols-1 gap-1 px-2">
                    <Link 
                      to="/empresa/cadastro" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      Cadastrar minha empresa
                    </Link>
                    <Link 
                      to="/empresa/dashboard" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      Painel de controle
                    </Link>
                    <Link 
                      to="/empresa/recursos" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      Recursos para empresas
                    </Link>
                    <Link 
                      to="/empresa/suporte" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      Suporte empresarial
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to="/blog" 
              className="text-foreground hover:text-primary transition-colors font-medium px-3 py-2"
            >
              Blog
            </Link>
            
            <Link to="/avaliar-empresa">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 h-auto">
                Avaliar empresas
              </Button>
            </Link>
            
            <Link to="/encontrar-empresas">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 h-auto">
                Encontrar empresas
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              <div className="px-2 py-1">
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-primary font-medium w-full justify-start p-0 h-auto"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  Categorias
                </Button>
                {isCategoriesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link 
                      to="/categoria/geracao-distribuida" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Geração Distribuída
                    </Link>
                    <Link 
                      to="/categoria/usinas-solares" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Usinas Solares de Grande Porte
                    </Link>
                    <Link 
                      to="/categoria/armazenamento" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Armazenamento de Energia
                    </Link>
                    <Link 
                      to="/categoria/off-grid" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Energia Off-Grid
                    </Link>
                    <Link 
                      to="/categoria/eficiencia" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Eficiência Energética
                    </Link>
                    <Link 
                      to="/categoria/financiamento" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Financiamento e Crédito Solar
                    </Link>
                    <Link 
                      to="/categoria/comunidades" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Comunidades de Energia
                    </Link>
                    <Link 
                      to="/categoria/sustentabilidade" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sustentabilidade e ESG
                    </Link>
                    <Link 
                      to="/categoria/inovacao" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Inovação e Novas Tecnologias
                    </Link>
                    <Link 
                      to="/categorias" 
                      className="block px-4 py-2 text-primary hover:text-primary/80 font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Ver todas as categorias
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="px-2 py-1">
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-primary font-medium w-full justify-start p-0 h-auto"
                  onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                >
                  Para empresas
                </Button>
                {isBusinessOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link 
                      to="/empresa/cadastro" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cadastrar minha empresa
                    </Link>
                    <Link 
                      to="/empresa/dashboard" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Painel de controle
                    </Link>
                    <Link 
                      to="/empresa/recursos" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Recursos para empresas
                    </Link>
                    <Link 
                      to="/empresa/suporte" 
                      className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Suporte empresarial
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/blog" 
                className="text-foreground hover:text-primary px-2 py-1 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              <Link 
                to="/avaliar-empresa" 
                className="px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  Avaliar empresas
                </Button>
              </Link>
              
              <Link 
                to="/encontrar-empresas" 
                className="px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                  Encontrar empresas
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;