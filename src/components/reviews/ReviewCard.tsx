import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import StarRating from '@/components/ui/star-rating';
import { ThumbsUp, ThumbsDown, Flag, CheckCircle, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { api } from '@/middleware/authMiddleware';

export interface Review {
  id: number;
  author_name: string;
  author_avatar_url?: string;
  rating: number;
  title: string;
  body: string;
  pros?: string;
  cons?: string;
  created_at: string;
  helpful_yes_count: number;
  helpful_no_count: number;
  is_verified_owner: boolean;
  would_recommend: boolean;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulYes, setHelpfulYes] = useState(review.helpful_yes_count);
  const [helpfulNo, setHelpfulNo] = useState(review.helpful_no_count);
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);

  const handleVote = async (voteType: 'yes' | 'no') => {
    if (voted) {
      toast.info("You have already voted on this review.");
      return;
    }

    try {
      await api.post(`/reviews/${review.id}/vote`, { vote: voteType });
      if (voteType === 'yes') {
        setHelpfulYes(prev => prev + 1);
      } else {
        setHelpfulNo(prev => prev + 1);
      }
      setVoted(voteType);
      toast.success("Thanks for your feedback!");
    } catch (error) {
      toast.error("Failed to record your vote.");
      console.error("Vote failed:", error);
    }
  };

  const handleReport = async () => {
    if (confirm("Are you sure you want to report this review as inappropriate?")) {
      try {
        await api.post(`/reviews/${review.id}/report`);
        toast.success("Review reported. Our team will investigate.");
      } catch (error) {
        toast.error("Failed to report review.");
        console.error("Report failed:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar>
          <AvatarImage src={review.author_avatar_url} alt={review.author_name} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">{review.author_name}</h4>
            <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} readonly={true} />
            {review.is_verified_owner && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h5 className="font-bold text-lg mb-2">{review.title}</h5>
        <p className="text-gray-700 whitespace-pre-wrap">{review.body}</p>
        
        {review.pros && (
          <div className="mt-4">
            <h6 className="font-semibold text-sm">Pros</h6>
            <p className="text-sm text-gray-600">{review.pros}</p>
          </div>
        )}
        
        {review.cons && (
          <div className="mt-4">
            <h6 className="font-semibold text-sm">Cons</h6>
            <p className="text-sm text-gray-600">{review.cons}</p>
          </div>
        )}

        {review.would_recommend !== null && (
            <p className={`mt-4 text-sm font-medium ${review.would_recommend ? 'text-green-700' : 'text-red-700'}`}>
                {review.would_recommend ? '✓ Recommends this provider' : '✗ Does not recommend this provider'}
            </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Helpful?</span>
          <Button variant="ghost" size="sm" onClick={() => handleVote('yes')} disabled={!!voted}>
            <ThumbsUp className={`w-4 h-4 mr-1 ${voted === 'yes' ? 'text-blue-600' : ''}`} />
            {helpfulYes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleVote('no')} disabled={!!voted}>
            <ThumbsDown className={`w-4 h-4 mr-1 ${voted === 'no' ? 'text-red-600' : ''}`} />
            {helpfulNo}
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReport}>
          <Flag className="w-4 h-4 mr-1" />
          Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
