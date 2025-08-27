import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Home, 
  Building2, 
  Factory, 
  Wrench, 
  Calculator, 
  Lightbulb, 
  Shield,
  ArrowRight
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  projects: number;
  slug: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Instalação Residencial',
    description: 'Sistemas solares para casas e apartamentos',
    icon: <Home className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    projects: 1250,
    slug: 'residencial'
  },
  {
    id: '2',
    name: 'Instalação Comercial',
    description: 'Soluções para empresas e comércios',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    projects: 850,
    slug: 'comercial'
  },
  {
    id: '3',
    name: 'Instalação Industrial',
    description: 'Grandes sistemas para indústrias',
    icon: <Factory className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    projects: 320,
    slug: 'industrial'
  },
  {
    id: '4',
    name: 'Manutenção',
    description: 'Serviços de manutenção e reparo',
    icon: <Wrench className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    projects: 2100,
    slug: 'manutencao'
  },
  {
    id: '5',
    name: 'Consultoria',
    description: 'Projetos e consultoria especializada',
    icon: <Lightbulb className="w-8 h-8" />,
    color: 'from-yellow-500 to-yellow-600',
    projects: 680,
    slug: 'consultoria'
  },
  {
    id: '6',
    name: 'Monitoramento',
    description: 'Sistemas de monitoramento e análise',
    icon: <Calculator className="w-8 h-8" />,
    color: 'from-teal-500 to-teal-600',
    projects: 950,
    slug: 'monitoramento'
  }
];

const CategoriesSection: React.FC = () => {
  const handleCategoryClick = (slug: string) => {
    window.location.href = `/categorias/${slug}`;
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Categorias Populares</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Encontre o Serviço Ideal
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore nossas categorias de serviços em energia solar e encontre 
            empresas especializadas para cada tipo de projeto.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white dark:bg-gray-800 overflow-hidden"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.projects.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      projetos
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  {category.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-medium group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                  <span>Ver empresas</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 rounded-2xl p-8 border border-orange-100 dark:border-orange-900/30">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Não encontrou o que procura?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nossa equipe pode ajudar você a encontrar a empresa perfeita 
                para seu projeto específico de energia solar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => window.location.href = '/contato'}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Falar com Especialista
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/buscar'}
                >
                  Ver Todas as Empresas
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;