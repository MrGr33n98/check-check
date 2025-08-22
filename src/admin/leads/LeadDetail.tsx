import React from 'react';
import { ArrowLeft, Phone, Mail, Building, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Lead } from './types';

interface LeadDetailProps {
  lead: Lead;
}

export const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/admin/leads" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para leads
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{lead.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Detalhes do lead
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Informações Pessoais</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">{lead.email}</span>
                </div>
                {lead.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-900">{lead.phone}</span>
                  </div>
                )}
                {lead.company && (
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-900">{lead.company}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Detalhes do Lead</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Origem</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{lead.source}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {lead.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pontuação</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{lead.score}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Datas</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Data de Criação</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                {lead.lastContact && (
                  <div>
                    <p className="text-sm text-gray-500">Último Contato</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(lead.lastContact).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {lead.notes && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Observações</h3>
              <div className="mt-2 bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{lead.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};