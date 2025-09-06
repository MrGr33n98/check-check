import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StarRating from '@/components/ui/star-rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  author_name: string;
  author_avatar_url?: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
  is_verified_owner: boolean;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar>
          <AvatarImage src={review.author_avatar_url} alt={review.author_name} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{review.author_name}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formatDate(review.created_at)}</span>
            {review.is_verified_owner && (
              <>
                <span className="text-gray-300">|</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-2">
          <StarRating rating={review.rating} readonly={true} />
        </div>
        <h5 className="font-bold text-md mb-2">{review.title}</h5>
        <p className="text-sm text-gray-600 line-clamp-4 flex-1">{review.body}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
