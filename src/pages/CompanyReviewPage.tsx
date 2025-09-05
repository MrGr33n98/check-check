import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Send, HelpCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PromoBannerSidebar from '@/components/banners/PromoBannerSidebar';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const reviewCriteria = [
  { key: 'tempo_atuacao', label: 'Tempo de atuação no mercado solar', description: 'Experiência e estabilidade da empresa no mercado de energia solar.' },
  { key: 'confiabilidade_legal', label: 'Confiabilidade legal e regulatória', description: 'Reputação legal, histórico de litígios, e verificação de licenças e seguros.' },
  { key: 'transparencia_orcamentos', label: 'Transparência de orçamentos e contratos', description: 'Clareza e honestidade nas propostas e termos contratuais.' },
  { key: 'qualidade_painel', label: 'Qualidade e garantia dos painéis solares', description: 'Qualidade dos equipamentos e materiais utilizados, e termos de garantia.' },
  { key: 'eficiencia_inversores', label: 'Eficiência dos inversores e sistemas', description: 'Desempenho e otimização da conversão de energia.' },
  { key: 'padroes_instalacao', label: 'Padrões de instalação e engenharia', description: 'Qualidade técnica da instalação e conformidade com normas de engenharia.' },
  { key: 'suporte_pos_venda', label: 'Suporte técnico e manutenção pós-venda', description: 'Disponibilidade e qualidade do suporte após a instalação.' },
  { key: 'prazo_entrega', label: 'Prazo de entrega e cumprimento do cronograma', description: 'Adesão aos prazos acordados para entrega e instalação do projeto.' },
  { key: 'custo_beneficio', label: 'Custo-benefício dos sistemas', description: 'Equilíbrio entre o investimento inicial e os benefícios a longo prazo.' },
  { key: 'opcoes_financiamento', label: 'Opções de financiamento e condições de pagamento', description: 'Variedade e flexibilidade das soluções financeiras oferecidas.' },
  { key: 'sustentabilidade_esg', label: 'Sustentabilidade e responsabilidade ambiental', description: 'Compromisso da empresa com práticas sustentáveis e critérios ESG.' },
  { key: 'atendimento_cliente', label: 'Atendimento ao cliente e comunicação', description: 'Qualidade da interação e clareza na comunicação com o cliente.' },
  { key: 'satisfacao_funcionarios', label: 'Satisfação e segurança dos funcionários', description: 'Cultura interna da empresa e bem-estar da equipe de trabalho.' },
];

interface Scores { [key: string]: number; }

interface Company {
  id: number;
  name: string;
  logo_url?: string;
  banner_image_url?: string;
}

const CompanyReviewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [company, setCompany] = useState<Company | null>(null);
  const [scores, setScores] = useState<Scores>({});
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`/api/v1/providers/by_slug/${slug}`);
        setCompany({
          id: response.data.id,
          name: response.data.name,
          logo_url: response.data.logo_url,
          banner_image_url: response.data.banner_image_url
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        toast.error("Não foi possível carregar os dados da empresa.");
        navigate('/');
      }
    };
    if (slug) fetchCompany();
  }, [slug, navigate]);

  const overallScore = useMemo(() => {
    const validScores = Object.values(scores).filter(s => s > 0);
    if (!validScores.length) return 0;
    const sum = validScores.reduce((acc, s) => acc + s, 0);
    return parseFloat((sum / validScores.length).toFixed(2));
  }, [scores]);

  const handleRatingChange = (key: string, value: number) =>
    setScores(prev => ({ ...prev, [key]: value }));

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (Object.keys(scores).length !== reviewCriteria.length) newErrors.form = "Por favor, avalie todos os critérios.";
    if (comment.length < 30 || comment.length > 2000) newErrors.comment = "O comentário deve ter entre 30 e 2000 caracteres.";
    if (!consent) newErrors.consent = "Você deve confirmar que a avaliação reflete sua experiência.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { toast.error("Por favor, corrija os erros antes de enviar."); return; }
    if (!user) { toast.error("Você precisa estar logado para enviar uma avaliação."); navigate('/login'); return; }

    setIsSubmitting(true);
    try {
      const overallRating = overallScore > 0 ? parseFloat(overallScore.toFixed(1)) : 0;
      await axios.post('/api/v1/reviews', {
        review: {
          provider_id: company?.id,
          user_id: user.id,
          rating: overallRating,
          title: comment.substring(0, 100),
          comment,
          scores,
          overall_score: overallRating,
          status: 'pending',
          featured: false,
        }
      });
      toast.success("Seu review foi enviado e aguarda aprovação.");
      navigate(`/empresas/${slug}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Ocorreu um erro ao enviar seu review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-full max-w-7xl pr-4 pl-4 lg:pl-6 xl:pl-8 mr-auto">
          {/* ⬇️ Grid invertido: formulário (1fr) à esquerda, sidebar (280px) à direita */}
          <div className="grid grid-cols-1 md:[grid-template-columns:1fr_280px] gap-6 md:gap-6 items-start">
            {/* SECTION: Formulário à ESQUERDA */}
            <section className="w-full">
              <Card>
                <CardHeader className="relative overflow-hidden p-0">
                  <div
                    className="relative h-28 md:h-32"
                    style={{
                      backgroundImage: company?.banner_image_url ? `url(${company.banner_image_url})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute left-4 -bottom-6 z-10">
                      <div className="p-[2px] rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-purple-500">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-slate-200 shadow-sm overflow-hidden flex items-center justify-center">
                          {company?.logo_url ? (
                            <img src={company.logo_url} alt={`${company?.name} logo`} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-blue-600 font-bold text-lg">{company?.name?.charAt(0)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 px-5 pb-4 relative z-20">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      Avalie {company?.name || 'a Empresa'}
                    </CardTitle>
                    <CardDescription>Sua opinião é fundamental para a comunidade.</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="px-5">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {errors.form && (
                      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errors.form}
                      </div>
                    )}

                    <div className="space-y-6">
                      {reviewCriteria.map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between gap-4">
                          <div className="flex items-center">
                            <label className="font-medium text-sm mr-2">{label}</label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" aria-label={`Ajuda: ${label}`} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-sm">{description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((starValue) => (
                              <Star
                                key={starValue}
                                role="radio"
                                aria-checked={starValue === (scores[key] || 0)}
                                aria-label={`${label}: ${starValue} estrela(s)`}
                                className={`w-5 h-5 cursor-pointer transition-transform hover:scale-125 ${
                                  starValue <= (scores[key] || 0)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                onClick={() => handleRatingChange(key, starValue)}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg text-center">
                      <h3 className="text-lg font-semibold">Nota Geral</h3>
                      <p className="text-4xl font-bold text-blue-600">{overallScore.toFixed(2)}</p>
                    </div>

                    <div>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Escreva seu comentário (mínimo 30 caracteres)"
                        rows={6}
                        className={errors.comment ? 'border-red-500' : ''}
                      />
                      <p className="text-sm text-gray-500 mt-1">{comment.length} / 2000 caracteres</p>
                      {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="consent"
                        checked={consent}
                        onCheckedChange={(checked) => setConsent(Boolean(checked))}
                      />
                      <label htmlFor="consent" className="text-sm">
                        Confirmo que esta avaliação reflete minha experiência e concordo com os termos de uso.
                      </label>
                    </div>
                    {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}

                    <Button type="submit" className="w-full text-lg py-6" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                      {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </section>

            {/* ASIDE: SidebarBanners à DIREITA */}
            <aside className="md:order-last md:sticky md:top-24">
              <PromoBannerSidebar />
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CompanyReviewPage;
