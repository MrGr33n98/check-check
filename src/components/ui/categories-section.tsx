from 'react';
import { Card } from './card';
import { Button } from './button';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

interface CategoriesSectionProps {
  categories?: Category[];
  title?: string;
  subtitle?: string;
}

const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Energia Solar',
    description: 'Sistemas de energia solar residencial e comercial',
    icon: '☀️',
    count: 150
  },
  {
    id: '2',
    name: 'Instalação',
    description: 'Serviços de instalação e manutenção',
    icon: '🔧',
    count: 89
  },
  {
    id: '3',
    name: 'Consultoria',
    description: 'Consultoria em energia renovável',
    icon: '💡',
    count: 67
  },
  {
    id: '4',
    name: 'Financiamento',
    description: 'Opções de financiamento para projetos solares',
    icon: '💰',
    count: 45
  }
];

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories = defaultCategories,
  title = 'Categorias Populares',
  subtitle = 'Explore as principais categorias de serviços solares'
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  {category.count} empresas
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Empresas
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;