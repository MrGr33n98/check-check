import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Users, 
  Award, 
  TrendingUp, 
  Star, 
  CheckCircle
} from 'lucide-react';

interface Stat {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const stats: Stat[] = [
  {
    id: '1',
    value: '500+',
    label: 'Empresas Verificadas',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    description: 'Todas certificadas e verificadas'
  },
  {
    id: '2',
    value: '25.000+',
    label: 'Clientes Satisfeitos',
    icon: <Users className="w-6 h-6" />,
    color: 'from-green-500 to-green-600',
    description: 'Projetos concluídos com sucesso'
  },
  {
    id: '3',
    value: '4.8★',
    label: 'Avaliação Média',
    icon: <Star className="w-6 h-6" />,
    color: 'from-yellow-500 to-yellow-600',
    description: 'Baseado em avaliações reais'
  },
  {
    id: '4',
    value: 'R$ 50M+',
    label: 'Economia Gerada',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    description: 'Em contas de energia elétrica'
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    role: 'Proprietário',
    company: 'Residência - São Paulo',
    content: 'Através da Compare Solar encontrei a empresa perfeita para meu projeto. A instalação foi rápida e profissional. Já estou economizando 90% na conta de luz!',
    rating: 5
  },
  {
    id: '2',
    name: 'Ana Costa',
    role: 'Gerente',
    company: 'Supermercado Costa - RJ',
    content: 'Excelente plataforma! Conseguimos comparar várias empresas e escolher a melhor opção para nosso supermercado. O retorno do investimento foi ainda melhor que o esperado.',
    rating: 5
  },
  {
    id: '3',
    name: 'Roberto Oliveira',
    role: 'Diretor',
    company: 'Indústria Oliveira - MG',
    content: 'A Compare Solar nos conectou com uma empresa especializada em projetos industriais. O sistema está funcionando perfeitamente há 2 anos.',
    rating: 5
  }
];

const certifications = [
  {
    name: 'ANEEL',
    description: 'Agência Nacional de Energia Elétrica'
  },
  {
    name: 'INMETRO',
    description: 'Instituto Nacional de Metrologia'
  },
  {
    name: 'ABGD',
    description: 'Associação Brasileira de Geração Distribuída'
  },
  {
    name: 'ABSOLAR',
    description: 'Associação Brasileira de Energia Solar'
  }
];

const TrustIndicatorsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300 dark:text-gray-600'
        }`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>Confiança e Qualidade</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Por que confiar na Compare Solar?
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Somos a plataforma líder em conexão entre consumidores e empresas de energia solar no Brasil. 
            Nossa missão é garantir que você encontre a melhor solução para seu projeto.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.id} className="text-center border-0 bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white flex items-center justify-center mx-auto mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              O que nossos clientes dizem
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Depoimentos reais de quem já encontrou a empresa ideal através da nossa plataforma.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 rounded-2xl p-8 border border-orange-100 dark:border-orange-900/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Empresas Certificadas e Regulamentadas
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Todas as empresas da nossa plataforma são certificadas pelos principais órgãos reguladores do setor.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {cert.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {cert.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-6 py-3 rounded-full">
            <Shield className="w-5 h-5" />
            <span className="font-medium">
              Plataforma 100% segura e verificada
            </span>
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;