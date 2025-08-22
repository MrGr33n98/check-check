import React, { useState, useEffect } from 'react';
import { FilterBar } from '@/admin/components/FilterBar';
import { DataTable } from '@/admin/components/DataTable';
import { CardList } from '@/admin/components/CardList';
import { useFilterParams } from '@/admin/hooks/useFilterParams';
import { mockLeads } from '@/admin/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';

const initialFilters = {
  search: '',
  status: '',
  source: '',
  dateFrom: '',
  dateTo: '',
};

export const LeadList: React.FC = () => {
  const [filters, setFilters] = useFilterParams(initialFilters);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Filter leads based on applied filters
  const filteredLeads = mockLeads.filter(lead => {
    // Apply search filter
    if (filters.search && 
        !lead.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !lead.email.toLowerCase().includes(filters.search.toLowerCase()) &&
        !lead.company?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && lead.status !== filters.status) {
      return false;
    }
    
    // Apply source filter
    if (filters.source && lead.source !== filters.source) {
      return false;
    }
    
    // Apply date filters
    if (filters.dateFrom && lead.createdAt < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && lead.createdAt > filters.dateTo) {
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
    { key: 'company', title: 'Empresa' },
    { 
      key: 'source', 
      title: 'Origem',
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          'novo': 'bg-blue-100 text-blue-800',
          'contatado': 'bg-yellow-100 text-yellow-800',
          'qualificado': 'bg-green-100 text-green-800',
          'convertido': 'bg-purple-100 text-purple-800',
          'descartado': 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { key: 'score', title: 'Pontuação' },
    { 
      key: 'createdAt', 
      title: 'Data',
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

  const handleRowClick = (lead: any) => {
    console.log('Clicked lead:', lead);
    // In a real app, this would navigate to the lead detail page
  };

  const renderLeadCard = (lead: any) => (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{lead.name}</h3>
          <p className="text-sm text-gray-500">{lead.email}</p>
          <p className="text-sm text-gray-500 mt-1">{lead.company}</p>
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
      
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {lead.source}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          lead.status === 'novo' ? 'bg-blue-100 text-blue-800' :
          lead.status === 'contatado' ? 'bg-yellow-100 text-yellow-800' :
          lead.status === 'qualificado' ? 'bg-green-100 text-green-800' :
          lead.status === 'convertido' ? 'bg-purple-100 text-purple-800' :
          'bg-red-100 text-red-800'
        }`}>
          {lead.status}
        </span>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Pontuação: {lead.score}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie todos os leads do sistema
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
              data={filteredLeads} 
              onRowClick={handleRowClick} 
            />
          </div>
        ) : (
          <div className="p-4">
            <CardList 
              data={filteredLeads} 
              renderItem={renderLeadCard} 
            />
          </div>
        )}
      </div>
    </div>
  );
};