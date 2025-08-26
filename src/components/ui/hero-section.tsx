import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  placeholder?: string;
  ctaText?: string;
  trustText?: string;
  quickSearchTerms?: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title,
  subtitle,
  placeholder = "Buscar por empresa, localização ou especialidade...",
  ctaText = "Buscar empresas",
  trustText = "Mais de 50.000 usuários confiam na Compare Solar",
  quickSearchTerms = ["São Paulo", "Rio de Janeiro", "Residencial", "Comercial", "Industrial"]
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/buscar');
    }
  };

  const handleQuickSearch = (term: string) => {
    navigate(`/buscar?q=${encodeURIComponent(term)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </h2>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2 p-2 bg-white rounded-lg shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 border-0 focus-visible:ring-0 text-base h-12"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="px-8 h-12">
                {ctaText}
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm text-gray-600 mr-2">Buscar por:</span>
              {quickSearchTerms.map((item) => (
                <button
                  key={item}
                  onClick={() => handleQuickSearch(item)}
                  className="text-sm bg-white/80 hover:bg-white text-gray-700 hover:text-primary px-3 py-1 rounded-full border border-gray-200 hover:border-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-gray-600">
            {trustText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;