import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, User, Mail, Building, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  email: string;
  company: string;
  role: 'admin_role' | 'member_role' | 'editor_role';
  status: 'active_status' | 'inactive_status' | 'suspended_status';
  subscription_plan: 'free_plan' | 'basic_plan' | 'premium_plan' | 'enterprise_plan';
  subscription_status: 'trial_status' | 'active_sub' | 'cancelled_status' | 'expired_status';
  trial_ends_at: string | null;
  expires_at: string | null;
  created_at: string;
}

const MembersCrud: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockMembers: Member[] = [
      {
        id: 1,
        name: "João Silva",
        email: "joao@empresa1.com",
        company: "Empresa 1",
        role: "member_role",
        status: "active_status",
        subscription_plan: "basic_plan",
        subscription_status: "active_sub",
        trial_ends_at: null,
        expires_at: "2024-12-31T23:59:59Z",
        created_at: "2023-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "Maria Santos",
        email: "maria@empresa2.com",
        company: "Empresa 2",
        role: "editor_role",
        status: "active_status",
        subscription_plan: "premium_plan",
        subscription_status: "trial_status",
        trial_ends_at: "2023-09-30T23:59:59Z",
        expires_at: "2024-08-31T23:59:59Z",
        created_at: "2023-03-22T14:15:00Z"
      },
      {
        id: 3,
        name: "Pedro Oliveira",
        email: "pedro@empresa3.com",
        company: "Empresa 3",
        role: "admin_role",
        status: "suspended_status",
        subscription_plan: "enterprise_plan",
        subscription_status: "active_sub",
        trial_ends_at: null,
        expires_at: "2025-01-15T23:59:59Z",
        created_at: "2022-11-10T09:45:00Z"
      }
    ];

    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
    setLoading(false);
  }, []);

  // Filter members based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchTerm, members]);

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMember) {
      setMembers(members.filter(m => m.id !== selectedMember.id));
      setFilteredMembers(filteredMembers.filter(m => m.id !== selectedMember.id));
      setIsDeleteModalOpen(false);
      setSelectedMember(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active_status':
        return 'bg-green-100 text-green-800';
      case 'suspended_status':
        return 'bg-red-100 text-red-800';
      case 'inactive_status':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionPlanColor = (plan: string) => {
    switch (plan) {
      case 'free_plan':
        return 'bg-gray-100 text-gray-800';
      case 'basic_plan':
        return 'bg-blue-100 text-blue-800';
      case 'premium_plan':
        return 'bg-purple-100 text-purple-800';
      case 'enterprise_plan':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'trial_status':
        return 'bg-yellow-100 text-yellow-800';
      case 'active_sub':
        return 'bg-green-100 text-green-800';
      case 'cancelled_status':
        return 'bg-red-100 text-red-800';
      case 'expired_status':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin_role':
        return 'Administrador';
      case 'member_role':
        return 'Membro';
      case 'editor_role':
        return 'Editor';
      default:
        return role;
    }
  };

  const getSubscriptionPlanName = (plan: string) => {
    switch (plan) {
      case 'free_plan':
        return 'Gratuito';
      case 'basic_plan':
        return 'Básico';
      case 'premium_plan':
        return 'Premium';
      case 'enterprise_plan':
        return 'Enterprise';
      default:
        return plan;
    }
  };

  const getSubscriptionStatusName = (status: string) => {
    switch (status) {
      case 'trial_status':
        return 'Trial';
      case 'active_sub':
        return 'Ativo';
      case 'cancelled_status':
        return 'Cancelado';
      case 'expired_status':
        return 'Expirado';
      default:
        return status;
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
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Membros</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar membros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setSelectedMember(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Membro
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assinatura
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
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-800 font-medium">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                        <div className="text-xs text-gray-400">{getRoleName(member.role)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status === 'active_status' ? 'Ativo' : 
                       member.status === 'suspended_status' ? 'Suspenso' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionPlanColor(member.subscription_plan)}`}>
                      {getSubscriptionPlanName(member.subscription_plan)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionStatusColor(member.subscription_status)}`}>
                      {getSubscriptionStatusName(member.subscription_status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(member.expires_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member)}
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

      {/* Edit/Create Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedMember ? 'Editar Membro' : 'Novo Membro'}
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.name || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.email || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.company || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Função
                    </label>
                    <select
                      id="role"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.role || 'member_role'}
                    >
                      <option value="admin_role">Administrador</option>
                      <option value="member_role">Membro</option>
                      <option value="editor_role">Editor</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.status || 'active_status'}
                    >
                      <option value="active_status">Ativo</option>
                      <option value="inactive_status">Inativo</option>
                      <option value="suspended_status">Suspenso</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subscription_plan" className="block text-sm font-medium text-gray-700">
                      Plano de Assinatura
                    </label>
                    <select
                      id="subscription_plan"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.subscription_plan || 'basic_plan'}
                    >
                      <option value="free_plan">Gratuito</option>
                      <option value="basic_plan">Básico</option>
                      <option value="premium_plan">Premium</option>
                      <option value="enterprise_plan">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subscription_status" className="block text-sm font-medium text-gray-700">
                      Status da Assinatura
                    </label>
                    <select
                      id="subscription_status"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.subscription_status || 'active_sub'}
                    >
                      <option value="trial_status">Trial</option>
                      <option value="active_sub">Ativo</option>
                      <option value="cancelled_status">Cancelado</option>
                      <option value="expired_status">Expirado</option>
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
                      defaultValue={selectedMember?.expires_at ? new Date(selectedMember.expires_at).toISOString().split('T')[0] : ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="trial_ends_at" className="block text-sm font-medium text-gray-700">
                      Fim do Trial
                    </label>
                    <input
                      type="date"
                      id="trial_ends_at"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedMember?.trial_ends_at ? new Date(selectedMember.trial_ends_at).toISOString().split('T')[0] : ''}
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
                    {selectedMember ? 'Atualizar' : 'Criar'} Membro
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
                  Tem certeza que deseja excluir o membro <strong>{selectedMember?.name}</strong>? 
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

export default MembersCrud;