import React, { useState } from 'react';
import { FilterBar } from '@/admin/components/FilterBar';
import { DataTable } from '@/admin/components/DataTable';
import { CardList } from '@/admin/components/CardList';
import { useFilterParams } from '@/admin/hooks/useFilterParams';
import { mockSponsored } from '@/admin/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Play, Pause, StopCircle } from 'lucide-react';

const initialFilters = {
  search: '',
  status: '',
  tier: '',
  dateFrom: '',
  dateTo: '',
};

export const SponsoredList: React.FC = () => {
  const [filters, setFilters] = useFilterParams(initialFilters);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Filter sponsored companies based on applied filters
  const filteredSponsored = mockSponsored.filter(company => {
    // Apply search filter
    if (filters.search && 
        !company.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !company.description.toLowerCase().includes(filters.search.toLowerCase()) &&
        !company.website.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && company.status !== filters.status) {
      return false;
    }
    
    // Apply tier filter
    if (filters.tier && company.tier !== filters.tier) {
      return false;
    }
    
    // Apply date filters
    if (filters.dateFrom && company.createdAt < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && company.createdAt > filters.dateTo) {
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
          <div className="text-sm text-gray-500">{row.website}</div>
        </div>
      )
    },
    { 
      key: 'tier', 
      title: 'Tier',
      render: (value: string) => {
        const tierColors: Record<string, string> = {
          'bronze': 'bg-amber-100 text-amber-800',
          'prata': 'bg-gray-100 text-gray-800',
          'ouro': 'bg-yellow-100 text-yellow-800',
          'diamante': 'bg-blue-100 text-blue-800',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tierColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          'ativo': 'bg-green-100 text-green-800',
          'pausado': 'bg-yellow-100 text-yellow-800',
          'encerrado': 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'startDate', 
      title: 'Início',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { 
      key: 'endDate', 
      title: 'Expiração',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { 
      key: 'contactEmail', 
      title: 'Contato',
      render: (value: string) => (
        <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800">
          {value}
        </a>
      )
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

  const handleRowClick = (company: any) => {
    console.log('Clicked company:', company);
    // In a real app, this would navigate to the company detail page
  };

  const renderSponsoredCard = (company: any) => (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{company.name}</h3>
          <p className="text-sm text-gray-500 truncate">{company.website}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{company.description}</p>
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
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          company.tier === 'bronze' ? 'bg-amber-100 text-amber-800' :
          company.tier === 'prata' ? 'bg-gray-100 text-gray-800' :
          company.tier === 'ouro' ? 'bg-yellow-100 text-yellow-800' :
          company.tier === 'diamante' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {company.tier}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          company.status === 'ativo' ? 'bg-green-100 text-green-800' :
          company.status === 'pausado' ? 'bg-yellow-100 text-yellow-800' :
          company.status === 'encerrado' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {company.status}
        </span>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <span className="text-gray-500">Início:</span>
          <span className="ml-1 font-medium">{new Date(company.startDate).toLocaleDateString('pt-BR')}</span>
        </div>
        <div>
          <span className="text-gray-500">Expira:</span>
          <span className="ml-1 font-medium">{new Date(company.endDate).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <a 
          href={`mailto:${company.contactEmail}`} 
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {company.contactEmail}
        </a>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Pause className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <StopCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patrocinados</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie empresas patrocinadas
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
              data={filteredSponsored} 
              onRowClick={handleRowClick} 
            />
          </div>
        ) : (
          <div className="p-4">
            <CardList 
              data={filteredSponsored} 
              renderItem={renderSponsoredCard} 
            />
          </div>
        )}
      </div>
    </div>
  );
};