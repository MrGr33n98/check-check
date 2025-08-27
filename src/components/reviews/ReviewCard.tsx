import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import StarRating from '../ui/star-rating';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewCardProps {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  avatar?: string;
  helpfulCount?: number;
  notHelpfulCount?: number;
  verified?: boolean;
  className?: string;
  onMarkHelpful?: (reviewId: number, helpful: boolean) => Promise<void>;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  author,
  rating,
  title,
  comment,
  date,
  avatar,
  helpfulCount = 0,
  notHelpfulCount = 0,
  verified = false,
  className,
  onMarkHelpful
}) => {
  const handleHelpful = (helpful: boolean) => {
    if (onMarkHelpful) {
      onMarkHelpful(parseInt(id), helpful);
    } else {
      // Implementar lógica de voto
      console.log(`Review ${id} marked as ${helpful ? 'helpful' : 'not helpful'}`);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{author}</h4>
                {verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verificado
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={rating} size="sm" />
                <span className="text-sm text-muted-foreground">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h5 className="font-medium mb-2">{title}</h5>
        <p className="text-sm text-muted-foreground mb-4">{comment}</p>
        
        <div className="flex items-center space-x-4 text-sm">
          <button 
            onClick={() => handleHelpful(true)}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Útil ({helpfulCount})</span>
          </button>
          <button 
            onClick={() => handleHelpful(false)}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Não útil ({notHelpfulCount})</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;