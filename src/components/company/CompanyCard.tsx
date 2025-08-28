import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  experience: string;
  certifications: string[];
  services: string[];
  bannerImage?: string;
  logo?: string;
  foundedYear?: number;
  installedMW?: number;
  specialties?: string[];
  verified?: boolean;
}

interface Props {
  company: Company;
}

export const CompanyCard = ({ company }: Props) => {
  return (
    <div className="bg-white rounded-[16px] shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Banner superior */}
      <div className="relative h-32 w-full bg-gradient-to-r from-blue-50 to-blue-100">
        {company.bannerImage ? (
          <img
            src={company.bannerImage}
            alt="Banner institucional"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-10" />
        )}
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-start gap-6 -mt-8">
          {/* Logo flutuante */}
          <div className="w-24 h-24 rounded-full ring-4 ring-white bg-white shadow-md flex-shrink-0 overflow-hidden">
            {company.logo ? (
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl">
                {company.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Informações principais */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
            <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {company.name}
                  </h3>
                  {company.verified && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                      Verificado
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{company.location}</span>
                  </div>
                  {company.foundedYear && (
                    <div className="flex items-center gap-1 text-sm">
                      <span>•</span>
                      <span>Desde {company.foundedYear}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(company.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {company.rating} (127 avaliações)
                  </span>
                </div>
              </div>
              
              {/* Preço */}
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  R$ {company.price.toLocaleString()}
                </div>
                <div className="text-gray-500 text-sm">a partir de</div>
              </div>
          </div>

            {/* Informações chave */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <span>{company.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>{company.certifications.length} certificações</span>
              </div>
              {company.installedMW && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{company.installedMW} MW instalados</span>
                </div>
              )}
              {company.specialties && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{company.specialties.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Serviços */}
            <div className="flex flex-wrap gap-2 mb-4">
              {company.services.slice(0, 4).map((service, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {service}
                </span>
              ))}
              {company.services.length > 4 && (
                <span className="text-gray-500 text-sm py-1">
                  +{company.services.length - 4} mais
                </span>
              )}
            </div>

            {/* Tabs e Ações */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex gap-6 text-sm">
                <Link to={`/company/${company.id}`} className="text-gray-600 hover:text-blue-600 font-medium pb-1 border-b-2 border-transparent hover:border-blue-600 transition-colors">
                  Informações gerais
                </Link>
                <Link to={`/company/${company.id}/pricing`} className="text-gray-600 hover:text-blue-600 font-medium pb-1 border-b-2 border-transparent hover:border-blue-600 transition-colors">
                  Planos e preços
                </Link>
                <Link to={`/company/${company.id}/reviews`} className="text-gray-600 hover:text-blue-600 font-medium pb-1 border-b-2 border-transparent hover:border-blue-600 transition-colors">
                  Avaliações
                </Link>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/company/${company.id}/demo`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                >
                  Assista à demonstração
                </Link>
                <Link
                  to={`/company/${company.id}/quote`}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}