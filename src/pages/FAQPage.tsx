import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail } from 'lucide-react';
import HelpSection from '@/components/sections/HelpSection';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    {
      title: "Sobre a Plataforma",
      icon: HelpCircle,
      faqs: [
        {
          question: "O que é a Compare Solar?",
          answer: "A Compare Solar é a maior plataforma do Brasil para conectar consumidores às melhores empresas de energia solar. Oferecemos um ambiente seguro e transparente onde você pode pesquisar, comparar e avaliar empresas do setor solar."
        },
        {
          question: "A plataforma é gratuita?",
          answer: "Sim! Nossa plataforma é 100% gratuita para consumidores. Você pode pesquisar empresas, comparar preços, ler avaliações e entrar em contato sem nenhum custo."
        },
        {
          question: "Como vocês ganham dinheiro?",
          answer: "Cobramos uma taxa das empresas parceiras pelos leads qualificados que enviamos. Isso nos permite manter a plataforma gratuita para os consumidores."
        },
        {
          question: "Posso usar a plataforma em todo o Brasil?",
          answer: "Sim! Temos empresas parceiras em todos os estados brasileiros. Nossa cobertura é nacional e estamos sempre expandindo nossa rede."
        }
      ]
    },
    {
      title: "Empresas e Verificação",
      icon: Search,
      faqs: [
        {
          question: "Como vocês verificam as empresas?",
          answer: "Realizamos um processo rigoroso de verificação que inclui: análise de documentação legal, verificação de certificações (CREA, INMETRO), análise do histórico de projetos, verificação de referências de clientes e monitoramento contínuo de avaliações."
        },
        {
          question: "Todas as empresas são confiáveis?",
          answer: "Trabalhamos apenas com empresas que passaram pelo nosso processo de verificação. No entanto, recomendamos sempre verificar as avaliações, solicitar referências e comparar múltiplas opções antes de tomar uma decisão."
        },
        {
          question: "O que fazer se tiver problemas com uma empresa?",
          answer: "Entre em contato conosco imediatamente. Temos uma equipe dedicada para mediar conflitos e ajudar a resolver problemas. Também removemos empresas que não mantêm nossos padrões de qualidade."
        },
        {
          question: "Como posso avaliar uma empresa?",
          answer: "Após contratar uma empresa através da nossa plataforma, você receberá um convite para avaliar o serviço. Suas avaliações ajudam outros consumidores a tomar decisões informadas."
        }
      ]
    },
    {
      title: "Orçamentos e Contratação",
      icon: MessageCircle,
      faqs: [
        {
          question: "Como solicito orçamentos?",
          answer: "Você pode solicitar orçamentos diretamente através da plataforma. Preencha o formulário com suas informações e necessidades, e as empresas selecionadas entrarão em contato com você."
        },
        {
          question: "Quantos orçamentos posso solicitar?",
          answer: "Recomendamos solicitar entre 3 a 5 orçamentos para ter uma boa base de comparação. Não há limite na nossa plataforma, mas muitos orçamentos podem ser difíceis de gerenciar."
        },
        {
          question: "Os orçamentos são gratuitos?",
          answer: "Sim, a maioria das empresas oferece orçamentos gratuitos. Algumas podem cobrar uma taxa para visitas técnicas mais detalhadas, mas isso será informado previamente."
        },
        {
          question: "Quanto tempo demora para receber orçamentos?",
          answer: "Geralmente as empresas entram em contato em até 24-48 horas. Orçamentos detalhados podem levar de 3 a 7 dias úteis, dependendo da complexidade do projeto."
        }
      ]
    },
    {
      title: "Energia Solar",
      icon: HelpCircle,
      faqs: [
        {
          question: "Energia solar funciona em dias nublados?",
          answer: "Sim! Os painéis solares funcionam mesmo em dias nublados, embora com menor eficiência. Eles captam luz difusa e ainda geram energia. O sistema é dimensionado considerando as condições climáticas da região."
        },
        {
          question: "Quanto posso economizar com energia solar?",
          answer: "A economia varia conforme o consumo, localização e tamanho do sistema. Em média, é possível reduzir a conta de luz em 70% a 95%. Use nossa calculadora para uma estimativa personalizada."
        },
        {
          question: "Qual o tempo de retorno do investimento?",
          answer: "O payback médio no Brasil é de 4 a 7 anos, dependendo da região, consumo e tipo de sistema. Após esse período, a energia gerada é praticamente gratuita por mais 20+ anos."
        },
        {
          question: "Preciso de licenças para instalar?",
          answer: "A empresa instaladora cuida de todas as licenças e homologações necessárias, incluindo aprovação na concessionária de energia e órgãos municipais."
        }
      ]
    },
    {
      title: "Suporte e Contato",
      icon: Mail,
      faqs: [
        {
          question: "Como entro em contato com o suporte?",
          answer: "Você pode nos contatar através do e-mail suporte@comparesolar.com.br, telefone (11) 4004-1234, ou através do chat online disponível no site."
        },
        {
          question: "Qual o horário de atendimento?",
          answer: "Nosso suporte funciona de segunda a sexta, das 8h às 18h. O chat online e e-mail são monitorados também aos sábados das 9h às 14h."
        },
        {
          question: "Vocês oferecem suporte após a instalação?",
          answer: "Oferecemos suporte para questões relacionadas à plataforma e mediação com empresas. Para suporte técnico do sistema solar, você deve contatar diretamente a empresa instaladora."
        },
        {
          question: "Posso cancelar um orçamento solicitado?",
          answer: "Sim, você pode cancelar a qualquer momento. Entre em contato conosco e informaremos as empresas sobre o cancelamento."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const itemId = categoryIndex * 1000 + faqIndex;
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Encontre respostas para as dúvidas mais comuns sobre nossa plataforma 
              e energia solar
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por pergunta ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {searchTerm && (
            <div className="mb-8">
              <p className="text-gray-600">
                {filteredCategories.reduce((total, cat) => total + cat.faqs.length, 0)} resultado(s) 
                encontrado(s) para "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Icon className="text-blue-600 w-6 h-6" />
                      <h2 className="text-xl font-bold text-gray-900">
                        {category.title}
                      </h2>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {category.faqs.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {category.faqs.map((faq, faqIndex) => {
                      const itemId = categoryIndex * 1000 + faqIndex;
                      const isOpen = openItems.includes(itemId);
                      
                      return (
                        <div key={faqIndex}>
                          <button
                            onClick={() => toggleItem(categoryIndex, faqIndex)}
                            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                {faq.question}
                              </h3>
                              {isOpen ? (
                                <ChevronUp className="text-blue-600 w-5 h-5 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="text-gray-400 w-5 h-5 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                                <p className="text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhuma pergunta encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                Tente usar outras palavras-chave ou entre em contato conosco
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver todas as perguntas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <HelpSection 
        title="Não encontrou sua resposta?"
        subtitle="Nossa equipe está pronta para ajudar você com qualquer dúvida sobre energia solar e nossa plataforma."
        showContactForm={true}
        variant="default"
      />
    </div>
  );
};

export default FAQPage;