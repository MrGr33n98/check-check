import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CategoryHero from '@/components/ui/category-hero';
import { CompanyCard } from '@/components/company/CompanyCard';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import apiService, { Category, Provider } from '@/services/api';
import { getPlaceholderImage } from '@/utils/imageFallback';

// Interface para os filtros de busca (copiado de SearchPage.tsx)
interface SearchFilters {
  query: string;
  location: string;
  radius: number;
  priceRange: [number, number];
  rating: number;
  ratings: number[];
  certifications: string[];
  services: string[];
  experience: string[];
  availability: string;
  deviceTarget?: string;
}

// Interface para empresa (formato do frontend, para CompanyCard)
interface CompanyForCard {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: string;
  services: string[];
  certifications: string[];
  phone: string;
  website: string;
  description: string;
  image: string; // This is the logo_url from backend
  bannerImage?: string; // This is the banner_image_url from backend
  foundedYear?: number;
  installed_capacity_mw?: number;
  specialties?: string[];
  verified?: boolean;
  price: number;
  premium_effect_active?: boolean;
}

function EnhancedCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [companies, setCompanies] = useState<CompanyForCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null); // New state for filters
  const [totalCompanies, setTotalCompanies] = useState(0); // To pass to AdvancedSearch

  // Helper function to map Provider to CompanyForCard
  const mapProviderToCompany = useCallback((provider: Provider): CompanyForCard => {
    const currentYear = new Date().getFullYear();
    const yearsInBusiness = provider.foundation_year ? currentYear - provider.foundation_year : 0;
    let experience = 'N/A';
    if (yearsInBusiness >= 10) experience = '10+ anos';
    else if (yearsInBusiness >= 5) experience = '5-10 anos';
    else if (yearsInBusiness >= 2) experience = '2-5 anos';
    else if (yearsInBusiness > 0) experience = '<2 anos';

    const services = provider.tags.filter(tag => tag.startsWith('service:')).map(tag => tag.replace('service:', ''));
    const certifications = provider.tags.filter(tag => tag.startsWith('cert:')).map(tag => tag.replace('cert:', ''));

    return {
      id: provider.id,
      name: provider.name,
      location: provider.address || provider.country || 'Brasil',
      rating: provider.rating || 0,
      reviewCount: provider.review_count || 0,
      experience: experience,
      services: services.length > 0 ? services : ['Não especificado'],
      certifications: certifications.length > 0 ? certifications : ['Não especificado'],
      phone: provider.phone || 'N/A',
      website: provider.social_links && provider.social_links.length > 0 ? provider.social_links[0] : 'N/A',
      description: provider.description || provider.short_description || 'N/A',
      image: provider.logo_url || getPlaceholderImage(300, 200), // Fallback logo
      bannerImage: provider.banner_image_url || undefined,
      foundedYear: provider.foundation_year,
      installed_capacity_mw: provider.installed_capacity_mw,
      specialties: provider.specialties,
      verified: provider.status === 'active' && provider.premium, // Example logic for verified
      price: provider.price || 0,
      premium_effect_active: provider.premium_effect_active, // New field
    };
  }, []);

  // Handlers for search and filter
  const handleSearch = useCallback(async (filters: SearchFilters) => {
    setCurrentFilters(filters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setCurrentFilters(null);
  }, []);

  const lastReqId = useRef(0);
  const filtersKey = JSON.stringify(currentFilters);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setCategory(null);
      setCompanies([]);
      return;
    }

    const reqId = ++lastReqId.current;
    const controller = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);

      try {
        const [fetchedCategory, providersResponse] = await Promise.all([
          apiService.getCategoryBySlug(slug, controller.signal),
          apiService.getProviders({
            category_slug: slug,
            
            
            
            
            }, controller.signal)
        ]);

        if (reqId !== lastReqId.current) {
          return;
        }

        setError(null);

        if (fetchedCategory) {
          setCategory(fetchedCategory);
          document.title = `${fetchedCategory.name} | SolarFinder`;
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          if (fetchedCategory.description) {
            metaDescription.setAttribute('content', fetchedCategory.description);
          }
        } else {
          setError('Categoria não encontrada');
          setCategory(null);
        }

        if (providersResponse) {
          setCompanies(providersResponse.providers.map(mapProviderToCompany));
          setTotalCompanies(providersResponse.total);
        }
        setLoading(false);

      } catch (err: unknown) {
        if ((err instanceof DOMException && err.name === 'AbortError') || (err instanceof Error && 'code' in err && err.code === 'ERR_CANCELED')) {
          if (reqId === lastReqId.current) {
            setLoading(false);
          }
          return Promise.resolve(); // Explicitly return a resolved promise
        }

        if (reqId === lastReqId.current) {
          console.error('Falha ao carregar categoria/provedores:', err);
          setError('Falha ao carregar dados. Tente novamente.');
          setCategory(null);
          setCompanies([]);
          setLoading(false);
        }
      }
    };

    (async () => {
      try {
        await fetchData();
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error("Unexpected error in useEffect's outer catch:", error);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [slug, filtersKey, mapProviderToCompany]);



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
        title={category.name}
        subtitle={category.description || `Soluções especializadas em ${category.name.toLowerCase()}.`}
        countBadge={totalCompanies > 0 ? `${totalCompanies} empresas encontradas` : 'Nenhuma empresa encontrada'}
        backgroundImageUrl={category.banner_image_url}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar com filtros */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <AdvancedSearch
                onSearch={handleSearch}
                onClear={handleClearFilters}
                isLoading={loading}
                resultsCount={totalCompanies}
              />
            </div>
          </aside>

          {/* Lista de resultados */}
          <main className="lg:col-span-9 space-y-6">
            {/* Companies Section */}
            <section>
              {Array.isArray(companies) && companies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>
              ) : (
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
              )}
            </section>
          </main>
        </div>
      </div>




    </div>
  );
}

export default EnhancedCategoryPage;
