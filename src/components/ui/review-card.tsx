import React from 'react'
import { User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { cn } from '@/lib/utils'

interface Review {
  id: number
  solar_company_id: number
  user_id: number
  rating: number
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  user_name: string
}

interface ReviewCardProps {
  review: Review
  showStatus?: boolean
  onStatusChange?: (reviewId: number, status: 'approved' | 'rejected') => void
  className?: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showStatus = false,
  onStatusChange,
  className
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Aprovado
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejeitado
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pendente
          </Badge>
        )
      default:
        return null
    }
  }

  const handleStatusChange = (newStatus: 'approved' | 'rejected') => {
    if (onStatusChange) {
      onStatusChange(review.id, newStatus)
    }
  }

  return (
    <Card className={cn('transition-all duration-200', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {review.user_name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {formatDate(review.created_at)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showStatus && (
              <div className="flex items-center gap-1">
                {getStatusIcon(review.status)}
                {getStatusBadge(review.status)}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-3">
          <StarRating 
            rating={review.rating} 
            showValue 
            size="sm"
          />
        </div>
        
        <p className="text-sm text-foreground leading-relaxed">
          {review.comment}
        </p>

        {showStatus && review.status === 'pending' && onStatusChange && (
          <div className="flex gap-2 mt-4 pt-4 border-t">
            <button
              onClick={() => handleStatusChange('approved')}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
            >
              <CheckCircle className="w-3 h-3" />
              Aprovar
            </button>
            <button
              onClick={() => handleStatusChange('rejected')}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
            >
              <XCircle className="w-3 h-3" />
              Rejeitar
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ReviewCard }
export type { Review }