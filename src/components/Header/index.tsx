import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 h-[72px] flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors">
            Categorias
          </Link>
          <Link to="/search" className="text-gray-600 hover:text-orange-500 transition-colors">
            Buscar Empresas
          </Link>
          <Link to="/sobre" className="text-gray-600 hover:text-orange-500 transition-colors">
            Sobre
          </Link>
          <Link to="/contato" className="text-gray-600 hover:text-orange-500 transition-colors">
            Contato
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empresas em São Paulo..."
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <span>📍</span>
          <span>São Paulo</span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="text-sm">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="text-sm text-gray-600 hover:text-orange-500"
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-orange-500">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="text-sm bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Cadastrar Empresa
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;