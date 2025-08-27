import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EducationalContent from '@/components/ui/educational-content';
import PopularCategories from '@/components/ui/popular-categories';
import CategoryHero from '@/components/ui/category-hero';
import apiService, { Category } from '@/services/api';







function EnhancedCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Try to fetch the category from the API
        const fetchedCategory = await apiService.getCategoryBySlug(slug);
        
        if (fetchedCategory) {
          if (isMounted) {
            setCategory(fetchedCategory);
            
            // SEO: Update document title
            document.title = `${fetchedCategory.name} | SolarFinder`;
            
            // SEO: Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
              metaDescription = document.createElement('meta');
              metaDescription.setAttribute('name', 'description');
              document.head.appendChild(metaDescription);
            }
            if (fetchedCategory.description) {
              metaDescription.setAttribute('content', fetchedCategory.description);
            }
          }
        } else {
          if (isMounted) {
            setError('Categoria não encontrada');
            setCategory(null);
          }
        }
      } catch (error: any) {
        console.error('Error fetching category:', error);
        if (isMounted) {
          setError(error.message);
          setCategory(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug]);



  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Erro ao carregar categoria</h2>
          <p className="text-red-600">{error}</p>
          <Button 
            onClick={() => navigate('/categorias')} 
            className="mt-4"
            variant="outline"
          >
            Voltar para categorias
          </Button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Categoria não encontrada</h2>
          <p className="text-gray-600 mb-6">A categoria solicitada não está disponível.</p>
          <Button 
            onClick={() => navigate('/categorias')} 
            className="mt-4"
          >
            Explorar todas as categorias
          </Button>
        </div>
      </div>
    );
  }





  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          to="/categorias" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors w-fit"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Voltar para categorias</span>
        </Link>
      </div>

      {/* Hero Section */}
      <CategoryHero
        categoryName={category.name}
        categoryDescription={category.description || `Soluções especializadas em ${category.name.toLowerCase()}.`}
        companyCount={0}
      />

      {/* Status Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-dashed border-blue-200 bg-blue-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-gray-800">
                Ainda não há empresas listadas nesta categoria
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Seja o pioneiro! Cadastre sua empresa e ajude a construir esta comunidade.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/empresa/cadastro')}
                >
                  Cadastrar empresa
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/categorias')}
                >
                  Explorar outras categorias
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Educational Content */}
      <EducationalContent />

      {/* Popular Categories Section */}
      <PopularCategories />

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para fazer parte desta comunidade?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cadastre sua empresa de {category.name.toLowerCase()} e conecte-se com clientes interessados em soluções sustentáveis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50"
              onClick={() => navigate('/empresa/cadastro')}
            >
              Cadastrar empresa agora
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-blue-600"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Acessar recursos educacionais
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EnhancedCategoryPage;