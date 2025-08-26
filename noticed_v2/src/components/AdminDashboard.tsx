import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Lock, 
  DollarSign, 
  Newspaper, 
  TrendingUp, 
  BarChart2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Types for our models
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

interface Sponsored {
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

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  author: string;
  category: 'news' | 'guides' | 'case_studies' | 'industry' | 'tips';
  featured: boolean;
  created_at: string;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  solution_id: number;
  status: 'new_lead' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

// Main Admin Dashboard Component
const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState<Member[]>([]);
  const [productAccesses, setProductAccesses] = useState<ProductAccess[]>([]);
  const [sponsoredItems, setSponsoredItems] = useState<Sponsored[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real implementation, these would be actual API calls
      // For demonstration, we'll use mock data
      
      // Mock members data
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
        }
      ];

      // Mock product accesses data
      const mockProductAccesses: ProductAccess[] = [
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
        }
      ];

      // Mock sponsored items data
      const mockSponsoredItems: Sponsored[] = [
        {
          id: 1,
          title: "Anúncio Principal",
          description: "Destaque no topo da página",
          image_url: "https://via.placeholder.com/300x250",
          link_url: "https://example.com",
          position: "header",
          status: "active",
          priority: 1,
          starts_at: "2023-08-01T00:00:00Z",
          ends_at: "2023-12-31T23:59:59Z",
          active: true,
          created_at: "2023-07-15T11:30:00Z"
        }
      ];

      // Mock articles data
      const mockArticles: Article[] = [
        {
          id: 1,
          title: "Guia Completo sobre Energia Solar",
          slug: "guia-completo-sobre-energia-solar",
          excerpt: "Tudo o que você precisa saber sobre energia solar",
          content: "Conteúdo completo sobre energia solar...",
          status: "published",
          published_at: "2023-08-01T12:00:00Z",
          author: "Redator Solar",
          category: "guides",
          featured: true,
          created_at: "2023-07-20T15:45:00Z"
        }
      ];

      // Mock leads data
      const mockLeads: Lead[] = [
        {
          id: 1,
          name: "Carlos Oliveira",
          email: "carlos@interessado.com",
          phone: "(11) 99999-9999",
          company: "Empresa Interessada",
          message: "Estou interessado na solução SolarMax Pro",
          solution_id: 1,
          status: "new_lead",
          created_at: "2023-08-15T14:20:00Z"
        }
      ];

      setMembers(mockMembers);
      setProductAccesses(mockProductAccesses);
      setSponsoredItems(mockSponsoredItems);
      setArticles(mockArticles);
      setLeads(mockLeads);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Membros</p>
              <p className="text-2xl font-semibold text-gray-900">{members.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3">
              <Lock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Acessos</p>
              <p className="text-2xl font-semibold text-gray-900">{productAccesses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Patrocinados</p>
              <p className="text-2xl font-semibold text-gray-900">{sponsoredItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-orange-100 p-3">
              <Newspaper className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Artigos</p>
              <p className="text-2xl font-semibold text-gray-900">{articles.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Atividade Recente</h2>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <Users className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Novo membro registrado: <span className="font-medium text-gray-900">João Silva</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime="2023-08-15T14:20:00Z">Agora mesmo</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Render members list
  const renderMembers = () => (
    <div className="space-y-6">
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
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Membro
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {members.map((member) => (
            <li key={member.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
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
                      <div className="text-sm text-gray-500">{member.company}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.status === 'active_status' 
                          ? 'bg-green-100 text-green-800' 
                          : member.status === 'suspended_status' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.status === 'active_status' ? 'Ativo' : 
                         member.status === 'suspended_status' ? 'Suspenso' : 'Inativo'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.subscription_plan === 'premium_plan' 
                          ? 'bg-purple-100 text-purple-800' 
                          : member.subscription_plan === 'enterprise_plan' 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : member.subscription_plan === 'basic_plan' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.subscription_plan === 'premium_plan' ? 'Premium' : 
                         member.subscription_plan === 'enterprise_plan' ? 'Enterprise' : 
                         member.subscription_plan === 'basic_plan' ? 'Básico' : 'Gratuito'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render product accesses list
  const renderProductAccesses = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Acessos</h1>
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
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Acesso
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {productAccesses.map((access) => (
            <li key={access.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {access.member?.name} → {access.solution?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Nível: {access.access_level} • 
                        Expira: {access.expires_at ? formatDate(access.expires_at) : 'Nunca'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        access.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {access.active ? 'Ativo' : 'Expirado'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render sponsored items list
  const renderSponsoredItems = () => (
    <div className="space-y-6">
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
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Patrocinado
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {sponsoredItems.map((item) => (
            <li key={item.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img 
                        className="h-16 w-16 rounded-md object-cover" 
                        src={item.image_url} 
                        alt={item.title} 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                      <div className="text-sm text-gray-500">
                        Posição: {item.position} • 
                        Prioridade: {item.priority}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : item.status === 'paused' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'active' ? 'Ativo' : 
                         item.status === 'paused' ? 'Pausado' : 'Inativo'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render articles list
  const renderArticles = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Artigos</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Artigo
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {articles.map((article) => (
            <li key={article.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Newspaper className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500">{article.excerpt}</div>
                      <div className="text-sm text-gray-500">
                        Categoria: {article.category} • 
                        Autor: {article.author}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : article.status === 'draft' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {article.status === 'published' ? 'Publicado' : 
                         article.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                      </span>
                    </div>
                    {article.featured && (
                      <div className="text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Destaque
                        </span>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render leads list
  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Leads</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Lead
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <li key={lead.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-indigo-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email} • {lead.phone}</div>
                      <div className="text-sm text-gray-500">{lead.company}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">{lead.message}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'new_lead' 
                          ? 'bg-blue-100 text-blue-800' 
                          : lead.status === 'contacted' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : lead.status === 'converted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status === 'new_lead' ? 'Novo' : 
                         lead.status === 'contacted' ? 'Contatado' : 
                         lead.status === 'converted' ? 'Convertido' : 'Fechado'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900">SolarFinder Admin</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`${
                    activeTab === 'members'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Membros
                </button>
                <button
                  onClick={() => setActiveTab('accesses')}
                  className={`${
                    activeTab === 'accesses'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Acessos
                </button>
                <button
                  onClick={() => setActiveTab('sponsored')}
                  className={`${
                    activeTab === 'sponsored'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Patrocinados
                </button>
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`${
                    activeTab === 'articles'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Artigos
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`${
                    activeTab === 'leads'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Leads
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'members' && renderMembers()}
          {activeTab === 'accesses' && renderProductAccesses()}
          {activeTab === 'sponsored' && renderSponsoredItems()}
          {activeTab === 'articles' && renderArticles()}
          {activeTab === 'leads' && renderLeads()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;