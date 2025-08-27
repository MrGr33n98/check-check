import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  readonly = true,
  onRatingChange,
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        
        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
              !readonly && 'cursor-pointer hover:text-yellow-400'
            )}
            onClick={() => !readonly && onRatingChange?.(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;