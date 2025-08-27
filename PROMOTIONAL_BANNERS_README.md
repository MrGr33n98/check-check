# Sistema de Banners Promocionais

Sistema completo de gerenciamento de faixas dinâmicas de anúncio (banners horizontais) para a plataforma SolarFinder.

## 📋 Funcionalidades Implementadas

### ✅ Backend (Rails)

#### Model PromotionalBanner
- **Localização**: `app/models/promotional_banner.rb`
- **Campos**:
  - `title`: Texto principal da faixa
  - `background_color`: Cor de fundo (hex)
  - `text_color`: Cor do texto (hex)
  - `url`: Link para redirecionamento
  - `provider_id`: Empresa vinculada (opcional)
  - `display_order`: Ordem de exibição
  - `active`: Status ativo/inativo
  - `position`: Posição do banner (homepage, category_page, etc.)
  - `clicks_count`: Contador de cliques
  - `impressions_count`: Contador de impressões
  - `start_date/end_date`: Período de exibição
  - Parâmetros UTM para rastreamento

#### Migration
- **Localização**: `db/migrate/20250127000004_create_promotional_banners.rb`
- **Índices**: Otimizados para performance em consultas por posição e status

#### ActiveAdmin
- **Localização**: `app/admin/promotional_banners.rb`
- **Recursos**:
  - Interface completa de gerenciamento
  - Preview em tempo real do banner
  - Filtros por status, posição, empresa
  - Cálculo automático de CTR
  - Ações customizadas (duplicar, visualizar no site)
  - Ações em lote (ativar/desativar)

#### API Controller
- **Localização**: `app/controllers/api/v1/promotional_banners_controller.rb`
- **Endpoints**:
  - `GET /api/v1/promotional_banners` - Listar todos
  - `GET /api/v1/promotional_banners/active` - Banners ativos
  - `GET /api/v1/promotional_banners/by_position/:position` - Por posição
  - `GET /api/v1/promotional_banners/:id` - Banner específico
  - `POST /api/v1/promotional_banners/:id/click` - Registrar clique
  - `POST /api/v1/promotional_banners/:id/impression` - Registrar impressão

#### Rotas
- **Localização**: `config/routes.rb`
- Rotas RESTful completas para a API

### ✅ Frontend (React/TypeScript)

#### Componente BannerSlider
- **Localização**: `src/components/BannerSlider.tsx`
- **Funcionalidades**:
  - Slider/rotator automático
  - Navegação manual entre banners
  - Registro automático de impressões
  - Registro de cliques com rastreamento UTM
  - Botão para fechar banner
  - Responsivo e acessível
  - Estados de loading e erro

#### Sistema de Rastreamento UTM
- **Localização**: `src/utils/utmTracking.ts`
- **Recursos**:
  - Classe singleton `UTMTracker`
  - Registro de eventos de impressão e clique
  - Construção automática de URLs com UTM
  - Retry automático para eventos falhos
  - Integração com endpoint de analytics

#### Dashboard da Empresa
- **Localização**: `src/components/CompanyBannerDashboard.tsx`
- **Funcionalidades**:
  - Visualização dos banners da empresa
  - Métricas de performance (impressões, cliques, CTR)
  - Formulário para solicitar alterações
  - Preview dos banners ativos
  - Status e datas de exibição

#### Integração no Layout
- **Localização**: `src/components/layout/Layout.tsx`
- Banner integrado acima do header principal
- Posição configurável por página

## 🚀 Como Usar

### 1. Executar Migration
```bash
rails db:migrate
```

### 2. Acessar ActiveAdmin
1. Acesse `/admin`
2. Navegue para "Promotional Banners"
3. Clique em "New Promotional Banner"

### 3. Criar Banner
**Campos obrigatórios**:
- Título do banner
- Cor de fundo
- Cor do texto
- URL de destino
- Posição (homepage, category_page, etc.)

