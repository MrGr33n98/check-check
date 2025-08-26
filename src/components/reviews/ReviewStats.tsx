import { Star, ThumbsUp, Shield, TrendingUp } from 'lucide-react';
import { ReviewStats as ReviewStatsType } from '@/types/reviews';

interface ReviewStatsProps {
  stats: ReviewStatsType;
}

const ReviewStats = ({ stats }: ReviewStatsProps) => {
  const { totalReviews, averageRating, ratingDistribution, recommendationRate, verifiedReviews } = stats;

  const getRatingPercentage = (rating: number) => {
    return totalReviews > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Avaliações dos Clientes</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resumo Geral */}
        <div>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">
              Baseado em {totalReviews} {totalReviews === 1 ? 'avaliação' : 'avaliações'}
            </p>
          </div>

          {/* Estatísticas Adicionais */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <ThumbsUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {recommendationRate.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Recomendariam</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {verifiedReviews}
              </div>
              <div className="text-sm text-gray-600">Verificadas</div>
            </div>
          </div>
        </div>

        {/* Distribuição de Estrelas */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Distribuição das Avaliações</h4>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  />
                </div>
                
                <div className="text-sm text-gray-600 w-12 text-right">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges de Qualidade */}
      {averageRating >= 4.5 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              Altamente Recomendado
            </div>
            {verifiedReviews >= totalReviews * 0.8 && (
              <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Avaliações Verificadas
              </div>
            )}
            {recommendationRate >= 90 && (
              <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Excelente Satisfação
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStats;