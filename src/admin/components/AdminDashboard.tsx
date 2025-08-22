import React from 'react';
import { Users, Zap, DollarSign, TrendingUp, BarChart3, PieChart, Activity, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminDashboard: React.FC = () => {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: 'Total de Usuários',
      value: '1,245',
      description: '+12% do último mês',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Empresas Cadastradas',
      value: '89',
      description: '+8% do último mês',
      icon: Zap,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 42.689',
      description: '+18% do último mês',
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Taxa de Conversão',
      value: '24.5%',
      description: '+3.2% do último mês',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const charts = [
    {
      title: 'Usuários por Plano',
      icon: PieChart,
      data: [
        { name: 'Básico', value: 45, color: '#3b82f6' },
        { name: 'Pro', value: 35, color: '#10b981' },
        { name: 'Enterprise', value: 20, color: '#8b5cf6' },
      ],
    },
    {
      title: 'Crescimento Mensal',
      icon: BarChart3,
      data: [
        { name: 'Jan', value: 65, color: '#3b82f6' },
        { name: 'Fev', value: 78, color: '#3b82f6' },
        { name: 'Mar', value: 82, color: '#3b82f6' },
        { name: 'Abr', value: 95, color: '#3b82f6' },
      ],
    },
    {
      title: 'Engajamento',
      icon: Activity,
      data: [
        { name: 'Visualizações', value: 1240, color: '#10b981' },
        { name: 'Cliques', value: 890, color: '#8b5cf6' },
        { name: 'Conversões', value: 320, color: '#f59e0b' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral das estatísticas e métricas do sistema
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {charts.map((chart, index) => {
          const Icon = chart.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span>{chart.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chart.data.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold">{item.value}{chart.title === 'Usuários por Plano' || chart.title === 'Crescimento Mensal' ? '%' : ''}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-muted-foreground" />
            <span>Atividade Recente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Novo usuário registrado</p>
                  <p className="text-sm text-gray-500 truncate">João Silva se cadastrou no sistema</p>
                  <p className="text-xs text-gray-400">Há 2 minutos</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};