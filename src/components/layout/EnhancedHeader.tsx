import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  Lightbulb
} from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  subcategories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Instalação Solar',
    slug: 'instalacao-solar',
    icon: <Zap className="w-4 h-4" />,
    subcategories: [
      { id: '1-1', name: 'Residencial', slug: 'residencial' },
      { id: '1-2', name: 'Comercial', slug: 'comercial' },
      { id: '1-3', name: 'Industrial', slug: 'industrial' }
    ]
  },
  {
    id: '2',
    name: 'Manutenção',
    slug: 'manutencao',
    icon: <Wrench className="w-4 h-4" />,
    subcategories: [
      { id: '2-1', name: 'Preventiva', slug: 'preventiva' },
      { id: '2-2', name: 'Corretiva', slug: 'corretiva' },
      { id: '2-3', name: 'Limpeza', slug: 'limpeza' }
    ]
  },
  {
    id: '3',
    name: 'Consultoria',
    slug: 'consultoria',
    icon: <Lightbulb className="w-4 h-4" />,
    subcategories: [
      { id: '3-1', name: 'Projeto', slug: 'projeto' },
      { id: '3-2', name: 'Financiamento', slug: 'financiamento' },
      { id: '3-3', name: 'Homologação', slug: 'homologacao' }
    ]
  },
  {
    id: '4',
    name: 'Monitoramento',
    slug: 'monitoramento',
    icon: <Calculator className="w-4 h-4" />
  }
];

const EnhancedHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { userLocation } = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirecionar para página de busca com query
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(userLocation || '')}`;
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
            <DropdownMenuContent className="w-56">
              {categories.map((category) => (
                <div key={category.id}>
                  <DropdownMenuItem asChild>
                    <Link 
                      to={`/categorias/${category.slug}`}
                      className="flex items-center space-x-2 w-full"
                    >
                      <span className="flex items-center space-x-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  {category.subcategories && (
                    <div className="pl-6">
                      {category.subcategories.map((sub) => (
                        <DropdownMenuItem key={sub.id} asChild>
                          <Link 
                            to={`/categorias/${category.slug}/${sub.slug}`}
                            className="text-sm text-muted-foreground"
                          >
                            {sub.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/buscar" className="text-sm font-medium hover:text-primary transition-colors">
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
                    {category.subcategories && (
                      <div className="pl-6 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link 
                            key={sub.id}
                            to={`/categorias/${category.slug}/${sub.slug}`}
                            className="block px-2 py-1 text-sm text-muted-foreground hover:bg-muted rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t pt-2 space-y-1">
                <Link 
                  to="/buscar" 
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