import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Settings, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm = '',
  onSearchChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SF</span>
            </div>
            <span className="text-lg lg:text-xl font-bold text-foreground hidden sm:block">
              SolarFinder
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar empresas de energia solar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:block">{user.name}</span>
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg py-1 z-50">
                    {(user.role === 'admin' || user.role === 'moderator') && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2 inline" />
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Entrar
                </Link>
                <Button asChild>
                  <Link to="/register">Cadastrar</Link>
                </Button>
                <Button asChild variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 hidden lg:flex">
                  <Link to="/company-registration" className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>Cadastrar Empresa</span>
                  </Link>
                </Button>
              </div>
            )}
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

        {/* Mobile search bar */}
        <div className="lg:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  {(user.role === 'admin' || user.role === 'moderator') && (
                    <Link
                      to="/dashboard"
                      className="text-foreground hover:text-primary px-2 py-1 flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="text-foreground hover:text-primary px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-foreground hover:text-primary px-2 py-1 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-foreground hover:text-primary px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="text-foreground hover:text-primary px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cadastrar
                  </Link>
                  <Link
                    to="/company-registration"
                    className="text-foreground hover:text-primary px-2 py-1 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Cadastrar Empresa
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;