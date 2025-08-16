# Design Document

## Overview

SolarFinder é uma aplicação React moderna que implementa uma plataforma marketplace para empresas de energia solar. A arquitetura segue padrões de desenvolvimento frontend com componentes reutilizáveis, gerenciamento de estado local, e integração com APIs REST. A aplicação utiliza React Router para navegação, Tailwind CSS para estilização, e bibliotecas de componentes UI para interface consistente.

## Architecture

### Frontend Architecture
- **Framework**: React 18 com hooks e functional components
- **Routing**: React Router v6 para navegação SPA
- **Styling**: Tailwind CSS com sistema de design consistente
- **UI Components**: Shadcn/ui para componentes base reutilizáveis
- **Icons**: Lucide React para iconografia
- **Charts**: Recharts para visualizações de dados
- **State Management**: React useState/useEffect para estado local
- **Data Storage**: localStorage para persistência de sessão

### Project Structure
```
src/
├── components/
│   ├── ui/                 # Componentes base (Button, Input, Card, etc.)
│   ├── layout/             # Header, Footer, Layout components
│   ├── forms/              # LeadForm, ConversionPoints
│   └── charts/             # Componentes de gráficos
├── pages/                  # Páginas principais da aplicação
├── data/                   # Mock data e tipos
├── hooks/                  # Custom hooks
├── utils/                  # Funções utilitárias
└── assets/                 # Imagens e recursos estáticos
```

### Data Flow
1. **User Interaction** → Component Event Handler
2. **State Update** → React State Management
3. **Data Processing** → Business Logic Functions
4. **UI Update** → Component Re-render
5. **Persistence** → localStorage (session data)

## Components and Interfaces

### Core Components

#### Header Component
- **Props**: `user`, `onLogout`, `searchTerm`, `onSearchChange`
- **Features**: Logo, navegação principal, busca global, menu de usuário
- **Responsive**: Menu hambúrguer para mobile
- **Authentication**: Exibe diferentes opções baseado no status de login

#### HomePage Component
- **Props**: `searchTerm`, `onCompanySelect`
- **Sections**: Hero, ConversionPoints, CompanyList
- **State**: `leads` para captura de conversion points
- **Integration**: Integra busca global com filtros locais

#### CompanyList Component
- **Props**: `companies`, `searchTerm`, `onCompanySelect`
- **Features**: Filtros avançados, ordenação, paginação
- **State**: `sortBy`, `filterLocation`, `minCapacity`, `showFilters`
- **Performance**: Memoização de filtros complexos

#### CompanyDetail Component
- **Props**: `company`, `onBack`
- **Tabs**: Overview, Reviews, Guides, Contact
- **Features**: Informações detalhadas, formulário de lead, avaliações
- **State**: `activeTab`, `isLeadFormOpen`

#### LeadForm Component
- **Props**: `company`, `onClose`, `onSubmit`
- **Features**: Formulário multi-etapa, cálculo de score de intenção
- **Validation**: Validação em tempo real, campos condicionais
- **State**: `formData`, `showAdvancedFields`, `intentionScore`

#### DashboardPage Component
- **Features**: Métricas, gestão de leads, analytics, perfil da empresa
- **Tabs**: Overview, Leads, Analytics, Profile
- **Charts**: Gráficos de performance e métricas
- **State**: `activeTab`, dados de dashboard

### UI Component Library

#### Base Components (Shadcn/ui)
- **Button**: Variantes (default, outline, ghost), tamanhos, estados
- **Input**: Tipos diversos, validação, ícones
- **Card**: Header, Content, Footer estruturados
- **Badge**: Status indicators, categorias
- **Dialog/Modal**: Overlays para formulários
- **Tabs**: Navegação entre seções
- **Select**: Dropdowns com busca
- **Checkbox/Radio**: Controles de formulário

#### Custom Components
- **CompanyCard**: Card especializado para empresas
- **ReviewCard**: Exibição de avaliações
- **ConversionPoints**: Grid de ofertas de lead magnets
- **StarRating**: Componente de rating visual

## Data Models

### User Model
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
  companyId?: number;
}
```

### Company Model
```typescript
interface Company {
  id: number;
  name: string;
  location: string;
  installed_capacity_mw: number;
  status: 'active' | 'pending' | 'inactive';
  user_id: number;
  created_at: string;
  description: string;
  phone: string;
  website: string;
  rating: number;
  review_count: number;
  specialties: string[];
  certifications: string[];
  service_areas: string[];
}
```

### Lead Model
```typescript
interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'rural';
  energyBill: number;
  timeline: string;
  message: string;
  intentionScore: number;
  budget: string;
  purchaseIntention: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  leadSource: string;
  companyId: number;
  created_at: string;
}
```

### Review Model
```typescript
interface Review {
  id: number;
  solar_company_id: number;
  user_id: number;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user_name: string;
}
```

### ConversionPoint Model
```typescript
interface ConversionPoint {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  cta: string;
  leadMagnet: string;
}
```

## Error Handling

### Client-Side Error Handling
- **Form Validation**: Validação em tempo real com feedback visual
- **Network Errors**: Retry automático e mensagens de erro amigáveis
- **404 Handling**: Páginas de erro personalizadas
- **Fallback UI**: Loading states e skeleton screens

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  // Captura erros em componentes filhos
  // Exibe UI de fallback
  // Log de erros para monitoramento
}
```

