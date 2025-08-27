import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import StarRating from '../ui/star-rating';

interface ReviewStatsProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: number[];
}

const ReviewStats: React.FC<ReviewStatsProps> = ({
  averageRating,
  totalReviews,
  ratingDistribution
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas de Avaliações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <StarRating rating={averageRating} size="lg" />
          <p className="text-muted-foreground mt-2">{totalReviews} avaliações</p>
        </div>
        
        <div className="space-y-2">
          {ratingDistribution.map((count, index) => {
            const stars = 5 - index;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStats;