import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  MapPin, 
  Zap, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  Play
} from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';
import compareSolarImage from '@/assets/compare-solar.jpg';

interface HeroStats {
  companies: string;
  projects: string;
  savings: string;
  customers: string;
}

const heroStats: HeroStats = {
  companies: '500+',
  projects: '10.000+',
  savings: 'R$ 50M+',
  customers: '25.000+'
};

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
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${compareSolarImage})` }}
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-yellow-900/70 to-orange-800/80" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-orange-300/30 rounded-full blur-xl animate-pulse delay-2000" />

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
              <Zap className="w-4 h-4" />
              <span>Plataforma #1 em Energia Solar</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                Encontre as
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
                  {' '}melhores empresas{' '}
                </span>
                de energia solar
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-md">
                Compare preços, avaliações e serviços de centenas de empresas especializadas em energia solar. 
                Encontre a solução perfeita para sua casa ou empresa.
              </p>
            </div>

            {/* Search Form */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {searchType === 'cep' ? 'Digite seu CEP:' : 'Digite sua cidade:'}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder={searchType === 'cep' ? 'Ex: 01234-567' : 'Ex: São Paulo, SP'}
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="pl-12 pr-4 h-12 text-lg border-2 focus:border-orange-500"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
                    disabled={!searchQuery.trim()}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Buscar Empresas
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>

                {/* Current Location Display */}
                {userLocation && (
                  <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center space-x-2 text-sm text-orange-700 dark:text-orange-300">
                      <MapPin className="w-4 h-4" />
                      <span>Localização atual: <strong>{userLocation}</strong></span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                <Play className="w-4 h-4 mr-2" />
                Como funciona
              </Button>
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                Empresas certificadas
              </Button>
            </div>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className="space-y-8">
            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-8 shadow-2xl">
                <div className="w-full h-full bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white">
                    <Zap className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-semibold opacity-90">Energia Solar</p>
                    <p className="text-sm opacity-70">Sustentável & Econômica</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold">Economia</p>
                    <p className="text-xs text-muted-foreground">Até 95%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-semibold">Clientes</p>
                    <p className="text-xs text-muted-foreground">{heroStats.customers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-orange-600">{heroStats.companies}</div>
                  <div className="text-sm text-muted-foreground">Empresas</div>
                </CardContent>
              </Card>
              
              <Card className="p-4 text-center border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-orange-600">{heroStats.projects}</div>
                  <div className="text-sm text-muted-foreground">Projetos</div>
                </CardContent>
              </Card>
              
              <Card className="p-4 text-center border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-orange-600">{heroStats.savings}</div>
                  <div className="text-sm text-muted-foreground">Economia</div>
                </CardContent>
              </Card>
              
              <Card className="p-4 text-center border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-orange-600">4.8★</div>
                  <div className="text-sm text-muted-foreground">Avaliação</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;