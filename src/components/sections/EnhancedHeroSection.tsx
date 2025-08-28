import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';



const EnhancedHeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'city' | 'cep'>('city');
  const { userLocation, setUserLocation } = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Atualizar localização se necessário
      if (searchQuery !== userLocation) {
        setUserLocation(searchQuery);
      }
      // Redirecionar para página de resultados
      window.location.href = `/buscar?location=${encodeURIComponent(searchQuery)}`;
    }
  };

  const detectSearchType = (value: string) => {
    // Detectar se é CEP (formato: 12345-678 ou 12345678)
    const cepPattern = /^\d{5}-?\d{3}$/;
    if (cepPattern.test(value.replace(/\D/g, ''))) {
      setSearchType('cep');
    } else {
      setSearchType('city');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    detectSearchType(value);
  };

  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        height: 'calc(100vh - var(--nav-h, 72px))',
        marginTop: 'var(--nav-h, 72px)'
      }}
    >
      {/* Floating elements for visual interest - MUITO MAIORES */}
      <div className="absolute top-1/6 left-1/6 w-64 h-64 bg-orange-200/25 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-yellow-200/25 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse delay-2000" />
      
      {/* Main content container - MUITO MAIOR */}
      <div className="relative z-10 w-full max-w-7xl px-6 text-center">
        {/* Hero title - GIGANTE */}
        <div className="mb-16 space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Encontre as
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600">
              {' '}melhores empresas{' '}
            </span>
            de energia solar
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Compare preços, avaliações e serviços na sua região
          </p>
        </div>

        {/* Enhanced search form - MUITO MAIOR */}
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-6 max-[360px]:flex-col">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder={searchType === 'cep' ? 'Digite seu CEP (ex: 01234-567)' : 'Digite sua cidade (ex: São Paulo, SP)'}
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="h-20 text-2xl px-8 bg-white/95 backdrop-blur-md border-4 border-white/60 shadow-2xl rounded-2xl focus:ring-4 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:shadow-3xl font-medium"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-20 px-12 text-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 min-w-[280px]"
                disabled={!searchQuery.trim()}
              >
                <Search className="w-8 h-8 mr-4" />
                Buscar Empresas
              </Button>
            </div>
            
            {/* Quick stats - MAIORES */}
            <div className="flex justify-center items-center space-x-12 mt-12 text-lg md:text-xl text-gray-700 font-medium">
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <span>500+ empresas</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <span>25.000+ clientes</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                <span>4.8★ avaliação</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;