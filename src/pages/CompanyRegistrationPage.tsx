import {
  Building2,
  MapPin,
  Users,
  Shield,
  Star,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  AlertCircle,
  X,
  FileText,
  Image,
  Zap,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { CompanyRegistrationFormData } from '../data/types';

// safeTrim utility
const safeTrim = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

const CompanyRegistrationPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CompanyRegistrationFormData>({
    // User Information
    userName: '',
    userEmail: '',
    userPassword: '',
    userPasswordConfirmation: '',

    // Company Information
    companyName: '',
    foundedYear: '',
    employeeCount: '',
    businessType: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    country: '',
    serviceAreas: [],
    servicesOffered: [],
    specialties: [],
    certifications: [],
    experienceYears: '',
    projectsCompleted: '',
    installedCapacityMW: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    businessHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    logo: null,
    coverImage: null,
    documents: [],
    licenses: [],
    portfolioImages: []
  });
  
  // Additional state for file previews
  const [filePreviews, setFilePreviews] = useState<{
    logo?: string;
    coverImage?: string;
    portfolioImages?: string[];
  }>({});

  const servicesOptions = [
    'Projeto e Dimensionamento de Sistemas Fotovoltaicos',
    'Instalação de Sistemas Residenciais',
    'Instalação de Sistemas Comerciais',
    'Instalação de Sistemas Industriais',
    'Usinas Solares de Grande Porte',
    'Sistemas Off-Grid (Isolados)',
    'Sistemas Híbridos (Grid-Tie + Bateria)',
    'Manutenção Preventiva e Corretiva',
    'Monitoramento e Análise de Performance',
    'Consultoria em Energia Solar',
    'Financiamento de Projetos Solares',
    'Homologação junto à Concessionária',
    'Aquecimento Solar de Água',
    'Bombeamento Solar para Irrigação'
  ];

  const specialtyOptions = [
    'Residencial',
    'Comercial',
    'Industrial',
    'Usinas Solares',
    'Off-Grid',
    'Híbridos',
    'Rural',
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

  const businessTypes = [
    'Instalação e Manutenção',
    'Projeto e Consultoria',
    'Vendas e Distribuição',
    'Financiamento',
    'Fabricação de Equipamentos',
    'Outros'
  ];

  const handleInputChange = (field: keyof CompanyRegistrationFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleArrayChange = (field: keyof CompanyRegistrationFormData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      const newArray = checked 
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value);
      
      return {
        ...prev,
        [field]: newArray
      };
    });
    
    // Clear validation error when user makes a selection
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

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

  const citiesByState: Record<string, string[]> = {
    'AC': ['Rio Branco', 'Cruzeiro do Sul'],
    'AL': ['Maceió', 'Arapiraca'],
    'AP': ['Macapá', 'Santana'],
    'AM': ['Manaus', 'Parintins'],
    'BA': ['Salvador', 'Feira de Santana'],
    'CE': ['Fortaleza', 'Caucaia'],
    'DF': ['Brasília'],
    'ES': ['Vitória', 'Vila Velha'],
    'GO': ['Goiânia', 'Aparecida de Goiânia'],
    'MA': ['São Luís', 'Imperatriz'],
    'MT': ['Cuiabá', 'Várzea Grande'],
    'MS': ['Campo Grande', 'Dourados'],
    'MG': ['Belo Horizonte', 'Uberlândia'],
    'PA': ['Belém', 'Ananindeua'],
    'PB': ['João Pessoa', 'Campina Grande'],
    'PR': ['Curitiba', 'Londrina'],
    'PE': ['Recife', 'Jaboatão dos Guararapes'],
    'PI': ['Teresina', 'Parnaíba'],
    'RJ': ['Rio de Janeiro', 'São Gonçalo'],
    'RN': ['Natal', 'Mossoró'],
    'RS': ['Porto Alegre', 'Caxias do Sul'],
    'RO': ['Porto Velho', 'Ji-Paraná'],
    'RR': ['Boa Vista'],
    'SC': ['Florianópolis', 'Joinville'],
    'SP': ['São Paulo', 'Guarulhos'],
    'SE': ['Aracaju', 'Nossa Senhora do Socorro'],
    'TO': ['Palmas', 'Araguaína'],
  };

  const handleNestedInputChange = (parentField: keyof CompanyRegistrationFormData, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as any),
        [childField]: value
      }
    }));
  };

  const handleFileChange = (field: keyof CompanyRegistrationFormData, files: FileList | null, multiple = false) => {
    if (!files) return;
    
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    // File validation rules
    const validationRules = {
      logo: { maxSize: 2 * 1024 * 1024, types: ['image/jpeg', 'image/png', 'image/svg+xml'], maxCount: 1 },
      coverImage: { maxSize: 5 * 1024 * 1024, types: ['image/jpeg', 'image/png'], maxCount: 1 },
      documents: { maxSize: 5 * 1024 * 1024, types: ['application/pdf', 'image/jpeg', 'image/png'], maxCount: 10 },
      licenses: { maxSize: 5 * 1024 * 1024, types: ['application/pdf', 'image/jpeg', 'image/png'], maxCount: 10 },
      portfolioImages: { maxSize: 5 * 1024 * 1024, types: ['image/jpeg', 'image/png'], maxCount: 10 }
    };
    
    const rules = validationRules[field as keyof typeof validationRules];
    if (!rules) return;
    
    // Validate each file
    Array.from(files).forEach((file) => {
      // Check file size
      if (file.size > rules.maxSize) {
        errors.push(`${file.name}: Arquivo muito grande (máximo ${rules.maxSize / (1024 * 1024)}MB)`);
        return;
      }
      
      // Check file type
      if (!rules.types.includes(file.type)) {
        const allowedTypes = rules.types.map(type => type.split('/')[1].toUpperCase()).join(', ');
        errors.push(`${file.name}: Tipo não permitido (permitidos: ${allowedTypes})`);
        return;
      }
      
      validFiles.push(file);
    });
    
    // Check maximum count
    const currentFiles = multiple ? (formData[field] as File[] || []) : [];
    const totalFiles = multiple ? currentFiles.length + validFiles.length : validFiles.length;
    
    if (totalFiles > rules.maxCount) {
      errors.push(`Máximo de ${rules.maxCount} arquivo(s) permitido(s)`);
      return;
    }
    
    // Show errors if any
    if (errors.length > 0) {
      setErrorMessage(errors.join('\n'));
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    
    // Update form data
    if (multiple) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as File[] || []), ...validFiles]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: validFiles[0] || null
      }));
    }
    
    // Generate preview URLs for images
    if (field === 'logo' || field === 'coverImage' || field === 'portfolioImages') {
      validFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setFilePreviews(prev => {
              if (field === 'portfolioImages') {
                return {
                  ...prev,
                  portfolioImages: [...(prev.portfolioImages || []), result]
                };
              } else {
                return {
                  ...prev,
                  [field]: result
                };
              }
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeFile = (field: keyof CompanyRegistrationFormData, index?: number) => {
    if (index !== undefined) {
      // Remove specific file from array
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as File[]).filter((_, i) => i !== index)
      }));
      
      // Remove corresponding preview
      if (field === 'portfolioImages') {
        setFilePreviews(prev => ({
          ...prev,
          portfolioImages: prev.portfolioImages?.filter((_, i) => i !== index)
        }));
      }
    } else {
      // Remove single file
      setFormData(prev => ({
        ...prev,
        [field]: null
      }));
      
      // Remove corresponding preview
      if (field === 'logo' || field === 'coverImage') {
        setFilePreviews(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!safeTrim(formData.userName)) errors.userName = 'Seu nome é obrigatório';
        if (!safeTrim(formData.userEmail)) errors.userEmail = 'Seu e-mail é obrigatório';
        else if (!/^[^
@]+@[^
@]+\.[^
@]+$/.test(safeTrim(formData.userEmail))) errors.userEmail = 'E-mail inválido'; // Basic email regex
        if (!safeTrim(password)) errors.password = 'A senha é obrigatória';
        else if (password.length < 6) errors.password = 'A senha deve ter no mínimo 6 caracteres'; // Minimum length
        else if (!/[A-Z]/.test(password)) errors.password = 'A senha deve conter pelo menos uma letra maiúscula';
        else if (!/[a-z]/.test(password)) errors.password = 'A senha deve conter pelo menos uma letra minúscula';
        else if (!/[0-9]/.test(password)) errors.password = 'A senha deve conter pelo menos um número';
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.password = 'A senha deve conter pelo menos um caractere especial';

        if (!safeTrim(formData.userPasswordConfirmation)) errors.userPasswordConfirmation = 'Confirme sua senha';
        else if (password !== formData.userPasswordConfirmation) errors.userPasswordConfirmation = 'As senhas não coincidem';

        if (!safeTrim(formData.companyName)) errors.companyName = 'Nome da empresa é obrigatório';
        if (!safeTrim(formData.foundedYear)) errors.foundedYear = 'Ano de fundação é obrigatório';
        if (!safeTrim(formData.employeeCount)) errors.employeeCount = 'Número de funcionários é obrigatório';
        if (!safeTrim(formData.businessType)) errors.businessType = 'Tipo de negócio é obrigatório';
        if (!safeTrim(formData.description)) errors.description = 'Descrição é obrigatória';
        break;
      case 2:
        if (!safeTrim(formData.address)) errors.address = 'Endereço é obrigatório';
        if (!safeTrim(formData.city)) errors.city = 'Cidade é obrigatória';
        if (!safeTrim(formData.state)) errors.state = 'Estado é obrigatório';
        if (!safeTrim(formData.zipCode)) errors.zipCode = 'CEP é obrigatório';
        if (!safeTrim(formData.email)) errors.email = 'E-mail é obrigatório';
        if (!safeTrim(formData.phone)) errors.phone = 'Telefone é obrigatório';
        if (formData.serviceAreas.length === 0) errors.serviceAreas = 'Selecione pelo menos uma área de atendimento';
        break;
      case 3:
        if (formData.servicesOffered.length === 0) errors.servicesOffered = 'Selecione pelo menos um serviço oferecido';
        if (!safeTrim(formData.experienceYears)) errors.experienceYears = 'Anos de experiência é obrigatório';
        if (!safeTrim(formData.projectsCompleted)) errors.projectsCompleted = 'Número de projetos é obrigatório';
        if (!safeTrim(formData.installedCapacityMW)) errors.installedCapacityMW = 'Capacidade instalada é obrigatória';
        if (formData.specialties.length === 0) errors.specialties = 'Selecione pelo menos uma especialidade';
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
    if (!password) {
      setErrorMessage('Por favor, insira uma senha para o representante.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const data = new FormData();

      // Check if email is corporate (auto-verification logic)
      const isCorporateEmail = formData.email.toLowerCase().includes('@solar.com.br') || 
                              formData.email.toLowerCase().includes('@energia.com.br') ||
                              formData.email.toLowerCase().includes('@renovavel.com.br');
      
      // Append user data
      data.append('user[name]', formData.userName);
      data.append('user[email]', formData.userEmail);
      data.append('user[password]', password); // Use the password state
      data.append('user[password_confirmation]', formData.userPasswordConfirmation);

      // Append provider data
      data.append('provider[name]', formData.companyName);
      data.append('provider[foundation_year]', formData.foundedYear);
      data.append('provider[short_description]', formData.description);
      data.append('provider[address]', formData.address);
      data.append('provider[phone]', formData.phone);
      // CNPJ removed
      data.append('provider[employee_count]', formData.employeeCount);
      data.append('provider[city]', formData.city);
      data.append('provider[state]', safeTrim(formData.state).toUpperCase());
      data.append('provider[zip_code]', formData.zipCode);
      data.append('provider[email]', formData.email); // Company email
      data.append('provider[website]', formData.website);
      data.append('provider[experience_years]', formData.experienceYears);
      data.append('provider[projects_completed]', formData.projectsCompleted);
      data.append('provider[installed_capacity_mw]', formData.installedCapacityMW);
      data.append('provider[country]', formData.country || 'Brasil');
      data.append('provider[auto_verified]', isCorporateEmail.toString());

      // Append array fields
      data.append('provider[business_type]', formData.businessType); // Corrected: businessType is a string
      formData.serviceAreas.forEach(area => data.append('provider[service_areas][]', area));
      formData.servicesOffered.forEach(service => data.append('provider[services_offered][]', service));
      formData.specialties.forEach(specialty => data.append('provider[specialties][]', specialty));
      formData.certifications.forEach(cert => data.append('provider[certifications][]', cert));

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

      if (response.ok) {
        const result = await response.json();
        console.log('Company registration successful:', result);
        setIsSubmitted(true);
      } else if (response.status === 500) {
        const errorText = await response.text();
        console.error('Erro 500 do servidor:', errorText);
        setErrorMessage('Erro interno do servidor. Tente novamente em alguns minutos.');
      } else {
        let errorDetails = 'Erro desconhecido';
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorDetails = errorData.errors ? JSON.stringify(errorData.errors) : JSON.stringify(errorData);
          } catch (jsonParseError) {
            // Fallback if JSON parsing fails despite Content-Type
            errorDetails = `Erro ao processar resposta JSON: ${jsonParseError instanceof Error ? jsonParseError.message : 'Erro desconhecido'}`;
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
      
      setSuccessMessage('Cadastro enviado com sucesso! Tentando login automático...');
      
      const loginResult = await login(formData.userEmail, password);
      
      if (loginResult.success && loginResult.user) {
        const user = loginResult.user;
        if (user.role === 'empresa') {
          if (user.company?.status === 'active') {
            navigate('/company-dashboard');
          } else {
            navigate('/pending-approval');
          }
        } else {
          navigate('/dashboard');
        }
      } else {
        setErrorMessage(loginResult.error || 'Login automático falhou. Por favor, faça login manualmente.');
        navigate('/login');
      }
      
    } catch (error: any) { // Add : any to error for type safety
      if (error?.name === 'AbortError') return; // ignore AbortError
      console.error('Erro ao enviar cadastro:', error);
      setErrorMessage(`Erro ao enviar cadastro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
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

      {/* User Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seu Nome Completo *
          </label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.userName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Seu nome"
          />
          {validationErrors.userName && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.userName}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seu Email *
          </label>
          <input
            type="email"
            value={formData.userEmail}
            onChange={(e) => handleInputChange('userEmail', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.userEmail ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="seu.email@example.com"
          />
          {validationErrors.userEmail && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.userEmail}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha *
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Crie uma senha segura"
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.password}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirme a Senha *
          </label>
          <input
            type="password"
            value={formData.userPasswordConfirmation} // Assuming this is a new field in formData
            onChange={(e) => handleInputChange('userPasswordConfirmation', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.userPasswordConfirmation ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Confirme sua senha"
          />
          {validationErrors.userPasswordConfirmation && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.userPasswordConfirmation}
            </p>
          )}
        </div>
      </div>

      {/* Company Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Empresa *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.companyName ? 'border-red-500' : 'border-gray-300'}`}
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
            Ano de Fundação *
          </label>
          <input
            type="number"
            value={formData.foundedYear}
            onChange={(e) => handleInputChange('foundedYear', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.foundedYear ? 'border-red-500' : 'border-gray-300'}`}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.employeeCount ? 'border-red-500' : 'border-gray-300'}`}
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.description ? 'border-red-500' : 'border-gray-300'}`}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.address ? 'border-red-500' : 'border-gray-300'}`}
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
            Estado *
          </label>
          <select
            value={formData.state}
            onChange={(e) => {
              handleInputChange('state', e.target.value);
              handleInputChange('city', ''); // Clear city when state changes
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.state ? 'border-red-500' : 'border-gray-300'}`}
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
            Cidade *
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.city ? 'border-red-500' : 'border-gray-300'}`}
            disabled={!formData.state} // Disable city selection until state is chosen
          >
            <option value="">Selecione a cidade</option>
            {formData.state && citiesByState[formData.state] && citiesByState[formData.state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {validationErrors.city && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.city}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="00000-000"
          />
          {validationErrors.zipCode && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.zipCode}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha para Representante *
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
            placeholder="Crie uma senha segura"
          />
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
          {servicesOptions.map((service) => {
            const isSelected = formData.servicesOffered.includes(service);
            const getServiceIcon = (serv: string) => {
              if (serv.includes('Projeto')) return '📐';
              if (serv.includes('Residencial')) return '🏠';
              if (serv.includes('Comercial')) return '🏢';
              if (serv.includes('Industrial')) return '🏭';
              if (serv.includes('Usinas')) return '⚡';
              if (serv.includes('Off-Grid')) return '🔋';
              if (serv.includes('Híbridos')) return '🔄';
              if (serv.includes('Manutenção')) return '🔧';
              if (serv.includes('Monitoramento')) return '📊';
              if (serv.includes('Consultoria')) return '💡';
              if (serv.includes('Financiamento')) return '💰';
              if (serv.includes('Homologação')) return '📋';
              if (serv.includes('Aquecimento')) return '🌡️';
              if (serv.includes('Bombeamento')) return '💧';
              return '⚙️';
            };
            
            return (
              <label 
                key={service} 
                className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => handleArrayChange('servicesOffered', service, e.target.checked)}
                  className="sr-only"
                />
                <div className="text-lg mr-3">{getServiceIcon(service)}</div>
                <span className={`text-sm flex-1 ${
                  isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'
                }`}>
                  {service}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
            );
          })}
        </div>
        {validationErrors.servicesOffered && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
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
          Especialidades (selecione todas que se aplicam) *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialtyOptions.map((specialty) => {
            const isSelected = formData.specialties.includes(specialty);
            const getSpecialtyIcon = (spec: string) => {
              switch (spec) {
                case 'Residencial': return '🏠';
                case 'Comercial': return '🏢';
                case 'Industrial': return '🏭';
                case 'Usinas Solares': return '⚡';
                case 'Off-Grid': return '🔋';
                case 'Híbridos': return '🔄';
                case 'Rural': return '🌾';
                case 'Aquecimento Solar': return '🌡️';
                case 'Bombeamento Solar': return '💧';
                default: return '☀️';
              }
            };
            
            return (
              <label 
                key={specialty} 
                className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => handleArrayChange('specialties', specialty, e.target.checked)}
                  className="sr-only"
                />
                <div className="text-2xl mb-2">{getSpecialtyIcon(specialty)}</div>
                <span className={`text-sm font-medium text-center ${
                  isSelected ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {specialty}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
            );
          })}
        </div>
        {validationErrors.specialties && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {validationErrors.specialties}
          </p>
        )}
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
          {certificationOptions.map((cert) => {
            const isSelected = formData.certifications.includes(cert);
            const getCertIcon = (certification: string) => {
              if (certification.includes('INMETRO')) return '🏅';
              if (certification.includes('CREA')) return '👷';
              if (certification.includes('ABNT')) return '📜';
              if (certification.includes('NR-35')) return '🪜';
              if (certification.includes('NR-10')) return '⚡';
              if (certification.includes('ISO')) return '🌟';
              if (certification.includes('Fabricantes')) return '🏭';
              return '📋';
            };
            
            return (
              <label 
                key={cert} 
                className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  isSelected 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => handleArrayChange('certifications', cert, e.target.checked)}
                  className="sr-only"
                />
                <div className="text-lg mr-3">{getCertIcon(cert)}</div>
                <span className={`text-sm flex-1 ${
                  isSelected ? 'text-green-700 font-medium' : 'text-gray-700'
                }`}>
                  {cert}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
            );
          })}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.documents.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-700 font-medium">{file.name}</span>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile('documents', index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                    title="Remover arquivo"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.licenses.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-700 font-medium">{file.name}</span>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile('licenses', index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                    title="Remover arquivo"
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
          <div className="mt-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
              {filePreviews.logo && (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border">
                  <img 
                    src={filePreviews.logo} 
                    alt="Logo preview" 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{formData.logo.name}</p>
                <p className="text-xs text-gray-500">{(formData.logo.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile('logo')}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                title="Remover logo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
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
          <div className="mt-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              {filePreviews.coverImage && (
                <div className="w-full h-32 rounded-lg overflow-hidden bg-white border mb-3">
                  <img 
                    src={filePreviews.coverImage} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{formData.coverImage.name}</p>
                  <p className="text-xs text-gray-500">{(formData.coverImage.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile('coverImage')}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                  title="Remover imagem de capa"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
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
            <p className="text-sm font-medium text-gray-700 mb-3">Imagens selecionadas ({formData.portfolioImages.length}/10):</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.portfolioImages.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                    {filePreviews.portfolioImages && filePreviews.portfolioImages[index] ? (
                      <img 
                        src={filePreviews.portfolioImages[index]} 
                        alt={`Portfolio ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-500 text-center p-2">{file.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-1">
                    <p className="text-xs text-gray-600 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile('portfolioImages', index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remover imagem"
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
  );

  const renderStep6 = () => (
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

  const buttonContent = isSubmitting ? (
  <>
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
    Enviando...
  </>
) : 'Enviar Cadastro';

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
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

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
                    {buttonContent}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegistrationPage;