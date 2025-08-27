import React from 'react';
import { Card, CardContent, CardHeader } from './card';
import StarRating from './star-rating';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface ReviewCardProps {
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  rating,
  comment,
  date,
  avatar,
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold">{author}</h4>
            <div className="flex items-center space-x-2">
              <StarRating rating={rating} size="sm" />
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;