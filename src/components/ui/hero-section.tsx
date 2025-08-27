import React from 'react';
import { Button } from './button';
import { Input } from './input';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Encontre as Melhores Empresas
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Compare, avalie e conecte-se com empresas verificadas em diversos setores
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <Input 
            placeholder="O que você está procurando?" 
            className="bg-white text-black"
          />
          <Button size="lg" variant="secondary">
            Buscar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;