import { Star, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CompanyList = ({ 
  companies, 
  searchTerm, 
  onCompanySelect, 
  onRequestQuote 
}: { 
  companies: any[]; 
  searchTerm: string; 
  onCompanySelect: (company: any) => void; 
  onRequestQuote: (company: any) => void; 
}) => {
  // Filter companies based on search term
  const filteredCompanies = companies.filter(company => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      company.name.toLowerCase().includes(term) ||
      company.location.toLowerCase().includes(term) ||
      company.specialties.some((specialty: string) => 
        specialty.toLowerCase().includes(term)
      )
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Empresas Encontradas
        </h2>
        <p className="text-gray-600">
          {filteredCompanies.length} {filteredCompanies.length === 1 ? 'empresa' : 'empresas'}
        </p>
      </div>
      
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhuma empresa encontrada para "{searchTerm}"
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => onCompanySelect(filteredCompanies[0])}
          >
            Ver todas as empresas
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div 
              key={company.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
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
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                  {company.specialties.length > 3 && (
                    <Badge variant="secondary">
                      +{company.specialties.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onCompanySelect(company)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
