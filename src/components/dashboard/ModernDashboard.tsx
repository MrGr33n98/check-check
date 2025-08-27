import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  TrendingUp,
  Star,
  Zap,
  DollarSign,
  Activity,
  Eye,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface DashboardData {
  totalCompanies: number;
  pendingApprovals: number;
  activeCompanies: number;
  premiumCompanies: number;
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  totalReviews: number;
  averageRating: number;
  pendingReviews: number;
  approvedReviews: number;
  conversionRate: number;
  monthlyData: Array<{
    month: string;
    leads: number;
    conversions: number;
    revenue: number;
  }>;
  companyStatusData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const ModernDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/v1/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Erro ao carregar dados do dashboard');
        // Use mock data as fallback
        setData(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getMockData = (): DashboardData => ({
    totalCompanies: 156,
    pendingApprovals: 12,
    activeCompanies: 134,
    premiumCompanies: 28,
    totalLeads: 1247,
    newLeads: 89,
    contactedLeads: 234,
    convertedLeads: 156,
    totalReviews: 892,
    averageRating: 4.3,
    pendingReviews: 23,
    approvedReviews: 869,
    conversionRate: 12.5,
    monthlyData: [
      { month: 'Jan', leads: 120, conversions: 15, revenue: 45000 },
      { month: 'Fev', leads: 135, conversions: 18, revenue: 52000 },
      { month: 'Mar', leads: 148, conversions: 22, revenue: 61000 },
      { month: 'Abr', leads: 162, conversions: 25, revenue: 68000 },
      { month: 'Mai', leads: 178, conversions: 28, revenue: 75000 },
      { month: 'Jun', leads: 195, conversions: 32, revenue: 82000 }
    ],
    companyStatusData: [
      { name: 'Ativas', value: 134, color: '#00C49F' },
      { name: 'Premium', value: 28, color: '#0088FE' },
      { name: 'Pendentes', value: 12, color: '#FFBB28' },
      { name: 'Inativas', value: 8, color: '#FF8042' }
    ]
  });

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
    trend?: { value: number; isPositive: boolean };
    className?: string;
  }> = ({ title, value, description, icon, trend, className = '' }) => (
    <Card className={`${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center text-xs mt-1">
            {trend.isPositive ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground ml-1">vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="text-red-600">Erro</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
              >
                Tentar Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Últimos 30 dias
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="companies">Empresas</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Estatísticas Principais */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total de Empresas"
              value={data.totalCompanies}
              description="Empresas cadastradas"
              icon={<Building2 />}
              trend={{ value: 8.2, isPositive: true }}
            />
            <StatCard
              title="Leads Totais"
              value={data.totalLeads}
              description="Leads gerados"
              icon={<Users />}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              title="Taxa de Conversão"
              value={`${data.conversionRate}%`}
              description="Leads convertidos"
              icon={<TrendingUp />}
              trend={{ value: 2.1, isPositive: true }}
            />
            <StatCard
              title="Avaliação Média"
              value={`${data.averageRating}/5.0`}
              description="Satisfação dos clientes"
              icon={<Star />}
              trend={{ value: 0.3, isPositive: true }}
            />
          </div>

          {/* Gráficos */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tendência de Leads e Conversões</CardTitle>
                <CardDescription>
                  Evolução mensal de leads e conversões
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Leads"
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Conversões"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Status das Empresas</CardTitle>
                <CardDescription>
                  Distribuição por status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={data.companyStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.companyStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Acesso rápido às principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="h-20 flex-col" variant="outline">
                  <Building2 className="h-6 w-6 mb-2" />
                  Aprovar Empresas
                  <Badge variant="secondary" className="mt-1">
                    {data.pendingApprovals}
                  </Badge>
                </Button>
                <Button className="h-20 flex-col" variant="outline">
                  <Users className="h-6 w-6 mb-2" />
                  Gerenciar Leads
                  <Badge variant="secondary" className="mt-1">
                    {data.newLeads}
                  </Badge>
                </Button>
                <Button className="h-20 flex-col" variant="outline">
                  <Star className="h-6 w-6 mb-2" />
                  Revisar Avaliações
                  <Badge variant="secondary" className="mt-1">
                    {data.pendingReviews}
                  </Badge>
                </Button>
                <Button className="h-20 flex-col" variant="outline">
                  <Activity className="h-6 w-6 mb-2" />
                  Ver Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Empresas Ativas"
              value={data.activeCompanies}
              description="Empresas aprovadas e ativas"
              icon={<Building2 />}
              className="border-green-200 bg-green-50"
            />
            <StatCard
              title="Aguardando Aprovação"
              value={data.pendingApprovals}
              description="Empresas pendentes"
              icon={<Eye />}
              className="border-yellow-200 bg-yellow-50"
            />
            <StatCard
              title="Empresas Premium"
              value={data.premiumCompanies}
              description="Planos premium ativos"
              icon={<Zap />}
              className="border-blue-200 bg-blue-50"
            />
            <StatCard
              title="Total Cadastradas"
              value={data.totalCompanies}
              description="Todas as empresas"
              icon={<Building2 />}
            />
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Novos Leads"
              value={data.newLeads}
              description="Leads não contatados"
              icon={<Users />}
              className="border-blue-200 bg-blue-50"
            />
            <StatCard
              title="Contatados"
              value={data.contactedLeads}
              description="Leads em andamento"
              icon={<MessageSquare />}
              className="border-yellow-200 bg-yellow-50"
            />
            <StatCard
              title="Convertidos"
              value={data.convertedLeads}
              description="Leads fechados"
              icon={<TrendingUp />}
              className="border-green-200 bg-green-50"
            />
            <StatCard
              title="Taxa de Conversão"
              value={`${data.conversionRate}%`}
              description="Eficiência de conversão"
              icon={<DollarSign />}
            />
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total de Avaliações"
              value={data.totalReviews}
              description="Avaliações recebidas"
              icon={<Star />}
            />
            <StatCard
              title="Avaliação Média"
              value={`${data.averageRating}/5.0`}
              description="Satisfação geral"
              icon={<Star />}
              className="border-green-200 bg-green-50"
            />
            <StatCard
              title="Pendentes"
              value={data.pendingReviews}
              description="Aguardando moderação"
              icon={<Eye />}
              className="border-yellow-200 bg-yellow-50"
            />
            <StatCard
              title="Aprovadas"
              value={data.approvedReviews}
              description="Avaliações publicadas"
              icon={<Star />}
              className="border-green-200 bg-green-50"
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>
                Evolução da receita ao longo dos meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" name="Receita (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ModernDashboard;