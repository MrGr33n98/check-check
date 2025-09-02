import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import ReviewStats from '@/components/reviews/ReviewStats';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewCard from '@/components/reviews/ReviewCard';
import CreateReviewForm from '@/components/reviews/CreateReviewForm';

const ReviewsPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const {
    reviews,
    stats,
    isLoading,
    filters,
    setFilters,
    createReview,
    markHelpful
  } = useReviews(companyId ? parseInt(companyId) : undefined);

  // Mock company data - em uma aplicação real viria de uma API
  const companyName = "Solar Tech Pro";

  const handleCreateReview = async (reviewData: any) => {
    const success = await createReview(reviewData);
    if (success) {
      setShowCreateForm(false);
      // Recarregar reviews
      window.location.reload();
    }
    return success;
  };

  if (!companyId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Empresa não encontrada</h1>
          <p className="text-gray-600">ID da empresa não foi fornecido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar com Filtros */}
          <div className="w-[280px] shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <ReviewFilters
                onFiltersChange={setFilters}
              />
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Avaliações - {companyName}
                  </h1>
                  <p className="text-gray-600">
                    Veja o que os clientes estão dizendo sobre esta empresa
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Avaliar Empresa
                </button>
              </div>
            </div>

            {/* Estatísticas */}
            {stats && (
              <ReviewStats 
                averageRating={stats.averageRating}
                totalReviews={stats.totalReviews}
                ratingDistribution={[stats.ratingDistribution[5], stats.ratingDistribution[4], stats.ratingDistribution[3], stats.ratingDistribution[2], stats.ratingDistribution[1]]}
              />
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Lista de Reviews */}
            {!isLoading && reviews.length > 0 && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    id={review.id.toString()}
                    author={review.userName}
                    rating={review.rating}
                    title={review.title}
                    comment={review.comment}
                    date={review.createdAt}
                    avatar={review.userAvatar}
                    helpfulCount={review.helpful}
                    notHelpfulCount={review.notHelpful}
                    verified={review.verified}
                    onMarkHelpful={markHelpful}
                  />
                ))}
              </div>
            )}

            {/* Estado Vazio */}
            {!isLoading && reviews.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Star className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhuma avaliação encontrada
                </h3>
                <p className="text-gray-500 mb-6">
                  {Object.keys(filters).some(key => filters[key as keyof typeof filters] !== undefined && key !== 'sortBy')
                    ? 'Tente ajustar os filtros para ver mais avaliações.'
                    : 'Seja o primeiro a avaliar esta empresa!'}
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Escrever primeira avaliação
                </button>
              </div>
            )}

            {/* Formulário de Criação */}
            {showCreateForm && (
              <CreateReviewForm
                companyId={parseInt(companyId)}
                companyName={companyName}
                onSubmit={handleCreateReview}
                onCancel={() => setShowCreateForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;