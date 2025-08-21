import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Building, 
  Package, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { statisticsApi } from '@/services/api';
import { Link } from 'react-router-dom';

interface Statistic {
  total_categories: number;
  featured_categories: number;
  categories_by_solutions: Array<{ name: string; count: number }>;
}

interface SolutionStatistic {
  total_solutions: number;
  featured_solutions: number;
  solutions_by_category: Array<{ category: string; count: number }>;
}

interface UserStatistic {
  total_users: number;
  active_users: number;
  users_by_role: Array<{ role: string; count: number }>;
}

const AdminDashboard: React.FC = () => {
  const [categoryStats, setCategoryStats] = useState<Statistic | null>(null);
  const [solutionStats, setSolutionStats] = useState<SolutionStatistic | null>(null);
  const [userStats, setUserStats] = useState<UserStatistic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [categoryRes, solutionRes, userRes] = await Promise.all([
          statisticsApi.getCategories(),
          statisticsApi.getSolutions(),
          statisticsApi.getUsers()
        ]);
        
        setCategoryStats(categoryRes.data);
        setSolutionStats(solutionRes.data);
        setUserStats(userRes.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando estatísticas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <div className="flex space-x-2">
          <Link to="/admin/categories/new">
            <Button>
              <Package className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </Link>
          <Link to="/admin/solutions/new">
            <Button>
              <Building className="mr-2 h-4 w-4" />
              Nova Empresa
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Categorias</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryStats?.total_categories || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {categoryStats?.featured_categories || 0} categorias em destaque
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {solutionStats?.total_solutions || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {solutionStats?.featured_solutions || 0} empresas em destaque
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats?.total_users || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {userStats?.active_users || 0} usuários ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats?.total_users ? 
                `${Math.round(((userStats.active_users || 0) / userStats.total_users) * 100)}%` : 
                '0%'}
            </div>
            <p className="text-xs text-muted-foreground">
              Usuários ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/admin/categories">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <Package className="h-6 w-6 mb-2" />
                  Gerenciar Categorias
                </Button>
              </Link>
              <Link to="/admin/solutions">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <Building className="h-6 w-6 mb-2" />
                  Gerenciar Empresas
                </Button>
              </Link>
              <Link to="/admin/users">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 mb-2" />
                  Gerenciar Usuários
                </Button>
              </Link>
              <Link to="/admin/reviews">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <Eye className="h-6 w-6 mb-2" />
                  Gerenciar Avaliações
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>API Backend</span>
                </div>
                <span className="text-sm text-green-500">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Banco de Dados</span>
                </div>
                <span className="text-sm text-yellow-500">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Serviço de Email</span>
                </div>
                <span className="text-sm text-green-500">Funcionando</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span>Backup Automático</span>
                </div>
                <span className="text-sm text-red-500">Falhou</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Building className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Nova empresa cadastrada</p>
                <p className="text-sm text-muted-foreground">EnergiaTech Solutions foi cadastrada por João Silva</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">2 min atrás</div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Categoria atualizada</p>
                <p className="text-sm text-muted-foreground">Geração Distribuída foi atualizada</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">15 min atrás</div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Novo usuário registrado</p>
                <p className="text-sm text-muted-foreground">Maria Oliveira se registrou como usuário</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">1 hora atrás</div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Empresa aprovada</p>
                <p className="text-sm text-muted-foreground">SolarMax Pro foi aprovada para listagem</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">3 horas atrás</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;