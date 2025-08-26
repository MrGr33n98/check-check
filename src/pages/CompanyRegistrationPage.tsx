import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  FileText, 
  Users, 
  CheckCircle, 
  Upload,
  ArrowRight,
  Shield,
  Star,
  Zap,
  Image,
  Eye,
  AlertCircle,
  X,
  ArrowLeft
} from 'lucide-react';

interface FormData {
  // Step 1: Informações básicas
  companyName: string;
  cnpj: string;
  foundedYear: string;
  employeeCount: string;
  businessType: string;
  description: string;
  
  // Step 2: Localização
  address: string;
  city: string;
  state: string;
  zipCode: string;
  serviceAreas: string[];
  email: string;
  phone: string;
  website: string;
  country: string; // Added country field
  
  // Step 3: Informações técnicas
  servicesOffered: string[];
  experienceYears: string;
  projectsCompleted: string;
  installedCapacityMW: string;
  specialties: string[];
  
  // Step 4: Documentação
  certifications: string[];
  documents: File[];
  licenses: File[];
  
  // Step 5: Mídia
  logo: File | null;
  coverImage: File | null;
  portfolioImages: File[];
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

const CompanyRegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Informações básicas
    companyName: '',
    cnpj: '',
    foundedYear: '',
    employeeCount: '',
    businessType: '',
    description: '',
    
    // Step 2: Localização
    address: '',
    city: '',
    state: '',
    zipCode: '',
    serviceAreas: [],
    email: '',
    phone: '',
    website: '',
    country: 'Brazil', // Set default country
    
    // Step 3: Informações técnicas
    servicesOffered: [],
    experienceYears: '',
    projectsCompleted: '',
    installedCapacityMW: '',
    specialties: [],
    
    // Step 4: Documentação
    certifications: [],
    documents: [],
    licenses: [],
    
