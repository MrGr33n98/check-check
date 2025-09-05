import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner'; // Assuming sonner for toasts

// Define interfaces for form data and validation errors
interface ReviewFormData {
  company_slug: string;
  rating_atendimento: number;
  rating_agilidade: number;
  rating_preco: number;
  rating_qualidade: number;
  rating_pos_venda: number;
  comment: string;
  user_name: string;
  user_email: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const CompanyReviewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ReviewFormData>({
    company_slug: slug || '',
    rating_atendimento: 0,
    rating_agilidade: 0,
    rating_preco: 0,
    rating_qualidade: 0,
    rating_pos_venda: 0,
    comment: '',
    user_name: '',
    user_email: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update slug if it changes (e.g., if component is reused)
  useEffect(() => {
    if (slug && formData.company_slug !== slug) {
      setFormData(prev => ({ ...prev, company_slug: slug }));
    }
  }, [slug, formData.company_slug]);

  const handleRatingChange = (criterion: keyof ReviewFormData, value: number) => {
    setFormData(prev => ({ ...prev, [criterion]: value }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[criterion as string];
      return newErrors;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.comment.trim()) {
      newErrors.comment = 'O comentário é obrigatório.';
    }
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Seu nome é obrigatório.';
    }
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Seu e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = 'E-mail inválido.';
    }

    // Check if all rating fields are greater than 0
    const ratingCriteria: (keyof ReviewFormData)[] = [
      'rating_atendimento', 'rating_agilidade', 'rating_preco',
      'rating_qualidade', 'rating_pos_venda'
    ];
    ratingCriteria.forEach(criterion => {
      if (formData[criterion] === 0) {
        newErrors[criterion as string] = 'Por favor, avalie este critério.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Por favor, preencha todos os campos obrigatórios e avaliações.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar avaliação.');
      }

      toast.success('Avaliação enviada com sucesso! Aguardando moderação.');
      navigate(`/company/${slug}`); // Redirect back to company profile page
    } catch (error: any) {
      console.error('Erro ao enviar avaliação:', error);
      toast.error(`Erro: ${error.message || 'Não foi possível enviar sua avaliação.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (criterion: keyof ReviewFormData, currentRating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(starValue => (
        <Star
          key={starValue}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starValue <= currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          onClick={() => handleRatingChange(criterion, starValue)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Avalie a Empresa {slug ? `"${slug}"` : ''}
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Sua opinião é muito importante para nós e para outros usuários!
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating Criteria */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Sua Avaliação:</h3>
                {[                  { key: 'rating_atendimento', label: 'Atendimento' },
                  { key: 'rating_agilidade', label: 'Agilidade' },
                  { key: 'rating_preco', label: 'Preço' },
                  { key: 'rating_qualidade', label: 'Qualidade do serviço' },
                  { key: 'rating_pos_venda', label: 'Pós-venda' },
                ].map(item => (
                  <div key={item.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                      {item.label}:
                    </label>
                    {renderStarRating(item.key as keyof ReviewFormData, formData[item.key as keyof ReviewFormData] as number)}
                    {errors[item.key] && (
                      <p className="text-red-500 text-xs mt-1 sm:ml-4">{errors[item.key]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* General Comment */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Comentário Geral: *
                </label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Descreva sua experiência com a empresa..."
                  className={errors.comment ? 'border-red-500' : ''}
                />
                {errors.comment && (
                  <p className="text-red-500 text-xs mt-1">{errors.comment}</p>
                )}
              </div>

              {/* User Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Nome: *
                  </label>
                  <Input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className={errors.user_name ? 'border-red-500' : ''}
                  />
                  {errors.user_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Seu E-mail: *
                  </label>
                  <Input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder="seu.email@example.com"
                    className={errors.user_email ? 'border-red-500' : ''}
                  />
                  {errors.user_email && (
                    <p className="text-red-500 text-xs mt-1">{errors.user_email}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Send className="w-4 h-4 mr-2 animate-pulse" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Avaliação
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyReviewPage;
