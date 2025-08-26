import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, MessageCircle, Tag } from 'lucide-react';

// Mock data para o artigo (em uma aplicação real, viria de uma API)
const mockArticle = {
  id: 1,
  title: 'Como Escolher a Melhor Empresa de Energia Solar em 2024',
  excerpt: 'Guia completo com dicas essenciais para escolher a empresa ideal para seu projeto de energia solar.',
  content: `
    <h2>Introdução</h2>
    <p>Escolher a empresa certa para instalar seu sistema de energia solar é uma das decisões mais importantes do processo. Com o crescimento do mercado solar no Brasil, surgiram muitas opções, mas nem todas oferecem a mesma qualidade de serviço.</p>
    
    <h2>1. Verifique as Certificações e Licenças</h2>
    <p>Uma empresa confiável deve possuir todas as certificações necessárias:</p>
    <ul>
      <li>Registro no CREA (Conselho Regional de Engenharia e Agronomia)</li>
      <li>Certificação INMETRO para os equipamentos</li>
      <li>Licenças municipais e estaduais</li>
      <li>Certificações dos fabricantes de equipamentos</li>
    </ul>
    
    <h2>2. Analise o Portfólio e Experiência</h2>
    <p>Procure empresas com histórico comprovado:</p>
    <ul>
      <li>Tempo de atuação no mercado solar</li>
      <li>Número de projetos realizados</li>
      <li>Tipos de instalações (residencial, comercial, industrial)</li>
      <li>Referências de clientes anteriores</li>
    </ul>
    
    <h2>3. Qualidade dos Equipamentos</h2>
    <p>Os equipamentos são fundamentais para o desempenho do sistema:</p>
    <ul>
      <li>Painéis solares de marcas reconhecidas</li>
      <li>Inversores com boa garantia</li>
      <li>Estruturas de fixação adequadas</li>
      <li>Certificações INMETRO</li>
    </ul>
    
    <h2>4. Serviços Pós-Venda</h2>
    <p>O relacionamento não termina na instalação:</p>
    <ul>
      <li>Garantia dos equipamentos e instalação</li>
      <li>Monitoramento do sistema</li>
      <li>Manutenção preventiva e corretiva</li>
      <li>Suporte técnico</li>
    </ul>
    
    <h2>5. Transparência nos Orçamentos</h2>
    <p>Uma boa empresa deve fornecer:</p>
    <ul>
      <li>Orçamento detalhado e claro</li>
      <li>Especificações técnicas completas</li>
      <li>Cronograma de instalação</li>
      <li>Condições de pagamento</li>
    </ul>
    
    <h2>Conclusão</h2>
    <p>Investir tempo na escolha da empresa certa pode fazer toda a diferença no sucesso do seu projeto solar. Use essas dicas para avaliar suas opções e tomar a melhor decisão para seu investimento em energia limpa.</p>
  `,
  author: 'João Silva',
  publishedAt: '2024-01-15',
  readTime: '8 min',
  category: 'Guias',
  tags: ['energia solar', 'empresas', 'dicas', 'guia'],
  image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop',
  likes: 42,
  comments: 8
};

const relatedArticles = [
  {
    id: 2,
    title: 'Tendências do Mercado Solar Brasileiro para 2024',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop',
    category: 'Mercado',
    readTime: '6 min'
  },
  {
    id: 3,
    title: 'Financiamento Solar: Opções e Como Conseguir',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
    category: 'Financiamento',
    readTime: '10 min'
  },
  {
    id: 4,
    title: 'Manutenção de Sistemas Solares: O Que Você Precisa Saber',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=200&fit=crop',
    category: 'Manutenção',
    readTime: '7 min'
  }
];

const BlogArticlePage = () => {
  const { id } = useParams();
  const article = mockArticle;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Em uma aplicação real, aqui faria a busca do artigo pela API
    // setArticle(fetchArticleById(id));
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Em uma aplicação real, aqui faria a requisição para a API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{article.likes + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar
              </button>
            </div>
          </div>
          
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Social Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Curtido' : 'Curtir'} ({article.likes + (isLiked ? 1 : 0)})
                </button>
                
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  <span>{article.comments} comentários</span>
                </div>
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Artigos Relacionados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((relatedArticle) => (
            <Link
              key={relatedArticle.id}
              to={`/blog/${relatedArticle.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={relatedArticle.image}
                alt={relatedArticle.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {relatedArticle.category}
                  </span>
                  <span>{relatedArticle.readTime}</span>
                </div>
                <h4 className="font-semibold text-gray-900 line-clamp-2">
                  {relatedArticle.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogArticlePage;