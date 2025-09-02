# 🎨 Especificações de Banner para Cards de Empresa

## 📐 Dimensões Recomendadas

### Banner do Card Principal
- **Resolução Ideal**: 800x200 pixels
- **Proporção**: 4:1 (landscape)
- **Formato**: JPG ou PNG
- **Tamanho**: Máximo 500KB
- **Qualidade**: 80-90% (para JPG)

## 🎯 Onde o Banner Aparece

### 1. Página Inicial (Empresas em Destaque)
- **Altura**: 128px (h-32)
- **Largura**: Responsiva
  - Mobile: ~350px
  - Tablet: ~360px
  - Desktop: ~380px

### 2. Página de Busca Avançada
- **Altura**: 128px (h-32)
- **Largura**: Responsiva
  - Mobile: ~350px
  - Desktop: ~600px+

### 3. Página de Detalhes da Empresa
- **Altura**: 192px (h-48)
- **Largura**: 100% do container (~1200px max)

## 🎨 Diretrizes de Design

### Composição
- **Área Segura**: Deixe 60px livres no canto inferior esquerdo (para logo)
- **Área Segura**: Deixe 40px livres no canto superior direito (para rating)
- **Contraste**: Use cores que contrastem bem com texto branco
- **Overlay**: O sistema aplica overlay escuro automático (40% opacity)

### Elementos Visuais
- **Logo da Empresa**: Será sobreposto no canto inferior esquerdo
- **Nome da Empresa**: Aparece em texto branco com sombra
- **Rating**: Aparece no canto superior direito
- **Localização**: Aparece abaixo do nome da empresa

### Cores Recomendadas
- **Tons Corporativos**: Azul, verde, laranja
- **Gradientes**: Funcionam bem com overlay
- **Evitar**: Cores muito claras ou com baixo contraste

## 📱 Responsividade

### Mobile (< 768px)
- Banner mantém proporção mas reduz largura
- Logo e texto permanecem legíveis
- Overlay pode ser mais forte (50%)

### Tablet (768px - 1024px)
- Proporção ideal mantida
- Todos os elementos visíveis

### Desktop (> 1024px)
- Resolução completa exibida
- Melhor qualidade visual

## 🔧 Implementação Técnica

### CSS Aplicado
```css
background-size: cover;
background-position: center;
background-repeat: no-repeat;
```

### Overlay Automático
- **Sem banner customizado**: 20% opacity
- **Com banner customizado**: 40% opacity
- **Página de detalhes**: 50% opacity

## ✅ Checklist para Upload

- [ ] Resolução: 800x200px
- [ ] Formato: JPG ou PNG
- [ ] Tamanho: < 500KB
- [ ] Área segura respeitada
- [ ] Contraste adequado
- [ ] Teste em diferentes dispositivos

## 🎯 Exemplos de Uso

### ✅ Bons Exemplos
- Paisagem com painéis solares
- Instalação em telhado
- Equipe trabalhando
- Fachada da empresa
- Projetos realizados

### ❌ Evitar
- Imagens muito escuras
- Texto na área do logo
- Resolução muito baixa
- Cores que conflitam com overlay
- Imagens com muito ruído

## 🔄 Fallback

Quando não há banner customizado:
- **Página Inicial**: Gradiente laranja-amarelo
- **Busca**: Gradiente azul-roxo
- **Detalhes**: Gradiente azul-verde

## 📞 Suporte

Para dúvidas sobre especificações de banner, consulte a documentação técnica ou entre em contato com o suporte.