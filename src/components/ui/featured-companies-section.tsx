import React from 'react';
import { Star, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Company {
  id: number;
  name: string;
  location: string;
  installed_capacity_mw: number;
  rating: number;
  review_count: number;
  description: string;
  specialties: string[];
}

interface FeaturedCompaniesSectionProps {
  title?: string;
  companies: Company[];
  onCompanySelect: (companyId: number) => void;
  onRequestQuote: (company: Company) => void;
}

const FeaturedCompaniesSection: React.FC<FeaturedCompaniesSectionProps> = ({ 
  title = "Empresas em Destaque",
  companies,
  onCompanySelect,
  onRequestQuote
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça algumas das empresas parceiras que estão transformando o mercado de energia solar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card 
              key={company.id} 
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {company.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {company.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({company.review_count})
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {company.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mt-3">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>{company.installed_capacity_mw} MW instalados</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {company.specialties.slice(0, 3).map((specialty: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onCompanySelect(company.id)}
                  >
                    Ver Perfil
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onRequestQuote(company)}
                  >
                    Solicitar Orçamento
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            size="lg" 
            onClick={() => navigate('/encontrar-empresas')}
            className="bg-green-600 hover:bg-green-700"
          >
            Ver todas as empresas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompaniesSection;