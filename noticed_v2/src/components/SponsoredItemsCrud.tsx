import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Calendar, CheckCircle, XCircle, Image, Link, MapPin } from 'lucide-react';

interface SponsoredItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  position: 'header' | 'sidebar' | 'footer' | 'category_page' | 'solution_page';
  status: 'draft' | 'active' | 'paused' | 'expired';
  priority: number;
  starts_at: string;
  ends_at: string;
  active: boolean;
  created_at: string;
}

const SponsoredItemsCrud: React.FC = () => {
  const [items, setItems] = useState<SponsoredItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<SponsoredItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<SponsoredItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockItems: SponsoredItem[] = [
      {
        id: 1,
        title: "Anúncio Principal SolarMax",
        description: "Descubra a solução líder em energia solar",
        image_url: "https://via.placeholder.com/300x250",
        link_url: "https://example.com/solarmax",
        position: "header",
        status: "active",
        priority: 1,
        starts_at: "2023-08-01T00:00:00Z",
        ends_at: "2023-12-31T23:59:59Z",
        active: true,
        created_at: "2023-07-15T11:30:00Z"
      },
      {
        id: 2,
        title: "EcoPower Promoção",
        description: "Descontos especiais para novos clientes",
        image_url: "https://via.placeholder.com/160x600",
        link_url: "https://example.com/ecopower-promo",
        position: "sidebar",
        status: "active",
        priority: 2,
        starts_at: "2023-08-10T00:00:00Z",
        ends_at: "2023-09-30T23:59:59Z",
        active: true,
        created_at: "2023-08-05T09:15:00Z"
      },
      {
        id: 3,
        title: "SunControl Parceria",
        description: "Nova parceria exclusiva para instaladores",
        image_url: "https://via.placeholder.com/728x90",
        link_url: "https://example.com/suncontrol-parceria",
        position: "footer",
        status: "paused",
        priority: 3,
        starts_at: "2023-07-01T00:00:00Z",
        ends_at: "2023-10-31T23:59:59Z",
        active: false,
        created_at: "2023-06-20T14:45:00Z"
      }
    ];

    setItems(mockItems);
    setFilteredItems(mockItems);
    setLoading(false);
  }, []);

  // Filter items based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  const handleEdit = (item: SponsoredItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: SponsoredItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setItems(items.filter(i => i.id !== selectedItem.id));
      setFilteredItems(filteredItems.filter(i => i.id !== selectedItem.id));
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getPositionName = (position: string) => {
    switch (position) {
      case 'header':
        return 'Cabeçalho';
      case 'sidebar':
        return 'Barra Lateral';
      case 'footer':
        return 'Rodapé';
      case 'category_page':
        return 'Página de Categoria';
      case 'solution_page':
        return 'Página de Solução';
      default:
        return position;
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Rascunho';
      case 'active':
        return 'Ativo';
      case 'paused':
        return 'Pausado';
      case 'expired':
        return 'Expirado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'header':
        return 'bg-blue-100 text-blue-800';
      case 'sidebar':
        return 'bg-purple-100 text-purple-800';
      case 'footer':
        return 'bg-indigo-100 text-indigo-800';
      case 'category_page':
        return 'bg-green-100 text-green-800';
      case 'solution_page':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Patrocinados</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar patrocinados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Patrocinado
          </button>
        </div>
      </div>

      {/* Sponsored Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Image className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusName(item.status)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPositionColor(item.position)}`}>
                    {getPositionName(item.position)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">Prioridade: {item.priority}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(item.starts_at)} - {formatDate(item.ends_at)}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <a 
                  href={item.link_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <Link className="h-4 w-4 mr-1" />
                  Ver link
                </a>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Sponsored Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedItem ? 'Editar Patrocinado' : 'Novo Patrocinado'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <form className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.title || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.description || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                      URL da Imagem
                    </label>
                    <input
                      type="url"
                      id="image_url"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.image_url || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="link_url" className="block text-sm font-medium text-gray-700">
                      URL do Link
                    </label>
                    <input
                      type="url"
                      id="link_url"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.link_url || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                      Posição
                    </label>
                    <select
                      id="position"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.position || 'header'}
                    >
                      <option value="header">Cabeçalho</option>
                      <option value="sidebar">Barra Lateral</option>
                      <option value="footer">Rodapé</option>
                      <option value="category_page">Página de Categoria</option>
                      <option value="solution_page">Página de Solução</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.status || 'draft'}
                    >
                      <option value="draft">Rascunho</option>
                      <option value="active">Ativo</option>
                      <option value="paused">Pausado</option>
                      <option value="expired">Expirado</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      Prioridade
                    </label>
                    <input
                      type="number"
                      id="priority"
                      min="1"
                      max="100"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.priority || 1}
                    />
                  </div>
                  <div>
                    <label htmlFor="starts_at" className="block text-sm font-medium text-gray-700">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      id="starts_at"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.starts_at ? new Date(selectedItem.starts_at).toISOString().split('T')[0] : ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="ends_at" className="block text-sm font-medium text-gray-700">
                      Data de Término
                    </label>
                    <input
                      type="date"
                      id="ends_at"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedItem?.ends_at ? new Date(selectedItem.ends_at).toISOString().split('T')[0] : ''}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    {selectedItem ? 'Atualizar' : 'Criar'} Patrocinado
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Confirmar Exclusão
                </h3>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Tem certeza que deseja excluir o patrocinado <strong>{selectedItem?.title}</strong>? 
                  Esta ação não pode ser desfeita.
                </p>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={confirmDelete}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsoredItemsCrud;