import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import StarRating from '../ui/star-rating';

interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface CreateReviewFormProps {
  companyId?: number;
  companyName?: string;
  onSubmit?: (data: ReviewFormData) => void;
  onCancel?: () => void;
}

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: '',
    comment: '',
    reviewerName: '',
    reviewerEmail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
      // Reset form after successful submission
      setFormData({
        rating: 0,
        title: '',
        comment: '',
        reviewerName: '',
        reviewerEmail: ''
      });
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReviewFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrever Avaliação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Sua avaliação *</Label>
            <div className="mt-2">
              <StarRating
                rating={formData.rating}
                readonly={false}
                onRatingChange={(rating) => handleInputChange('rating', rating)}
                size="lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Título da avaliação *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Resuma sua experiência"
              required
            />
          </div>

          <div>
            <Label htmlFor="comment">Comentário *</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              placeholder="Conte-nos sobre sua experiência com esta empresa"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="reviewerName">Seu nome *</Label>
            <Input
              id="reviewerName"
              value={formData.reviewerName}
              onChange={(e) => handleInputChange('reviewerName', e.target.value)}
              placeholder="Como você gostaria de aparecer"
              required
            />
          </div>

          <div>
            <Label htmlFor="reviewerEmail">Seu email *</Label>
            <Input
              id="reviewerEmail"
              type="email"
              value={formData.reviewerEmail}
              onChange={(e) => handleInputChange('reviewerEmail', e.target.value)}
              placeholder="Não será exibido publicamente"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Enviando...' : 'Publicar Avaliação'}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateReviewForm;