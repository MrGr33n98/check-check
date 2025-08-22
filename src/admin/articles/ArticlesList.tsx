import React, { useState } from 'react';
import { FilterBar } from '@/admin/components/FilterBar';
import { DataTable } from '@/admin/components/DataTable';
import { CardList } from '@/admin/components/CardList';
import { useFilterParams } from '@/admin/hooks/useFilterParams';
import { mockArticles } from '@/admin/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

const initialFilters = {
  search: '',
  status: '',
  category: '',
  dateFrom: '',
  dateTo: '',
};

export const ArticlesList: React.FC = () => {
  const [filters, setFilters] = useFilterParams(initialFilters);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Filter articles based on applied filters
  const filteredArticles = mockArticles.filter(article => {
    // Apply search filter
    if (filters.search && 
        !article.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !article.content.toLowerCase().includes(filters.search.toLowerCase()) &&
        !article.author.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && article.status !== filters.status) {
      return false;
    }
    
    // Apply category filter
    if (filters.category && article.category !== filters.category) {
      return false;
    }
    
    // Apply date filters
    if (filters.dateFrom && article.createdAt < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && article.createdAt > filters.dateTo) {
      return false;
    }
    
    return true;
  });

  const columns = [
    { 
      key: 'title', 
      title: 'Título',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">Por {row.author}</div>
        </div>
      )
    },
    { 
      key: 'category', 
      title: 'Categoria',
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          'rascunho': 'bg-gray-100 text-gray-800',
          'publicado': 'bg-green-100 text-green-800',
          'arquivado': 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'views', 
      title: 'Visualizações'
    },
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

  const handleRowClick = (article: any) => {
    console.log('Clicked article:', article);
    // In a real app, this would navigate to the article detail page
  };

  const renderArticleCard = (article: any) => (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{article.title}</h3>
          <p className="text-sm text-gray-500">Por {article.author}</p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {article.category}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              article.status === 'rascunho' ? 'bg-gray-100 text-gray-800' :
              article.status === 'publicado' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {article.status}
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
        <p className="text-sm text-gray-500 line-clamp-2">{article.content}</p>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <span className="text-gray-500">Visualizações:</span>
          <span className="ml-1 font-medium">{article.views}</span>
        </div>
        <span className="text-gray-500">
          {new Date(article.createdAt).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Artigos</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie todos os artigos do blog
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
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Novo Artigo
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
              data={filteredArticles} 
              onRowClick={handleRowClick} 
            />
          </div>
        ) : (
          <div className="p-4">
            <CardList 
              data={filteredArticles} 
              renderItem={renderArticleCard} 
            />
          </div>
        )}
      </div>
    </div>
  );
};