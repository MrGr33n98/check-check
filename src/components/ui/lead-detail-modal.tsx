import React from 'react'
import { X, User, Mail, Phone, MapPin, DollarSign, Calendar, MessageSquare, TrendingUp, Home, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Lead } from '@/data/types'

interface LeadDetailModalProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (leadId: number, status: Lead['status']) => void
  className?: string
}

const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  className
}) => {
  if (!isOpen || !lead) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-purple-100 text-purple-800'
      case 'proposal_sent':
        return 'bg-orange-100 text-orange-800'
      case 'closed_won':
        return 'bg-green-100 text-green-800'
      case 'closed_lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'Novo'
      case 'contacted':
        return 'Contatado'
      case 'qualified':
        return 'Qualificado'
      case 'proposal_sent':
        return 'Proposta Enviada'
      case 'closed_won':
        return 'Fechado - Ganho'
      case 'closed_lost':
        return 'Fechado - Perdido'
      default:
        return status
    }
  }

  const getIntentionScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    if (score >= 40) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getIntentionScoreLabel = (score: number) => {
    if (score >= 80) return 'Alto Potencial'
    if (score >= 60) return 'Bom Potencial'
    if (score >= 40) return 'Potencial Médio'
    return 'Baixo Potencial'
  }

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'residential':
        return 'Residencial'
      case 'commercial':
        return 'Comercial'
      case 'industrial':
        return 'Industrial'
      case 'rural':
        return 'Rural'
      default:
        return type
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className={cn("w-full max-w-4xl max-h-[90vh] overflow-y-auto", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{lead.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Lead recebido em {formatDate(lead.created_at)}
                </p>
              </div>
            </CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={cn("text-sm", getIntentionScoreColor(lead.intentionScore))}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {lead.intentionScore}% - {getIntentionScoreLabel(lead.intentionScore)}
            </Badge>
            <Badge variant="secondary" className={getStatusColor(lead.status)}>
              {getStatusLabel(lead.status)}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lead.phone}</p>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                  </div>
                </div>
                {lead.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{lead.address}</p>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Informações da Propriedade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tipo de Propriedade</span>
                  <span className="font-medium">{getPropertyTypeLabel(lead.propertyType)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conta de Energia</span>
                  <span className="font-medium">R$ {lead.energyBill.toFixed(2)}/mês</span>
                </div>
                {lead.roofType && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tipo de Telhado</span>
                    <span className="font-medium">{lead.roofType}</span>
                  </div>
                )}
                {lead.roofArea && lead.roofArea > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Área do Telhado</span>
                    <span className="font-medium">{lead.roofArea} m²</span>
                  </div>
                )}
                {lead.currentEnergySource && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Fonte de Energia Atual</span>
                    <span className="font-medium">{lead.currentEnergySource}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Detalhes do Projeto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lead.timeline}</p>
                    <p className="text-sm text-muted-foreground">Prazo</p>
                  </div>
                </div>
                {lead.budget && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{lead.budget}</p>
                      <p className="text-sm text-muted-foreground">Orçamento</p>
                    </div>
                  </div>
                )}
                {lead.purchaseIntention && (
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{lead.purchaseIntention}</p>
                      <p className="text-sm text-muted-foreground">Interesse</p>
                    </div>
                  </div>
                )}
                {lead.decisionMaker && (
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{lead.decisionMaker}</p>
                      <p className="text-sm text-muted-foreground">Tomador de Decisão</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(lead.financingInterest || lead.previousQuotes || lead.installationUrgency) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informações Adicionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {lead.financingInterest && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Interesse em Financiamento</p>
                      <p className="font-medium">{lead.financingInterest}</p>
                    </div>
                  )}
                  {lead.previousQuotes && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Orçamentos Anteriores</p>
                      <p className="font-medium">{lead.previousQuotes}</p>
                    </div>
                  )}
                  {lead.installationUrgency && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Urgência da Instalação</p>
                      <p className="font-medium">{lead.installationUrgency}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Messages */}
          {(lead.message || lead.specificRequirements) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Mensagens e Requisitos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lead.message && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Mensagem Inicial</p>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">{lead.message}</p>
                  </div>
                )}
                {lead.specificRequirements && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Requisitos Específicos</p>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">{lead.specificRequirements}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Status Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações do Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lead.status === 'new' && (
                  <Button
                    onClick={() => onStatusChange?.(lead.id, 'contacted')}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Marcar como Contatado
                  </Button>
                )}
                {lead.status === 'contacted' && (
                  <Button
                    onClick={() => onStatusChange?.(lead.id, 'qualified')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Qualificar Lead
                  </Button>
                )}
                {lead.status === 'qualified' && (
                  <Button
                    onClick={() => onStatusChange?.(lead.id, 'proposal_sent')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Marcar Proposta Enviada
                  </Button>
                )}
                {lead.status === 'proposal_sent' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onStatusChange?.(lead.id, 'closed_won')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Fechado - Ganho
                    </Button>
                    <Button
                      onClick={() => onStatusChange?.(lead.id, 'closed_lost')}
                      variant="destructive"
                    >
                      Fechado - Perdido
                    </Button>
                  </div>
                )}
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

export { LeadDetailModal }
export type { LeadDetailModalProps }