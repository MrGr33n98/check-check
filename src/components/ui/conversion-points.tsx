import { useState } from 'react';
import { Download, Calendar, Calculator, FileText, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ConversionPoints = ({ 
  conversionPoints, 
  onLeadCapture 
}: { 
  conversionPoints: any[]; 
  onLeadCapture: (leadData: any) => void; 
}) => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    leadMagnet: ''
  });

  const handleOpenModal = (point: any) => {
    setActivePoint(point.id);
    setLeadData({
      ...leadData,
      leadMagnet: point.leadMagnet
    });
  };

  const handleCloseModal = () => {
    setActivePoint(null);
    setLeadData({
      name: '',
      email: '',
      phone: '',
      leadMagnet: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLeadCapture(leadData);
    handleCloseModal();
  };

  const icons: Record<string, React.ElementType> = {
    Download,
    Calendar,
    Calculator,
    FileText
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recursos Gratuitos para Você
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aproveite nossos materiais exclusivos para tomar as melhores decisões sobre energia solar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conversionPoints.map((point) => {
            const Icon = icons[point.icon] || Download;
            return (
              <div 
                key={point.id} 
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors"
              >
                <div className={`${point.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {point.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenModal(point)}
                >
                  {point.cta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Lead Capture Modal */}
      {activePoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Receba seu material gratuito
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={leadData.name}
                    onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={leadData.email}
                    onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone (opcional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                />
              </div>
              
              <input 
                type="hidden" 
                value={leadData.leadMagnet} 
                readOnly 
              />
              
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Receber Material
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConversionPoints;
