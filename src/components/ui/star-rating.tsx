interface StarRatingProps {
  rating: number;
  showValue?: boolean;
  size?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, showValue, size }) => {
  return (
    <div className={`star-rating flex items-center ${size === 'sm' ? 'text-sm' : ''}`}>
      <span className="text-yellow-500">★</span>
      <span className="ml-1">{rating.toFixed(1)}</span>
      {showValue && <span className="ml-1">({rating})</span>}
    </div>
  );
};

export default StarRating;
