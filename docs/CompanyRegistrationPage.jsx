import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Zap,
  FileText,
  CheckCircle,
  Upload,
  Calendar,
  Award
} from 'lucide-react';

const CompanyRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informações básicas
    // Informações do Usuário
    userName: '',
    userEmail: '',
    userPassword: '',
    userPasswordConfirmation: '',

    // Informações básicas
    companyName: '',
    description: '',
    foundedYear: '',
    employeeCount: '',
    
    // Localização e contato
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    
    // Informações técnicas
    installedCapacity: '',
    serviceAreas: [],
    specialties: [],
    certifications: [],
    
    // Documentação
    stateRegistration: '',
    municipalRegistration: '',
    
    // Mídia
    logo: null,
    coverImage: null,
    portfolioImages: [],
    
    // Termos
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { id: 1, title: 'Informações Básicas', icon: Building },
    { id: 2, title: 'Localização e Contato', icon: MapPin },
    { id: 3, title: 'Informações Técnicas', icon: Zap },
    { id: 4, title: 'Documentação', icon: FileText },
    { id: 5, title: 'Mídia e Portfólio', icon: Upload },
    { id: 6, title: 'Revisão e Envio', icon: CheckCircle }
  ];

  const stateOptions = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const specialtyOptions = [
    'Residencial', 'Comercial', 'Industrial', 'Rural', 'Agronegócio',
    'Sistemas On-Grid', 'Sistemas Off-Grid', 'Sistemas Híbridos',
    'Manutenção', 'Consultoria', 'Financiamento'
  ];

  const certificationOptions = [
    'INMETRO', 'ANEEL', 'ISO 9001', 'ISO 14001', 'ABGD',
    'ABSOLAR', 'CRESESB', 'NR-35', 'NR-10'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.userName &&
          formData.userEmail &&
          formData.userPassword &&
          formData.userPasswordConfirmation &&
          formData.userPassword === formData.userPasswordConfirmation && // Password confirmation
          formData.companyName &&
          formData.description &&
          formData.foundedYear
        );
      case 2:
        return formData.address && formData.city && formData.state && formData.phone && formData.email;
      case 3:
        return formData.installedCapacity && formData.serviceAreas.length > 0;
      case 4:
        return true; // CNPJ is removed, so this step is always valid
      case 5:
        return true; // Mídia é opcional
      case 6:
        return formData.agreeToTerms;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      alert('Por favor, aceite os termos de uso.');
      return;
    }

    setIsSubmitting(true);

    const apiEndpoint = '/api/v1/providers';
    const data = new FormData();

    // Append user data
    data.append('user[name]', formData.userName);
    data.append('user[email]', formData.userEmail);
    data.append('user[password]', formData.userPassword);
    data.append('user[password_confirmation]', formData.userPasswordConfirmation);

    // Append provider data
    data.append('provider[name]', formData.companyName);
    data.append('provider[short_description]', formData.description);
    data.append('provider[foundation_year]', formData.foundedYear);
    data.append('provider[employee_count]', formData.employeeCount);
    data.append('provider[address]', formData.address);
    data.append('provider[city]', formData.city);
    data.append('provider[state]', formData.state);
    data.append('provider[zip_code]', formData.zipCode);
    data.append('provider[phone]', formData.phone);
    data.append('provider[email]', formData.email); // Company email
    data.append('provider[website]', formData.website);
    data.append('provider[installed_capacity_mw]', formData.installedCapacity);

    // Append array fields
    formData.serviceAreas.forEach(area => data.append('provider[service_areas][]', area));
    formData.specialties.forEach(specialty => data.append('provider[specialties][]', specialty));
    formData.certifications.forEach(cert => data.append('provider[certifications][]', cert));

    // Append file fields
    if (formData.logo) {
      data.append('logo', formData.logo);
    }
    if (formData.coverImage) {
      data.append('cover_image', formData.coverImage);
    }
    formData.portfolioImages.forEach((image, index) => {
      data.append(`portfolio_images[${index}]`, image);
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: data,
        // Headers are not needed for FormData with file uploads, fetch sets it automatically
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Company registration successful:', result);
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Company registration failed:', errorData);
        alert(`Erro ao cadastrar empresa: ${JSON.stringify(errorData.errors || errorData)}`);
      }
    } catch (error) {
      console.error('Network error during company registration:', error);
      alert('Erro de rede ao cadastrar empresa. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Cadastro Enviado!
                </h3>
                <p className="text-gray-600 mt-2">
                  Sua empresa foi cadastrada com sucesso. Nossa equipe analisará as informações e entrará em contato em até 48 horas.
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Próximos passos:</strong></p>
                <ul className="text-left space-y-1">
                  <li>• Verificação de documentos</li>
                  <li>• Aprovação do perfil</li>
                  <li>• Configuração do dashboard</li>
                  <li>• Ativação da conta</li>
                </ul>
              </div>
              <Button onClick={() => window.location.href = '/'} className="w-full">
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {/* User Information */}
            <div>
              <Label htmlFor="userName">Seu Nome Completo *</Label>
              <Input
                id="userName"
                placeholder="Seu nome"
                value={formData.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Seu Email *</Label>
              <Input
                id="userEmail"
                type="email"
                placeholder="seu.email@example.com"
                value={formData.userEmail}
                onChange={(e) => handleInputChange('userEmail', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userPassword">Senha *</Label>
                <Input
                  id="userPassword"
                  type="password"
                  placeholder="********"
                  value={formData.userPassword}
                  onChange={(e) => handleInputChange('userPassword', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="userPasswordConfirmation">Confirme a Senha *</Label>
                <Input
                  id="userPasswordConfirmation"
                  type="password"
                  placeholder="********"
                  value={formData.userPasswordConfirmation}
                  onChange={(e) => handleInputChange('userPasswordConfirmation', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Company Information */}
            <div>
              <Label htmlFor="companyName">Nome da Empresa *</Label>
              <Input
                id="companyName"
                placeholder="Ex: SolarTech Energia"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descrição da Empresa *</Label>
              <Textarea
                id="description"
                placeholder="Descreva sua empresa, serviços e diferenciais..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foundedYear">Ano de Fundação *</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  placeholder="Ex: 2015"
                  value={formData.foundedYear}
                  onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Número de Funcionários</Label>
                <Select onValueChange={(value) => handleInputChange('employeeCount', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 funcionários</SelectItem>
                    <SelectItem value="11-50">11-50 funcionários</SelectItem>
                    <SelectItem value="51-100">51-100 funcionários</SelectItem>
                    <SelectItem value="101-500">101-500 funcionários</SelectItem>
                    <SelectItem value="500+">Mais de 500 funcionários</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Endereço Completo *</Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  placeholder="Ex: São Paulo"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Estado *</Label>
                <Select onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contato@empresa.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="https://www.empresa.com"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="installedCapacity">Capacidade Instalada (MW) *</Label>
              <Input
                id="installedCapacity"
                type="number"
                step="0.1"
                placeholder="Ex: 15.5"
                value={formData.installedCapacity}
                onChange={(e) => handleInputChange('installedCapacity', e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Áreas de Atendimento *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {stateOptions.map(state => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox
                      id={`area-${state}`}
                      checked={formData.serviceAreas.includes(state)}
                      onCheckedChange={(checked) => handleArrayChange('serviceAreas', state, checked)}
                    />
                    <Label htmlFor={`area-${state}`} className="text-sm">{state}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Especialidades</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {specialtyOptions.map(specialty => (
                  <div key={specialty} className="flex items-center space-x-2">
                    <Checkbox
                      id={`specialty-${specialty}`}
                      checked={formData.specialties.includes(specialty)}
                      onCheckedChange={(checked) => handleArrayChange('specialties', specialty, checked)}
                    />
                    <Label htmlFor={`specialty-${specialty}`} className="text-sm">{specialty}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Certificações</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {certificationOptions.map(cert => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cert-${cert}`}
                      checked={formData.certifications.includes(cert)}
                      onCheckedChange={(checked) => handleArrayChange('certifications', cert, checked)}
                    />
                    <Label htmlFor={`cert-${cert}`} className="text-sm">{cert}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Todos os documentos serão verificados pela nossa equipe antes da aprovação.
              </AlertDescription>
            </Alert>

            

            <div>
              <Label htmlFor="stateRegistration">Inscrição Estadual</Label>
              <Input
                id="stateRegistration"
                placeholder="000.000.000.000"
                value={formData.stateRegistration}
                onChange={(e) => handleInputChange('stateRegistration', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="municipalRegistration">Inscrição Municipal</Label>
              <Input
                id="municipalRegistration"
                placeholder="000000000"
                value={formData.municipalRegistration}
                onChange={(e) => handleInputChange('municipalRegistration', e.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <Alert>
              <Upload className="h-4 w-4" />
              <AlertDescription>
                Adicione imagens para tornar seu perfil mais atrativo. Formatos aceitos: JPG, PNG (máx. 5MB cada).
              </AlertDescription>
            </Alert>

            <div>
              <Label htmlFor="logo">Logo da Empresa</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('logo', e.target.files[0])}
              />
              <p className="text-sm text-gray-500 mt-1">Recomendado: 200x200px</p>
            </div>

            <div>
              <Label htmlFor="coverImage">Imagem de Capa</Label>
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('coverImage', e.target.files[0])}
              />
              <p className="text-sm text-gray-500 mt-1">Recomendado: 1200x400px</p>
            </div>

            <div>
              <Label htmlFor="portfolioImages">Imagens do Portfólio</Label>
              <Input
                id="portfolioImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange('portfolioImages', Array.from(e.target.files))}
              />
              <p className="text-sm text-gray-500 mt-1">Máximo 10 imagens</p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Resumo do Cadastro</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Empresa:</span>
                  <span>{formData.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Localização:</span>
                  <span>{formData.city}, {formData.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Capacidade:</span>
                  <span>{formData.installedCapacity} MW</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Áreas de Atendimento:</span>
                  <span>{formData.serviceAreas.length} estados</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Especialidades:</span>
                  <span>{formData.specialties.length} selecionadas</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  Concordo com os <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a> *
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked)}
                />
                <Label htmlFor="agreeToMarketing" className="text-sm">
                  Aceito receber comunicações de marketing e novidades da plataforma
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cadastre sua Empresa
          </h1>
          <p className="text-gray-600">
            Junte-se à maior plataforma de energia solar do Brasil
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-500 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <IconComponent className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 text-center ${
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-20 h-0.5 mt-5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5 mr-2" })}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 mt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              {currentStep < 6 ? (
                <Button onClick={nextStep}>
                  Próximo
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Finalizar Cadastro'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage;

