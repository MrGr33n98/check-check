import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Briefcase, Lock, FileText, TrendingUp } from 'lucide-react';
import { mockLeads, mockMembers, mockSponsored, mockAccess, mockArticles } from '@/admin/mockData';
import { StatisticsChart } from '@/admin/components/StatisticsChart';

export const AdminDashboard: React.FC = () => {
  // Calculate statistics
  const totalLeads = mockLeads.length;
  const newLeads = mockLeads.filter(lead => lead.status === 'novo').length;
  
  const totalMembers = mockMembers.length;
  const activeMembers = mockMembers.filter(member => member.status === 'ativo').length;
  
  const totalSponsored = mockSponsored.length;
  const activeSponsored = mockSponsored.filter(company => company.status === 'ativo').length;
  
  const totalAccess = mockAccess.length;
  const activeAccess = mockAccess.filter(access => access.isActive).length;
  
  const totalArticles = mockArticles.length;
  const publishedArticles = mockArticles.filter(article => article.status === 'publicado').length;

  // Recent activities (simplified for mock data)
  const recentActivities = [
    { id: 1, action: 'Novo lead cadastrado', user: 'João Silva', time: '2 minutos atrás' },
    { id: 2, action: 'Artigo publicado', user: 'Maria Santos', time: '1 hora atrás' },
    { id: 3, action: 'Membro ativado', user: 'Pedro Alves', time: '3 horas atrás' },
    { id: 4, action: 'Patrocinador adicionado', user: 'Ana Costa', time: '1 dia atrás' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral do sistema
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Leads Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {newLeads} novos leads
            </p>
          </CardContent>
        </Card>

        {/* Members Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membros</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              {activeMembers} membros ativos
            </p>
          </CardContent>
        </Card>

        {/* Sponsored Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patrocinadores</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSponsored}</div>
            <p className="text-xs text-muted-foreground">
              {activeSponsored} patrocinadores ativos
            </p>
          </CardContent>
        </Card>

        {/* Access Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acessos</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccess}</div>
            <p className="text-xs text-muted-foreground">
              {activeAccess} acessos ativos
            </p>
          </CardContent>
        </Card>

        {/* Articles Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artigos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              {publishedArticles} artigos publicados
            </p>
          </CardContent>
        </Card>

        {/* Growth Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              Em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <StatisticsChart />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Adicionar Novo Lead
              </button>
              <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Criar Novo Artigo
              </button>
              <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Adicionar Patrocinador
              </button>
              <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Gerenciar Membros
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};