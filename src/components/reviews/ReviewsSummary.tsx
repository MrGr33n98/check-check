import { Link } from 'react-router-dom';
import { Star, ArrowRight, MessageCircle } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';

interface ReviewsSummaryProps {
  companyId: number;
}

const ReviewsSummary = ({ companyId }: ReviewsSummaryProps) => {
  const { reviews, stats, isLoading } = useReviews(companyId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalReviews === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Avaliações</h3>
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Esta empresa ainda não possui avaliações.</p>
          <Link
            to={`/company/${companyId}/reviews`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Seja o primeiro a avaliar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const recentReviews = reviews.slice(0, 2);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Avaliações</h3>
        <Link
          to={`/company/${companyId}/reviews`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          Ver todas ({stats.totalReviews})
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Resumo das Estatísticas */}
      <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.averageRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(stats.averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-600">
            {stats.totalReviews} avaliações
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {stats.recommendationRate.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-600">
            Recomendam
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {stats.verifiedReviews}
          </div>
          <div className="text-xs text-gray-600">
            Verificadas
          </div>
        </div>
      </div>

      {/* Reviews Recentes */}
      <div className="space-y-4">
        {recentReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {review.userAvatar ? (
                  <img 
                    src={review.userAvatar} 
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  review.userName.charAt(0).toUpperCase()
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 text-sm">{review.userName}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-2">{review.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment.length > 150 
                    ? `${review.comment.substring(0, 150)}...` 
                    : review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <Link
          to={`/company/${companyId}/reviews`}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ver todas as avaliações
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ReviewsSummary;