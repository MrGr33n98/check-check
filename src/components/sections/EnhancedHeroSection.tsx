import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '@/contexts/LocationContext';

const EnhancedHeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  const { userLocation, isLocating } = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (userLocation) params.append('location', userLocation);
    if (category !== 'all') params.append('category', category);
    
    navigate(`/busca-avancada?${params.toString()}`);
  };

  return (
    <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{ backgroundImage: "url('/hero-solar-compare.jpg')" }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Encontre e Compare as Melhores Empresas de Energia Solar
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          A plataforma completa para sua jornada solar. Orçamentos, avaliações e os melhores fornecedores em um só lugar.
        </p>
        
        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-2xl flex flex-col md:flex-row items-center gap-2">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="O que você precisa?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-gray-900"
            />
          </div>
          <div className="relative w-full md:w-auto">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={isLocating ? "Detectando..." : "Sua cidade ou estado"}
              value={userLocation || ''}
              readOnly // Location is context-driven
              className="pl-10 text-gray-900"
            />
          </div>
          <Button type="submit" size="lg" className="w-full md:w-auto">
            <Search className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">Buscar</span>
          </Button>
        </form>

        <div className="mt-6 text-sm">
          <span className="text-gray-300">Ou explore por categoria:</span>
          <Button variant="link" className="text-white hover:text-yellow-300" asChild>
            <a href="/categorias/instaladores">Instaladores</a>
          </Button>
          <Button variant="link" className="text-white hover:text-yellow-300" asChild>
            <a href="/categorias/distribuidores">Distribuidores</a>
          </Button>
          <Button variant="link" className="text-white hover:text-yellow-300" asChild>
            <a href="/categorias">Ver todos <ArrowRight className="w-4 h-4 ml-1" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
