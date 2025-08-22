import React from 'react';
import { ArrowLeft, Phone, Mail, Building, Calendar, CreditCard, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Member } from './types';

interface MemberDetailProps {
  member: Member;
}

export const MemberDetail: React.FC<MemberDetailProps> = ({ member }) => {
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/admin/members" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para membros
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{member.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Detalhes do membro
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Informações Pessoais</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">{member.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">{member.email}</span>
                </div>
                {member.profileUrl && (
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400" />
                    <a 
                      href={member.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-3 text-sm text-blue-600 hover:text-blue-500"
                    >
                      Perfil do Usuário
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Assinatura</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Plano</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {member.plan}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {member.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pagamento</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {member.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Datas</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Início da Assinatura</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(member.subscriptionStart).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiração</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(member.subscriptionEnd).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Criação</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(member.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};