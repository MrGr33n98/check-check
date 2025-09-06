from 'react';
import { Card, CardContent, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import StarRating from './star-rating';

interface Company {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  services: string[];
  image?: string;
  bannerImage?: string;
  logo?: string;
}

interface CompanyListProps {
  companies?: Company[];
  title?: string;
  showAll?: boolean;
}

const defaultCompanies: Company[] = [
  {
    id: 1,
    name: 'Solar Pro Energia',
    description: 'Especialistas em energia solar residencial e comercial',
    rating: 4.8,
    reviewCount: 127,
    location: 'São Paulo, SP',
    services: ['Instalação', 'Manutenção', 'Consultoria']
  },
  {
    id: 2,
    name: 'EcoSolar Solutions',
    description: 'Soluções sustentáveis em energia renovável',
    rating: 4.6,
    reviewCount: 89,
    location: 'Rio de Janeiro, RJ',
    services: ['Instalação', 'Financiamento']
  },
  {
    id: 3,
    name: 'SunPower Brasil',
    description: 'Tecnologia avançada em painéis solares',
    rating: 4.9,
    reviewCount: 203,
    location: 'Belo Horizonte, MG',
    services: ['Instalação', 'Manutenção', 'Garantia Estendida']
  }
];

const CompanyList: React.FC<CompanyListProps> = ({
  companies = defaultCompanies,
  title = 'Empresas Recomendadas',
  showAll = false
}) => {
  const displayCompanies = showAll ? companies : companies.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça as melhores empresas de energia solar avaliadas pelos nossos usuários
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              {/* Banner Section */}
              <div 
                className="relative h-32 bg-gradient-to-r from-orange-400 to-yellow-400"
                style={{
                  backgroundImage: company.bannerImage ? `url(${company.bannerImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Company Logo */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-400 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{company.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <CardTitle className="text-lg text-white drop-shadow-md">{company.name}</CardTitle>
                    <p className="text-sm text-white/90">{company.location}</p>
                  </div>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <StarRating rating={company.rating} size="sm" />
                  <span className="text-xs font-semibold text-gray-900">({company.reviewCount})</span>
                </div>
              </div>
              
              <CardContent>
                <p className="text-gray-700 mb-4">{company.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.services.map((service, index) => (
                    <Badge key={index} variant="secondary">{service}</Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">Ver Detalhes</Button>
                  <Button variant="outline" className="flex-1">Solicitar Orçamento</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {!showAll && companies.length > 3 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Ver Todas as Empresas
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyList;