import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Calendar, CheckCircle, XCircle, Newspaper, User, Tag } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  author: string;
  category: 'news' | 'guides' | 'case_studies' | 'industry' | 'tips';
  featured: boolean;
  created_at: string;
}

const ArticlesCrud: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockArticles: Article[] = [
      {
        id: 1,
        title: "Guia Completo sobre Energia Solar",
        slug: "guia-completo-sobre-energia-solar",
        excerpt: "Tudo o que você precisa saber sobre energia solar",
        content: "Conteúdo completo sobre energia solar...",
        status: "published",
        published_at: "2023-08-01T12:00:00Z",
        author: "Redator Solar",
        category: "guides",
        featured: true,
        created_at: "2023-07-20T15:45:00Z"
      },
      {
        id: 2,
        title: "5 Dicas para Economizar com Energia Solar",
        slug: "5-dicas-para-economizar-com-energia-solar",
        excerpt: "Dicas práticas para reduzir custos",
        content: "Conteúdo com dicas práticas...",
        status: "published",
        published_at: "2023-08-05T10:30:00Z",
        author: "Redator Solar",
        category: "tips",
        featured: false,
        created_at: "2023-08-01T09:15:00Z"
      },
      {
        id: 3,
        title: "Case Study: Instalação Residencial",
        slug: "case-study-instalacao-residencial",
        excerpt: "História de sucesso de cliente",
        content: "Detalhes completos do case study...",
        status: "published",
        published_at: "2023-08-10T14:20:00Z",
        author: "Redator Solar",
        category: "case_studies",
        featured: true,
        created_at: "2023-08-05T11:30:00Z"
      },
      {
        id: 4,
        title: "Novas Tecnologias no Mercado Solar",
        slug: "novas-tecnologias-no-mercado-solar",
        excerpt: "Inovações que estão chegando",
        content: "Conteúdo sobre novas tecnologias...",
        status: "draft",
        published_at: null,
        author: "Redator Solar",
        category: "industry",
        featured: false,
        created_at: "2023-08-15T16:45:00Z"
      }
    ];

    setArticles(mockArticles);
    setFilteredArticles(mockArticles);
    setLoading(false);
  }, []);

  // Filter articles based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm, articles]);

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedArticle) {
      setArticles(articles.filter(a => a.id !== selectedArticle.id));
      setFilteredArticles(filteredArticles.filter(a => a.id !== selectedArticle.id));
      setIsDeleteModalOpen(false);
      setSelectedArticle(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Não publicado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Rascunho';
      case 'published':
        return 'Publicado';
      case 'archived':
        return 'Arquivado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'news':
        return 'Notícias';
      case 'guides':
        return 'Guias';
      case 'case_studies':
        return 'Cases';
      case 'industry':
        return 'Indústria';
      case 'tips':
        return 'Dicas';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news':
        return 'bg-red-100 text-red-800';
      case 'guides':
        return 'bg-blue-100 text-blue-800';
      case 'case_studies':
        return 'bg-purple-100 text-purple-800';
      case 'industry':
        return 'bg-green-100 text-green-800';
      case 'tips':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Artigos</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setSelectedArticle(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Artigo
          </button>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredArticles.map((article) => (
            <li key={article.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <div className="h-12 w-12 rounded-md bg-orange-100 flex items-center justify-center">
                        <Newspaper className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                        {article.featured && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Destaque
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{article.excerpt}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                          {getStatusName(article.status)}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                          {getCategoryName(article.category)}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => window.open(`/artigo/${article.slug}`, '_blank')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(article)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(article)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit/Create Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedArticle ? 'Editar Artigo' : 'Novo Artigo'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <form className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedArticle?.title || ''}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                      Resumo
                    </label>
                    <textarea
                      id="excerpt"
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedArticle?.excerpt || ''}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      Conteúdo
                    </label>
                    <textarea
                      id="content"
                      rows={8}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedArticle?.content || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                      Autor
                    </label>
                    <input
                      type="text"
                      id="author"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedArticle?.author || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Categoria
                    </label>
                    <select
                      id="category"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedArticle?.category || 'news'}
                    >
                      <option value="news">Notícias</option>
                      <option value="guides">Guias</option>
                      <option value="case_studies">Cases</option>
                      <option value="industry">Indústria</option>
                      <option value="tips">Dicas</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedArticle?.status || 'draft'}
                    >
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Arquivado</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={selectedArticle?.featured}
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Artigo em Destaque
                    </label>
                  </div>
                  <div>
                    <label htmlFor="published_at" className="block text-sm font-medium text-gray-700">
                      Data de Publicação
                    </label>
                    <input
                      type="date"
                      id="published_at"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={selectedArticle?.published_at ? new Date(selectedArticle.published_at).toISOString().split('T')[0] : ''}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    {selectedArticle ? 'Atualizar' : 'Criar'} Artigo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Confirmar Exclusão
                </h3>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Tem certeza que deseja excluir o artigo <strong>{selectedArticle?.title}</strong>? 
                  Esta ação não pode ser desfeita.
                </p>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={confirmDelete}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesCrud;