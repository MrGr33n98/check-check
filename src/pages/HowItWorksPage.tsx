import { Search, Star, Phone, Zap, CheckCircle, ArrowRight, Users, Shield, Award } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Busque e Compare",
      description: "Use nossa busca avançada para encontrar empresas de energia solar na sua região. Compare preços, avaliações e serviços oferecidos.",
      details: [
        "Busca por localização e especialidade",
        "Filtros avançados por preço e certificações",
        "Comparação lado a lado de empresas",
        "Informações detalhadas de cada empresa"
      ]
    },
    {
      number: "02",
      icon: Star,
      title: "Avalie e Escolha",
      description: "Veja avaliações reais de outros clientes e escolha a empresa que melhor atende suas necessidades e orçamento.",
      details: [
        "Avaliações verificadas de clientes reais",
        "Sistema de estrelas e comentários detalhados",
        "Histórico de projetos realizados",
        "Certificações e qualificações"
      ]
    },
    {
      number: "03",
      icon: Phone,
      title: "Entre em Contato",
      description: "Conecte-se diretamente com as empresas selecionadas através da nossa plataforma para solicitar orçamentos.",
      details: [
        "Contato direto com as empresas",
        "Formulário de solicitação de orçamento",
        "Acompanhamento do processo",
        "Suporte durante toda a jornada"
      ]
    },
    {
      number: "04",
      icon: Zap,
      title: "Realize seu Projeto",
      description: "Finalize seu projeto de energia solar com a empresa escolhida e comece a economizar na conta de luz.",
      details: [
        "Acompanhamento da instalação",
        "Suporte pós-venda",
        "Sistema de avaliação do serviço",
        "Garantia de qualidade"
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Empresas Verificadas",
      description: "Todas as empresas passam por um rigoroso processo de verificação antes de serem listadas na plataforma."
    },
    {
      icon: Star,
      title: "Avaliações Reais",
      description: "Sistema de avaliações baseado em experiências reais de clientes que já realizaram projetos."
    },
    {
      icon: Award,
      title: "Qualidade Garantida",
      description: "Trabalhamos apenas com empresas certificadas e com histórico comprovado de qualidade."
    },
    {
      icon: Users,
      title: "Suporte Completo",
      description: "Nossa equipe oferece suporte durante todo o processo, desde a busca até a conclusão do projeto."
    }
  ];

  const faqs = [
    {
      question: "A plataforma é gratuita para os consumidores?",
      answer: "Sim! Nossa plataforma é 100% gratuita para quem busca empresas de energia solar. Você pode pesquisar, comparar e entrar em contato sem nenhum custo."
    },
    {
      question: "Como vocês verificam as empresas?",
      answer: "Verificamos documentação, certificações, histórico de projetos e referências de clientes. Também monitoramos continuamente as avaliações e feedback dos usuários."
    },
    {
      question: "Posso confiar nas avaliações?",
      answer: "Sim! Todas as avaliações são de clientes reais que realizaram projetos. Temos sistemas para detectar e remover avaliações falsas."
    },
    {
      question: "Vocês oferecem garantia nos projetos?",
      answer: "Não oferecemos garantia direta, mas todas as empresas parceiras devem oferecer garantias adequadas. Ajudamos a mediar questões quando necessário."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Como Funciona a Compare Solar
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Descubra como é simples encontrar a empresa de energia solar ideal 
              para seu projeto em apenas 4 passos
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Processo Simples e Transparente
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nosso processo foi desenvolvido para ser o mais simples e eficiente possível
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                  <div className="lg:w-1/2">
                    <div className="relative">
                      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
                            {step.number}
                          </div>
                          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                            <Icon className="text-blue-600 w-6 h-6" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          {step.description}
                        </p>
                        <ul className="space-y-3">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-3">
                              <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Arrow for desktop */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                          <ArrowRight className="text-blue-300 w-8 h-8 rotate-90" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <div className="relative">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          index === 0 ? '1560472354-b33ff0c44a43' : // Search/computer
                          index === 1 ? '1556742049-0a6b8b6a8b8b' : // Reviews/stars  
                          index === 2 ? '1556742111-f7e1b8b8b8b8' : // Phone/contact
                          '1509391366360-2e959784a276' // Solar panels
                        }?w=600&h=400&fit=crop`}
                        alt={step.title}
                        className="rounded-xl shadow-lg w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que Escolher a Compare Solar?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos as melhores garantias e benefícios para sua experiência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre como funciona nossa plataforma
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Encontre a empresa de energia solar ideal para seu projeto em poucos minutos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/busca-avancada"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/sobre"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Saber Mais
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;