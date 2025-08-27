import React, { useState, useEffect } from 'react';

import CompanyLayout from '@/components/layout/CompanyLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
// Removed unused Tabs imports
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  source: 'website' | 'referral' | 'social' | 'advertising' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  estimatedValue: number;
  notes: string;
  createdAt: Date;
  lastContact?: Date;
  nextFollowUp?: Date;
  tags: string[];
}

// Removed unused Opportunity interface

const LeadsManagementPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, priorityFilter]);

  const loadLeads = async () => {
    try {
      // Simular dados de leads para demonstração
      const mockLeads: Lead[] = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao.silva@email.com',
          phone: '(11) 99999-1111',
          location: 'São Paulo, SP',
          source: 'website',
          status: 'new',
          priority: 'high',
          estimatedValue: 25000,
          notes: 'Interessado em sistema residencial de 5kWp',
          createdAt: new Date('2024-01-15'),
          tags: ['Residencial', 'Urgente']
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria.santos@empresa.com',
          phone: '(11) 99999-2222',
          location: 'Rio de Janeiro, RJ',
          source: 'referral',
          status: 'contacted',
          priority: 'medium',
          estimatedValue: 50000,
          notes: 'Empresa interessada em sistema comercial',
          createdAt: new Date('2024-01-10'),
          lastContact: new Date('2024-01-16'),
          nextFollowUp: new Date('2024-01-20'),
          tags: ['Comercial', 'Grande Porte']
        },
        {
          id: '3',
          name: 'Pedro Costa',
          email: 'pedro.costa@email.com',
          phone: '(11) 99999-3333',
          location: 'Belo Horizonte, MG',
          source: 'social',
          status: 'qualified',
          priority: 'high',
          estimatedValue: 35000,
          notes: 'Já possui orçamento de concorrente',
          createdAt: new Date('2024-01-08'),
          lastContact: new Date('2024-01-18'),
          nextFollowUp: new Date('2024-01-22'),
          tags: ['Residencial', 'Competitivo']
        },
        {
          id: '4',
          name: 'Ana Oliveira',
          email: 'ana.oliveira@email.com',
          phone: '(11) 99999-4444',
          location: 'Curitiba, PR',
          source: 'advertising',
          status: 'proposal',
          priority: 'medium',
          estimatedValue: 18000,
          notes: 'Aguardando aprovação do financiamento',
          createdAt: new Date('2024-01-05'),
          lastContact: new Date('2024-01-19'),
          nextFollowUp: new Date('2024-01-25'),
          tags: ['Residencial', 'Financiamento']
        },
        {
          id: '5',
          name: 'Carlos Ferreira',
          email: 'carlos.ferreira@industria.com',
          phone: '(11) 99999-5555',
          location: 'Porto Alegre, RS',
          source: 'website',
          status: 'won',
          priority: 'high',
          estimatedValue: 120000,
          notes: 'Projeto industrial finalizado com sucesso',
          createdAt: new Date('2023-12-20'),
          lastContact: new Date('2024-01-15'),
          tags: ['Industrial', 'Fechado']
        }
      ];
      
      setLeads(mockLeads);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  // Removed loadOpportunities function as it's no longer needed

  const filterLeads = () => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(lead => lead.priority === priorityFilter);
    }

    setFilteredLeads(filtered);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Novo', variant: 'secondary' as const, icon: AlertCircle },
      contacted: { label: 'Contatado', variant: 'default' as const, icon: Phone },
      qualified: { label: 'Qualificado', variant: 'default' as const, icon: CheckCircle },
      proposal: { label: 'Proposta', variant: 'default' as const, icon: Clock },
      negotiation: { label: 'Negociação', variant: 'default' as const, icon: TrendingUp },
      won: { label: 'Ganho', variant: 'default' as const, icon: CheckCircle },
      lost: { label: 'Perdido', variant: 'destructive' as const, icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Baixa', variant: 'secondary' as const },
      medium: { label: 'Média', variant: 'default' as const },
      high: { label: 'Alta', variant: 'destructive' as const }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleAddLead = async () => {
    try {
      const lead: Lead = {
        id: Date.now().toString(),
        name: newLead.name || '',
        email: newLead.email || '',
        phone: newLead.phone || '',
        location: newLead.location || '',
        source: newLead.source || 'website',
        status: 'new',
        priority: newLead.priority || 'medium',
        estimatedValue: newLead.estimatedValue || 0,
        notes: newLead.notes || '',
        createdAt: new Date(),
        tags: newLead.tags || []
      };
      
      setLeads([...leads, lead]);
      setNewLead({});
      setIsAddingLead(false);
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus as Lead['status'], lastContact: new Date() }
          : lead
      ));
    } catch (error) {
      console.error('Erro ao atualizar status do lead:', error);
    }
  };

  const getLeadStats = () => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const won = leads.filter(l => l.status === 'won').length;
    const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
    const conversionRate = total > 0 ? (won / total) * 100 : 0;
    
    return { total, newLeads, qualified, won, totalValue, conversionRate };
  };

  const stats = getLeadStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando leads...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Gestão de Leads</h1>
              <p className="text-gray-600 mt-1">Gerencie seus leads e oportunidades de negócio</p>
            </div>
            <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Lead</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={newLead.name || ''}
                      onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                      placeholder="Nome do lead"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newLead.email || ''}
                      onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={newLead.phone || ''}
                      onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={newLead.location || ''}
                      onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                      placeholder="Cidade, Estado"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedValue">Valor Estimado (R$)</Label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      value={newLead.estimatedValue || ''}
                      onChange={(e) => setNewLead({ ...newLead, estimatedValue: Number(e.target.value) })}
                      placeholder="25000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select value={newLead.priority || 'medium'} onValueChange={(value) => setNewLead({ ...newLead, priority: value as Lead['priority'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={newLead.notes || ''}
                      onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                      placeholder="Observações sobre o lead..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddLead} className="flex-1">
                      Adicionar Lead
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingLead(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Leads</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newLeads}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualificados</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.qualified}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(stats.totalValue)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome, email ou localização..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter} placeholder="Status">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="new">Novo</SelectItem>
                  <SelectItem value="contacted">Contatado</SelectItem>
                  <SelectItem value="qualified">Qualificado</SelectItem>
                  <SelectItem value="proposal">Proposta</SelectItem>
                  <SelectItem value="negotiation">Negociação</SelectItem>
                  <SelectItem value="won">Ganho</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter} placeholder="Prioridade">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Prioridades</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Leads ({filteredLeads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{lead.name}</h3>
                        {getStatusBadge(lead.status)}
                        {getPriorityBadge(lead.priority)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {lead.location}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <span className="font-medium">
                          Valor: {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(lead.estimatedValue)}
                        </span>
                        <span className="text-gray-500">
                          Criado: {lead.createdAt.toLocaleDateString('pt-BR')}
                        </span>
                        {lead.lastContact && (
                          <span className="text-gray-500">
                            Último contato: {lead.lastContact.toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                      
                      {lead.notes && (
                        <p className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded">
                          {lead.notes}
                        </p>
                      )}
                      
                      {lead.tags.length > 0 && (
                        <div className="mt-2 flex gap-2">
                          {lead.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Select
                        value={lead.status}
                        onValueChange={(value) => handleUpdateLeadStatus(lead.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Novo</SelectItem>
                          <SelectItem value="contacted">Contatado</SelectItem>
                          <SelectItem value="qualified">Qualificado</SelectItem>
                          <SelectItem value="proposal">Proposta</SelectItem>
                          <SelectItem value="negotiation">Negociação</SelectItem>
                          <SelectItem value="won">Ganho</SelectItem>
                          <SelectItem value="lost">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredLeads.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum lead encontrado com os filtros aplicados.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default LeadsManagementPage;