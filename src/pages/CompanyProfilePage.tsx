import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Award, 
  Calendar,
  Users,
  DollarSign,
  ArrowLeft,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

// Interfaces
interface Provider {
  id: number;
  name: string;
  slug: string;
  title: string;
  short_description: string;
  country: string;
  address: string;
  phone: string;
  foundation_year: number;
  members_count: number;
  revenue: string;
  social_links: string[];
  tags: string[];
  status: string;
  logo_url: string;
  rating: number;
  review_count: number;
}

interface Review {
  id: number;
  user: { name: string };
  comment: string;
  overall_score: number;
  scores: { [key: string]: number };
  featured: boolean;
  created_at: string;
}

const reviewCriteria = [
  { key: 'tempo_atuacao', label: 'Tempo de atuação' },
  { key: 'litigios_historico', label: 'Litígios e histórico' },
  { key: 'verificacao_licencas_seguros', label: 'Verificação de licenças e seguros' },
  { key: 'lucratividade_instalador', label: 'Lucratividade do instalador' },
  { key: 'avaliacoes_consumidores', label: 'Avaliações dos consumidores' },
  { key: 'transparencia_precos_vendas', label: 'Transparência de preços e vendas' },
  { key: 'tamanho_localizacao_empresa', label: 'Tamanho e localização da empresa' },
  { key: 'qualidade_marcas_vendidas', label: 'Qualidade das marcas vendidas' },
  { key: 'integracao_vertical', label: 'Integração vertical' },
  { key: 'transparencia_reputacao', label: 'Transparência sobre reputação' },
  { key: 'competitividade_financiamento', label: 'Competitividade do financiamento' },
  { key: 'preco_sustentavel_sistemas', label: 'Preço sustentável dos sistemas' },
  { key: 'satisfacao_seguranca_funcionarios', label: 'Satisfação e segurança dos funcionários' },
];

const CompanyProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const providerResponse = await axios.get(`/api/v1/providers/by_slug/${slug}`);
        setProvider(providerResponse.data);
        
        const reviewsResponse = await axios.get(`/api/v1/reviews?provider_id=${providerResponse.data.id}`);
        setReviews(reviewsResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Empresa não encontrada');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [slug]);

  const { criteriaAverages } = useMemo(() => {
    if (reviews.length === 0) {
      return { criteriaAverages: {} };
    }

    const criteriaTotals: { [key: string]: { sum: number; count: number } } = {};
    reviews.forEach(review => {
      Object.entries(review.scores).forEach(([key, value]) => {
        if (!criteriaTotals[key]) {
          criteriaTotals[key] = { sum: 0, count: 0 };
        }
        criteriaTotals[key].sum += value;
        criteriaTotals[key].count++;
      });
    });

    const criteriaAverages: { [key: string]: number } = {};
    Object.entries(criteriaTotals).forEach(([key, { sum, count }]) => {
      criteriaAverages[key] = sum / count;
    });

    return { criteriaAverages };
  }, [reviews]);

  // ... (Loading and Error states remain the same)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* ... (Breadcrumb) */}
        {provider && (
          <>
            {/* Company Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h1 className="text-3xl font-bold text-gray-900 mr-3">{provider.name}</h1>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Verificada
                      </Badge>
                    </div>
                    <p className="text-xl text-gray-600 mb-4">{provider.title}</p>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < provider.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{provider.rating.toFixed(1)}</span>
                      <span className="ml-1 text-sm text-gray-600">({provider.review_count} avaliações)</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-6">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{provider.address}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3 md:ml-8">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                      <Phone className="w-5 h-5 mr-2" />
                      {provider.phone}
                    </Button>
                    {/* ... (Website button) */}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* ... (About and Services cards) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Avaliações por Critério</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviewCriteria.map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{label}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-bold">{(criteriaAverages[key] || 0).toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Avaliações de Clientes ({reviews.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        {review.featured && (
                          <Badge className="mb-2 bg-blue-100 text-blue-800">Em Destaque</Badge>
                        )}
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-5 h-5 ${i < review.overall_score ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="ml-2 font-bold">{review.overall_score.toFixed(1)}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="text-sm text-gray-500">
                          <span>{review.user.name}</span> - 
                          <span>{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                {/* ... (Company Stats and Social Links) */}
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Avalie esta empresa</h3>
                    <p className="text-sm text-gray-600 mb-4">Compartilhe sua experiência para ajudar outros usuários.</p>
                    <Button asChild>
                      <Link to={`/empresas/${provider.slug}/avaliar`}>Deixar uma avaliação</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyProfilePage;