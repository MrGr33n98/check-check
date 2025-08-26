import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { ChevronLeft } from 'lucide-react'; // Assuming lucide-react is used for icons

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  featured?: boolean;
  solutions?: Solution[]; // Added
}

interface Solution {
  id: number;
  name: string;
  company: string; // Assuming this is the solution's company name
  description?: string;
  rating?: number;
  slug?: string;
  provider?: Provider; // Added
}

interface Provider {
  id: number;
  name: string;
  short_description?: string;
  country?: string;
  status?: string;
  // Add other provider fields as needed
}


function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!slug) {
        console.log('CategoryPage: No slug provided');
        setLoading(false);
        return;
      }

      console.log('CategoryPage: Fetching data for category slug:', slug);
      setLoading(true);
      setError(null);

      try {
        // First, let's check if we can reach the API
        console.log('CategoryPage: Attempting to fetch from http://localhost:3000/api/v1/categories/' + slug);
        
        const response = await fetch(`http://localhost:3000/api/v1/categories/${slug}`);
        console.log('CategoryPage: API response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log('CategoryPage: API error response:', errorText);
          throw new Error(`Categoria não encontrada. Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('CategoryPage: API response data:', data);
        
        if (isMounted) {
          setCategory(data);

          // SEO: Update document title
          document.title = `${data.name} | SolarFinder`;
          
          // SEO: Update meta description
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          if (data.description) {
            metaDescription.setAttribute('content', data.description);
          }
        }
      } catch (error: any) {
        console.error('CategoryPage: Error fetching category data:', error);
        if (isMounted) {
          setError(error.message);
          setCategory(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log('CategoryPage: Finished fetching data');
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    console.log('CategoryPage: Still loading, showing loading indicator');
    return <div className="container mx-auto px-4 py-8">Carregando categoria...</div>;
  }

  if (error) {
    console.log('CategoryPage: Error occurred:', error);
    return <div className="container mx-auto px-4 py-8 text-red-600">Erro: {error}</div>;
  }

  if (!category) {
    console.log('CategoryPage: No category found');
    return <div className="container mx-auto px-4 py-8 text-gray-600">Categoria não encontrada.</div>;
  }

  console.log('CategoryPage: Rendering category:', category);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs or Back Link */}
      <div className="mb-6">
        <Link to="/categorias" className="text-blue-600 hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Voltar para todas as categorias
        </Link>
      </div>

      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">{category.name}</h1>
      </header>
      <main>
        {category.description ? (
          <div className="prose max-w-none text-lg text-gray-700 mb-12">
            <p>{category.description}</p>
          </div>
        ) : (
          <p className="text-lg text-gray-500 mb-12">Nenhuma descrição disponível para esta categoria.</p>
        )}
        
        {/* Section for Associated Companies/Solutions */}
        <section className="mt-12 bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Empresas e Soluções nesta Categoria</h2>
          
          {category.solutions && category.solutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.solutions.map(solution => (
                <div key={solution.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{solution.name}</h3>
                  {solution.provider && (
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-medium">Empresa:</span> {solution.provider.name}
                      {solution.provider.country && ` (${solution.provider.country})`}
                    </p>
                  )}
                  {solution.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">{solution.description}</p>
                  )}
                  {solution.rating && (
                    <p className="text-gray-600 text-sm mt-2">Avaliação: {solution.rating}/5</p>
                  )}
                  {/* Link to solution or provider detail page */}
                  {solution.provider && (
                    <Link to={`/company/${solution.provider.id}`} className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium">
                      Ver detalhes da empresa &rarr;
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma solução ou empresa associada encontrada para esta categoria ainda.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default CategoryPage;

