import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  Zap,
  Building2,
  Wrench,
  Calculator,
  Lightbulb,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  Globe,
  DollarSign
} from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';
import apiService, { Category as ApiCategory } from '@/services/api';

// Local interface for the header, including nested children
interface Category {
  id: number | string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  children?: Category[];
}

// Helper to map category slugs to icons
const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'geracao-distribuida': return <Zap className="w-4 h-4" />;
    case 'usinas-solares': return <Lightbulb className="w-4 h-4" />;
    case 'armazenamento': return <Calculator className="w-4 h-4" />;
    case 'off-grid': return <Globe className="w-4 h-4" />;
    case 'eficiencia': return <TrendingUp className="w-4 h-4" />;
    case 'financiamento': return <DollarSign className="w-4 h-4" />;
    case 'comunidades': return <Users className="w-4 h-4" />;
    case 'sustentabilidade': return <Shield className="w-4 h-4" />;
    case 'inovacao': return <Rocket className="w-4 h-4" />;
    default: return <Zap className="w-4 h-4" />;
  }
};

// Recursive component to render menu items and their sub-menus
const renderMenuItems = (categories: Category[]) => {
  return categories.map(category => {
    if (category.children && category.children.length > 0) {
      return (
        <DropdownMenuSub key={category.id}>
          <DropdownMenuSubTrigger className="flex items-center space-x-2 w-full">
            {category.icon}
            <span>{category.name}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {renderMenuItems(category.children)} {/* Recursion */}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      );
    }
    return (
      <DropdownMenuItem key={category.id} asChild>
        <Link 
          to={`/categorias/${category.slug}`}
          className="flex items-center space-x-2 w-full"
        >
          {category.icon}
          <span>{category.name}</span>
        </Link>
      </DropdownMenuItem>
    );
  });
};

const EnhancedHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { userLocation } = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const result = await apiService.getCategories();

        // Check if the component is still mounted
        if (cancelled) return;

        // Handle abort signal
        if (result && result.aborted) {
          return;
        }

        // Handle successful response
        if (result && result.ok) {
          // Recursive function to map API data and add icons
          const mapApiData = (apiCats: ApiCategory[]): Category[] => {
            return apiCats.map(cat => ({
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
              icon: getCategoryIcon(cat.slug),
              children: cat.children ? mapApiData(cat.children) : [],
            }));
          };
          setCategories(mapApiData(result.data));
        } else {
          console.debug("Failed to fetch header categories:", result?.error);
        }
      } catch (err: any) {
        // Only log non-abort errors
        if (err?.name !== 'AbortError') {
          console.debug('fetchCategories error', err);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/busca-avancada?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(userLocation || '')}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Compare Solar Logo" 
            className="w-36 h-36 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>Categorias</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              {renderMenuItems(categories)}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/busca-avancada" className="text-sm font-medium hover:text-primary transition-colors">
            Buscar Empresas
          </Link>
          <Link to="/sobre" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </Link>
          <Link to="/contato" className="text-sm font-medium hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder={`Buscar empresas${userLocation ? ` em ${userLocation}` : ''}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Location Display */}
          {userLocation && (
            <div className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <Building2 className="w-3 h-3" />
              <span className="truncate max-w-24">{userLocation}</span>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/empresa/cadastro">Cadastrar Empresa</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder={`Buscar empresas${userLocation ? ` em ${userLocation}` : ''}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground px-2">Categorias</p>
                {categories.map((category) => (
                  <div key={category.id} className="space-y-1">
                    <Link 
                      to={`/categorias/${category.slug}`}
                      className="flex items-center space-x-2 px-2 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </Link>
                    {/* Mobile menu doesn't support cascade, so we can list them indented or just show top-level */}
                  </div>
                ))}
              </div>

              <div className="border-t pt-2 space-y-1">
                <Link 
                  to="/busca-avancada" 
                  className="block px-2 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Buscar Empresas
                </Link>
                <Link 
                  to="/sobre" 
                  className="block px-2 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link 
                  to="/contato" 
                  className="block px-2 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>

              <div className="border-t pt-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/empresa/cadastro" onClick={() => setIsMobileMenuOpen(false)}>Cadastrar Empresa</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default EnhancedHeader;