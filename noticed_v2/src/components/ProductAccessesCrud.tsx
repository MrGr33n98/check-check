import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Lock, CheckCircle, XCircle, Calendar, User, Building } from 'lucide-react';

interface ProductAccess {
  id: number;
  member_id: number;
  solution_id: number;
  access_level: 'view' | 'edit' | 'admin';
  expires_at: string | null;
  active: boolean;
  member?: {
    name: string;
    email: string;
  };
  solution?: {
    name: string;
    company: string;
  };
  created_at: string;
}

const ProductAccessesCrud: React.FC = () => {
  const [accesses, setAccesses] = useState<ProductAccess[]>([]);
  const [filteredAccesses, setFilteredAccesses] = useState<ProductAccess[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAccess, setSelectedAccess] = useState<ProductAccess | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockAccesses: ProductAccess[] = [
      {
        id: 1,
        member_id: 1,
        solution_id: 1,
        access_level: "view",
        expires_at: "2024-12-31T23:59:59Z",
        active: true,
        member: { name: "João Silva", email: "joao@empresa1.com" },
        solution: { name: "SolarMax Pro", company: "EnergiaTech" },
        created_at: "2023-06-01T09:00:00Z"
      },
      {
        id: 2,
        member_id: 2,
        solution_id: 2,
        access_level: "edit",
        expires_at: "2024-06-30T23:59:59Z",
        active: true,
        member: { name: "Maria Santos", email: "maria@empresa2.com" },
        solution: { name: "EcoPower Manager", company: "GreenSolutions" },
        created_at: "2023-03-15T14:30:00Z"
      },
      {
        id: 3,
        member_id: 3,
        solution_id: 1,
        access_level: "admin",
        expires_at: null,
        active: true,
        member: { name: "Pedro Oliveira", email: "pedro@empresa3.com" },
        solution: { name: "SolarMax Pro", company: "EnergiaTech" },
        created_at: "2022-11-10T09:45:00Z"
      }
    ];

    setAccesses(mockAccesses);
    setFilteredAccesses(mockAccesses);
    setLoading(false);
  }, []);

  // Filter accesses based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAccesses(accesses);
    } else {
      const filtered = accesses.filter(access =>
        access.member?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        access.member?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        access.solution?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        access.solution?.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAccesses(filtered);
    }
  }, [searchTerm, accesses]);

  const handleEdit = (access: ProductAccess) => {
    setSelectedAccess(access);
    setIsModalOpen(true);
  };

  const handleDelete = (access: ProductAccess) => {
    setSelectedAccess(access);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAccess) {
      setAccesses(accesses.filter(a => a.id !== selectedAccess.id));
      setFilteredAccesses(filteredAccesses.filter(a => a.id !== selectedAccess.id));
      setIsDeleteModalOpen(false);
      setSelectedAccess(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getAccessLevelName = (level: string) => {
    switch (level) {
      case 'view':
        return 'Visualização';
      case 'edit':
        return 'Edição';
      case 'admin':
        return 'Administrador';
      default:
        return level;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'view':
        return 'bg-blue-100 text-blue-800';
      case 'edit':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
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
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Acessos a Produtos</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar acessos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setSelectedAccess(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Acesso
          </button>
        </div>
      </div>

      {/* Accesses Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Solução
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nível de Acesso
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiração
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccesses.map((access) => (
                <tr key={access.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{access.member?.name}</div>
                        <div className="text-sm text-gray-500">{access.member?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{access.solution?.name}</div>
                        <div className="text-sm text-gray-500">{access.solution?.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccessLevelColor(access.access_level)}`}>
                      {getAccessLevelName(access.access_level)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      access.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {access.active ? 'Ativo' : 'Expirado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(access.expires_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(access)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(access)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Access Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedAccess ? 'Editar Acesso' : 'Novo Acesso'}
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
                    <label htmlFor="member_id" className="block text-sm font-medium text-gray-700">
                      Membro
                    </label>
                    <select
                      id="member_id"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedAccess?.member_id || ''}
                    >
                      <option value="">Selecione um membro</option>
                      <option value="1">João Silva (joao@empresa1.com)</option>
                      <option value="2">Maria Santos (maria@empresa2.com)</option>
                      <option value="3">Pedro Oliveira (pedro@empresa3.com)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="solution_id" className="block text-sm font-medium text-gray-700">
                      Solução
                    </label>
                    <select
                      id="solution_id"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedAccess?.solution_id || ''}
                    >
                      <option value="">Selecione uma solução</option>
                      <option value="1">SolarMax Pro (EnergiaTech)</option>
                      <option value="2">EcoPower Manager (GreenSolutions)</option>
                      <option value="3">SunControl (SolarInnovate)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="access_level" className="block text-sm font-medium text-gray-700">
                      Nível de Acesso
                    </label>
                    <select
                      id="access_level"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedAccess?.access_level || 'view'}
                    >
                      <option value="view">Visualização</option>
                      <option value="edit">Edição</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700">
                      Data de Expiração
                    </label>
                    <input
                      type="date"
                      id="expires_at"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedAccess?.expires_at ? new Date(selectedAccess.expires_at).toISOString().split('T')[0] : ''}
                    />
                    <p className="mt-1 text-sm text-gray-500">Deixe em branco para acesso ilimitado</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="active"
                      name="active"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={selectedAccess?.active}
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                      Acesso Ativo
                    </label>
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
                    {selectedAccess ? 'Atualizar' : 'Criar'} Acesso
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
                  Tem certeza que deseja excluir o acesso de <strong>{selectedAccess?.member?.name}</strong> 
                  para a solução <strong>{selectedAccess?.solution?.name}</strong>? 
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

export default ProductAccessesCrud;