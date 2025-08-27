import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import CompanyLayout from '@/components/layout/CompanyLayout';
import { Building2, Upload, Save, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CompanyCustomizationPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [newService, setNewService] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');

  const [customization, setCustomization] = useState({
    name: user?.company?.name || '',
    description: user?.company?.description || '',
    logo: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    services: ['Instalação Solar', 'Manutenção', 'Consultoria'],
    specialties: ['Residencial', 'Comercial', 'Industrial']
  });

  if (!user || user.role !== 'empresa') {
    return <Navigate to="/login" replace />;
  }

  if (!user.approved) {
    return <Navigate to="/empresa/pending" replace />;
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddService = () => {
    if (newService.trim() && !customization.services.includes(newService.trim())) {
      setCustomization(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (service: string) => {
    setCustomization(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !customization.specialties.includes(newSpecialty.trim())) {
      setCustomization(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setCustomization(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert('Customização salva com sucesso!');
  };

  const CompanyPreview = () => (
    <div className="border rounded-lg p-6 bg-white">
      <div className="text-center mb-6">
        {customization.logo ? (
          <img src={customization.logo} alt="Logo" className="h-16 mx-auto mb-4" />
        ) : (
          <Building2 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        )}
        <h2 className="text-2xl font-bold mb-2" style={{ color: customization.primaryColor }}>
          {customization.name || 'Nome da Empresa'}
        </h2>
        <p className="text-gray-600 mb-4">
          {customization.description || 'Descrição da empresa aparecerá aqui'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Serviços</h3>
          <div className="flex flex-wrap gap-2">
            {customization.services.map((service, index) => (
              <Badge key={index} style={{ backgroundColor: customization.secondaryColor }}>
                {service}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Especialidades</h3>
          <div className="flex flex-wrap gap-2">
            {customization.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (previewMode) {
    return (
      <CompanyLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <Button onClick={() => setPreviewMode(false)} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Edição
              </Button>
              <h1 className="text-2xl font-bold">Preview da Página da Empresa</h1>
            </div>
            <CompanyPreview />
          </div>
        </div>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-8 w-8" />
              Customização da Empresa
            </h1>
            <p className="text-gray-600 mt-2">
              Personalize a página da sua empresa para atrair mais clientes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Informações Básicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome da Empresa</Label>
                    <Input
                      id="name"
                      value={customization.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={customization.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Descreva sua empresa e seus diferenciais"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="logo">URL do Logo</Label>
                    <div className="flex gap-2">
                      <Input
                        id="logo"
                        value={customization.logo}
                        onChange={(e) => handleInputChange('logo', e.target.value)}
                        placeholder="https://exemplo.com/logo.png"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Oferecidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      placeholder="Adicionar novo serviço"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddService()}
                    />
                    <Button onClick={handleAddService} variant="outline">
                      Adicionar
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {customization.services.map((service, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() => handleRemoveService(service)}
                      >
                        {service} ×
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle>Especialidades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      placeholder="Adicionar nova especialidade"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
                    />
                    <Button onClick={handleAddSpecialty} variant="outline">
                      Adicionar
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {customization.specialties.map((specialty, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() => handleRemoveSpecialty(specialty)}
                      >
                        {specialty} ×
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Preview da Página</span>
                    <Button onClick={() => setPreviewMode(true)} variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Completo
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CompanyPreview />
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button onClick={handleSave} disabled={loading} className="flex-1">
                  {loading ? (
                    'Salvando...'
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyCustomizationPage;