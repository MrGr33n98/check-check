import React, { useState, useEffect, useCallback, useRef } from 'react';
import StarRating from '@/components/ui/star-rating';
import { Progress } from '@/components/ui/progress';

export interface ReviewStatsData {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
  recommendation_percentage: number;
}

interface ReviewStatsProps {
  stats: ReviewStatsData;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ stats }) => {
  const { average_rating, total_reviews, rating_distribution, recommendation_percentage } = stats;

  const ratingPercentages = {
    '5': total_reviews > 0 ? (rating_distribution['5'] / total_reviews) * 100 : 0,
    '4': total_reviews > 0 ? (rating_distribution['4'] / total_reviews) * 100 : 0,
    '3': total_reviews > 0 ? (rating_distribution['3'] / total_reviews) * 100 : 0,
    '2': total_reviews > 0 ? (rating_distribution['2'] / total_reviews) * 100 : 0,
    '1': total_reviews > 0 ? (rating_distribution['1'] / total_reviews) * 100 : 0,
  };

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Overall rating */}
        <div className="flex flex-col items-center justify-center text-center border-r pr-6">
          <div className="text-5xl font-bold text-gray-800">{average_rating.toFixed(1)}</div>
          <StarRating rating={average_rating} readonly={true} size="lg" />
          <p className="text-sm text-gray-500 mt-2">Based on {total_reviews} reviews</p>
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-green-600">{recommendation_percentage.toFixed(0)}%</div>
            <p className="text-sm text-gray-500">of users recommend this provider</p>
          </div>
        </div>

        {/* Right side: Rating distribution */}
        <div className="space-y-2">
          {(Object.keys(ratingPercentages).reverse() as Array<keyof typeof ratingPercentages>).map(star => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-sm font-medium w-12">{star} star{star > '1' ? 's' : ''}</span>
              <Progress value={ratingPercentages[star]} className="flex-1" />
              <span className="text-sm text-gray-500 w-10 text-right">{rating_distribution[star]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
