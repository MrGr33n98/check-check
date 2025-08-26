import { useState, useEffect } from 'react';
import { Review, ReviewStats, ReviewFilters, CreateReviewData } from '@/types/reviews';

// Mock data para demonstração
const mockReviews: Review[] = [
  {
    id: 1,
    companyId: 1,
    userId: 1,
    userName: 'João Silva',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    title: 'Excelente serviço e atendimento!',
    comment: 'Contratei a empresa para instalação residencial e superou todas as expectativas. Equipe profissional, instalação rápida e sistema funcionando perfeitamente há 6 meses.',
    pros: ['Atendimento excelente', 'Instalação rápida', 'Preço justo', 'Pós-venda eficiente'],
    cons: ['Nenhum ponto negativo'],
    projectType: 'residential',
    projectSize: '5kWp',
    installationDate: '2024-06-15',
    wouldRecommend: true,
    verified: true,
    helpful: 12,
    notHelpful: 1,
    createdAt: '2024-12-15T10:30:00Z',
    updatedAt: '2024-12-15T10:30:00Z',
    companyResponse: {
      message: 'Muito obrigado pelo feedback positivo, João! Ficamos felizes em saber que superamos suas expectativas.',
      respondedAt: '2024-12-16T09:15:00Z',
      respondedBy: 'Equipe Solar Tech'
    }
  },
  {
    id: 2,
    companyId: 1,
    userId: 2,
    userName: 'Maria Santos',
    rating: 4,
    title: 'Boa empresa, mas pode melhorar comunicação',
    comment: 'Instalação foi bem feita e sistema está funcionando conforme esperado. Único ponto de melhoria seria a comunicação durante o processo.',
    pros: ['Qualidade da instalação', 'Equipamentos de boa qualidade', 'Preço competitivo'],
    cons: ['Comunicação poderia ser melhor', 'Prazo um pouco apertado'],
    projectType: 'residential',
    projectSize: '8kWp',
    installationDate: '2024-08-20',
    wouldRecommend: true,
    verified: true,
    helpful: 8,
    notHelpful: 2,
    createdAt: '2024-11-10T14:20:00Z',
    updatedAt: '2024-11-10T14:20:00Z'
  }
];

export const useReviews = (companyId?: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<ReviewFilters>({
    sortBy: 'newest'
  });

  useEffect(() => {
    if (companyId) {
      loadReviews(companyId);
    }
  }, [companyId, filters]);

  const loadReviews = async (id: number) => {
    setIsLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredReviews = mockReviews.filter(review => review.companyId === id);
      
      // Aplicar filtros
      if (filters.rating) {
        filteredReviews = filteredReviews.filter(review => review.rating === filters.rating);
      }
      if (filters.projectType) {
        filteredReviews = filteredReviews.filter(review => review.projectType === filters.projectType);
      }
      if (filters.verified !== undefined) {
        filteredReviews = filteredReviews.filter(review => review.verified === filters.verified);
      }
      
      // Aplicar ordenação
      filteredReviews.sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'highest':
            return b.rating - a.rating;
          case 'lowest':
            return a.rating - b.rating;
          case 'helpful':
            return b.helpful - a.helpful;
          default:
            return 0;
        }
      });
      
      setReviews(filteredReviews);
      
      // Calcular estatísticas
      const allCompanyReviews = mockReviews.filter(review => review.companyId === id);
      const statsData = calculateStats(allCompanyReviews);
      setStats(statsData);
      
    } catch (error) {
      console.error('Erro ao carregar reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (reviewsList: Review[]): ReviewStats => {
    const totalReviews = reviewsList.length;
    const averageRating = totalReviews > 0 
      ? reviewsList.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;
    
    const ratingDistribution = {
      5: reviewsList.filter(r => r.rating === 5).length,
      4: reviewsList.filter(r => r.rating === 4).length,
      3: reviewsList.filter(r => r.rating === 3).length,
      2: reviewsList.filter(r => r.rating === 2).length,
      1: reviewsList.filter(r => r.rating === 1).length,
    };
    
    const recommendationRate = totalReviews > 0
      ? (reviewsList.filter(r => r.wouldRecommend).length / totalReviews) * 100
      : 0;
    
    const verifiedReviews = reviewsList.filter(r => r.verified).length;
    
    return {
      totalReviews,
      averageRating,
      ratingDistribution,
      recommendationRate,
      verifiedReviews
    };
  };

  const createReview = async (reviewData: CreateReviewData): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simular criação de review
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview: Review = {
        id: Date.now(),
        ...reviewData,
        images: reviewData.images ? reviewData.images.map(file => file.name) : undefined,
        userId: 999, // Mock user ID
        userName: 'Usuário Atual',
        verified: false,
        helpful: 0,
        notHelpful: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Em uma aplicação real, isso seria enviado para a API
      console.log('Nova review criada:', newReview);
      
      return true;
    } catch (error) {
      console.error('Erro ao criar review:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const markHelpful = async (reviewId: number, helpful: boolean) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { 
              ...review, 
              helpful: helpful ? review.helpful + 1 : review.helpful,
              notHelpful: !helpful ? review.notHelpful + 1 : review.notHelpful
            }
          : review
      ));
    } catch (error) {
      console.error('Erro ao marcar como útil:', error);
    }
  };

  return {
    reviews,
    stats,
    isLoading,
    filters,
    setFilters,
    createReview,
    markHelpful,
    loadReviews
  };
};