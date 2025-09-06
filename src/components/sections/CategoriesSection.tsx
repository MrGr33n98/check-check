import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, BatteryCharging, Lightbulb, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    name: 'Instaladores',
    description: 'Empresas que projetam e instalam sistemas fotovoltaicos.',
    link: '/categorias/instaladores',
  },
  {
    icon: <Wrench className="w-8 h-8 text-blue-500" />,
    name: 'Distribuidores',
    description: 'Fornecedores de painéis, inversores e outros equipamentos.',
    link: '/categorias/distribuidores',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-green-500" />,
    name: 'Consultoria',
    description: 'Especialistas em projetos, regulação e viabilidade.',
    link: '/categorias/consultoria',
  },
  {
    icon: <BatteryCharging className="w-8 h-8 text-purple-500" />,
    name: 'Armazenamento',
    description: 'Soluções em baterias e sistemas de backup de energia.',
    link: '/categorias/armazenamento',
  },
];

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Explore o Ecossistema Solar</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Navegue pelas principais categorias e encontre o parceiro ideal para seu projeto de energia solar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-6">
                <div className="mb-4 inline-block p-3 bg-gray-100 rounded-full">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4 h-10">{category.description}</p>
                <Button asChild variant="link" className="text-blue-600">
                  <Link to={category.link}>
                    Ver Empresas <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/categorias">
              Ver Todas as Categorias
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