### Validation Patterns
- **Email**: Regex pattern para validação de email
- **Phone**: Formatação automática de telefone brasileiro
- **CNPJ**: Validação de CNPJ para empresas
- **Required Fields**: Indicação visual de campos obrigatórios

## Testing Strategy

### Unit Testing
- **Components**: Testes de renderização e interação
- **Hooks**: Testes de custom hooks isolados
- **Utils**: Testes de funções utilitárias
- **Forms**: Testes de validação e submissão

### Integration Testing
- **User Flows**: Testes de fluxos completos de usuário
- **API Integration**: Mocks de chamadas de API
- **Routing**: Testes de navegação entre páginas
- **State Management**: Testes de estado compartilhado

### E2E Testing
- **Critical Paths**: Cadastro de empresa, geração de leads
- **Cross-browser**: Testes em diferentes navegadores
- **Mobile**: Testes de responsividade
- **Performance**: Testes de carregamento e performance

### Testing Tools
- **Jest**: Framework de testes unitários
- **React Testing Library**: Testes de componentes React
- **MSW**: Mock Service Worker para APIs
- **Cypress**: Testes end-to-end
- **Lighthouse**: Auditoria de performance

## Performance Considerations

### Code Splitting
- **Route-based**: Lazy loading de páginas
- **Component-based**: Lazy loading de componentes pesados
- **Bundle Analysis**: Análise de tamanho de bundles

### Optimization Strategies
- **React.memo**: Memoização de componentes
- **useMemo/useCallback**: Memoização de valores e funções
- **Virtual Scrolling**: Para listas grandes de empresas
- **Image Optimization**: Lazy loading e formatos otimizados

### Caching Strategy
- **Browser Cache**: Cache de assets estáticos
- **Memory Cache**: Cache de dados em memória
- **localStorage**: Persistência de preferências do usuário

## Security Considerations

### Frontend Security
- **XSS Prevention**: Sanitização de inputs do usuário
- **CSRF Protection**: Tokens CSRF em formulários
- **Content Security Policy**: Headers de segurança
- **Input Validation**: Validação rigorosa de todos os inputs

### Authentication & Authorization
- **JWT Tokens**: Armazenamento seguro de tokens
- **Role-based Access**: Controle de acesso baseado em roles
- **Session Management**: Timeout automático de sessões
- **Secure Storage**: Uso adequado de localStorage/sessionStorage

### Data Protection
- **PII Handling**: Tratamento adequado de dados pessoais
- **LGPD Compliance**: Conformidade com lei de proteção de dados
- **Audit Logging**: Log de ações sensíveis
- **Data Encryption**: Criptografia de dados sensíveis

## Accessibility (A11y)

### WCAG Compliance
- **Keyboard Navigation**: Navegação completa por teclado
- **Screen Reader**: Compatibilidade com leitores de tela
- **Color Contrast**: Contraste adequado para legibilidade
- **Focus Management**: Gerenciamento adequado de foco

### Semantic HTML
- **ARIA Labels**: Labels descritivos para elementos
- **Heading Structure**: Hierarquia adequada de headings
- **Form Labels**: Labels associados a inputs
- **Alt Text**: Textos alternativos para imagens

### Responsive Design
- **Mobile First**: Design responsivo mobile-first
- **Touch Targets**: Tamanhos adequados para touch
- **Viewport**: Configuração adequada de viewport
- **Flexible Layouts**: Layouts que se adaptam a diferentes telas

## Deployment Architecture

### Build Process
- **Vite**: Build tool moderno e rápido
- **TypeScript**: Tipagem estática para maior confiabilidade
- **ESLint/Prettier**: Linting e formatação de código
- **Husky**: Git hooks para qualidade de código

### Environment Configuration
- **Development**: Hot reload, debug tools
- **Staging**: Ambiente de testes
- **Production**: Otimizações de performance

### CI/CD Pipeline
1. **Code Commit** → Git Repository
2. **Automated Tests** → Unit, Integration, E2E
3. **Build Process** → Compilation and Optimization
4. **Deployment** → Static Hosting (Vercel/Netlify)
5. **Monitoring** → Error tracking and analytics