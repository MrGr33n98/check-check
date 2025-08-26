import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Leaf, BatteryCharging, Lightbulb, DollarSign, Users, Globe, Rocket, TrendingUp, Shield } from 'lucide-react'; // Example icons

// Definindo um tipo para os objetos de categoria
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  featured?: boolean;
}

// Mock data for categories
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
    case 'geracao-distribuida': return <Zap className="w-8 h-8 text-blue-600" />;
    case 'usinas-solares': return <Lightbulb className="w-8 h-8 text-yellow-600" />;
    case 'armazenamento': return <BatteryCharging className="w-8 h-8 text-green-600" />;
    case 'off-grid': return <Globe className="w-8 h-8 text-purple-600" />;
    case 'eficiencia': return <TrendingUp className="w-8 h-8 text-teal-600" />;
    case 'financiamento': return <DollarSign className="w-8 h-8 text-indigo-600" />;
    case 'comunidades': return <Users className="w-8 h-8 text-pink-600" />;
    case 'sustentabilidade': return <Shield className="w-8 h-8 text-lime-600" />;
    case 'inovacao': return <Rocket className="w-8 h-8 text-orange-600" />;
    default: return <Search className="w-8 h-8 text-gray-500" />;
  }
};

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    console.log('CategoriesPage: Initializing page');
    
    // SEO: Set page title and meta description for the main categories page
    document.title = "Todas as Categorias de Energia Solar | SolarFinder";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Explore empresas por segmento do setor solar. Encontre empresas especializadas em geração, eficiência energética, armazenamento e muito mais.");

    // Since we're using mock data, we don't need to fetch from API
    console.log('CategoriesPage: Using mock data');
    setLoading(false);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    console.log('CategoriesPage: Still loading, showing loading indicator');
    return <div className="container mx-auto px-4 py-16 text-center text-lg">Carregando categorias...</div>;
  }

  if (error) {
    console.log('CategoriesPage: Error occurred:', error);
    return <div className="container mx-auto px-4 py-16 text-center text-lg text-red-600">Ocorreu um erro: {error}</div>;
  }

  console.log('CategoriesPage: Rendering categories:', categories);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Todas as Categorias de Energia Solar
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            Explore empresas por segmento do setor solar. Encontre empresas especializadas em geração, eficiência energética, armazenamento e muito mais.
          </p>
          <Link 
            to="/encontrar-empresas" 
            className="inline-block bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
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
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map(category => (
                <Link 
                  key={category.id} 
                  to={`/categorias/${category.slug}`} 
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  aria-label={`Ver empresas na categoria ${category.name}`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{category.name}</h2>
                    {category.description && (
                      <p className="text-gray-600 text-sm text-center line-clamp-2">{category.description}</p>
                    )}
                    <div className="mt-4 text-center">
                      <span className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Ver empresas &rarr;
                      </span>
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