import React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';
import { Search, Filter } from 'lucide-react';

interface CategoryHeroProps {
  categoryName?: string;
  categoryDescription?: string;
  companyCount?: number;
  backgroundImage?: string;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({
  categoryName = 'Energia Solar',
  categoryDescription = 'Encontre as melhores empresas de energia solar do Brasil',
  companyCount = 245,
  backgroundImage = '/api/placeholder/1200/400'
}) => {
  return (
    <section 
      className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            {companyCount} empresas verificadas
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {categoryName}
          </h1>
          
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {categoryDescription}
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Buscar empresas, serviços ou localização..."
                  className="pl-10 bg-white text-black border-0 h-12"
                />
              </div>
              <Button size="lg" variant="secondary" className="h-12 px-8">
                <Search className="w-5 h-5 mr-2" />
                Buscar
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                Por Localização
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                Melhor Avaliadas
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                Mais Próximas
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/10 rounded-full"></div>
      </div>
    </section>
  );
};

export default CategoryHero;