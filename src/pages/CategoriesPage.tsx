import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, BatteryCharging, Lightbulb, DollarSign, Users, Globe, Rocket, TrendingUp, Shield, ArrowRight } from 'lucide-react'; // Example icons

// Definindo um tipo para os objetos de categoria vindos da API
interface ApiCategory {
  id: number | string;
  name: string;
  slug: string;
  description?: string | null;
  featured?: boolean;
  banner_image_url?: string | null;
}

// Definindo um tipo para os cards na página
interface Category {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  featured?: boolean;
  banner_image_url?: string | null;
}

// Config de hero opcional, carregada via Admin (banner por posição)
interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage?: string | null;
}

// Mock data for categories (fallback)
const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Geração Distribuída',
    slug: 'geracao-distribuida',
    description: 'Sistemas de geração distribuída permitem que a eletricidade seja produzida próximo ao local de consumo, geralmente em telhados de residências e empresas.',
    featured: true
  },
  {
    id: 2,
    name: 'Usinas Solares de Grande Porte',
    slug: 'usinas-solares',
    description: 'Usinas solares de grande porte são instalações industriais que geram eletricidade em larga escala para o fornecimento à rede elétrica.',
    featured: true
  },
  {
    id: 3,
    name: 'Armazenamento de Energia',
    slug: 'armazenamento',
    description: 'Sistemas de armazenamento permitem acumular a eletricidade gerada para uso posterior, aumentando a autonomia energética.',
    featured: true
  },
  {
    id: 4,
    name: 'Energia Off-Grid',
    slug: 'off-grid',
    description: 'Sistemas off-grid são soluções energéticas independentes que não se conectam à rede elétrica convencional.',
    featured: true
  },
  {
    id: 5,
    name: 'Eficiência Energética',
    slug: 'eficiencia',
    description: 'Tecnologias e práticas que reduzem o consumo de energia mantendo o mesmo nível de conforto e produtividade.',
    featured: true
  },
  {
    id: 6,
    name: 'Financiamento e Crédito Solar',
    slug: 'financiamento',
    description: 'Soluções de financiamento que permitem a adoção da energia solar com investimento acessível.',
    featured: true
  },
  {
    id: 7,
    name: 'Comunidades de Energia',
    slug: 'comunidades',
    description: 'Modelo colaborativo que permite compartilhar os benefícios da geração solar entre grupos de consumidores.',
    featured: true
  },
  {
    id: 8,
    name: 'Sustentabilidade e ESG',
    slug: 'sustentabilidade',
    description: 'A energia solar como componente essencial das estratégias de sustentabilidade e ESG.',
    featured: true
  },
  {
    id: 9,
    name: 'Inovação e Novas Tecnologias',
    slug: 'inovacao',
    description: 'Novas tecnologias como células de perovskita, bifaciais, flutuantes e sistemas de rastreamento solar.',
    featured: true
  }
];

// Helper para mapear slugs a ícones (exemplo)
const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'geracao-distribuida': return <Zap className="w-6 h-6 text-blue-600" />;
    case 'usinas-solares': return <Lightbulb className="w-6 h-6 text-yellow-600" />;
    case 'armazenamento': return <BatteryCharging className="w-6 h-6 text-green-600" />;
    case 'off-grid': return <Globe className="w-6 h-6 text-purple-600" />;
    case 'eficiencia': return <TrendingUp className="w-6 h-6 text-teal-600" />;
    case 'financiamento': return <DollarSign className="w-6 h-6 text-indigo-600" />;
    case 'comunidades': return <Users className="w-6 h-6 text-pink-600" />;
    case 'sustentabilidade': return <Shield className="w-6 h-6 text-lime-600" />;
    case 'inovacao': return <Rocket className="w-6 h-6 text-orange-600" />;
    default: return <Search className="w-6 h-6 text-gray-500" />;
  }
};

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Estado do Hero (configurável)
  const [hero, setHero] = useState<HeroConfig>({
    title: 'Todas as Categorias de Energia Solar',
    subtitle: 'Explore empresas por segmento do setor solar. Encontre empresas especializadas em geração, eficiência energética, armazenamento e muito mais.',
    backgroundImage: null
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    // SEO
    document.title = "Todas as Categorias de Energia Solar | SolarFinder";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Explore empresas por segmento do setor solar. Encontre empresas especializadas em geração, eficiência energética, armazenamento e muito mais.");

    (async () => {
      try {
        setLoading(true);
        const [categoriesRes, heroRes] = await Promise.all([
          fetch('/api/v1/categories', { signal: controller.signal }),
          fetch('/api/v1/promotional_banners/by_position/categories_hero', { signal: controller.signal })
        ]);

        if (!active || controller.signal.aborted) return; // Ignore if component unmounted or request aborted

        // Process categories response
        if (!categoriesRes.ok) throw new Error(`HTTP ${categoriesRes.status}`);
        const apiCategories: ApiCategory[] = await categoriesRes.json();
        if (!Array.isArray(apiCategories)) throw new Error('Formato inesperado: a resposta da API não é um array.');
        const mappedCategories: Category[] = apiCategories.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          featured: c.featured || false,
          banner_image_url: c.banner_image_url
        }));
        setCategories(mappedCategories.length > 0 ? mappedCategories : mockCategories);

        // Process hero config response
        if (heroRes.ok) {
          const contentType = heroRes.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await heroRes.json();
            if (data && Array.isArray(data.data) && data.data.length > 0) {
              const b = data.data[0];
              setHero((prev) => ({
                title: b.title || prev.title,
                subtitle: b.description || prev.subtitle,
                backgroundImage: b.image_url || prev.backgroundImage,
              }));
            }
          }
        }

      } catch (err: unknown) {
        // Silence AbortError
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log('Fetch de categorias/hero abortado');
          return;
        }
        console.warn('Falha ao carregar categorias/hero, usando mock:', err);
        setCategories(mockCategories);
      } finally {
        if (active && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center text-lg">Carregando categorias...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section (50% menor e configurável) */}
      <section className="relative bg-blue-700 text-white py-8 md:py-10 overflow-hidden">
        {hero.backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          />
        )}
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl mb-5 max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
          <Link 
            to="/encontrar-empresas" 
            className="inline-block bg-white text-blue-700 hover:bg-blue-100 px-6 py-2.5 rounded-full text-base font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Encontre empresas confiáveis por categoria
          </Link>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar categorias..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar categorias"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map(category => (
                <Link 
                  key={category.id} 
                  to={`/categorias/${category.slug}`} 
                  className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-0.5"
                  aria-label={`Ver empresas na categoria ${category.name}`}
                >
                  {/* Banner superior (configurado via ActiveAdmin) */}
                  <div className="w-full h-[140px] bg-gray-100 overflow-hidden">
                    {category.banner_image_url ? (
                      <img
                        src={category.banner_image_url}
                        alt={`Banner da categoria ${category.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        {getCategoryIcon(category.slug)}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {category.name}
                      </h2>
                    </div>

                    {category.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                    )}

                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      <span>Ver empresas</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">Nenhuma categoria encontrada com o termo de busca.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CategoriesPage;