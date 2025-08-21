import { useParams } from 'react-router-dom';
import SoftwareCard from '@/components/category/SoftwareCard';
import FilterBar from '@/components/category/FilterBar';
import SidebarStats from '@/components/category/SidebarStats';
import HighlightCard from '@/components/category/HighlightCard';
import Breadcrumbs from '@/components/category/Breadcrumbs';
import CategoryHeader from '@/components/category/CategoryHeader';
import LoadingSkeleton from '@/components/category/LoadingSkeleton';
import { useState, useEffect } from 'react';

// Mock data for companies in each category
const categories = [
  {
    id: 'geracao-distribuida',
    name: 'Geração Distribuída',
    description: 'Soluções para residências, comércios e indústrias que produzem sua própria energia solar',
    intro: 'A geração distribuída permite que consumidores se tornem produtores de energia. Este modelo descentralizado reduz perdas na transmissão e promove eficiência energética. Empresas especializadas desenvolvem soluções personalizadas para diferentes perfis de consumidores, desde sistemas residenciais até grandes instalações comerciais e industriais.',
    features: [
      'Redução significativa na conta de luz',
      'Valorização do imóvel',
      'Independência energética',
      'Contribuição para sustentabilidade',
      'Retorno sobre investimento em 5-7 anos'
    ],
    solutions: [
      {
        id: 1,
        name: 'SolarMax Pro',
        company: 'EnergiaTech',
        rating: 4.8,
        reviews: 124,
        description: 'Sistema completo de monitoramento e gestão para instalações residenciais e comerciais.',
        tags: ['Fácil de usar', 'Bom custo-benefício', 'Integração IoT'],
        isFeatured: true
      },
      {
        id: 2,
        name: 'EcoPower Manager',
        company: 'GreenSolutions',
        rating: 4.6,
        reviews: 98,
        description: 'Plataforma de otimização de desempenho para sistemas de médio e grande porte.',
        tags: ['Análise avançada', 'Suporte 24h', 'API aberta'],
        isFeatured: true
      },
      {
        id: 3,
        name: 'SunControl',
        company: 'SolarInnovate',
        rating: 4.7,
        reviews: 156,
        description: 'Solução de controle preditivo com inteligência artificial integrada.',
        tags: ['IA', 'Preventivo', 'Relatórios'],
        isFeatured: false
      },
      {
        id: 4,
        name: 'PowerGrid',
        company: 'EcoSystems',
        rating: 4.5,
        reviews: 87,
        description: 'Sistema modular para gestão de múltiplas unidades distribuídas.',
        tags: ['Modular', 'Escalável', 'Multiplataforma'],
        isFeatured: false
      },
      {
        id: 5,
        name: 'SolarSync',
        company: 'TechSolar',
        rating: 4.4,
        reviews: 65,
        description: 'Plataforma de sincronização com redes inteligentes e smart grids.',
        tags: ['Smart Grid', 'Automatização', 'Eficiência'],
        isFeatured: false
      }
    ],
    segments: [
      { name: 'Residencial', percentage: 45, color: 'bg-blue-500' },
      { name: 'Comercial', percentage: 35, color: 'bg-green-500' },
      { name: 'Industrial', percentage: 20, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'usinas-solares',
    name: 'Usinas Solares de Grande Porte',
    description: 'Construção, gestão e operação de fazendas solares',
    intro: 'As usinas solares de grande porte representam a escala industrial da energia fotovoltaica. Essas instalações alimentam o sistema elétrico nacional, contribuindo significativamente para a matriz energética limpa do país.',
    features: [
      'Grande capacidade de geração',
      'Economia de escala',
      'Integração com o SIN',
      'Investimento em infraestrutura',
      'Longa vida útil'
    ],
    solutions: [
      {
        id: 1,
        name: 'MegaSolar',
        company: 'SolarGiant',
        rating: 4.9,
        reviews: 42,
        description: 'Plataforma de gestão completa para usinas de grande porte.',
        tags: ['Big Data', 'Análise preditiva', 'Automatização'],
        isFeatured: true
      },
      {
        id: 2,
        name: 'FarmControl',
        company: 'AgriPower',
        rating: 4.7,
        reviews: 38,
        description: 'Sistema especializado para fazendas solares rurais.',
        tags: ['Rural', 'Monitoramento', 'Manutenção'],
        isFeatured: true
      }
    ],
    segments: [
      { name: 'Grandes usinas', percentage: 60, color: 'bg-blue-500' },
      { name: 'Parques solares', percentage: 30, color: 'bg-green-500' },
      { name: 'Cooperativas', percentage: 10, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'armazenamento',
    name: 'Armazenamento de Energia',
    description: 'Baterias residenciais, industriais e sistemas híbridos',
    intro: 'O armazenamento de energia acumula o excedente gerado durante o dia para consumo noturno. Esta tecnologia é valiosa para usuários que buscam maior autonomia energética.',
    features: [
      'Autonomia energética',
      'Redução de tarifas de ultrapassagem',
      'Backup em caso de falta de energia',
      'Otimização do autoconsumo',
      'Integração inteligente'
    ],
    solutions: [
      {
        id: 1,
        name: 'BatteryMax',
        company: 'PowerStorage',
        rating: 4.8,
        reviews: 112,
        description: 'Sistema de baterias inteligente com gestão preditiva.',
        tags: ['IA', 'Eficiente', 'Seguro'],
        isFeatured: true
      }
    ],
    segments: [
      { name: 'Residencial', percentage: 35, color: 'bg-blue-500' },
      { name: 'Comercial', percentage: 45, color: 'bg-green-500' },
      { name: 'Industrial', percentage: 20, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'off-grid',
    name: 'Energia Off-Grid',
    description: 'Soluções isoladas para áreas rurais ou sem acesso à rede elétrica',
    intro: 'A energia off-grid é a solução para comunidades e propriedades isoladas que não possuem acesso à rede elétrica convencional. Estes sistemas autônomos combinam painéis solares, baterias e controladores de carga.',
    features: [
      'Energia em áreas remotas',
      'Independência total',
      'Soluções personalizadas',
      'Impacto social positivo',
      'Baixo custo operacional'
    ],
    solutions: [],
    segments: [
      { name: 'Rural', percentage: 50, color: 'bg-blue-500' },
      { name: 'Comunidades', percentage: 30, color: 'bg-green-500' },
      { name: 'Telecom', percentage: 20, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'eficiencia',
    name: 'Eficiência Energética',
    description: 'Tecnologias e softwares para reduzir desperdício e otimizar consumo',
    intro: 'A eficiência energética foca em fazer mais com menos. Este setor engloba tecnologias de iluminação LED e equipamentos com alto padrão de eficiência até softwares avançados de monitoramento.',
    features: [
      'Redução imediata de custos',
      'Menor necessidade de geração',
      'Conforto e tecnologia',
      'Sustentabilidade corporativa',
      'Análise de consumo'
    ],
    solutions: [],
    segments: [
      { name: 'Comercial', percentage: 40, color: 'bg-blue-500' },
      { name: 'Industrial', percentage: 50, color: 'bg-green-500' },
      { name: 'Residencial', percentage: 10, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'financiamento',
    name: 'Financiamento e Crédito Solar',
    description: 'Modelos de leasing, crédito verde, consórcios solares',
    intro: 'O financiamento solar democratizou o acesso à energia fotovoltaica, eliminando a barreira do investimento inicial. Diversos modelos permitem implantação com entrada zero.',
    features: [
      'Acesso sem investimento inicial',
      'Fluxo de caixa positivo desde o início',
      'Proteção contra reajustes tarifários',
      'Soluções adaptadas ao perfil',
      'Isenções fiscais'
    ],
    solutions: [],
    segments: [
      { name: 'Residencial', percentage: 30, color: 'bg-blue-500' },
      { name: 'Comercial', percentage: 45, color: 'bg-green-500' },
      { name: 'Industrial', percentage: 25, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'comunidades',
    name: 'Comunidades de Energia',
    description: 'Modelos coletivos de geração e compartilhamento de energia solar',
    intro: 'As comunidades de energia permitem que múltiplos consumidores compartilhem os benefícios de um único empreendimento gerador. Este modelo é relevante para condomínios e cooperativas.',
    features: [
      'Economia de escala',
      'Acesso para perfis inviáveis individualmente',
      'Fortalecimento comunitário',
      'Redução de custos compartilhada',
      'Modelo cooperativo'
    ],
    solutions: [],
    segments: [
      { name: 'Condomínios', percentage: 40, color: 'bg-blue-500' },
      { name: 'Cooperativas', percentage: 35, color: 'bg-green-500' },
      { name: 'Comunidades', percentage: 25, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'sustentabilidade',
    name: 'Sustentabilidade e ESG',
    description: 'Certificações, relatórios de impacto ambiental e social',
    intro: 'A energia solar é essencial para estratégias ESG de empresas. A adoção de energia limpa é um compromisso com a responsabilidade socioambiental.',
    features: [
      'Alinhamento com ESG',
      'Certificações de sustentabilidade',
      'Relatórios de impacto',
      'Valorização no mercado',
      'Carbon footprint'
    ],
    solutions: [],
    segments: [
      { name: 'Corporativo', percentage: 60, color: 'bg-blue-500' },
      { name: 'Indústria', percentage: 30, color: 'bg-green-500' },
      { name: 'Comércio', percentage: 10, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'inovacao',
    name: 'Inovação e Novas Tecnologias',
    description: 'IoT, inteligência artificial, blockchain para energia',
    intro: 'A inovação impulsiona a evolução constante do setor solar. Novas tecnologias aumentam eficiência, reduzem custos e criam novos modelos de negócio.',
    features: [
      'Maior eficiência energética',
      'Monitoramento inteligente',
      'Novos modelos de negócio',
      'Tecnologia de ponta',
      'Conectividade total'
    ],
    solutions: [],
    segments: [
      { name: 'Startups', percentage: 35, color: 'bg-blue-500' },
      { name: 'Grandes empresas', percentage: 45, color: 'bg-green-500' },
      { name: 'Pesquisa', percentage: 20, color: 'bg-amber-500' }
    ]
  }
];

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(cat => cat.id === id);
  const [comparedItems, setComparedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCompareToggle = (solutionId: number) => {
    setComparedItems(prev => 
      prev.includes(solutionId)
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  const handleTryFree = () => {
    console.log('Try free clicked');
  };

  const handleRequestContact = () => {
    console.log('Request contact clicked');
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
          <p className="text-muted-foreground mb-6">A categoria solicitada não existe ou foi removida.</p>
          <button 
            onClick={() => window.history.back()}
            className="text-primary hover:text-primary/80 underline"
          >
            Voltar para a página anterior
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { name: 'Home', href: '/' },
          { name: 'Categorias', href: '/categorias' },
          { name: category.name, current: true }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Header */}
            <CategoryHeader 
              title={`${category.name} para energia solar`}
              description={category.intro}
              features={category.features}
            />

            {/* Highlights */}
            {category.solutions.filter(sol => sol.isFeatured).length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Destaques da Categoria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.solutions
                    .filter(sol => sol.isFeatured)
                    .map((solution) => (
                      <HighlightCard
                        key={solution.id}
                        id={solution.id}
                        name={solution.name}
                        company={solution.company}
                        rating={solution.rating}
                        reviews={solution.reviews}
                        description={solution.description}
                        onTryFree={handleTryFree}
                        onRequestContact={handleRequestContact}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Filter Bar */}
            <FilterBar />

            {/* Solutions List */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Soluções em {category.name}</h2>
              {category.solutions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {category.solutions.map((solution) => (
                    <SoftwareCard
                      key={solution.id}
                      id={solution.id}
                      name={solution.name}
                      company={solution.company}
                      rating={solution.rating}
                      reviews={solution.reviews}
                      description={solution.description}
                      tags={solution.tags}
                      isFeatured={solution.isFeatured}
                      onCompare={handleCompareToggle}
                      isCompared={comparedItems.includes(solution.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-background rounded-xl border border-gray-200">
                  <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma solução encontrada</h3>
                  <p className="text-muted-foreground mb-6">
                    Não há soluções cadastradas para esta categoria no momento.
                  </p>
                  <button 
                    onClick={() => window.history.back()}
                    className="text-primary hover:text-primary/80 underline"
                  >
                    Voltar para categorias
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <SidebarStats 
                categoryName={category.name}
                segments={category.segments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;