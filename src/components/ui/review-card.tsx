import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Review } from '@/data/types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{review.user_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{review.rating}</span>
        </div>
        <p className="text-sm text-gray-600">{review.comment}</p>
        <p className="text-xs text-gray-400 mt-2">
          {new Date(review.created_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
