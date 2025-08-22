import React, { useState } from 'react';
import { FilterBar } from '@/admin/components/FilterBar';
import { DataTable } from '@/admin/components/DataTable';
import { CardList } from '@/admin/components/CardList';
import { useFilterParams } from '@/admin/hooks/useFilterParams';
import { mockMembers } from '@/admin/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, UserCheck, UserX } from 'lucide-react';

const initialFilters = {
  search: '',
  status: '',
  plan: '',
  dateFrom: '',
  dateTo: '',
};

export const MemberList: React.FC = () => {
  const [filters, setFilters] = useFilterParams(initialFilters);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Filter members based on applied filters
  const filteredMembers = mockMembers.filter(member => {
    // Apply search filter
    if (filters.search && 
        !member.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !member.email.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && member.status !== filters.status) {
      return false;
    }
    
    // Apply plan filter
    if (filters.plan && member.plan !== filters.plan) {
      return false;
    }
    
    // Apply date filters
    if (filters.dateFrom && member.createdAt < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && member.createdAt > filters.dateTo) {
      return false;
    }
    
    return true;
  });

  const columns = [
    { 
      key: 'name', 
      title: 'Nome',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      )
    },
    { key: 'plan', title: 'Plano' },
    { 
      key: 'status', 
      title: 'Status',
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          'ativo': 'bg-green-100 text-green-800',
          'inativo': 'bg-gray-100 text-gray-800',
          'suspenso': 'bg-orange-100 text-orange-800',
          'expirado': 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'paymentStatus', 
      title: 'Pagamento',
      render: (value: string) => {
        const paymentColors: Record<string, string> = {
          'pago': 'bg-green-100 text-green-800',
          'pendente': 'bg-yellow-100 text-yellow-800',
          'atrasado': 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'subscriptionStart', 
      title: 'Início',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { 
      key: 'subscriptionEnd', 
      title: 'Expiração',
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

  const handleRowClick = (member: any) => {
    console.log('Clicked member:', member);
    // In a real app, this would navigate to the member detail page
  };

  const renderMemberCard = (member: any) => (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.email}</p>
          <div className="mt-2 flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              member.plan === 'basico' ? 'bg-blue-100 text-blue-800' :
              member.plan === 'pro' ? 'bg-purple-100 text-purple-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {member.plan}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              member.status === 'ativo' ? 'bg-green-100 text-green-800' :
              member.status === 'inativo' ? 'bg-gray-100 text-gray-800' :
              member.status === 'suspenso' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {member.status}
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
          <span className="text-gray-500">Início:</span>
          <span className="font-medium">{new Date(member.subscriptionStart).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-500">Expiração:</span>
          <span className="font-medium">{new Date(member.subscriptionEnd).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-500">Pagamento:</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            member.paymentStatus === 'pago' ? 'bg-green-100 text-green-800' :
            member.paymentStatus === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {member.paymentStatus}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <UserCheck className="h-4 w-4 mr-1" />
          Ativar
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
          <UserX className="h-4 w-4 mr-1" />
          Suspender
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Membros</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie todos os membros do sistema
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
              data={filteredMembers} 
              onRowClick={handleRowClick} 
            />
          </div>
        ) : (
          <div className="p-4">
            <CardList 
              data={filteredMembers} 
              renderItem={renderMemberCard} 
            />
          </div>
        )}
      </div>
    </div>
  );
};