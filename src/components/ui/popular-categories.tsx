import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: LucideIcon;
}

interface PopularCategoriesProps {
  title?: string;
  description?: string;
  categories: Category[];
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({ 
  title = "Outras Categorias Populares",
  description = "Explore outras áreas do setor solar que podem ser do seu interesse",
  categories 
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Card 
                key={cat.id} 
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/categorias/${cat.slug}`)}
              >
                <CardHeader className="flex items-center justify-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-center">{cat.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Explorar <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;