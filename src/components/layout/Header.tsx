import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import apiService, { Category } from '@/services/api';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Refs para controlar os timers dos dropdowns
  const categoriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const businessTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Carregar categorias ao montar o componente
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await apiService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Funções para controlar o dropdown de Categorias com delay
  const handleCategoriesMouseEnter = () => {
    if (categoriesTimeoutRef.current) {
      clearTimeout(categoriesTimeoutRef.current);
    }
    setIsCategoriesOpen(true);
  };

  const handleCategoriesMouseLeave = () => {
    categoriesTimeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 300); // 300ms de delay
  };

  // Funções para controlar o dropdown de Para Empresas com delay
  const handleBusinessMouseEnter = () => {
    if (businessTimeoutRef.current) {
      clearTimeout(businessTimeoutRef.current);
    }
    setIsBusinessOpen(true);
  };

  const handleBusinessMouseLeave = () => {
    businessTimeoutRef.current = setTimeout(() => {
      setIsBusinessOpen(false);
    }, 300); // 300ms de delay
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-full px-6 py-1">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="SolarFinder - Página inicial"
          >
            <img 
              src={logo} 
              alt="Logo SolarFinder" 
              className="h-36 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <div 
              className="relative"
              onMouseEnter={handleCategoriesMouseEnter}
              onMouseLeave={handleCategoriesMouseLeave}
            >
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center px-3 py-2 h-10"
              >
                Categorias
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              {isCategoriesOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={handleCategoriesMouseEnter}
                  onMouseLeave={handleCategoriesMouseLeave}
                >
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {categories.map((category) => (
                      <Link 
                        key={category.id}
                        to={`/categorias/${category.slug}`} 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t mt-2 pt-2 px-4 py-2">
                    <Link 
                      to="/categorias" 
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
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
              onMouseEnter={handleBusinessMouseEnter}
              onMouseLeave={handleBusinessMouseLeave}
            >
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center px-3 py-2 h-10"
              >
                Para empresas
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              {isBusinessOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={handleBusinessMouseEnter}
                  onMouseLeave={handleBusinessMouseLeave}
                >
                  <div className="grid grid-cols-1 gap-1 px-2">
                    <Link 
                      to="/empresa/cadastro" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      Cadastrar minha empresa
                    </Link>
                    <Link 
                      to="/empresa/dashboard" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      Painel de controle
                    </Link>
                    <Link 
                      to="/empresa/recursos" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      onClick={() => setIsBusinessOpen(false)}
                    >
                      Recursos para empresas
                    </Link>
                    <Link 
                      to="/empresa/suporte" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
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
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 h-10 flex items-center"
            >
              Blog
            </Link>
            
            <div className="flex items-center gap-3 ml-4">
              <Link to="/avaliar-empresa">
                <Button 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors px-4 py-2 h-10 min-w-[130px] font-medium"
                >
                  Avaliar empresas
                </Button>
              </Link>
              
              <Link to="/encontrar-empresas">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 h-9 min-w-[130px] font-medium shadow-sm">
                  Encontrar empresas
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Abrir menu"
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
                  className="text-gray-700 hover:text-blue-600 font-medium w-full justify-start p-0 h-auto"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  Categorias
                </Button>
                {isCategoriesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {categories.map((category) => (
                      <Link 
                        key={category.id}
                        to={`/categorias/${category.slug}`} 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link 
                      to="/categorias" 
                      className="block px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
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
                  className="text-gray-700 hover:text-blue-600 font-medium w-full justify-start p-0 h-auto"
                  onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                >
                  Para empresas
                </Button>
                {isBusinessOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link 
                      to="/empresa/cadastro" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cadastrar minha empresa
                    </Link>
                    <Link 
                      to="/empresa/dashboard" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Painel de controle
                    </Link>
                    <Link 
                      to="/empresa/recursos" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Recursos para empresas
                    </Link>
                    <Link 
                      to="/empresa/suporte" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Suporte empresarial
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-blue-600 px-2 py-1 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              <div className="space-y-3 px-2 py-1">
                <Link 
                  to="/avaliar-empresa" 
                  className="block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button 
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full h-9 font-medium"
                  >
                    Avaliar empresas
                  </Button>
                </Link>
                
                <Link 
                  to="/encontrar-empresas" 
                  className="block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full h-9 font-medium">
                    Encontrar empresas
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;