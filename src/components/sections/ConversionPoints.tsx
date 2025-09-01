import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  Leaf, 
  Zap, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Phone
} from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
  color: string;
}

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    id: '1',
    title: 'Economia Imediata',
    description: 'Reduza sua conta de luz em até 95% já no primeiro mês',
    icon: <DollarSign className="w-6 h-6" />,
    value: 'Até 95%',
    color: 'from-green-500 to-green-600'
  },
  {
    id: '2',
    title: 'Retorno Garantido',
    description: 'Recupere seu investimento em até 5 anos',
    icon: <TrendingUp className="w-6 h-6" />,
    value: '3-5 anos',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '3',
    title: 'Impacto Ambiental',
    description: 'Evite a emissão de toneladas de CO2 por ano',
    icon: <Leaf className="w-6 h-6" />,
    value: '2.5t CO2/ano',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: '4',
    title: 'Valorização do Imóvel',
    description: 'Aumente o valor do seu imóvel em até 8%',
    icon: <TrendingUp className="w-6 h-6" />,
    value: 'Até 8%',
    color: 'from-purple-500 to-purple-600'
  }
];

const steps: Step[] = [
  {
    id: '1',
    title: 'Solicite Orçamentos',
    description: 'Receba propostas de múltiplas empresas certificadas',
    icon: <Calculator className="w-8 h-8" />
  },
  {
    id: '2',
    title: 'Compare e Escolha',
    description: 'Analise preços, prazos e avaliações de cada empresa',
    icon: <CheckCircle className="w-8 h-8" />
  },
  {
    id: '3',
    title: 'Instalação Rápida',
    description: 'Sistema instalado e funcionando em até 30 dias',
    icon: <Clock className="w-8 h-8" />
  },
  {
    id: '4',
    title: 'Comece a Economizar',
    description: 'Veja a diferença na sua próxima conta de luz',
    icon: <Zap className="w-8 h-8" />
  }
];

const ConversionPoints: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 dark:from-orange-950/20 dark:via-yellow-950/20 dark:to-orange-950/20">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Vantagens da Energia Solar</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transforme Sua Conta de Luz em
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              {' '}Investimento Inteligente
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubra como a energia solar pode revolucionar suas finanças e contribuir 
            para um futuro mais sustentável.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit) => (
            <Card key={benefit.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {benefit.value}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Como Funciona?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Em apenas 4 passos simples, você pode ter energia solar na sua casa ou empresa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-orange-700 dark:to-yellow-700 z-0" />
                )}
                
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 border-4 border-orange-100 dark:border-orange-900/30">
                    <div className="text-orange-500 dark:text-orange-400">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-orange-100 dark:border-orange-900/30">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pronto para Começar a Economizar?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Receba orçamentos gratuitos de empresas certificadas da sua região. 
              Sem compromisso, sem taxas ocultas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8"
                onClick={() => window.location.href = '/busca-avancada'}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Solicitar Orçamentos Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-900/20"
                onClick={() => window.location.href = '/contato'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Falar com Especialista
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Sem Compromisso</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Empresas Verificadas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Element */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>⚡ Últimos dias: Incentivos fiscais para energia solar em 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionPoints;