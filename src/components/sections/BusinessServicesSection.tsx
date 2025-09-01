import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  color: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Instalação Completa',
    description: 'Serviço completo de instalação de sistemas fotovoltaicos',
    icon: <Zap className="w-6 h-6" />,
    features: [
      'Projeto personalizado',
      'Instalação profissional',
      'Homologação na concessionária',
      'Garantia de 25 anos'
    ],
    popular: true,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '2',
    title: 'Consultoria Especializada',
    description: 'Análise técnica e viabilidade do seu projeto solar',
    icon: <Users className="w-6 h-6" />,
    features: [
      'Análise de viabilidade',
      'Dimensionamento do sistema',
      'Estudo de sombreamento',
      'Relatório técnico completo'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    id: '3',
    title: 'Monitoramento Inteligente',
    description: 'Acompanhe a performance do seu sistema em tempo real',
    icon: <TrendingUp className="w-6 h-6" />,
    features: [
      'Monitoramento 24/7',
      'Alertas automáticos',
      'Relatórios de performance',
      'App mobile incluído'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: '4',
    title: 'Manutenção Preventiva',
    description: 'Mantenha seu sistema sempre funcionando perfeitamente',
    icon: <Shield className="w-6 h-6" />,
    features: [
      'Limpeza dos painéis',
      'Inspeção técnica',
      'Verificação elétrica',
      'Relatório de manutenção'
    ],
    color: 'from-orange-500 to-orange-600'
  }
];

const benefits = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Instalação Rápida',
    description: 'Projetos concluídos em até 30 dias'
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Empresas Certificadas',
    description: 'Todas as empresas são verificadas e certificadas'
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'Garantia Estendida',
    description: 'Garantia de até 25 anos nos equipamentos'
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'ROI Garantido',
    description: 'Retorno do investimento em até 5 anos'
  }
];

const BusinessServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            <span>Serviços para Empresas</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Soluções Completas em Energia Solar
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Oferecemos uma gama completa de serviços para atender todas as suas necessidades 
            em energia solar, desde a consultoria inicial até a manutenção contínua.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-500 text-white">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-700 transition-colors"
                >
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Por que escolher nossas empresas parceiras?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Trabalhamos apenas com empresas certificadas e com histórico comprovado de excelência.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-orange-600 dark:text-orange-400">
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para começar seu projeto solar?
            </h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Conecte-se com as melhores empresas de energia solar da sua região 
              e receba orçamentos personalizados em minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50"
                onClick={() => window.location.href = '/busca-avancada'}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Encontrar Empresas
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = '/empresa/cadastro'}
              >
                Cadastrar Minha Empresa
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessServicesSection;