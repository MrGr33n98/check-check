import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Globe, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Company {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: string;
  services: string[];
  certifications: string[];
  phone: string;
  website: string;
  description: string;
  image: string;
  bannerImage?: string;
  foundedYear?: number;
  installed_capacity_mw?: number;
  specialties?: string[];
  premium_effect_active?: boolean;
  slug: string; // Added
}

interface Props {
  company: Company;
}

export const CompanyCard = ({ company }: Props) => {

  return (
    <article
      className={cn(
        "bg-white rounded-xl shadow-md hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full group focus-within:ring-2 focus-within:ring-blue-500",
        company.premium_effect_active && "relative overflow-hidden p-0.5 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-blue-400 before:via-blue-500 before:to-blue-600 before:animate-spin-slow before:z-0",
        company.premium_effect_active && "after:absolute after:inset-[2px] after:bg-white after:rounded-xl after:z-10"
      )}
      aria-label={`Card da empresa ${company.name}`}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* Microdados básicos */}
      <meta itemProp="name" content={company.name} />
      {company.website && <meta itemProp="url" content={company.website} />}
      {company.location && <meta itemProp="address" content={company.location} />}

      {/* Banner */}
      <div className="relative h-20 w-full bg-gradient-to-r from-blue-50 to-blue-100 overflow-visible z-20">
        {company.bannerImage ? (
          <img
            src={company.bannerImage}
            alt={`Banner da empresa ${company.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-10" />
        )}

        {/* Logo flutuante com “anel” em gradiente */}
        <div className="absolute left-4 -bottom-8 z-10">
          <div className="p-[2px] rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-purple-500">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 shadow-sm overflow-hidden">
              {company.image ? (
                <img
                  src={company.image}
                  alt={`Logo da empresa ${company.name}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold text-lg">
                  {company.name?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="pt-12 px-4 pb-4 flex-grow flex flex-col relative z-20 min-h-[320px]">
        {/* Título, localização, rating */}
        <div className="mb-2">
          <h2 className="text-lg font-bold text-slate-900 truncate" title={company.name} itemProp="name">
            {company.name}
            {company.verified && (
              <span className="ml-2 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                Verificado
              </span>
            )}
          </h2>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-slate-600 text-xs">
            <div className="flex items-center gap-1" aria-label="Localização">
              <MapPin className="w-3.5 h-3.5" />
              <span itemProp="address">{company.location}</span>
            </div>
            {company.foundedYear && (
              <span className="flex items-center gap-0.5">• Desde {company.foundedYear}</span>
            )}
          </div>

          {/* AggregateRating microdata */}
          <div
            className="flex items-center gap-0.5 mt-1"
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <meta itemProp="ratingValue" content={String(company.rating || 0)} />
            <meta itemProp="reviewCount" content={String(company.reviewCount || 0)} />
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(company.rating || 0) ? 'text-yellow-400 fill-current' : 'text-slate-300'
                }`}
                aria-hidden="true"
              />
            ))}
            <span className="text-xs text-slate-600 ml-1">
              {company.rating || 0} ({company.reviewCount || 0} avaliações)
            </span>
          </div>
        </div>

        {/* Descrição */}
        {company.description && (
          <p className="text-slate-700 text-xs line-clamp-2 mb-2" title={company.description} itemProp="description">
            {company.description}
          </p>
        )}

        {/* Dados principais */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-700 mb-2">
          {company.experience && <span>{company.experience}</span>}
          {!!company.certifications?.length && (
            <span>{company.certifications.length} certificações</span>
          )}
          {company.installed_capacity_mw && <span>{company.installed_capacity_mw} MW instalados</span>}
          {!!company.specialties?.length && <span>{company.specialties.join(', ')}</span>}
        </div>

        {/* Serviços */}
        {company.services && company.services.length > 0 ? (
          <div className="flex flex-wrap gap-1 mb-3" aria-label="Serviços">
            {company.services.slice(0, 4).map((service) => (
              <span
                key={service}
                className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-medium"
              >
                {service}
              </span>
            ))}
            {company.services.length > 4 && (
              <span className="text-gray-500 text-[10px] py-0.5">+{company.services.length - 4} mais</span>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1 mb-3" aria-label="Serviços">
            <span className="text-xs bg-gray-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
              Não especificado
            </span>
          </div>
        )}

        {/* Contato + Preço */}
        <div className="border-t pt-2 mt-auto flex items-end justify-between">
          <div className="text-xs text-slate-600 space-y-1" aria-label="Contato">
            {company.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span itemProp="telephone">{company.phone}</span>
              </div>
            )}
            {company.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" aria-hidden="true" />
                <a href={company.website} target="_blank" rel="nofollow noopener noreferrer" className="truncate hover:underline">
                  <span itemProp="url">{company.website}</span>
                </a>
              </div>
            )}
          </div>
          
        </div>

        {/* Ações */}
        <div className="flex flex-col items-center justify-center pt-2 border-t border-slate-200">
          <div className="flex items-stretch justify-center gap-2 w-full">
            <Link
              to={`/company/${company.id}`}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap bg-white border border-slate-300 text-slate-800 h-9 text-xs hover:bg-slate-50 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Perfil da empresa"
            >
              Perfil da empresa
            </Link>
            <Link
              to={`/company/${company.id}/quote`}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white h-9 text-xs shadow-sm rounded-md px-3 py-1 gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={`Solicitar orçamento para ${company.name}`}
            >
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
          <Link
            to={`/empresas/${company.slug}/avaliar`}
            className="w-full inline-flex items-center justify-center whitespace-nowrap bg-white border border-slate-300 text-slate-800 h-9 text-xs hover:bg-slate-50 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-slate-300 mt-2"
            aria-label={`Avaliar a empresa ${company.name}`}
          >
            <Star className="w-4 h-4 mr-1" />
            Avalie esta empresa
          </Link>
        </div>
      </div>
    </article>
  );
};
