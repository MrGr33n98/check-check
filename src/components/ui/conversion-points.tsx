from 'react';
import { Card, CardContent } from './card';
import { CheckCircle } from 'lucide-react';

const ConversionPoints: React.FC = () => {
  const points = [
    'Comparação gratuita e imparcial',
    'Empresas verificadas e confiáveis',
    'Orçamentos personalizados',
    'Suporte especializado'
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Por que escolher nossa plataforma?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="font-medium">{point}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversionPoints;