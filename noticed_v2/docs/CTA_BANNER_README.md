# Sistema de CTA Banner Customizável

Este sistema permite criar e gerenciar banners de call-to-action (CTA) totalmente customizáveis através do ActiveAdmin, com renderização dinâmica no frontend React.

## Arquivos Criados

### Backend (Rails)

1. **Model**: `app/models/cta_banner.rb`
   - Validações para todos os campos obrigatórios
   - Scopes para banners ativos
   - Método `current` para obter o banner ativo mais recente
   - Método `to_json_api` para serialização da API

2. **Migration**: `db/migrate/20250127000003_create_cta_banners.rb`
   - Tabela com todos os campos necessários
   - Índices para performance

3. **ActiveAdmin**: `app/admin/cta_banners.rb`
   - Interface completa de administração
   - Preview do banner em tempo real
   - JavaScript para mostrar/ocultar campos baseado no tipo de fundo
   - Validação visual dos campos

4. **Controller**: `app/controllers/api/v1/cta_banners_controller.rb`
   - Endpoint público `GET /api/v1/cta_banner`
   - Tratamento de erros com fallback
   - Headers CORS configurados

5. **Rotas**: Adicionado em `config/routes.rb`
   ```ruby
   # CTA Banner API routes
   get 'cta_banner', to: 'cta_banners#show'
   ```

### Frontend (React)

6. **Componente**: `src/components/CtaBanner.tsx`
   - Busca dados da API automaticamente
   - Suporte a fundo sólido ou imagem
   - Botões com links internos e externos
   - Loading state e tratamento de erros
   - Valores de fallback
   - Design responsivo

## Campos do Model

| Campo | Tipo | Descrição |
|-------|------|----------|
| `title` | string | Título principal do banner |
| `subtitle` | text | Texto secundário/descrição |
| `button1_text` | string | Texto do primeiro botão |
| `button1_url` | string | URL do primeiro botão |
| `button2_text` | string | Texto do segundo botão |
| `button2_url` | string | URL do segundo botão |
| `background_type` | string | Tipo de fundo: 'solid' ou 'image' |
| `background_color` | string | Cor de fundo (quando type = 'solid') |
| `background_image` | attachment | Imagem de fundo (quando type = 'image') |
| `enabled` | boolean | Se o banner está ativo |
| `position` | string | Posição do banner ('homepage', 'category_page', etc.) |

## Como Usar

### 1. Configurar Banner no ActiveAdmin

1. Acesse `/admin/cta_banners`
2. Clique em "New Cta Banner"
3. Preencha os campos:
   - **Título Principal**: Texto chamativo
   - **Subtítulo**: Descrição complementar
   - **Botões**: Textos e URLs (podem ser links internos `/buscar` ou externos `https://...`)
   - **Tipo de Fundo**: Escolha entre cor sólida ou imagem
   - **Cor/Imagem**: Configure conforme o tipo escolhido
   - **Posição**: Onde o banner deve aparecer
   - **Ativo**: Marque para ativar o banner

4. Visualize o preview na página de detalhes
5. Salve as alterações

### 2. Usar o Componente React

```tsx
import CtaBanner from '@/components/CtaBanner';

// Uso básico
<CtaBanner />

// Com posição específica
<CtaBanner position="homepage" />

// Com classes CSS customizadas
<CtaBanner position="category_page" className="my-8" />
```

### 3. API Endpoint

**URL**: `GET /api/v1/cta_banner`

**Resposta de Sucesso**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Pronto para começar seu projeto solar?",
    "subtitle": "Conecte-se com as melhores empresas...",
    "button1_text": "Encontrar Empresas",
    "button1_url": "/buscar",
    "button2_text": "Cadastrar Minha Empresa",
    "button2_url": "/cadastrar",
    "background_type": "solid",
    "background_color": "#f97316",
    "background_image_url": null,
    "enabled": true,
    "position": "homepage"
  }
}
```

## Funcionalidades

### ✅ Implementadas

- [x] Model completo com validações
- [x] Interface ActiveAdmin com preview
- [x] API pública com tratamento de erros
- [x] Componente React responsivo
- [x] Suporte a cor sólida e imagem de fundo
- [x] Botões com links internos e externos
- [x] Sistema de fallback
- [x] Campo de posição para múltiplos banners
- [x] Upload de imagens (JPG, PNG, SVG)

### 🔄 Melhorias Futuras

- [ ] Cache da API para melhor performance
- [ ] Múltiplos banners por posição com prioridade
- [ ] Agendamento de banners (data início/fim)
- [ ] Analytics de cliques nos botões
- [ ] Testes automatizados
- [ ] Suporte a vídeos de fundo
- [ ] Editor WYSIWYG para textos

## Troubleshooting

### Problema: Banner não aparece
- Verifique se existe um banner ativo no ActiveAdmin
- Confirme se a posição está correta
- Verifique o console do navegador para erros de API

### Problema: Imagem de fundo não carrega
- Confirme se o arquivo foi enviado corretamente
- Verifique se o Active Storage está configurado
- Teste a URL da imagem diretamente

### Problema: API retorna erro 500
- Verifique se a migration foi executada
- Confirme se o model está carregado corretamente
- Verifique os logs do Rails

## Exemplo de Uso Completo

```tsx
// Em qualquer página React
import CtaBanner from '@/components/CtaBanner';

const MyPage = () => {
  return (
    <div>
      <h1>Minha Página</h1>
      
      {/* Banner customizável via ActiveAdmin */}
      <CtaBanner 
        position="homepage" 
        className="my-12 mx-auto max-w-6xl" 
      />
      
      <p>Resto do conteúdo...</p>
    </div>
  );
};
```

O banner será renderizado automaticamente com os dados configurados no ActiveAdmin, incluindo textos, cores, imagens e links dos botões.