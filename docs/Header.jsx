import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Sun, Menu, X, User, LogOut, Settings, Building } from 'lucide-react';

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">SolarFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors">
              Home
            </Link>
            <a href="#companies" className="text-gray-700 hover:text-orange-500 transition-colors">
              Companies
            </a>
            <a href="#guides" className="text-gray-700 hover:text-orange-500 transition-colors">
              Guides
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors">
              About
            </a>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {(user.role === 'admin' || user.role === 'moderator') && (
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link to="/register">Cadastrar</Link>
                </Button>
                <Button asChild variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  <Link to="/company-registration" className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>Cadastrar Empresa</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                Home
              </Link>
              <a href="#companies" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                Companies
              </a>
              <a href="#guides" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                Guides
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                About
              </a>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center space-x-2 px-3 py-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <Button type="submit" size="sm">
                  Search
                </Button>
              </form>

              {/* Mobile User Menu */}
              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <div className="text-gray-700 font-medium">Olá, {user.name}</div>
                  {(user.role === 'admin' || user.role === 'moderator') && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                    <Link to="/register">Cadastrar</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-orange-500 text-orange-500" asChild>
                    <Link to="/company-registration" className="flex items-center justify-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Cadastrar Empresa</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

