import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import StarRating from '@/components/ui/star-rating';
import reviewService, { ProviderLite, ReviewPayload } from '@/services/reviewService';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useIsMounted } from '@/utils/safeFetch';

const ReviewFormPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMounted = useIsMounted();
  const formRef = useRef<HTMLFormElement>(null);

  const [company, setCompany] = useState<ProviderLite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [pros, setPros] = useState<string>('');
  const [cons, setCons] = useState<string>('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(true);

  const fetchCompany = useCallback(async () => {
    if (!slug) {
      setError("Slug da empresa não fornecido.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fetchedCompany = await reviewService.fetchProviderBySlug(slug);
      if (isMounted.current) {
        setCompany(fetchedCompany);
      }
    } catch (err) {
      console.error("Failed to fetch company:", err);
      if (isMounted.current) {
        setError("Empresa não encontrada ou erro ao carregar.");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [slug, isMounted]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (rating < 1 || rating > 5) errors.rating = "A nota é obrigatória e deve ser entre 1 e 5.";
    if (body.length < 50) errors.body = "O depoimento deve ter no mínimo 50 caracteres.";
    if (!company?.id) errors.providerId = "ID da empresa é inválido.";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const element = formRef.current?.querySelector(`[name=${firstErrorField}]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (!user) {
      navigate(`/login?redirect_to=/avaliar/${slug}`);
      return;
    }

    setIsSubmitting(true);
    const ratingNum = Math.min(5, Math.max(1, Number(rating))) as 1 | 2 | 3 | 4 | 5;
    const reviewPayload: ReviewPayload = {
      rating: ratingNum,
      title: title || undefined,
      body,
      pros: pros || undefined,
      cons: cons || undefined,
      would_recommend: wouldRecommend,
      source: 'compare-solar-web',
    };

    const result = await reviewService.createReview(company!.id, reviewPayload);

    if (!isMounted.current) return;

    if (result.ok) {
      setSubmitSuccess(true);
      // toast.success("Avaliação enviada com sucesso!");
      setTimeout(() => navigate(`/company/${company!.slug}`), 2000);
    } else {
      if (result.errors) {
        setFormErrors(result.errors);
        const firstErrorField = Object.keys(result.errors)[0];
        const element = formRef.current?.querySelector(`[name=${firstErrorField}]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setError("Erro ao enviar avaliação. Tente novamente.");
      }
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Carregando empresa...</div>;
  }

  if (error || !company) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        {error || "Empresa não encontrada."}
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold mb-2">Avaliação Enviada!</CardTitle>
          <p className="text-gray-600 mb-4">Obrigado por sua contribuição. Sua avaliação foi enviada com sucesso.</p>
          <Button onClick={() => navigate(`/company/${company.slug}`)}>Ver página da empresa</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Avaliar {company.name}
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="rating">Nota (1-5) *</Label>
              <StarRating rating={rating} maxRating={5} readonly={false} onRatingChange={setRating} size="lg" />
              {formErrors.rating && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{formErrors.rating}</p>}
            </div>

            <div>
              <Label htmlFor="title">Título da avaliação (opcional)</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resuma sua experiência em poucas palavras"
                maxLength={120}
              />
              {formErrors.title && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{formErrors.title}</p>}
            </div>

            <div>
              <Label htmlFor="body">Seu depoimento *</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Conte-nos sobre sua experiência com esta empresa (mínimo 80 caracteres)"
                rows={5}
              />
              <p className="text-sm text-gray-500 mt-1">{body.length} / 80 caracteres (mínimo)</p>
              {formErrors.body && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{formErrors.body}</p>}
            </div>

            <div>
              <Label htmlFor="pros">Pontos positivos (opcional)</Label>
              <Textarea
                id="pros"
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                placeholder="Ex: Atendimento excelente, instalação rápida..."
                rows={3}
                maxLength={300}
              />
              {formErrors.pros && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{formErrors.pros}</p>}
            </div>

            <div>
              <Label htmlFor="cons">Pontos a melhorar (opcional)</Label>
              <Textarea
                id="cons"
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                placeholder="Ex: Comunicação, prazo de entrega..."
                rows={3}
                maxLength={300}
              />
              {formErrors.cons && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{formErrors.cons}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="wouldRecommend"
                checked={wouldRecommend}
                onCheckedChange={setWouldRecommend}
              />
              <Label htmlFor="wouldRecommend">Você recomendaria esta empresa?</Label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                "Enviar avaliação"
              )}
            </Button>

            {error && <p className="text-red-500 text-sm mt-4 text-center flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}

            <p className="text-xs text-gray-500 mt-4 text-center">
              Ao enviar, você concorda com nossos <Link to="/termos" className="text-blue-600 hover:underline">Termos</Link> e <Link to="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</Link>.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReviewFormPage;
