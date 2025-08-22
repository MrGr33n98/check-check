import React from 'react';
import { ArrowLeft, Phone, Mail, Building, Calendar, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SponsoredCompany } from './types';

interface SponsoredDetailProps {
  company: SponsoredCompany;
}

export const SponsoredDetail: React.FC<SponsoredDetailProps> = ({ company }) => {
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/admin/sponsored" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para patrocinados
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{company.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Detalhes da empresa patrocinada
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Informações da Empresa</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">{company.name}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-3 text-sm text-blue-600 hover:text-blue-500"
                  >
                    {company.website}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a 
                    href={`mailto:${company.contactEmail}`} 
                    className="ml-3 text-sm text-blue-600 hover:text-blue-500"
                  >
                    {company.contactEmail}
                  </a>
                </div>
                {company.contactPhone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <a 
                      href={`tel:${company.contactPhone}`} 
                      className="ml-3 text-sm text-blue-600 hover:text-blue-500"
                    >
                      {company.contactPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Detalhes do Patrocínio</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Tier</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {company.tier}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {company.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tier</p>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 capitalize">{company.tier}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Datas</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Início do Patrocínio</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(company.startDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiração</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(company.endDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Criação</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(company.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Descrição</h3>
            <div className="mt-2 bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">{company.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};