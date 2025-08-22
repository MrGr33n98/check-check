import React, { useState } from 'react';
import { FilterBar } from '@/admin/components/FilterBar';
import { DataTable } from '@/admin/components/DataTable';
import { CardList } from '@/admin/components/CardList';
import { useFilterParams } from '@/admin/hooks/useFilterParams';
import { mockAccess } from '@/admin/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Key, Unlock, Lock } from 'lucide-react';

const initialFilters = {
  search: '',
  role: '',
  status: '',
  dateFrom: '',
  dateTo: '',
};

export const AccessList: React.FC = () => {
  const [filters, setFilters] = useFilterParams(initialFilters);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Filter access records based on applied filters
  const filteredAccess = mockAccess.filter(access => {
    // Apply search filter
    if (filters.search && 
        !access.userName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !access.productName.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Apply role filter
    if (filters.role && access.role !== filters.role) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && access.isActive.toString() !== filters.status) {
      return false;
    }
    
    // Apply date filters
    if (filters.dateFrom && access.createdAt < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && access.createdAt > filters.dateTo) {
      return false;
    }
    
    return true;
  });

  const columns = [
    { 
      key: 'userName', 
      title: 'Usuário',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.userId}</div>
        </div>
      )
    },
    { 
      key: 'productName', 
      title: 'Produto',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.productId}</div>
        </div>
      )
    },
    { 
      key: 'role', 
      title: 'Função',
      render: (value: string) => {
        const roleColors: Record<string, string> = {
          'admin': 'bg-red-100 text-red-800',
          'editor': 'bg-blue-100 text-blue-800',
          'leitor': 'bg-green-100 text-green-800',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'isActive', 
      title: 'Status',
      render: (value: boolean) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Ativo' : 'Inativo'}
        </span>
      )
    },
    { 
      key: 'expiresAt', 
      title: 'Expira em',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { 
      key: 'createdAt', 
      title: 'Criado em',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    {
      key: 'actions',
      title: 'Ações',
      render: (_: any, row: any) => (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        </div>
      )
    }
  ];

  const handleRowClick = (access: any) => {
    console.log('Clicked access:', access);
    // In a real app, this would navigate to the access detail page
  };

  const renderAccessCard = (access: any) => (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{access.userName}</h3>
          <p className="text-sm text-gray-500">{access.productName}</p>
          <div className="mt-2 flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              access.role === 'admin' ? 'bg-red-100 text-red-800' :
              access.role === 'editor' ? 'bg-blue-100 text-blue-800' :
              access.role === 'leitor' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {access.role}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              access.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {access.isActive ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 border-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Expira:</span>
          <span className="font-medium text-gray-900">
            {new Date(access.expiresAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-500">Criado:</span>
          <span className="font-medium text-gray-900">
            {new Date(access.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        {access.isActive ? (
          <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
            <Lock className="h-4 w-4 mr-1" />
            Desativar
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="flex-1 text-green-600 border-green-600 hover:bg-green-50">
            <Unlock className="h-4 w-4 mr-1" />
            Ativar
          </Button>
        )}
        <Button variant="outline" size="sm" className="flex-1">
          <Key className="h-4 w-4 mr-1" />
          Resetar
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Acesso</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie acessos a produtos
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewMode === 'table' ? 'default' : 'outline'}
              onClick={() => setViewMode('table')}
            >
              Tabela
            </Button>
            <Button 
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
          </div>
        </div>
      </div>
      
      <FilterBar 
        onFilterChange={setFilters} 
        initialFilters={filters} 
      />
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {viewMode === 'table' ? (
          <div className="hidden md:block">
            <DataTable 
              columns={columns} 
              data={filteredAccess} 
              onRowClick={handleRowClick} 
            />
          </div>
        ) : (
          <div className="p-4">
            <CardList 
              data={filteredAccess} 
              renderItem={renderAccessCard} 
            />
          </div>
        )}
      </div>
    </div>
  );
};