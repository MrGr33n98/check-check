import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';

const indicators = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
    value: '1,200+',
    label: 'Empresas Verificadas',
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    value: '4.8/5',
    label: 'Média de Avaliação',
  },
  {
    icon: <Users className="w-10 h-10 text-green-500" />,
    value: '50,000+',
    label: 'Clientes Satisfeitos',
  },
];

const TrustIndicatorsSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-3">
                {indicator.icon}
              </div>
              <p className="text-3xl font-bold text-gray-800">{indicator.value}</p>
              <p className="text-gray-600">{indicator.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;
