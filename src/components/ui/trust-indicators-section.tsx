from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

const TrustIndicatorsSection: React.FC = () => {
  const indicators = [
    {
      icon: Shield,
      title: 'Empresas Verificadas',
      description: 'Todas as empresas passam por rigoroso processo de verificação',
      stat: '100%'
    },
    {
      icon: Award,
      title: 'Qualidade Garantida',
      description: 'Avaliações reais de clientes verificados',
      stat: '4.8/5'
    },
    {
      icon: Users,
      title: 'Clientes Satisfeitos',
      description: 'Milhares de conexões bem-sucedidas',
      stat: '50k+'
    },
    {
      icon: Clock,
      title: 'Suporte 24/7',
      description: 'Atendimento especializado quando você precisar',
      stat: '24h'
    }
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Por que confiar em nós?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Conectamos você com as melhores empresas do mercado com total segurança e transparência
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{indicator.stat}</div>
                <h3 className="text-lg font-semibold mb-2">{indicator.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{indicator.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;