import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Shield, Calendar, Zap, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Review } from '@/types/reviews';

interface ReviewCardProps {
  review: Review;
  onMarkHelpful: (reviewId: number, helpful: boolean) => void;
}

const ReviewCard = ({ review, onMarkHelpful }: ReviewCardProps) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProjectTypeLabel = (type: string) => {
    const labels = {
      residential: 'Residencial',
      commercial: 'Comercial',
      industrial: 'Industrial'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleVote = (helpful: boolean) => {
    if (!hasVoted) {
      onMarkHelpful(review.id, helpful);
      setHasVoted(true);
    }
  };

  const shouldTruncate = review.comment.length > 300;
  const displayComment = shouldTruncate && !showFullComment 
    ? review.comment.substring(0, 300) + '...' 
    : review.comment;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header da Review */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            review.userName.charAt(0).toUpperCase()
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            {review.verified && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                <Shield className="w-3 h-3" />
                Verificado
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(review.createdAt)}
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {getProjectTypeLabel(review.projectType)} - {review.projectSize}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= review.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            {review.rating}/5 estrelas
          </div>
        </div>
      </div>

      {/* Título da Review */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {review.title}
      </h3>

      {/* Comentário */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {displayComment}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setShowFullComment(!showFullComment)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 flex items-center gap-1"
          >
            {showFullComment ? (
              <>
                Ver menos <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Ver mais <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Prós e Contras */}
      {(review.pros.length > 0 || review.cons.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {review.pros.length > 0 && (
            <div>
              <h5 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                Pontos Positivos
              </h5>
              <ul className="space-y-1">
                {review.pros.map((pro, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {review.cons.length > 0 && review.cons[0] !== 'Nenhum ponto negativo' && (
            <div>
              <h5 className="font-medium text-red-700 mb-2 flex items-center gap-1">
                <ThumbsDown className="w-4 h-4" />
                Pontos de Melhoria
              </h5>
              <ul className="space-y-1">
                {review.cons.map((con, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Recomendação */}
      {review.wouldRecommend && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-green-800">
            <ThumbsUp className="w-4 h-4" />
            <span className="font-medium text-sm">Recomenda esta empresa</span>
          </div>
        </div>
      )}

      {/* Resposta da Empresa */}
      {review.companyResponse && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Resposta da empresa</span>
            <span className="text-xs text-blue-600">
              {formatDate(review.companyResponse.respondedAt)}
            </span>
          </div>
          <p className="text-blue-800 text-sm leading-relaxed">
            {review.companyResponse.message}
          </p>
          <div className="text-xs text-blue-600 mt-2">
            — {review.companyResponse.respondedBy}
          </div>
        </div>
      )}

      {/* Footer com Ações */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Instalação realizada em {formatDate(review.installationDate)}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Esta avaliação foi útil?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote(true)}
              disabled={hasVoted}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                hasVoted 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {review.helpful}
            </button>
            <button
              onClick={() => handleVote(false)}
              disabled={hasVoted}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                hasVoted 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              {review.notHelpful}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;