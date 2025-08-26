import React, { useState } from 'react';
import { 
  Users, 
  Lock, 
  DollarSign, 
  Newspaper, 
  TrendingUp, 
  BarChart2,
  Plus,
  Filter,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock statistics data
  const stats = [
    {
      name: 'Membros',
      value: '1,245',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Acessos',
      value: '892',
      change: '+8%',
      changeType: 'positive',
      icon: Lock,
      color: 'bg-green-500',
    },
    {
      name: 'Patrocinados',
      value: '42',
      change: '+3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      name: 'Artigos',
      value: '156',
      change: '+5%',
      changeType: 'positive',
      icon: Newspaper,
      color: 'bg-orange-500',
    },
    {
      name: 'Leads',
      value: '324',
      change: '+15%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-red-500',
    },
    {
      name: 'Conversão',
      value: '12.4%',
      change: '+2.1%',
      changeType: 'positive',
      icon: BarChart2,
      color: 'bg-indigo-500',
    },
  ];

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      name: 'João Silva',
      action: 'registrou-se como novo membro',
      time: 'Agora mesmo',
      avatar: 'JS',
      type: 'member',
    },
    {
      id: 2,
      name: 'Maria Santos',
      action: 'adquiriu acesso à solução SolarMax Pro',
      time: '5 minutos atrás',
      avatar: 'MS',
      type: 'access',
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      action: 'enviou um lead para EcoPower Manager',
      time: '10 minutos atrás',
      avatar: 'CO',
      type: 'lead',
    },
    {
      id: 4,
      name: 'Ana Costa',
      action: 'publicou o artigo "5 Dicas para Economizar"',
      time: '1 hora atrás',
      avatar: 'AC',
      type: 'article',
    },
    {
      id: 5,
      name: 'Pedro Almeida',
      action: 'renovou sua assinatura Premium',
      time: '2 horas atrás',
      avatar: 'PA',
      type: 'member',
    },
  ];

  // Mock upcoming expirations
  const upcomingExpirations = [
    {
      id: 1,
      name: 'SolarMax Pro',
      company: 'EnergiaTech',
      expires: '2023-09-15',
      days: 12,
      type: 'solution',
    },
    {
      id: 2,
      name: 'Trial de Maria Santos',
      company: 'Empresa 2',
      expires: '2023-08-30',
      days: 3,
      type: 'trial',
    },
    {
      id: 3,
      name: 'Patrocínio Header',
      company: 'Anúncio Principal',
      expires: '2023-09-01',
      days: 5,
      type: 'sponsored',
    },
  ];

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Dashboard Administrativo
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} rounded-md p-3`}>
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'positive'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Atividade Recente
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-800 font-medium text-sm">
                              {activity.avatar}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {activity.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {activity.action}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upcoming Expirations */}
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Próximas Expirações
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {upcomingExpirations.map((expiration) => (
                  <li key={expiration.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {expiration.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {expiration.company}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {expiration.days} dias
                          </div>
                          <div className="text-sm text-gray-500">
                            {expiration.expires}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Ações Rápidas
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="mt-2 text-sm font-medium text-gray-900">Novo Membro</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Lock className="h-6 w-6 text-green-600" />
                    <span className="mt-2 text-sm font-medium text-gray-900">Novo Acesso</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                    <span className="mt-2 text-sm font-medium text-gray-900">Novo Patrocinado</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <Newspaper className="h-6 w-6 text-orange-600" />
                    <span className="mt-2 text-sm font-medium text-gray-900">Novo Artigo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Métricas de Crescimento
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Visualização de tendências de crescimento por segmento
              </p>
            </div>
            <div className="p-6">
              <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Gráfico de métricas de crescimento será exibido aqui
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;