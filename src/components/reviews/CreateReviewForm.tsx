import { useState } from 'react';
import { Star, Plus, X } from 'lucide-react';
import { CreateReviewData } from '@/types/reviews';

interface CreateReviewFormProps {
  companyId: number;
  companyName: string;
  onSubmit: (reviewData: CreateReviewData) => Promise<boolean>;
  onCancel: () => void;
}

const CreateReviewForm = ({ companyId, companyName, onSubmit, onCancel }: CreateReviewFormProps) => {
  const [formData, setFormData] = useState<CreateReviewData>({
    companyId,
    rating: 0,
    title: '',
    comment: '',
    pros: [''],
    cons: [''],
    projectType: 'residential',
    projectSize: '',
    installationDate: '',
    wouldRecommend: true,
    images: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.rating === 0) {
      newErrors.rating = 'Por favor, selecione uma avaliação';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Comentário é obrigatório';
    }
    if (!formData.projectSize.trim()) {
      newErrors.projectSize = 'Tamanho do projeto é obrigatório';
    }
    if (!formData.installationDate) {
      newErrors.installationDate = 'Data de instalação é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit({
        ...formData,
        pros: formData.pros.filter(pro => pro.trim()),
        cons: formData.cons.filter(con => con.trim())
      });
      
      if (success) {
        alert('Avaliação enviada com sucesso!');
        onCancel();
      } else {
        alert('Erro ao enviar avaliação. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleArrayChange = (field: 'pros' | 'cons', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'pros' | 'cons') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'pros' | 'cons', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Avaliar Empresa</h2>
              <p className="text-gray-600">{companyName}</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avaliação por Estrelas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Avaliação Geral *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 hover:text-yellow-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating > 0 && `${formData.rating}/5 estrelas`}
                </span>
              </div>
              {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
            </div>

            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Avaliação *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Excelente serviço e atendimento!"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Comentário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário Detalhado *
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Conte sobre sua experiência com a empresa..."
              />
              {errors.comment && <p className="text-red-600 text-sm mt-1">{errors.comment}</p>}
            </div>

            {/* Informações do Projeto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Projeto *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="residential">Residencial</option>
                  <option value="commercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamanho do Sistema *
                </label>
                <input
                  type="text"
                  value={formData.projectSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectSize: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 5kWp"
                />
                {errors.projectSize && <p className="text-red-600 text-sm mt-1">{errors.projectSize}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Instalação *
                </label>
                <input
                  type="date"
                  value={formData.installationDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, installationDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.installationDate && <p className="text-red-600 text-sm mt-1">{errors.installationDate}</p>}
              </div>
            </div>

            {/* Pontos Positivos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pontos Positivos
              </label>
              {formData.pros.map((pro, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={pro}
                    onChange={(e) => handleArrayChange('pros', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Atendimento excelente"
                  />
                  {formData.pros.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('pros', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('pros')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Adicionar ponto positivo
              </button>
            </div>

            {/* Pontos Negativos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pontos de Melhoria
              </label>
              {formData.cons.map((con, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={con}
                    onChange={(e) => handleArrayChange('cons', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Comunicação poderia ser melhor"
                  />
                  {formData.cons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('cons', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('cons')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Adicionar ponto de melhoria
              </button>
            </div>

            {/* Recomendação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Você recomendaria esta empresa?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="recommend"
                    checked={formData.wouldRecommend === true}
                    onChange={() => setFormData(prev => ({ ...prev, wouldRecommend: true }))}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-gray-700">Sim, recomendo</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="recommend"
                    checked={formData.wouldRecommend === false}
                    onChange={() => setFormData(prev => ({ ...prev, wouldRecommend: false }))}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-gray-700">Não recomendo</span>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReviewForm;