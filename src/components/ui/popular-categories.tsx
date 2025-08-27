import React from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

const PopularCategories: React.FC = () => {
  const categories = [
    {
      name: 'Energia Solar',
      count: 245,
      icon: '☀️',
      color: 'bg-yellow-100 text-yellow-800',
      description: 'Sistemas fotovoltaicos e energia renovável'
    },
    {
      name: 'Construção Civil',
      count: 189,
      icon: '🏗️',
      color: 'bg-orange-100 text-orange-800',
      description: 'Construção, reforma e arquitetura'
    },
    {
      name: 'Tecnologia',
      count: 156,
      icon: '💻',
      color: 'bg-blue-100 text-blue-800',
      description: 'Desenvolvimento e soluções digitais'
    },
    {
      name: 'Consultoria',
      count: 98,
      icon: '📊',
      color: 'bg-green-100 text-green-800',
      description: 'Consultoria empresarial e estratégica'
    },
    {
      name: 'Marketing Digital',
      count: 134,
      icon: '📱',
      color: 'bg-purple-100 text-purple-800',
      description: 'Agências e profissionais de marketing'
    },
    {
      name: 'Contabilidade',
      count: 87,
      icon: '📋',
      color: 'bg-gray-100 text-gray-800',
      description: 'Serviços contábeis e fiscais'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categorias Populares</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore as categorias mais procuradas e encontre o que você precisa
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-2xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} empresas
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explorar categoria
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todas as Categorias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;