**Campos opcionais**:
- Empresa vinculada
- Ordem de exibição
- Datas de início/fim
- Parâmetros UTM
- Notas internas

### 4. Visualizar no Site
Os banners aparecerão automaticamente na posição configurada:
- **Homepage**: Acima do header principal
- **Category Page**: No topo das páginas de categoria
- **Search Results**: Nos resultados de busca
- **Company Profile**: No perfil das empresas

## 📊 Métricas e Analytics

### Métricas Automáticas
- **Impressões**: Registradas automaticamente quando o banner é exibido
- **Cliques**: Registrados quando o usuário clica no banner
- **CTR**: Calculado automaticamente (cliques/impressões × 100)

### Rastreamento UTM
Todos os cliques são rastreados com parâmetros UTM:
- `utm_source`: Fonte do tráfego
- `utm_medium`: Meio de marketing
- `utm_campaign`: Campanha específica
- `utm_term`: Termo de busca
- `utm_content`: Conteúdo específico

### Dashboard da Empresa
Empresas podem:
- Visualizar seus banners ativos
- Ver métricas de performance
- Solicitar alterações via formulário
- Acompanhar status e datas

## 🎨 Customização

### Cores e Estilos
- Cores configuráveis via hex code
- Suporte a gradientes CSS
- Classes Tailwind CSS
- CSS customizado via ActiveAdmin

### Posições Disponíveis
- `homepage`: Página inicial
- `category_page`: Páginas de categoria
- `search_results`: Resultados de busca
- `company_profile`: Perfil da empresa

### Responsividade
- Design mobile-first
- Breakpoints otimizados
- Touch-friendly em dispositivos móveis

## 🔧 Configurações Avançadas

### Rotação Automática
```typescript
// Configurar intervalo de rotação (padrão: 5 segundos)
<BannerSlider 
  position="homepage" 
  autoRotateInterval={3000} // 3 segundos
/>
```

### Filtros por Empresa
```typescript
// Exibir apenas banners de uma empresa específica
<BannerSlider 
  position="homepage" 
  providerId={123}
/>
```

### Limite de Banners
```typescript
// Limitar número de banners exibidos
<BannerSlider 
  position="homepage" 
  limit={3}
/>
```

## 🛠️ Manutenção

### Limpeza de Dados
```ruby
# Remover banners expirados
PromotionalBanner.where('end_date < ?', Date.current).destroy_all

# Resetar contadores
PromotionalBanner.update_all(clicks_count: 0, impressions_count: 0)
```

### Backup de Configurações
```ruby
# Exportar banners ativos
PromotionalBanner.active.to_json

# Importar configurações
data = JSON.parse(backup_data)
data.each { |attrs| PromotionalBanner.create!(attrs) }
```

## 📝 Próximos Passos

### Melhorias Sugeridas
1. **A/B Testing**: Testar diferentes versões de banners
2. **Segmentação**: Exibir banners baseados na localização do usuário
3. **Agendamento**: Interface para agendar campanhas
4. **Templates**: Modelos pré-definidos de banners
5. **Analytics Avançados**: Integração com Google Analytics
6. **Notificações**: Alertas para empresas sobre performance

### Integrações Futuras
- Google Tag Manager
- Facebook Pixel
- Hotjar/Heatmaps
- CRM Integration

## 🐛 Troubleshooting

### Banner não aparece
1. Verificar se está ativo: `banner.active?`
2. Verificar datas: `banner.start_date` e `banner.end_date`
3. Verificar posição: `banner.position`
4. Verificar console do navegador para erros

### Métricas não funcionam
1. Verificar endpoints da API
2. Verificar CORS headers
3. Verificar console de rede
4. Verificar logs do Rails

### Performance
1. Adicionar cache Redis para banners ativos
2. Otimizar queries com includes
3. Implementar CDN para assets
4. Monitorar tempo de resposta da API

---

**Desenvolvido para SolarFinder** 🌞

*Sistema completo de banners promocionais com rastreamento avançado e interface administrativa.*