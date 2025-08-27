import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  Clock,
  Award
} from 'lucide-react';

interface HelpSectionProps {
  title?: string;
  subtitle?: string;
  showContactForm?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const HelpSection: React.FC<HelpSectionProps> = ({
  title = "Não encontrou o que procura?",
  subtitle = "Nossa equipe pode ajudar você a encontrar a empresa perfeita para seu projeto específico de energia solar.",
  showContactForm = true,
  variant = 'default',
  className = ''
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    }, 3000);
  };

  const projectTypes = [
    'Residencial - Casa',
    'Residencial - Apartamento',
    'Comercial - Pequeno porte',
    'Comercial - Médio porte',
    'Comercial - Grande porte',
    'Industrial',
    'Rural/Agronegócio',
    'Outro'
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Consultoria Especializada',
      description: 'Nossa equipe de especialistas analisa seu projeto e encontra as melhores opções'
    },
    {
      icon: Clock,
      title: 'Resposta Rápida',
      description: 'Retornamos em até 2 horas úteis com recomendações personalizadas'
    },
    {
      icon: Award,
      title: 'Empresas Verificadas',
      description: 'Trabalhamos apenas com empresas certificadas e com histórico comprovado'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`py-12 bg-gradient-to-br from-blue-50 to-green-50 ${className}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">{subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              (11) 4004-1234
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Options */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Fale Conosco Agora
            </h3>
            
            <div className="space-y-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Phone className="text-blue-600 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Telefone</h4>
                      <p className="text-gray-600 text-sm mb-1">Atendimento imediato</p>
                      <a href="tel:+551140041234" className="text-blue-600 hover:text-blue-700 font-medium">
                        (11) 4004-1234
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-green-600 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                      <p className="text-gray-600 text-sm mb-1">Resposta rápida</p>
                      <a href="https://wa.me/5511940041234" className="text-green-600 hover:text-green-700 font-medium">
                        (11) 94004-1234
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Mail className="text-purple-600 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">E-mail</h4>
                      <p className="text-gray-600 text-sm mb-1">Resposta em até 2 horas</p>
                      <a href="mailto:especialistas@comparesolar.com.br" className="text-purple-600 hover:text-purple-700 font-medium">
                        especialistas@comparesolar.com.br
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          {showContactForm && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Descreva Seu Projeto
              </h3>
              
              <Card>
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Mensagem Enviada!
                      </h4>
                      <p className="text-gray-600">
                        Nossa equipe entrará em contato em até 2 horas úteis.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Completo *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail *
                          </label>
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone/WhatsApp *
                          </label>
                          <Input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Projeto *
                          </label>
                          <select
                            required
                            value={formData.projectType}
                            onChange={(e) => handleInputChange('projectType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Selecione o tipo</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descreva seu projeto *
                        </label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Conte-nos sobre seu projeto: localização, consumo mensal de energia, tipo de imóvel, prazo desejado, orçamento estimado, etc."
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Enviar Solicitação
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpSection;