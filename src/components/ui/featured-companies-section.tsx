from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import StarRating from './star-rating';
import { MapPin, Phone } from 'lucide-react';
import { getPlaceholderImage } from '@/utils/imageFallback';

const FeaturedCompaniesSection: React.FC = () => {
  const companies = [
    {
      id: 1,
      name: 'Solar Tech Brasil',
      category: 'Energia Solar',
      rating: 4.9,
      reviewCount: 127,
      location: 'São Paulo, SP',
      description: 'Especialista em sistemas fotovoltaicos residenciais e comerciais',
      logo: getPlaceholderImage(80, 80),
      featured: true,
      verified: true
    },
    {
      id: 2,
      name: 'Construtora Moderna',
      category: 'Construção',
      rating: 4.7,
      reviewCount: 89,
      location: 'Rio de Janeiro, RJ',
      description: 'Construção e reforma de imóveis residenciais e comerciais',
      logo: getPlaceholderImage(80, 80),
      featured: true,
      verified: true
    },
    {
      id: 3,
      name: 'TechSolutions',
      category: 'Tecnologia',
      rating: 4.8,
      reviewCount: 156,
      location: 'Belo Horizonte, MG',
      description: 'Desenvolvimento de software e soluções digitais',
      logo: getPlaceholderImage(80, 80),
      featured: true,
      verified: true
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Empresas em Destaque</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça as empresas mais bem avaliadas e confiáveis da nossa plataforma
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        {company.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verificada
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {company.category}
                      </Badge>
                    </div>
                  </div>
                  {company.featured && (
                    <Badge className="text-xs">
                      Destaque
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {company.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StarRating rating={company.rating} size="sm" />
                      <span className="text-sm font-medium">{company.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({company.reviewCount} avaliações)
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{company.location}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Ver Perfil
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todas as Empresas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompaniesSection;