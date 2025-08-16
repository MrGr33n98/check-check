import { Star, MapPin, Zap, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CompanyCard = ({ company, onViewDetails }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
            <div className="flex items-center space-x-1 mb-2">
              {renderStars(company.rating)}
              <span className="text-sm text-gray-600 ml-2">
                ({company.review_count} reviews)
              </span>
            </div>
          </div>
          {company.status === 'active' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Active
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{company.location}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <Zap className="h-4 w-4" />
          <span className="text-sm">{company.installed_capacity_mw} MW Capacity</span>
        </div>

        <p className="text-gray-700 text-sm line-clamp-3">
          {company.description}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {company.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>{company.phone}</span>
            </div>
          )}
          {company.website && (
            <div className="flex items-center space-x-1">
              <Globe className="h-3 w-3" />
              <span>Website</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => onViewDetails && onViewDetails(company)}
          className="w-full"
          variant="outline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;

