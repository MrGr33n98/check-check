import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Building, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Briefcase className="w-8 h-8 text-blue-500" />,
    title: 'Para seu Negócio',
    description: 'Encontre instaladores, distribuidores e consultorias para otimizar o consumo de energia da sua empresa.',
    link: '/empresas/servicos-comerciais',
  },
  {
    icon: <Building className="w-8 h-8 text-green-500" />,
    title: 'Para seu Condomínio',
    description: 'Soluções de energia solar para áreas comuns, rateio de créditos e valorização do imóvel.',
    link: '/empresas/servicos-condominios',
  },
  {
    icon: <Factory className="w-8 h-8 text-purple-500" />,
    title: 'Para sua Indústria',
    description: 'Projetos de grande porte, usinas próprias e contratos de energia para máxima eficiência e economia.',
    link: '/empresas/servicos-industriais',
  },
];

const BusinessServicesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Soluções para Todos os Portes</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Seja qual for o tamanho da sua necessidade energética, temos a parceria certa para você.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8">
                <div className="mb-4 inline-block p-4 bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button asChild variant="ghost" className="text-blue-600 group-hover:text-blue-800">
                  <Link to={service.link}>
                    Ver Soluções <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessServicesSection;
