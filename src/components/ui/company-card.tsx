import React from 'react'
import { MapPin, Zap, Users, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StarRating } from '@/components/ui/star-rating'
import { cn } from '@/lib/utils'

interface Company {
  id: number
  name: string
  location: string
  installed_capacity_mw: number
  rating: number
  review_count: number
  specialties: string[]
  description: string
  status: 'active' | 'pending' | 'inactive'
}

interface CompanyCardProps {
  company: Company
  onViewDetails?: (company: Company) => void
  onRequestQuote?: (company: Company) => void
  className?: string
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onViewDetails,
  onRequestQuote,
  className
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(company)
    }
  }

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onRequestQuote) {
      onRequestQuote(company)
    }
  }

  return (
    <Card 
      className={cn(
        'group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-md bg-white overflow-hidden',
        className
      )}
      onClick={handleViewDetails}
    >
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {company.name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" />
              <span className="font-medium">{company.location}</span>
            </div>
          </div>
          {company.status === 'active' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              Ativo
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {company.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm bg-yellow-50 rounded-lg p-2">
            <Zap className="w-4 h-4 mr-2 text-yellow-600" />
            <div>
              <div className="font-semibold text-gray-900">{company.installed_capacity_mw} MW</div>
              <div className="text-xs text-gray-600">Capacidade</div>
            </div>
          </div>
          <div className="flex items-center text-sm bg-blue-50 rounded-lg p-2">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-900">{company.review_count}</div>
              <div className="text-xs text-gray-600">Avaliações</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
          <StarRating 
            rating={company.rating} 
            showValue 
            size="sm"
          />
          <div className="text-xs text-gray-600 font-medium">
            {company.rating.toFixed(1)}/5.0
          </div>
        </div>

        {company.specialties && company.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {company.specialties.slice(0, 2).map((specialty, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-white border-primary/20 text-primary hover:bg-primary/5"
              >
                {specialty}
              </Badge>
            ))}
            {company.specialties.length > 2 && (
              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                +{company.specialties.length - 2} mais
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 group-hover:border-primary group-hover:text-primary transition-colors"
            onClick={handleViewDetails}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Ver Detalhes
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
            onClick={handleRequestQuote}
          >
            Solicitar Orçamento
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export { CompanyCard }
export type { Company }