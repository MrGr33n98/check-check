import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Search, ArrowRight } from 'lucide-react';

// Mock data para os artigos do blog
const mockArticles = [
    {
        id: 1,
        title: 'Como Escolher a Melhor Empresa de Energia Solar em 2024',
        excerpt: 'Guia completo com dicas essenciais para escolher a empresa ideal para seu projeto de energia solar.',
        content: 'Conteúdo completo do artigo...',
        author: 'João Silva',
        publishedAt: '2024-01-15',
        readTime: '8 min',
        category: 'Guias',
        tags: ['energia solar', 'empresas', 'dicas'],
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop',
        featured: true
    },
    {
        id: 2,
        title: 'Tendências do Mercado Solar Brasileiro para 2024',
        excerpt: 'Análise das principais tendências e oportunidades no setor de energia solar no Brasil.',
        content: 'Conteúdo completo do artigo...',
        author: 'Maria Santos',
        publishedAt: '2024-01-12',
        readTime: '6 min',
        category: 'Mercado',
        tags: ['mercado', 'tendências', 'brasil'],
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 3,
        title: 'Financiamento Solar: Opções e Como Conseguir',
        excerpt: 'Descubra as melhores opções de financiamento para seu projeto de energia solar.',
        content: 'Conteúdo completo do artigo...',
        author: 'Carlos Oliveira',
        publishedAt: '2024-01-10',
        readTime: '10 min',
        category: 'Financiamento',
        tags: ['financiamento', 'crédito', 'investimento'],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 4,
        title: 'Manutenção de Sistemas Solares: O Que Você Precisa Saber',
        excerpt: 'Tudo sobre manutenção preventiva e corretiva de sistemas de energia solar.',
        content: 'Conteúdo completo do artigo...',
        author: 'Ana Costa',
        publishedAt: '2024-01-08',
        readTime: '7 min',
        category: 'Manutenção',
        tags: ['manutenção', 'sistemas', 'cuidados'],
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 5,
        title: 'ROI em Energia Solar: Como Calcular o Retorno do Investimento',
        excerpt: 'Aprenda a calcular o retorno sobre investimento em sistemas de energia solar.',
        content: 'Conteúdo completo do artigo...',
        author: 'Pedro Lima',
        publishedAt: '2024-01-05',
        readTime: '12 min',
        category: 'Investimento',
        tags: ['roi', 'cálculo', 'retorno'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        featured: false
    },
    {
        id: 6,
        title: 'Energia Solar Residencial vs Comercial: Principais Diferenças',
        excerpt: 'Entenda as diferenças entre sistemas solares residenciais e comerciais.',
        content: 'Conteúdo completo do artigo...',
        author: 'Lucia Ferreira',
        publishedAt: '2024-01-03',
        readTime: '9 min',
        category: 'Comparação',
        tags: ['residencial', 'comercial', 'diferenças'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
        featured: false
    }
];

const categories = ['Todos', 'Guias', 'Mercado', 'Financiamento', 'Manutenção', 'Investimento', 'Comparação'];

const BlogPage = () => {
    const articles = mockArticles;
    const [filteredArticles, setFilteredArticles] = useState(mockArticles);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let filtered = articles;

        // Filtrar por categoria
        if (selectedCategory !== 'Todos') {
            filtered = filtered.filter(article => article.category === selectedCategory);
        }

        // Filtrar por termo de busca
        if (searchTerm) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredArticles(filtered);
    }, [selectedCategory, searchTerm, articles]);

    const featuredArticle = articles.find(article => article.featured);
    const regularArticles = filteredArticles.filter(article => !article.featured);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Blog SolarFinder
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Fique por dentro das últimas novidades, dicas e tendências do mercado de energia solar
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Search and Filters */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar artigos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Article */}
                {featuredArticle && selectedCategory === 'Todos' && !searchTerm && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigo em Destaque</h2>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="lg:flex">
                                <div className="lg:w-1/2">
                                    <img
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        className="w-full h-64 lg:h-full object-cover"
                                    />
                                </div>
                                <div className="lg:w-1/2 p-8">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                            {featuredArticle.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(featuredArticle.publishedAt).toLocaleDateString('pt-BR')}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {featuredArticle.readTime}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {featuredArticle.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <User className="w-4 h-4" />
                                            {featuredArticle.author}
                                        </div>
                                        <Link
                                            to={`/blog/${featuredArticle.id}`}
                                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Ler Artigo
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Articles Grid */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {searchTerm ? `Resultados para "${searchTerm}"` :
                                selectedCategory === 'Todos' ? 'Todos os Artigos' : `Categoria: ${selectedCategory}`}
                        </h2>
                        <span className="text-gray-500">
                            {filteredArticles.length} {filteredArticles.length === 1 ? 'artigo' : 'artigos'}
                        </span>
                    </div>

                    {filteredArticles.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <Search className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                Nenhum artigo encontrado
                            </h3>
                            <p className="text-gray-500">
                                Tente ajustar os filtros ou termo de busca
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {regularArticles.map((article) => (
                                <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">
                                                {article.category}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {article.readTime}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <User className="w-4 h-4" />
                                                {article.author}
                                            </div>
                                            <Link
                                                to={`/blog/${article.id}`}
                                                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                            >
                                                Ler mais
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                {/* Newsletter Subscription */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">
                        Receba as últimas novidades
                    </h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Assine nossa newsletter e fique por dentro das últimas tendências e dicas do mercado de energia solar
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                        />
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            Assinar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;