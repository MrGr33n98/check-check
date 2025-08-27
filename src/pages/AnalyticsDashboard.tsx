import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CompanyLayout from '../components/layout/CompanyLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import analyticsService, { DashboardData } from '../services/analyticsService';
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Settings, 
  Building2,
  Phone,
  MapPin,
  Calendar,
  RefreshCw
} from 'lucide-react';

interface CompanyData {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  country: string;
  foundationYear: number;
  membersCount: number;
  status: 'pending' | 'active' | 'rejected' | 'suspended';
  tags: string[];
  socialLinks: string[];
  phone?: string;
  address?: string;
}

const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<CompanyData>>({});
  const [providerId] = useState(1); // This should come from user context or props

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadCompanyData(),
        loadDashboardData()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        loadDashboardData()
      ]);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const loadCompanyData = async () => {
    try {
      // Simular dados da empresa para demonstração
      // Em uma implementação real, isso viria de uma API de providers
      const mockCompanyData: CompanyData = {
        id: '1',
        name: user?.company_name || 'Minha Empresa Solar',
        description: 'Empresa especializada em soluções de energia solar fotovoltaica, oferecendo instalação, manutenção e consultoria para residências e empresas.',
        country: 'Brasil',
        foundationYear: 2020,
        membersCount: 15,
        status: 'active',
        tags: ['Energia Solar', 'Fotovoltaica', 'Sustentabilidade', 'Energia Renovável'],
        socialLinks: ['https://facebook.com/minhaempresa', 'https://instagram.com/minhaempresa'],
        phone: '(11) 99999-9999',
        address: 'São Paulo, SP'
      };
      
      setCompanyData(mockCompanyData);
      setEditForm(mockCompanyData);
    } catch (error) {
      console.error('Erro ao carregar dados da empresa:', error);
    }
  };





  const loadDashboardData = async () => {
    try {
      const dashboard = await analyticsService.getDashboardData(providerId);
      setDashboardData(dashboard);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Aqui seria feita a chamada para a API para salvar as alterações
      console.log('Salvando alterações:', editForm);
      
      setCompanyData({ ...companyData!, ...editForm });
      setIsEditing(false);
      
      // Simular sucesso
      alert('Informações da empresa atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      alert('Erro ao salvar alterações. Tente novamente.');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Aguardando Aprovação', variant: 'secondary' as const },
      active: { label: 'Ativa', variant: 'default' as const },
      rejected: { label: 'Rejeitada', variant: 'destructive' as const },
      suspended: { label: 'Suspensa', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Empresa não encontrada</h2>
          <p className="text-gray-600">Não foi possível carregar os dados da sua empresa.</p>
        </div>
      </div>
    );
  }

  return (
    <CompanyLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Analytics</h1>
              <p className="text-gray-600 mt-1">Gerencie sua empresa e acompanhe suas métricas</p>
            </div>
            <div className="flex items-center gap-4">
              {getStatusBadge(companyData.status)}
              <Button 
                onClick={refreshData}
                variant="outline"
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Atualizando...' : 'Atualizar'}
              </Button>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancelar' : 'Editar Empresa'}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="company">Dados da Empresa</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {dashboardData && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Leads Recebidos</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.overview.total_leads}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardData.monthly_comparison.current_month.leads} este mês
                      {dashboardData.monthly_comparison.growth.leads > 0 && (
                        <span className="text-green-600 ml-1">
                          (+{dashboardData.monthly_comparison.growth.leads.toFixed(1)}%)
                        </span>
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.overview.total_page_views}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardData.monthly_comparison.current_month.page_views} este mês
                      {dashboardData.monthly_comparison.growth.page_views > 0 && (
                        <span className="text-green-600 ml-1">
                          (+{dashboardData.monthly_comparison.growth.page_views.toFixed(1)}%)
                        </span>
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversões</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.overview.total_conversions}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardData.overview.conversion_rate.toFixed(1)}% taxa
                      {dashboardData.monthly_comparison.growth.conversions > 0 && (
                        <span className="text-green-600 ml-1">
                          (+{dashboardData.monthly_comparison.growth.conversions.toFixed(1)}%)
                        </span>
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Fontes de Conversão</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.conversion_sources[0]?.source || 'N/A'}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardData.conversion_sources[0]?.percentage.toFixed(1)}% do total
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Conversion Sources Chart */}
            {dashboardData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fontes de Conversão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.conversion_sources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500" style={{
                              backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                            }}></div>
                            <span className="text-sm font-medium">{source.source}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">{source.leads}</div>
                            <div className="text-xs text-gray-500">{source.percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Comparação Mensal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Leads</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">
                            {dashboardData.monthly_comparison.current_month.leads} vs {dashboardData.monthly_comparison.previous_month.leads}
                          </div>
                          <div className={`text-xs ${
                            dashboardData.monthly_comparison.growth.leads > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {dashboardData.monthly_comparison.growth.leads > 0 ? '+' : ''}
                            {dashboardData.monthly_comparison.growth.leads.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Visualizações</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">
                            {dashboardData.monthly_comparison.current_month.page_views} vs {dashboardData.monthly_comparison.previous_month.page_views}
                          </div>
                          <div className={`text-xs ${
                            dashboardData.monthly_comparison.growth.page_views > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {dashboardData.monthly_comparison.growth.page_views > 0 ? '+' : ''}
                            {dashboardData.monthly_comparison.growth.page_views.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Conversões</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">
                            {dashboardData.monthly_comparison.current_month.conversions} vs {dashboardData.monthly_comparison.previous_month.conversions}
                          </div>
                          <div className={`text-xs ${
                            dashboardData.monthly_comparison.growth.conversions > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {dashboardData.monthly_comparison.growth.conversions > 0 ? '+' : ''}
                            {dashboardData.monthly_comparison.growth.conversions.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Gráfico placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Leads por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Gráfico de leads será implementado aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome da Empresa</label>
                        <Input
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">País</label>
                        <Input
                          value={editForm.country || ''}
                          onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Telefone</label>
                        <Input
                          value={editForm.phone || ''}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Endereço</label>
                        <Input
                          value={editForm.address || ''}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Ano de Fundação</label>
                        <Input
                          type="number"
                          value={editForm.foundationYear || ''}
                          onChange={(e) => setEditForm({ ...editForm, foundationYear: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Número de Funcionários</label>
                        <Input
                          type="number"
                          value={editForm.membersCount || ''}
                          onChange={(e) => setEditForm({ ...editForm, membersCount: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição</label>
                      <Textarea
                        rows={4}
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
                      <Input
                        value={editForm.tags?.join(', ') || ''}
                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <Button onClick={handleSaveChanges}>Salvar Alterações</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{companyData.name}</p>
                          <p className="text-sm text-gray-600">Nome da empresa</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{companyData.country}</p>
                          <p className="text-sm text-gray-600">País</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{companyData.phone || 'Não informado'}</p>
                          <p className="text-sm text-gray-600">Telefone</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{companyData.foundationYear}</p>
                          <p className="text-sm text-gray-600">Ano de fundação</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2">Descrição</p>
                        <p className="text-gray-700">{companyData.description}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {companyData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leads Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock leads data */}
                  {[
                    { name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', interest: 'Sistema Residencial 5kW', date: '2024-01-15' },
                    { name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', interest: 'Sistema Comercial 20kW', date: '2024-01-14' },
                    { name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 77777-7777', interest: 'Consultoria Energética', date: '2024-01-13' }
                  ].map((lead, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{lead.name}</h4>
                          <p className="text-sm text-gray-600">{lead.email} • {lead.phone}</p>
                          <p className="text-sm text-blue-600">{lead.interest}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{lead.date}</p>
                          <Button size="sm" className="mt-2">Contatar</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default AnalyticsDashboard;