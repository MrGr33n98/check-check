# Implementação do Background Global

## Componentes Criados/Modificados

### 1. PageBackground.tsx
```tsx
// check-check/src/components/ui/PageBackground.tsx
import React from 'react';
import compareSolarImage from '@/assets/compare-solar.jpg';

const PageBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Background Image with low opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${compareSolarImage})` }}
      />
      
      {/* Overlay for better contrast - light mode */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />
    </div>
  );
};

export default PageBackground;
```

### 2. CSS Global (index.css)
```css
:root {
  --nav-h: 72px;
}
```

### 3. App.tsx - Background Global
```tsx
import PageBackground from '@/components/ui/PageBackground';

function App() {
  return (
    <Router>
      <PageBackground />
      <Layout>
        {/* Routes */}
      </Layout>
    </Router>
  );
}
```

### 4. Layout.tsx - Header Sticky
```tsx
{/* Enhanced Header */}
<div className="sticky top-0 z-50 bg-white border-b">
  <EnhancedHeader />
</div>
```

### 5. EnhancedHeroSection.tsx - Sem Background Próprio
```tsx
return (
  <section 
    className="relative"
    style={{
      height: 'calc(100vh - var(--nav-h, 72px))',
      marginTop: 'var(--nav-h, 72px)'
    }}
  >
    {/* Search Form - Minimalista centralizada */}
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col sm:flex-row gap-3 max-[360px]:flex-col">
            <Input
              className="flex-1 h-12 text-base bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            />
            <Button className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-lg">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </div>
  </section>
);
```

## Características da Implementação

### ✅ Background Global
- **Fixed positioning**: `fixed inset-0 -z-10`
- **Baixa opacidade**: `opacity-15` (15%)
- **Overlay para contraste**: `bg-white/60` (light) / `bg-black/40` (dark)
- **Não afeta conteúdo**: Usa `-z-10` para ficar atrás de tudo

### ✅ Navbar Separada
- **Sticky positioning**: `sticky top-0 z-50`
- **Fundo branco**: `bg-white border-b`
- **Altura definida**: `--nav-h: 72px`

### ✅ Hero Minimalista
- **Sem background próprio**: Remove `backgroundImage` e overlays
- **Offset da navbar**: `calc(100vh - var(--nav-h, 72px))`
- **Input semi-transparente**: `bg-white/90 backdrop-blur-sm`

### ✅ Acessibilidade
- **Alto contraste**: Overlay garante legibilidade do texto
- **Responsivo**: Funciona em todos os tamanhos de tela
- **Performance**: Background fixo não recarrega entre páginas

## Resultado Final
- Imagem de fundo sutil em toda a aplicação (15% opacidade)
- Navbar branca separada e sticky
- Hero com apenas barra de busca centralizada
- Excelente legibilidade e contraste
- Design minimalista e moderno