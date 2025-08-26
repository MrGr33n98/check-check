import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, BatteryCharging, Users, BookOpen, Zap, Leaf, Globe, Rocket, Lightbulb, DollarSign, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EducationalContent from '@/components/ui/educational-content';
import PopularCategories from '@/components/ui/popular-categories';
import CategoryHero from '@/components/ui/category-hero';
import apiService, { Category } from '@/services/api';

interface Solution {
  id: number;
  name: string;
  company: string;
  description?: string;
  rating?: number;
  slug?: string;
  provider?: Provider;
}

interface Provider {
  id: number;
  name: string;
  short_description?: string;
  country?: string;
  status?: string;
}

// Mock data for popular categories (in case API is not available)
const popularCategories = [
  { id: 1, name: 'Geração Distribuída', slug: 'geracao-distribuida', icon: Zap },
  { id: 2, name: 'Eficiência Energética', slug: 'eficiencia', icon: Leaf },
  { id: 3, name: 'Sistemas Off-Grid', slug: 'off-grid', icon: Globe },
  { id: 4, name: 'Inovação Tecnológica', slug: 'inovacao', icon: Rocket },
];

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

  // Get educational content based on category
  const getEducationalContent = () => {
    if (!category) return null;
    
    switch (category.slug) {
      case 'geracao-distribuida':
        return {
          title: "O que é Geração Distribuída?",
          description: "Entenda os benefícios e funcionamento dos sistemas de geração distribuída",
          content: (
            <>
              <p>
                A geração distribuída refere-se à produção de eletricidade próxima ao local de consumo, 
                diferentemente das grandes usinas centralizadas. Em sistemas solares, isso geralmente 
                significa painéis instalados em telhados residenciais ou comerciais.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Benefícios principais:</h3>
              <ul className="space-y-2">
                <li>✅ Redução da conta de luz</li>
                <li>✅ Menos perdas na transmissão</li>
                <li>✅ Maior resiliência do sistema elétrico</li>
                <li>✅ Valorização imobiliária</li>
                <li>✅ Contribuição para a matriz energética limpa</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tecnologias disponíveis:</h3>
              <p>
                Os sistemas de geração distribuída incluem painéis fotovoltaicos monocristalinos, 
                policristalinos e bifaciais, inversores string e microinversores, além de sistemas 
                de monitoramento inteligente.
              </p>
            </>
          )
        };
      
      case 'armazenamento':
        return {
          title: "O que é Armazenamento de Energia?",
          description: "Entenda a importância dos sistemas de armazenamento na transição energética",
          content: (
            <>
              <p>
                Os sistemas de armazenamento de energia solar permitem acumular a eletricidade 
                gerada pelos painéis fotovoltaicos durante o dia para uso posterior, especialmente 
                à noite ou em períodos de baixa geração.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Benefícios principais:</h3>
              <ul className="space-y-2">
                <li>✅ Maior independência energética</li>
                <li>✅ Redução da conta de luz</li>
                <li>✅ Energia disponível 24 horas por dia</li>
                <li>✅ Aumento do valor do imóvel</li>
                <li>✅ Contribuição para a sustentabilidade</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tecnologias disponíveis:</h3>
              <p>
                As principais tecnologias de armazenamento incluem baterias de íon-lítio, estações 
                de armazenamento modular e sistemas híbridos que combinam diferentes fontes de energia.
              </p>
            </>
          )
        };
      
      case 'off-grid':
        return {
          title: "O que é Energia Off-Grid?",
          description: "Soluções energéticas independentes para áreas remotas",
          content: (
            <>
              <p>
                Sistemas off-grid são soluções energéticas independentes que não se conectam à 
                rede elétrica convencional. Ideais para áreas remotas, propriedades rurais ou 
                aplicações específicas onde o acesso à rede é difícil ou economicamente inviável.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Benefícios principais:</h3>
              <ul className="space-y-2">
                <li>✅ Independência total da rede elétrica</li>
                <li>✅ Solução para áreas remotas</li>
                <li>✅ Menor impacto ambiental</li>
                <li>✅ Controle total sobre a geração</li>
                <li>✅ Segurança energética</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Componentes essenciais:</h3>
              <p>
                Os sistemas off-grid incluem painéis solares, baterias de armazenamento, controladores 
                de carga, inversores e, em alguns casos, geradores auxiliares para backup.
              </p>
            </>
          )
        };
      
      default:
        return {
          title: `Sobre ${category.name}`,
          description: `Entenda mais sobre ${category.name}`,
          content: (
            <>
              <p>
                {category.description}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Importância do setor:</h3>
              <ul className="space-y-2">
                <li>✅ Tecnologia em constante evolução</li>
                <li>✅ Redução significativa de custos</li>
                <li>✅ Impacto positivo no meio ambiente</li>
                <li>✅ Geração de empregos qualificados</li>
                <li>✅ Contribuição para a matriz energética nacional</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Considerações importantes:</h3>
              <p>
                O setor de energia solar está em constante evolução, com novas tecnologias e 
                soluções surgindo regularmente. É importante trabalhar com empresas qualificadas 
                e certificadas para garantir a segurança e eficiência do sistema.
              </p>
            </>
          )
        };
    }
  };

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

  const educationalContent = getEducationalContent();

  // Get appropriate icon for the hero section
  const getHeroIcon = () => {
    switch (category.slug) {
      case 'geracao-distribuida': return <Zap className="h-32 w-32 text-white" />;
      case 'usinas-solares': return <Lightbulb className="h-32 w-32 text-white" />;
      case 'armazenamento': return <BatteryCharging className="h-32 w-32 text-white" />;
      case 'off-grid': return <Globe className="h-32 w-32 text-white" />;
      case 'eficiencia': return <TrendingUp className="h-32 w-32 text-white" />;
      case 'financiamento': return <DollarSign className="h-32 w-32 text-white" />;
      case 'comunidades': return <Users className="h-32 w-32 text-white" />;
      case 'sustentabilidade': return <Shield className="h-32 w-32 text-white" />;
      case 'inovacao': return <Rocket className="h-32 w-32 text-white" />;
      default: return <Zap className="h-32 w-32 text-white" />;
    }
  };

  // Get appropriate corner icon for the hero section
  const getCornerIcon = () => {
    switch (category.slug) {
      case 'geracao-distribuida': return <Zap className="h-8 w-8 text-yellow-800" />;
      case 'usinas-solares': return <Lightbulb className="h-8 w-8 text-yellow-800" />;
      case 'armazenamento': return <BatteryCharging className="h-8 w-8 text-yellow-800" />;
      case 'off-grid': return <Globe className="h-8 w-8 text-yellow-800" />;
      case 'eficiencia': return <TrendingUp className="h-8 w-8 text-yellow-800" />;
      case 'financiamento': return <DollarSign className="h-8 w-8 text-yellow-800" />;
      case 'comunidades': return <Users className="h-8 w-8 text-yellow-800" />;
      case 'sustentabilidade': return <Shield className="h-8 w-8 text-yellow-800" />;
      case 'inovacao': return <Rocket className="h-8 w-8 text-yellow-800" />;
      default: return <Zap className="h-8 w-8 text-yellow-800" />;
    }
  };

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
        subtitle="Categoria em destaque"
        description={category.description || `Soluções especializadas em ${category.name.toLowerCase()}.`}
        primaryButtonText="Saiba mais sobre essa tecnologia"
        secondaryButtonText="Cadastrar minha empresa"
        onPrimaryClick={() => console.log('Learn more clicked')}
        onSecondaryClick={() => navigate('/empresa/cadastro')}
        icon={getHeroIcon()}
        cornerIcon={getCornerIcon()}
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
      {educationalContent && (
        <EducationalContent
          title={educationalContent.title}
          description={educationalContent.description}
          content={educationalContent.content}
          ctaText="Leia mais sobre essa tecnologia"
          onCtaClick={() => console.log('Navigate to full article')}
        />
      )}

      {/* Popular Categories Section */}
      <PopularCategories categories={popularCategories} />

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