from 'react';
import { Button } from './button';
import { Input } from './input';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  showSearch?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title = 'Encontre as Melhores Empresas de Energia Solar',
  subtitle = 'Compare preços, avaliações e serviços das principais empresas de energia solar do Brasil',
  backgroundImage = '/hero-solar-compare.jpg',
  showSearch = true
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Searching for:', searchTerm);
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {subtitle}
          </p>
          
          {showSearch && (
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Digite sua cidade ou região..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-gray-900"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  Buscar Empresas
                </Button>
              </div>
            </form>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Como Funciona
            </Button>
            <Button size="lg" className="bg-green-500 hover:bg-green-600">
              Cadastrar Empresa
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Empresas Cadastradas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10k+</div>
            <div className="text-blue-100">Avaliações Verificadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50k+</div>
            <div className="text-blue-100">Orçamentos Realizados</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;