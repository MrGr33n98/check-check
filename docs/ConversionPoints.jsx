import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Calendar, 
  Calculator, 
  FileText, 
  Phone, 
  Mail,
  CheckCircle,
  X
} from 'lucide-react';

const ConversionPoints = ({ onLeadCapture }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const conversionOffers = [
    {
      id: 'guide',
      title: 'Guia Completo de Energia Solar',
      description: 'Baixe nosso guia gratuito com tudo que você precisa saber sobre energia solar',
      icon: Download,
      color: 'bg-blue-500',
      cta: 'Baixar Guia Grátis',
      leadMagnet: 'Guia PDF - Como Escolher o Sistema Solar Ideal'
    },
    {
      id: 'consultation',
      title: 'Consultoria Gratuita',
      description: 'Agende uma consultoria gratuita com nossos especialistas',
      icon: Calendar,
      color: 'bg-green-500',
      cta: 'Agendar Consultoria',
      leadMagnet: 'Consultoria Gratuita de 30 minutos'
    },
    {
      id: 'calculator',
      title: 'Calculadora de Economia',
      description: 'Calcule quanto você pode economizar com energia solar',
      icon: Calculator,
      color: 'bg-orange-500',
      cta: 'Calcular Economia',
      leadMagnet: 'Relatório Personalizado de Economia'
    },
    {
      id: 'webinar',
      title: 'Webinar Exclusivo',
      description: 'Participe do nosso webinar sobre tendências em energia solar',
      icon: FileText,
      color: 'bg-purple-500',
      cta: 'Inscrever-se',
      leadMagnet: 'Acesso ao Webinar + Material Complementar'
    }
  ];

  const handleOpenModal = (offerId) => {
    setActiveModal(offerId);
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      interest: offerId
    });
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setIsSubmitted(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor, preencha nome e email.');
      return;
    }

    const leadData = {
      ...formData,
      type: 'conversion_point',
      source: activeModal,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    if (onLeadCapture) {
      onLeadCapture(leadData);
    }

    setIsSubmitted(true);
  };

  const activeOffer = conversionOffers.find(offer => offer.id === activeModal);

  return (
    <>
      {/* Conversion Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        {conversionOffers.map((offer) => {
          const IconComponent = offer.icon;
          return (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`${offer.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                <Button 
                  onClick={() => handleOpenModal(offer.id)}
                  className="w-full"
                  variant="outline"
                >
                  {offer.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {activeOffer && (
                    <>
                      <activeOffer.icon className="h-5 w-5 mr-2" />
                      {activeOffer.title}
                    </>
                  )}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Sucesso!
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {activeOffer?.leadMagnet} será enviado para seu email em breve.
                    </p>
                  </div>
                  <Button onClick={handleCloseModal} className="w-full">
                    Fechar
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-4">
                    <Badge variant="secondary" className="mb-2">
                      Oferta Gratuita
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {activeOffer?.leadMagnet}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  {(activeModal === 'consultation' || activeModal === 'webinar') && (
                    <div>
                      <Label htmlFor="company">Empresa (opcional)</Label>
                      <Input
                        id="company"
                        placeholder="Nome da sua empresa"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1">
                      {activeOffer?.cta}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ConversionPoints;

