import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';

const BusinessServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Consultoria Empresarial',
      description: 'Estratégias personalizadas para o crescimento do seu negócio',
      features: ['Análise de mercado', 'Planejamento estratégico', 'Otimização de processos'],
      price: 'A partir de R$ 2.500',
      popular: false
    },
    {
      title: 'Energia Solar Comercial',
      description: 'Soluções completas em energia solar para empresas',
      features: ['Projeto personalizado', 'Instalação profissional', 'Monitoramento 24/7'],
      price: 'A partir de R$ 15.000',
      popular: true
    },
    {
      title: 'Desenvolvimento de Software',
      description: 'Aplicações sob medida para digitalizar seu negócio',
      features: ['Apps mobile', 'Sistemas web', 'Integração de APIs'],
      price: 'A partir de R$ 8.000',
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Serviços para Empresas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções profissionais para impulsionar o crescimento do seu negócio
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`relative ${service.popular ? 'border-primary shadow-lg' : ''}`}>
              {service.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  Mais Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-2xl font-bold mb-4">{service.price}</div>
                <Button className="w-full" variant={service.popular ? 'default' : 'outline'}>
                  Solicitar Orçamento
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