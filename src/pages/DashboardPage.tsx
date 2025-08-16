import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  BarChart3,
  Users,
  Star,
  Eye,
  TrendingUp,
  Settings,
  Edit,
  Phone,
  Mail,
  MapPin,
  Globe,
  Award,
  Target
} from 'lucide-react';
import { dashboardAnalytics, companyProfile } from '@/data/dashboardMockData';
import { Lead } from '@/data/types';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not authorized
    if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return <div>Loading...</div>;
  }

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-purple-100 text-purple-800',
      proposal_sent: 'bg-orange-100 text-orange-800',
      closed_won: 'bg-green-100 text-green-800',
      closed_lost: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: 'Novo',
      contacted: 'Contatado',
      qualified: 'Qualificado',
      proposal_sent: 'Proposta Enviada',
      closed_won: 'Fechado - Ganho',
      closed_lost: 'Fechado - Perdido'
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo de volta, {user.name}! Aqui está um resumo do seu desempenho.
              </p>
            </div>
            <Button onClick={() => navigate('/')} variant="outline">
              Ver Site Público
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Leads</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Perfil da Empresa</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Leads</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardAnalytics.overview.totalLeads}</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">+12% este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avaliações</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardAnalytics.overview.totalReviews}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">Média: {dashboardAnalytics.overview.averageRating}/5</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Visualizações</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardAnalytics.overview.profileViews}</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">+8% esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardAnalytics.overview.conversionRate}%</p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">+2.1% este mês</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Leads por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardAnalytics.monthlyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="leads" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fontes de Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardAnalytics.leadSources}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {dashboardAnalytics.leadSources.map((_entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <Card>
              <CardHeader>
                <CardTitle>Leads Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardAnalytics.recentLeads.slice(0, 5).map((lead: Lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium">{lead.name}</h4>
                            <p className="text-sm text-gray-600">{lead.email}</p>
                          </div>
                          <Badge className={getStatusColor(lead.status)}>
                            {getStatusLabel(lead.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{lead.message}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(lead.energyBill)}/mês</p>
                        <p className="text-xs text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardAnalytics.recentLeads.map((lead: Lead) => (
                    <div key={lead.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium text-lg">{lead.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{lead.email}</span>
                              <Phone className="h-4 w-4 ml-4" />
                              <span>{lead.phone}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(lead.status)}>
                          {getStatusLabel(lead.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Tipo de Propriedade</p>
                          <p className="text-sm">{lead.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Conta de Energia</p>
                          <p className="text-sm">{formatCurrency(lead.energyBill)}/mês</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Data do Lead</p>
                          <p className="text-sm">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Mensagem</p>
                        <p className="text-sm bg-gray-50 p-3 rounded">{lead.message}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Ligar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button size="sm">
                          Atualizar Status
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações ao Longo do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardAnalytics.reviewsOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="rating" stroke="#f97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Análise da Concorrência</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardAnalytics.competitorAnalysis.map((competitor: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">{competitor.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{competitor.rating}</span>
                            <span>({competitor.reviews} avaliações)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{competitor.marketShare}%</p>
                          <p className="text-xs text-gray-500">Market Share</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Palavras-chave Principais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardAnalytics.topKeywords.map((keyword: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{keyword.keyword}</h4>
                        <p className="text-sm text-gray-600">{keyword.searches} buscas/mês</p>
                      </div>
                      <Badge variant="outline">
                        #{keyword.ranking}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Informações da Empresa</CardTitle>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Nome da Empresa</label>
                        <p className="text-lg font-medium">{companyProfile.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Localização</label>
                        <p className="text-lg">{companyProfile.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Capacidade Instalada</label>
                        <p className="text-lg">{companyProfile.installed_capacity_mw} MW</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Ano de Fundação</label>
                        <p className="text-lg">{companyProfile.foundedYear}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Descrição</label>
                      <p className="text-gray-700 mt-1">{companyProfile.description}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Áreas de Atendimento</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {companyProfile.serviceAreas.map((area: string, index: number) => (
                          <Badge key={index} variant="secondary">{area}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Especialidades</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {companyProfile.specialties.map((specialty: string, index: number) => (
                          <Badge key={index} variant="outline">{specialty}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Certificações</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {companyProfile.certifications.map((cert: string, index: number) => (
                          <Badge key={index} className="bg-green-100 text-green-800">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Telefone</p>
                        <p className="text-sm text-gray-600">{companyProfile.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-gray-600">{companyProfile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Website</p>
                        <p className="text-sm text-gray-600">{companyProfile.website}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Endereço</p>
                        <p className="text-sm text-gray-600">{companyProfile.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Horário de Funcionamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(companyProfile.businessHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="capitalize">{day}</span>
                          <span className="text-gray-600">{hours as string}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;