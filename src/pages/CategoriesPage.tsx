import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCompanies } from '@/data/mockData';

// Category data with descriptions
const categories = [
  {
    id: 'geracao-distribuida',
    name: 'Geração Distribuída',
    shortDescription: 'Para residências, comércios e indústrias que produzem sua própria energia',
    longDescription: 'A geração distribuída representa uma revolução no setor energético, permitindo que consumidores de energia se tornem também produtores. Este modelo descentralizado de produção de energia solar possibilita a geração de eletricidade próxima ao ponto de consumo, reduzindo perdas na transmissão e promovendo maior eficiência do sistema elétrico. Empresas especializadas em geração distribuída desenvolvem soluções personalizadas para diferentes perfis de consumidores, desde sistemas residenciais em telhados até grandes instalações comerciais e industriais. A tecnologia fotovoltaica, principal fonte de geração distribuída, tem se mostrado cada vez mais acessível e eficiente, com equipamentos que garantem retorno sobre o investimento em 5 a 7 anos e vida útil superior a 25 anos.',
    companies: mockCompanies.slice(0, 3),
    benefits: [
      'Redução significativa na conta de luz',
      'Valorização do imóvel',
      'Independência energética',
      'Contribuição para sustentabilidade'
    ]
  },
  {
    id: 'usinas-solares',
    name: 'Usinas Solares de Grande Porte',
    shortDescription: 'Construção, gestão e operação de fazendas solares',
    longDescription: 'As usinas solares de grande porte representam a escala industrial da energia fotovoltaica, com capacidades que podem chegar a centenas de megawatts. Essas instalações são projetadas para alimentar o sistema elétrico nacional, contribuindo significativamente para a matriz energética limpa do país. A construção dessas fazendas solares envolve complexos processos de planejamento, desde a análise de irradiância solar até a obtenção de licenças ambientais e conexão com o sistema de transmissão. Empresas especializadas nesta área possuem expertise em desenvolvimento de projetos, obtenção de financiamento, construção e operação e manutenção de longo prazo. O modelo de negócio varia entre venda de energia através de leilões regulados e contratos de compra de energia (PPAs) com grandes consumidores.',
    companies: mockCompanies.slice(1, 4),
    benefits: [
      'Grande capacidade de geração',
      'Economia de escala',
      'Integração com o SIN',
      'Investimento em infraestrutura'
    ]
  },
  {
    id: 'armazenamento',
    name: 'Armazenamento de Energia',
    shortDescription: 'Baterias residenciais, industriais e sistemas híbridos',
    longDescription: 'O armazenamento de energia é a peça que faltava para tornar a energia solar verdadeiramente independente e confiável. Com sistemas de baterias, é possível acumular o excedente de energia gerado durante o dia para consumo noturno ou em períodos de baixa irradiação. Esta tecnologia é especialmente valiosa para usuários que buscam maior autonomia energética ou que estão sujeitos à tarifa de ultrapassagem de demanda. O mercado oferece soluções desde baterias residenciais de 5kWh a sistemas industriais de múltiplos megawatts. A integração com inteligência artificial permite otimizar o uso da energia armazenada, considerando preços variáveis da tarifa de energia e padrões de consumo.',
    companies: mockCompanies.slice(2, 5),
    benefits: [
      'Autonomia energética',
      'Redução de tarifas de ultrapassagem',
      'Backup em caso de falta de energia',
      'Otimização do autoconsumo'
    ]
  },
  {
    id: 'off-grid',
    name: 'Energia Off-Grid',
    shortDescription: 'Soluções isoladas para áreas rurais ou sem acesso à rede elétrica',
    longDescription: 'A energia off-grid é a solução para comunidades e propriedades isoladas que não possuem acesso à rede elétrica convencional. Estes sistemas autônomos combinam painéis solares, baterias e controladores de carga para fornecer eletricidade completa em locais remotos. A aplicação mais comum é em propriedades rurais, acampamentos, sistemas de irrigação e telecomunicações em áreas remotas. A tecnologia evoluiu significativamente nos últimos anos, com equipamentos mais eficientes, duradouros e acessíveis. Além disso, sistemas híbridos que combinam energia solar com geradores a diesel ou eólicos aumentam a confiabilidade do fornecimento. O impacto social destas soluções é imenso, proporcionando qualidade de vida, acesso à educação e oportunidades econômicas para comunidades antes isoladas energeticamente.',
    companies: mockCompanies.slice(3, 6),
    benefits: [
      'Energia em áreas remotas',
      'Independência total',
      'Soluções personalizadas',
      'Impacto social positivo'
    ]
  },
  {
    id: 'eficiencia',
    name: 'Eficiência Energética',
    shortDescription: 'Tecnologias e softwares para reduzir desperdício e otimizar consumo',
    longDescription: 'A eficiência energética é a base de uma matriz energética sustentável, focando em fazer mais com menos. Este setor engloba desde tecnologias de iluminação LED e equipamentos com alto padrão de eficiência até softwares avançados de monitoramento e gestão de consumo. A combinação de energia solar com medidas de eficiência energética potencializa os benefícios econômicos e ambientais. Soluções inteligentes como sistemas de gestão predial integrada (BMS), medidores inteligentes e análise de big data permitem identificar desperdícios, prever padrões de consumo e otimizar o uso da energia gerada. Empresas especializadas nesta área ajudam consumidores a reduzirem seu consumo em 20% a 50% antes mesmo de instalar um sistema solar.',
    companies: mockCompanies.slice(4, 7),
    benefits: [
      'Redução imediata de custos',
      'Menor necessidade de geração',
      'Conforto e tecnologia',
      'Sustentabilidade corporativa'
    ]
  },
  {
    id: 'financiamento',
    name: 'Financiamento e Crédito Solar',
    shortDescription: 'Modelos de leasing, crédito verde, consórcios solares',
    longDescription: 'O financiamento solar democratizou o acesso à energia fotovoltaica, eliminando a barreira do investimento inicial. Diversos modelos de negócio permitem a implantação de sistemas solares com entrada zero, pagando apenas pela energia gerada ou através de linhas de financiamento especializadas. O crédito verde, linhas de financiamento com taxas diferenciadas, leasing solar e contratos de terceirização de geração (PPA) são as principais modalidades. Empresas especializadas desenvolvem soluções financeiras inovadoras, adaptadas ao perfil de cada cliente, seja residencial, comercial ou industrial. A análise de viabilidade financeira considera não apenas o custo da energia, mas também benefícios como isenções fiscais, valorização imobiliária e hedge contra reajustes tarifários.',
    companies: mockCompanies.slice(5, 8),
    benefits: [
      'Acesso sem investimento inicial',
      'Fluxo de caixa positivo desde o início',
      'Proteção contra reajustes tarifários',
      'Soluções adaptadas ao perfil'
    ]
  },
  {
    id: 'comunidades',
    name: 'Comunidades de Energia',
    shortDescription: 'Modelos coletivos de geração e compartilhamento de energia solar',
    longDescription: 'As comunidades de energia representam o futuro da energia solar no Brasil, permitindo que múltiplos consumidores compartilhem os benefícios de um único empreendimento gerador. Este modelo é especialmente relevante para condomínios, associações de bairros, cooperativas e pequenos municípios que desejam investir em energia limpa coletivamente. A legislação específica permite a comercialização de energia entre consumidores próximos, com compensação individualizada. As empresas especializadas neste setor desenvolvem plataformas tecnológicas para gestão compartilhada, sistemas de medição avançados e contratos juridicamente seguros. Esta abordagem reduz custos através da economia de escala e amplia o acesso à energia solar para perfis que individualmente não teriam viabilidade técnica ou econômica.',
    companies: mockCompanies.slice(6, 9),
    benefits: [
      'Economia de escala',
      'Acesso para perfis inviáveis individualmente',
      'Fortalecimento comunitário',
      'Redução de custos compartilhada'
    ]
  },
  {
    id: 'sustentabilidade',
    name: 'Sustentabilidade e ESG',
    shortDescription: 'Certificações, relatórios de impacto ambiental e social',
    longDescription: 'A energia solar é um componente essencial das estratégias ESG (Environmental, Social, Governance) de empresas de todos os portes. A adoção de energia limpa não é mais apenas uma decisão técnica ou econômica, mas um compromisso com a responsabilidade socioambiental. Empresas especializadas nesta área oferecem soluções que vão além da simples instalação de painéis solares, incluindo certificações ambientais, relatórios de pegada de carbono, análise de impacto social e alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU. O mercado de carbono, com créditos de carbono e compensações, adiciona uma nova dimensão de valor econômico à sustentabilidade. Investidores e consumidores cada vez mais exigem transparência e mensuração de impacto, tornando essencial o acompanhamento e reporte de indicadores sustentáveis.',
    companies: mockCompanies.slice(7, 10),
    benefits: [
      'Alinhamento com ESG',
      'Certificações de sustentabilidade',
      'Relatórios de impacto',
      'Valorização no mercado'
    ]
  },
  {
    id: 'inovacao',
    name: 'Inovação e Novas Tecnologias',
    shortDescription: 'IoT, inteligência artificial, blockchain para energia',
    longDescription: 'A inovação é o motor que impulsiona a evolução constante do setor solar, com novas tecnologias aumentando eficiência, reduzindo custos e criando novos modelos de negócio. A Internet das Coisas (IoT) conecta equipamentos, permitindo monitoramento em tempo real e manutenção preditiva. Inteligência artificial otimiza a geração e consumo de energia, prevê falhas e maximiza o retorno sobre o investimento. Blockchain traz transparência e segurança para contratos de energia entre pares e comercialização de créditos de carbono. Novas tecnologias como bifacialidade, trackers solares, células de perovskita e integração fotovoltaica em edifícios (BIPV) prometem aumentar ainda mais a eficiência dos sistemas. Empresas especializadas em inovação atuam na vanguarda desta transformação, desenvolvendo soluções que moldarão o futuro da energia.',
    companies: mockCompanies.slice(8, 11),
    benefits: [
      'Maior eficiência energética',
      'Monitoramento inteligente',
      'Novos modelos de negócio',
      'Tecnologia de ponta'
    ]
  }
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Categorias do Setor Solar
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Explore todas as áreas do mercado de energia solar e descubra as soluções ideais para suas necessidades
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto max-w-6xl py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  <Link 
                    to={`/categoria/${category.id}`} 
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {category.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground mb-4">
                  {category.shortDescription}
                </p>
                
                {/* Top Companies for Category */}
                <div className="mb-4">
                  <h3 className="font-semibold text-sm mb-2">Empresas Destaque:</h3>
                  <div className="space-y-2">
                    {category.companies.map((company) => (
                      <div key={company.id} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">
                            {company.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm truncate">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <Link to={`/categoria/${category.id}`}>
                    Explorar Categoria
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-muted/50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mercado Solar no Brasil: Um Setor em Expansão
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              O setor de energia solar no Brasil está em plena expansão, impulsionado por condições naturais favoráveis, 
              incentivos governamentais e redução significativa de custos. Com mais de 5.500 horas de sol por ano em grande 
              parte do território nacional, o Brasil possui um dos maiores potenciais solares do mundo.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Crescimento Acelerado</h3>
            <p className="mb-6">
              Nos últimos anos, o mercado solar brasileiro tem apresentado um dos maiores crescimentos globais, 
              com taxa de expansão anual superando 100% em diversos segmentos. Este crescimento é resultado da 
              maturidade regulatória, desenvolvimento tecnológico e conscientização crescente sobre sustentabilidade.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Diversificação de Soluções</h3>
            <p className="mb-6">
              A energia solar evoluiu de uma tecnologia específica para um ecossistema completo de soluções integradas. 
              Cada categoria atende a um nicho específico do mercado, permitindo soluções personalizadas para diferentes 
              perfis de consumidores e aplicações.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Impacto Econômico e Social</h3>
            <p>
              Além dos benefícios ambientais, o setor solar tem gerado milhares de empregos diretos e indiretos, 
              impulsionado investimentos em infraestrutura e promovido inclusão energética em comunidades remotas. 
              A distribuição geográfica das instalações solares está democratizando o acesso à energia limpa em todo o país.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;