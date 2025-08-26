import React from 'react'
import { Mail, Phone, MapPin, DollarSign, Calendar, MessageSquare, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Lead } from '@/data/types'

interface LeadCardProps {
  lead: Lead
  onStatusChange?: (leadId: number, status: Lead['status']) => void
  onViewDetails?: (leadId: number) => void
  showActions?: boolean
  className?: string
}

const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onStatusChange,
  onViewDetails,
  showActions = true,
  className
}) => {
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
    if (score >= 80) return 'Alto'
    if (score >= 60) return 'Médio-Alto'
    if (score >= 40) return 'Médio'
    return 'Baixo'
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
    <Card className={cn('transition-all duration-200 hover:shadow-md', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {lead.name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                {formatDate(lead.created_at)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={cn("text-xs", getIntentionScoreColor(lead.intentionScore))}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {lead.intentionScore}% - {getIntentionScoreLabel(lead.intentionScore)}
            </Badge>
            <Badge variant="secondary" className={getStatusColor(lead.status)}>
              {getStatusLabel(lead.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{lead.phone}</span>
            </div>
          </div>

          {/* Property and Budget Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{getPropertyTypeLabel(lead.propertyType)}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span>R$ {lead.energyBill.toFixed(2)}/mês</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{lead.timeline}</span>
            </div>
          </div>

          {/* Budget and Purchase Intention */}
          {(lead.budget || lead.purchaseIntention) && (
            <div className="flex flex-wrap gap-2">
              {lead.budget && (
                <Badge variant="outline" className="text-xs">
                  {lead.budget}
                </Badge>
              )}
              {lead.purchaseIntention && (
                <Badge variant="outline" className="text-xs">
                  {lead.purchaseIntention}
                </Badge>
              )}
            </div>
          )}

          {/* Message Preview */}
          {lead.message && (
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground line-clamp-2">
                {lead.message}
              </p>
            </div>
          )}

          {/* Actions */}
          {showActions && (
            <div className="flex flex-wrap gap-2 pt-3 border-t">
              {lead.status === 'new' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange?.(lead.id, 'contacted')}
                >
                  Marcar como Contatado
                </Button>
              )}
              {lead.status === 'contacted' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange?.(lead.id, 'qualified')}
                >
                  Qualificar Lead
                </Button>
              )}
              {lead.status === 'qualified' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange?.(lead.id, 'proposal_sent')}
                >
                  Proposta Enviada
                </Button>
              )}
              {lead.status === 'proposal_sent' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-50 text-green-700 hover:bg-green-100"
                    onClick={() => onStatusChange?.(lead.id, 'closed_won')}
                  >
                    Fechado - Ganho
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-50 text-red-700 hover:bg-red-100"
                    onClick={() => onStatusChange?.(lead.id, 'closed_lost')}
                  >
                    Fechado - Perdido
                  </Button>
                </div>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onViewDetails?.(lead.id)}
              >
                Ver Detalhes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { LeadCard }
export type { LeadCardProps }