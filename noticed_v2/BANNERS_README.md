# Sistema de Banners - Active Admin

Este documento descreve como usar o sistema completo de banners configurado via Active Admin.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Uso no Active Admin](#uso-no-active-admin)
5. [Integração no Frontend](#integração-no-frontend)
6. [Tipos de Banner](#tipos-de-banner)
7. [API](#api)
8. [Exemplos](#exemplos)

## 🎯 Visão Geral

O sistema de banners permite:

- ✅ Gerenciamento completo via Active Admin
- ✅ Múltiplos tipos de banner (header, sidebar, footer, popup, etc.)
- ✅ Segmentação por dispositivo (desktop, mobile, tablet)
- ✅ Agendamento de exibição
- ✅ Tracking de impressões e cliques
- ✅ Associação com categorias e provedores
- ✅ HTML/CSS customizado
- ✅ Upload de imagens responsivas
- ✅ Controle de frequência de exibição

## 🚀 Instalação

### 1. Executar as Migrations

```bash
rails db:migrate
```

### 2. Popular com Dados de Exemplo (Opcional)

```bash
rails runner "load Rails.root.join('db/seeds/banners_seeds.rb')"
```

### 3. Reiniciar o Servidor

```bash
rails server
```

## ⚙️ Configuração

### Active Storage (para upload de imagens)

Certifique-se de que o Active Storage está configurado:

```bash
rails active_storage:install
rails db:migrate
```

### Configuração de CORS (se usando API)

Adicione ao `Gemfile`:

```ruby
gem 'rack-cors'
```

Configure em `config/application.rb`:

```ruby
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end
```

## 🎛️ Uso no Active Admin

### Acessando o Painel

1. Acesse `/admin`
2. Faça login como admin
3. Clique em "Banners" no menu lateral

### Criando um Banner

1. Clique em "New Banner"
2. Preencha os campos obrigatórios:
   - **Título**: Nome do banner
   - **URL de Destino**: Link para onde o banner deve redirecionar
   - **Tipo de Banner**: Posição onde será exibido
   - **Status**: Draft, Active, Paused, ou Expired
   - **Dispositivos Alvo**: Desktop, Mobile, Tablet, ou All
   - **Data/Hora de Início**: Quando começar a exibir

### Campos Opcionais

- **Descrição**: Texto descritivo
- **Prioridade**: Ordem de exibição (0 = maior prioridade)
- **Data/Hora de Fim**: Quando parar de exibir
- **Provedor**: Associar a um provedor específico
- **Categorias**: Associar a categorias específicas
- **Imagens**: Upload para desktop, mobile e tablet
- **CSS Personalizado**: Estilos customizados
- **HTML Personalizado**: Conteúdo HTML customizado
- **Código de Rastreamento**: Google Analytics, Facebook Pixel, etc.

### Funcionalidades Avançadas

#### Duplicar Banner
- Na página de detalhes do banner, clique em "Duplicar Banner"
- Uma cópia será criada com status "Draft"

#### Ações em Lote
- Selecione múltiplos banners
- Use as ações: "Activate", "Pause", ou "Draft"

#### Filtros
- Filtre por tipo, status, dispositivo, provedor, categorias, datas

## 🎨 Integração no Frontend

### Usando Helpers

#### Renderizar Banners por Posição

```erb
<!-- No layout principal -->
<%= render 'banners/banners_by_position', position: 'header' %>

<!-- Com opções -->
<%= render 'banners/banners_by_position', 
           position: 'sidebar', 
           limit: 3, 
           category_id: @category&.id,
           show_text: true %>
```

#### Renderizar Banner Individual

```erb
<%= render 'banners/banner', banner: @banner, show_text: true %>
```

### Usando o Helper Direto

```erb
<%= render_banners('header', limit: 2, css_class: 'my-custom-class') %>
```

### Integração em Layouts

```erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- Banner de cabeçalho -->
    <%= render 'banners/banners_by_position', position: 'header' %>
    
    <header>
      <!-- Seu cabeçalho -->
    </header>
    
    <main>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <%= yield %>
          </div>
          <div class="col-md-4">
            <!-- Banners da sidebar -->
            <%= render 'banners/banners_by_position', position: 'sidebar', limit: 3 %>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Banner de rodapé -->
    <%= render 'banners/banners_by_position', position: 'footer' %>
    
    <!-- Banners popup e mobile sticky -->
    <%= render 'banners/banners_by_position', position: 'popup' %>
    <%= render 'banners/banners_by_position', position: 'mobile_sticky' %>
  </body>
</html>
```

## 📱 Tipos de Banner

### Header
- **Posição**: Topo da página
- **Uso**: Promoções principais, anúncios importantes
- **Responsivo**: Sim

### Hero
- **Posição**: Seção principal da homepage
- **Uso**: Call-to-action principal, destaque de produtos
- **Responsivo**: Sim

### Sidebar
- **Posição**: Barra lateral
- **Uso**: Anúncios complementares, links relacionados
- **Responsivo**: Oculto em mobile por padrão

### Footer
- **Posição**: Rodapé da página
- **Uso**: Informações secundárias, links úteis
- **Responsivo**: Sim

### Popup
- **Posição**: Modal centralizado
- **Uso**: Ofertas especiais, captação de leads
- **Responsivo**: Sim
- **Características**: Botão de fechar, overlay

### Mobile Sticky
- **Posição**: Fixo na parte inferior (mobile)
- **Uso**: Call-to-action persistente em mobile
- **Responsivo**: Apenas mobile

### Category Page
- **Posição**: Páginas de categoria
- **Uso**: Anúncios relacionados à categoria
- **Responsivo**: Sim

### Solution Page
- **Posição**: Páginas de solução/produto
- **Uso**: Anúncios de produtos relacionados
- **Responsivo**: Sim

## 🔌 API

### Endpoints Disponíveis

```
GET /banners                          # Lista todos os banners ativos
GET /banners/:id                      # Detalhes de um banner
GET /banners/by_position/:position    # Banners por posição
POST /banners/:id/click              # Registrar clique
POST /banners/:id/impression         # Registrar impressão
```

### Parâmetros de Filtro

- `position`: Tipo de banner
- `category_id`: ID da categoria
- `provider_id`: ID do provedor
- `limit`: Número máximo de resultados
- `device`: Tipo de dispositivo (desktop, mobile, tablet)

### Exemplo de Uso da API

```javascript
// Buscar banners para header
fetch('/api/v1/banners/by_position/header')
  .then(response => response.json())
  .then(banners => {
    banners.forEach(banner => {
      // Renderizar banner
      displayBanner(banner);
      
      // Registrar impressão
      fetch(`/api/v1/banners/${banner.id}/impression`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });
    });
  });

// Registrar clique
function handleBannerClick(bannerId) {
  fetch(`/api/v1/banners/${bannerId}/click`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
    }
  });
}
```

## 💡 Exemplos

### Banner com HTML Customizado

```html
<!-- HTML Personalizado -->
<div class="promo-banner">
  <div class="promo-content">
    <h3>🌞 Energia Solar Residencial</h3>
    <p>Economize até 95% na sua conta de luz!</p>
    <a href="#" class="btn-cta">Solicitar Orçamento</a>
  </div>
</div>
```

```css
/* CSS Personalizado */
.promo-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
}

.promo-content h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.btn-cta {
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin-top: 15px;
  transition: all 0.3s;
}

.btn-cta:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
}
```

### Banner Responsivo com Imagens

1. **Upload das Imagens**:
   - Desktop: 1200x300px
   - Mobile: 375x200px
   - Tablet: 768x250px

2. **Configuração**:
   - Tipo: Header
   - Dispositivo: All
   - Título: "Energia Solar para Todos"
   - URL: "https://exemplo.com/energia-solar"

### Banner com Tracking

```html
<!-- Código de Rastreamento -->
<script>
  // Google Analytics
  gtag('event', 'banner_view', {
    'event_category': 'Banner',
    'event_label': 'Promoção Solar',
    'banner_id': '1'
  });
  
  // Facebook Pixel
  fbq('track', 'ViewContent', {
    content_name: 'Banner Energia Solar',
    content_category: 'Promoção'
  });
</script>
```

## 📊 Relatórios e Analytics

### Métricas Disponíveis

- **Impressões**: Quantas vezes o banner foi visualizado
- **Cliques**: Quantas vezes foi clicado
- **CTR**: Taxa de clique (cliques/impressões)
- **Período Ativo**: Dias restantes da campanha

### Visualização no Admin

1. Acesse a lista de banners
2. Veja as métricas na coluna "CTR"
3. Clique em um banner para ver detalhes completos
4. Use filtros para analisar performance por período

## 🔧 Troubleshooting

### Banner não aparece

1. Verifique se o status é "Active"
2. Confirme se a data de início já passou
3. Verifique se não expirou
4. Confirme se o dispositivo está correto
5. Verifique se há imagem ou HTML customizado

### Imagens não carregam

1. Confirme se o Active Storage está configurado
2. Verifique se as imagens foram enviadas corretamente
3. Teste em diferentes dispositivos

### Tracking não funciona

1. Verifique se o CSRF token está presente
2. Confirme se as rotas estão corretas
3. Verifique o console do navegador para erros
4. Teste com ferramentas de desenvolvedor

## 🚀 Próximos Passos

- [ ] Implementar A/B testing
- [ ] Adicionar relatórios avançados
- [ ] Integração com Google Ads
- [ ] Sistema de aprovação de banners
- [ ] Templates pré-definidos
- [ ] Agendamento automático

---

**Desenvolvido para o projeto Check Check Solar** 🌞

Para suporte técnico, consulte a documentação do Rails ou entre em contato com a equipe de desenvolvimento.