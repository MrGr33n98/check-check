import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Building, MessageSquareQuote } from 'lucide-react';
import { Link } from 'react-router-dom';

const points = [
  {
    icon: <FileText className="w-8 h-8 text-white" />,
    title: 'Receba Orçamentos Gratuitos',
    description: 'Compare propostas de empresas verificadas e escolha a melhor para você.',
    buttonText: 'Pedir Orçamento',
    link: '/orcamento',
  },
  {
    icon: <Building className="w-8 h-8 text-white" />,
    title: 'Cadastre sua Empresa',
    description: 'Aumente sua visibilidade e conecte-se com milhares de clientes em potencial.',
    buttonText: 'Cadastrar Agora',
    link: '/empresa/cadastro',
  },
  {
    icon: <MessageSquareQuote className="w-8 h-8 text-white" />,
    title: 'Leia Avaliações',
    description: 'Veja o que outros clientes dizem e tome decisões com mais segurança.',
    buttonText: 'Ver Avaliações',
    link: '/avaliacoes',
  },
];

const ConversionPoints: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {points.map((point, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="p-4 bg-blue-500 rounded-full mb-4">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{point.title}</h3>
              <p className="mb-6 max-w-xs">{point.description}</p>
              <Button asChild variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to={point.link}>
                  {point.buttonText}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversionPoints;
