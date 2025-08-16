import { Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 rounded-full p-2">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{review.user_name}</h4>
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-600 ml-2">
                  {review.rating}/5
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(review.status)}>
              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatDate(review.created_at)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;