    // Step 5: Mídia
    logo: null,
    coverImage: null,
    portfolioImages: [],
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });

  const totalSteps = 6;

  const businessTypes = [
    'Instalação Residencial',
    'Instalação Comercial',
    'Instalação Industrial',
    'Usinas de Grande Porte',
    'Manutenção e Monitoramento',
    'Consultoria Energética',
    'Financiamento Solar',
    'Equipamentos e Componentes'
  ];

  const servicesOptions = [
    'Projeto e Dimensionamento',
    'Instalação Completa',
    'Manutenção Preventiva',
    'Manutenção Corretiva',
    'Monitoramento Remoto',
    'Consultoria Técnica',
    'Financiamento',
    'Seguro Solar',
    'Homologação junto à Concessionária'
  ];

  const specialtyOptions = [
    'Sistemas Residenciais',
    'Sistemas Comerciais',
    'Sistemas Industriais',
    'Usinas Solares',
    'Sistemas Off-Grid',
    'Sistemas Híbridos',
    'Energia Solar Rural',
    'Aquecimento Solar',
    'Bombeamento Solar'
  ];

  const certificationOptions = [
    'INMETRO',
    'CREA',
    'ABNT NBR 16690',
    'NR-35 (Trabalho em Altura)',
    'NR-10 (Segurança em Instalações Elétricas)',
    'ISO 9001',
    'Certificação de Fabricantes',
    'Outras Certificações'
  ];

  const stateOptions = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedInputChange = (parentField: keyof FormData, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as any),
        [childField]: value
      }
    }));
  };

  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleFileChange = (field: keyof FormData, files: FileList | null, multiple = false) => {
    if (!files) return;
    
    if (multiple) {
      setFormData(prev => ({
        ...prev,
        [field]: Array.from(files)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.companyName.trim()) errors.companyName = 'Nome da empresa é obrigatório';
        if (!formData.cnpj.trim()) errors.cnpj = 'CNPJ é obrigatório';
        if (!formData.foundedYear.trim()) errors.foundedYear = 'Ano de fundação é obrigatório';
        if (!formData.employeeCount.trim()) errors.employeeCount = 'Número de funcionários é obrigatório';
        if (!formData.businessType.trim()) errors.businessType = 'Tipo de negócio é obrigatório';
        if (!formData.description.trim()) errors.description = 'Descrição é obrigatória';
        break;
      case 2:
        if (!formData.address.trim()) errors.address = 'Endereço é obrigatório';
        if (!formData.city.trim()) errors.city = 'Cidade é obrigatória';
        if (!formData.state.trim()) errors.state = 'Estado é obrigatório';
        if (!formData.zipCode.trim()) errors.zipCode = 'CEP é obrigatório';
        if (!formData.email.trim()) errors.email = 'E-mail é obrigatório';
        if (!formData.phone.trim()) errors.phone = 'Telefone é obrigatório';
        if (formData.serviceAreas.length === 0) errors.serviceAreas = 'Selecione pelo menos uma área de atendimento';
        break;
      case 3:
        if (formData.servicesOffered.length === 0) errors.servicesOffered = 'Selecione pelo menos um serviço oferecido';
        if (!formData.experienceYears.trim()) errors.experienceYears = 'Anos de experiência é obrigatório';
        if (!formData.projectsCompleted.trim()) errors.projectsCompleted = 'Número de projetos é obrigatório';
        if (!formData.installedCapacityMW.trim()) errors.installedCapacityMW = 'Capacidade instalada é obrigatória';
        break;
      case 4:
        // Documentation is optional, but we can validate file types if provided
        break;
      case 5:
        // Media is optional, but we can validate file types if provided
        break;
      case 6:
        // Review step - no additional validation needed
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const data = new FormData();

      // Append all form data fields
      // Note: Frontend keys are renamed to match backend params in the following lines
      data.append('provider[name]', formData.companyName);
      data.append('provider[foundation_year]', formData.foundedYear);
      data.append('provider[short_description]', formData.description); // maps to description from frontend
      data.append('provider[address]', formData.address);
      data.append('provider[phone]', formData.phone);
      data.append('provider[cnpj]', formData.cnpj);
      data.append('provider[employee_count]', formData.employeeCount);
      data.append('provider[city]', formData.city);
      data.append('provider[state]', formData.state);
      data.append('provider[zip_code]', formData.zipCode);
      data.append('provider[email]', formData.email);
      data.append('provider[website]', formData.website);
      data.append('provider[experience_years]', formData.experienceYears);
      data.append('provider[projects_completed]', formData.projectsCompleted);
      data.append('provider[installed_capacity_mw]', formData.installedCapacityMW);
      data.append('provider[country]', formData.country); // Append country

      // Append array fields
      data.append('provider[business_type]', formData.businessType); // Corrected: businessType is a string
      formData.serviceAreas.forEach(area => data.append('provider[service_areas][]', area));
      formData.servicesOffered.forEach(service => data.append('provider[services_offered][]', service));
      formData.specialties.forEach(specialty => data.append('provider[specialties][]', specialty));
      formData.certifications.forEach(cert => data.append('provider[certifications][]', cert));

      // Append social media as nested object
      data.append('provider[social_media][facebook]', formData.socialMedia.facebook);
      data.append('provider[social_media][instagram]', formData.socialMedia.instagram);
      data.append('provider[social_media][linkedin]', formData.socialMedia.linkedin);

      // Append files
      if (formData.logo) data.append('logo', formData.logo);
      if (formData.coverImage) data.append('coverImage', formData.coverImage);
      formData.documents.forEach(doc => data.append('documents[]', doc));
      formData.licenses.forEach(license => data.append('licenses[]', license));
      formData.portfolioImages.forEach(image => data.append('portfolioImages[]', image));


      const response = await fetch('http://localhost:3000/api/v1/providers', {
        method: 'POST',
        body: data, // FormData will automatically set Content-Type to multipart/form-data
      });

      if (!response.ok) {
        let errorDetails = 'Erro desconhecido';
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorDetails = errorData.errors ? JSON.stringify(errorData.errors) : JSON.stringify(errorData);
          } catch (jsonParseError) {
            // Fallback if JSON parsing fails despite Content-Type
            errorDetails = `Erro ao processar resposta JSON: ${jsonParseError.message}`;
          }
        } else {
          // If not JSON, or no content-type, read as text
          errorDetails = await response.text();
          if (errorDetails === "") {
            errorDetails = `Erro do servidor: Status ${response.status} ${response.statusText}. Resposta vazia.`;
          } else {
            errorDetails = `Erro do servidor: Status ${response.status} ${response.statusText}. Resposta: ${errorDetails}`;
          }
        }
        throw new Error(errorDetails);
      }
      
      // Show success message and redirect
      alert('Cadastro enviado com sucesso! Sua empresa está em análise e você receberá um e-mail com o resultado em até 48 horas.');
      navigate('/login');
      
    } catch (error) {
      console.error('Erro ao enviar cadastro:', error);
      alert(`Erro ao enviar cadastro. Detalhes: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = (step: number) => {
    const titles = [
      'Informações Básicas',
      'Localização',
      'Informações Técnicas',
      'Documentação',
      'Mídia',
      'Revisão'
    ];
    return titles[step - 1];
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
            </div>
            {step < 6 && (
              <div className={`w-12 h-1 mx-2 ${
                step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Etapa {currentStep} de {totalSteps}: {getStepTitle(currentStep)}
        </h3>
      </div>
    </div>
  );  
const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações Básicas</h2>
        <p className="text-gray-600">Dados fundamentais sobre sua empresa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Empresa *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: Solar Tech Ltda"
          />
          {validationErrors.companyName && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.companyName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNPJ *
          </label>
          <input
            type="text"
            value={formData.cnpj}
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.cnpj ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="00.000.000/0000-00"
          />
          {validationErrors.cnpj && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.cnpj}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano de Fundação *
          </label>
          <input
            type="number"
            value={formData.foundedYear}
            onChange={(e) => handleInputChange('foundedYear', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.foundedYear ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="2020"
            min="1900"
            max={new Date().getFullYear()}
          />
          {validationErrors.foundedYear && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.foundedYear}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Funcionários *
          </label>
          <select
            value={formData.employeeCount}
            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.employeeCount ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione</option>
            <option value="1-5">1-5 funcionários</option>
            <option value="6-10">6-10 funcionários</option>
            <option value="11-25">11-25 funcionários</option>
            <option value="26-50">26-50 funcionários</option>
            <option value="51-100">51-100 funcionários</option>
            <option value="100+">Mais de 100 funcionários</option>
          </select>
          {validationErrors.employeeCount && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.employeeCount}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tipo de Negócio Principal *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessTypes.map((type) => (
            <label key={type} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="businessType"
                value={type}
                checked={formData.businessType === type}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="mr-3 text-blue-600"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
        {validationErrors.businessType && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {validationErrors.businessType}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição da Empresa *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            validationErrors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Descreva sua empresa, diferenciais, missão e por que os clientes devem escolher vocês..."
        />
        {validationErrors.description && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {validationErrors.description}
          </p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Esta descrição será exibida no seu perfil público. Seja claro e atrativo!
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contato e Localização</h2>
        <p className="text-gray-600">Como os clientes podem encontrar e contatar sua empresa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail Comercial *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="contato@empresa.com"
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone Comercial *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(11) 99999-9999"
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.phone}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://www.empresa.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Endereço Completo *
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Rua, número, bairro"
          />
          {validationErrors.address && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.address}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="São Paulo"
          />
          {validationErrors.city && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.city}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado *
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione o estado</option>
            {stateOptions.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {validationErrors.state && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.state}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CEP *
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="00000-000"
          />
          {validationErrors.zipCode && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.zipCode}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Áreas de Atendimento * (selecione todas que atendem)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
          {stateOptions.map((state) => (
            <label key={state.value} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded">
              <input
                type="checkbox"
                checked={formData.serviceAreas.includes(state.value)}
                onChange={(e) => handleArrayChange('serviceAreas', state.value, e.target.checked)}
                className="mr-3 text-blue-600"
              />
              <span className="text-sm">{state.label}</span>
            </label>
          ))}
        </div>
        {validationErrors.serviceAreas && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {validationErrors.serviceAreas}
          </p>
        )}
      </div>
    </div>
  );  
const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações Técnicas</h2>
        <p className="text-gray-600">Conte-nos sobre sua expertise em energia solar</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Serviços Oferecidos * (selecione todos que se aplicam)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {servicesOptions.map((service) => (
            <label key={service} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.servicesOffered.includes(service)}
                onChange={(e) => handleArrayChange('servicesOffered', service, e.target.checked)}
                className="mr-3 text-blue-600"
              />
              <span className="text-sm">{service}</span>
            </label>
          ))}
        </div>
        {validationErrors.servicesOffered && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {validationErrors.servicesOffered}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anos de Experiência *
          </label>
          <select
            value={formData.experienceYears}
            onChange={(e) => handleInputChange('experienceYears', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.experienceYears ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione</option>
            <option value="0-1">Menos de 1 ano</option>
            <option value="1-3">1-3 anos</option>
            <option value="3-5">3-5 anos</option>
            <option value="5-10">5-10 anos</option>
            <option value="10+">Mais de 10 anos</option>
          </select>
          {validationErrors.experienceYears && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.experienceYears}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projetos Concluídos *
          </label>
          <select
            value={formData.projectsCompleted}
            onChange={(e) => handleInputChange('projectsCompleted', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.projectsCompleted ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione</option>
            <option value="0-10">0-10 projetos</option>
            <option value="10-50">10-50 projetos</option>
            <option value="50-100">50-100 projetos</option>
            <option value="100-500">100-500 projetos</option>
            <option value="500+">Mais de 500 projetos</option>
          </select>
          {validationErrors.projectsCompleted && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.projectsCompleted}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacidade Total Instalada (MW) *
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.installedCapacityMW}
            onChange={(e) => handleInputChange('installedCapacityMW', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.installedCapacityMW ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: 5.2"
          />
          {validationErrors.installedCapacityMW && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.installedCapacityMW}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Especialidades (selecione todas que se aplicam)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {specialtyOptions.map((specialty) => (
            <label key={specialty} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.specialties.includes(specialty)}
                onChange={(e) => handleArrayChange('specialties', specialty, e.target.checked)}
                className="mr-3 text-blue-600"
              />
              <span className="text-sm">{specialty}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentação</h2>
        <p className="text-gray-600">Certificações e documentos que comprovam sua qualificação</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Certificações (selecione todas que possui)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certificationOptions.map((cert) => (
            <label key={cert} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.certifications.includes(cert)}
                onChange={(e) => handleArrayChange('certifications', cert, e.target.checked)}
                className="mr-3 text-blue-600"
              />
              <span className="text-sm">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Documentos e Certificados
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Faça upload de certificados, licenças ou outros documentos
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            id="documents"
            onChange={(e) => handleFileChange('documents', e.target.files, true)}
          />
          <label
            htmlFor="documents"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Selecionar Arquivos
          </label>
          <p className="text-xs text-gray-500 mt-2">
            PDF, JPG, PNG até 5MB cada
          </p>
        </div>
        {formData.documents.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Arquivos selecionados:</p>
            <div className="space-y-2">
              {formData.documents.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = formData.documents.filter((_, i) => i !== index);
                      handleInputChange('documents', newFiles);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Licenças e Alvarás
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Faça upload de licenças, alvarás de funcionamento, etc.
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            id="licenses"
            onChange={(e) => handleFileChange('licenses', e.target.files, true)}
          />
          <label
            htmlFor="licenses"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Selecionar Arquivos
          </label>
          <p className="text-xs text-gray-500 mt-2">
            PDF, JPG, PNG até 5MB cada
          </p>
        </div>
        {formData.licenses.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Arquivos selecionados:</p>
            <div className="space-y-2">
              {formData.licenses.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = formData.licenses.filter((_, i) => i !== index);
                      handleInputChange('licenses', newFiles);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Image className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mídia e Portfólio</h2>
        <p className="text-gray-600">Imagens que representam sua empresa e trabalhos realizados</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo da Empresa
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Faça upload do logo da sua empresa
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            className="hidden"
            id="logo"
            onChange={(e) => handleFileChange('logo', e.target.files, false)}
          />
          <label
            htmlFor="logo"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Selecionar Logo
          </label>
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG, SVG até 2MB - Recomendado: 400x400px
          </p>
        </div>
        {formData.logo && (
          <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">{formData.logo.name}</span>
            <button
              type="button"
              onClick={() => handleInputChange('logo', null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagem de Capa
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Imagem que será exibida no cabeçalho do seu perfil
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            id="coverImage"
            onChange={(e) => handleFileChange('coverImage', e.target.files, false)}
          />
          <label
            htmlFor="coverImage"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Selecionar Imagem
          </label>
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG até 5MB - Recomendado: 1200x400px
          </p>
        </div>
        {formData.coverImage && (
          <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">{formData.coverImage.name}</span>
            <button
              type="button"
              onClick={() => handleInputChange('coverImage', null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Portfólio de Projetos
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Imagens dos seus melhores projetos de energia solar
          </p>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png"
            className="hidden"
            id="portfolioImages"
            onChange={(e) => handleFileChange('portfolioImages', e.target.files, true)}
          />
          <label
            htmlFor="portfolioImages"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Selecionar Imagens
          </label>
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG até 5MB cada - Máximo 10 imagens
          </p>
        </div>
        {formData.portfolioImages.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Imagens selecionadas:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.portfolioImages.map((file, index) => (
                <div key={index} className="relative">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500 text-center p-2">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = formData.portfolioImages.filter((_, i) => i !== index);
                      handleInputChange('portfolioImages', newFiles);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Redes Sociais (opcional)
        </label>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Facebook</label>
            <input
              type="url"
              value={formData.socialMedia.facebook}
              onChange={(e) => handleNestedInputChange('socialMedia', 'facebook', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://facebook.com/suaempresa"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Instagram</label>
            <input
              type="url"
              value={formData.socialMedia.instagram}
              onChange={(e) => handleNestedInputChange('socialMedia', 'instagram', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://instagram.com/suaempresa"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">LinkedIn</label>
            <input
              type="url"
              value={formData.socialMedia.linkedin}
              onChange={(e) => handleNestedInputChange('socialMedia', 'linkedin', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/company/suaempresa"
            />
          </div>
        </div>
      </div>
    </div>
  );  const 
renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Eye className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Revisão Final</h2>
        <p className="text-gray-600">Confira todas as informações antes de enviar seu cadastro</p>
      </div>

      <div className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Informações Básicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Nome da Empresa:</span>
              <p className="text-gray-900">{formData.companyName || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">CNPJ:</span>
              <p className="text-gray-900">{formData.cnpj || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Ano de Fundação:</span>
              <p className="text-gray-900">{formData.foundedYear || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Funcionários:</span>
              <p className="text-gray-900">{formData.employeeCount || 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Tipo de Negócio:</span>
              <p className="text-gray-900">{formData.businessType || 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Descrição:</span>
              <p className="text-gray-900">{formData.description || 'Não informado'}</p>
            </div>
          </div>
        </div>

        {/* Contato e Localização */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Contato e Localização
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">E-mail:</span>
              <p className="text-gray-900">{formData.email || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Telefone:</span>
              <p className="text-gray-900">{formData.phone || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Website:</span>
              <p className="text-gray-900">{formData.website || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Cidade/Estado:</span>
              <p className="text-gray-900">{formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Endereço:</span>
              <p className="text-gray-900">{formData.address || 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Áreas de Atendimento:</span>
              <p className="text-gray-900">
                {formData.serviceAreas.length > 0 
                  ? formData.serviceAreas.map(state => stateOptions.find(s => s.value === state)?.label).join(', ')
                  : 'Não informado'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Informações Técnicas */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Informações Técnicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Anos de Experiência:</span>
              <p className="text-gray-900">{formData.experienceYears || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Projetos Concluídos:</span>
              <p className="text-gray-900">{formData.projectsCompleted || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Capacidade Instalada:</span>
              <p className="text-gray-900">{formData.installedCapacityMW ? `${formData.installedCapacityMW} MW` : 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Serviços Oferecidos:</span>
              <p className="text-gray-900">{formData.servicesOffered.length > 0 ? formData.servicesOffered.join(', ') : 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Especialidades:</span>
              <p className="text-gray-900">{formData.specialties.length > 0 ? formData.specialties.join(', ') : 'Não informado'}</p>
            </div>
          </div>
        </div>

        {/* Documentação */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documentação
          </h3>
          <div className="text-sm">
            <div className="mb-4">
              <span className="font-medium text-gray-700">Certificações:</span>
              <p className="text-gray-900">{formData.certifications.length > 0 ? formData.certifications.join(', ') : 'Nenhuma certificação selecionada'}</p>
            </div>
            <div className="mb-4">
              <span className="font-medium text-gray-700">Documentos:</span>
              <p className="text-gray-900">{formData.documents.length > 0 ? `${formData.documents.length} arquivo(s) anexado(s)` : 'Nenhum documento anexado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Licenças:</span>
              <p className="text-gray-900">{formData.licenses.length > 0 ? `${formData.licenses.length} arquivo(s) anexado(s)` : 'Nenhuma licença anexada'}</p>
            </div>
          </div>
        </div>

        {/* Mídia */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Image className="w-5 h-5" />
            Mídia e Portfólio
          </h3>
          <div className="text-sm">
            <div className="mb-4">
              <span className="font-medium text-gray-700">Logo:</span>
              <p className="text-gray-900">{formData.logo ? formData.logo.name : 'Nenhum logo anexado'}</p>
            </div>
            <div className="mb-4">
              <span className="font-medium text-gray-700">Imagem de Capa:</span>
              <p className="text-gray-900">{formData.coverImage ? formData.coverImage.name : 'Nenhuma imagem de capa anexada'}</p>
            </div>
            <div className="mb-4">
              <span className="font-medium text-gray-700">Portfólio:</span>
              <p className="text-gray-900">{formData.portfolioImages.length > 0 ? `${formData.portfolioImages.length} imagem(ns) anexada(s)` : 'Nenhuma imagem de portfólio anexada'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Redes Sociais:</span>
              <div className="mt-1">
                {formData.socialMedia.facebook && <p className="text-gray-900">Facebook: {formData.socialMedia.facebook}</p>}
                {formData.socialMedia.instagram && <p className="text-gray-900">Instagram: {formData.socialMedia.instagram}</p>}
                {formData.socialMedia.linkedin && <p className="text-gray-900">LinkedIn: {formData.socialMedia.linkedin}</p>}
                {!formData.socialMedia.facebook && !formData.socialMedia.instagram && !formData.socialMedia.linkedin && (
                  <p className="text-gray-900">Nenhuma rede social informada</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Termos e Condições</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• Ao enviar este cadastro, você concorda com nossos termos de uso e política de privacidade.</p>
            <p>• Todas as informações fornecidas serão verificadas por nossa equipe.</p>
            <p>• O processo de aprovação pode levar até 48 horas úteis.</p>
            <p>• Você receberá um e-mail com o resultado da análise.</p>
            <p>• Informações falsas podem resultar na rejeição do cadastro.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cadastre sua Empresa
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Junte-se à maior plataforma de energia solar do Brasil e conecte-se com milhares de clientes
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Mais Clientes</h3>
            <p className="text-gray-600 text-sm">Conecte-se com milhares de pessoas interessadas em energia solar</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Credibilidade</h3>
            <p className="text-gray-600 text-sm">Perfil verificado aumenta a confiança dos clientes</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Avaliações</h3>
            <p className="text-gray-600 text-sm">Sistema de avaliações para construir sua reputação</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </button>
                )}
              </div>

              <div>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Finalizar Cadastro
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Já tem uma conta? {' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage;