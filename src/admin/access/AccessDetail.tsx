import React from 'react';
import { ArrowLeft, User, Package, Calendar, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductAccess } from './types';

interface AccessDetailProps {
  access: ProductAccess;
}

export const AccessDetail: React.FC<AccessDetailProps> = ({ access }) => {
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/admin/access" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para acessos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Detalhes do Acesso</h1>
        <p className="mt-1 text-sm text-gray-500">
          Informações detalhadas sobre o acesso
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Informações do Usuário</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">{access.userName}</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">{access.userId}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Informações do Produto</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">{access.productName}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900 capitalize">{access.role}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Status e Datas</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center mt-1">
                    {access.isActive ? (
                      <ToggleRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={`ml-2 text-sm font-medium ${access.isActive ? 'text-green-800' : 'text-gray-500'}`}>
                      {access.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expira em</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(access.expiresAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Criação</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(access.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Editar
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Renovar Acesso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};