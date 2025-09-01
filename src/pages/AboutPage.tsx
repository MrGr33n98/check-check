import { Users, Target, Award, Heart, Zap, Shield, TrendingUp, Globe } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Empresas Parceiras", color: "text-blue-600", bgColor: "bg-blue-50" },
    { icon: Zap, value: "1.2GW", label: "Capacidade Instalada", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { icon: Award, value: "15k+", label: "Projetos Concluídos", color: "text-green-600", bgColor: "bg-green-50" },
    { icon: Heart, value: "98%", label: "Satisfação dos Clientes", color: "text-red-600", bgColor: "bg-red-50" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Transparência",
      description: "Todas as empresas são verificadas e avaliadas por clientes reais, garantindo informações confiáveis."
    },
    {
      icon: Target,
      title: "Qualidade",
      description: "Conectamos você apenas com empresas qualificadas e certificadas no mercado de energia solar."
    },
    {
      icon: TrendingUp,
      title: "Inovação",
      description: "Utilizamos tecnologia de ponta para facilitar a busca e comparação de empresas solares."
    },
    {
      icon: Globe,
      title: "Sustentabilidade",
      description: "Promovemos a energia limpa e renovável para um futuro mais sustentável para todos."
    }
  ];

  const team = [
    {
      name: "Carlos Silva",
      role: "CEO & Fundador",
      description: "15 anos de experiência no setor de energia renovável",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Ana Santos",
      role: "CTO",
      description: "Especialista em tecnologia e desenvolvimento de plataformas",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "João Oliveira",
      role: "Diretor Comercial",
      description: "Expert em relacionamento com empresas do setor solar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Maria Costa",
      role: "Diretora de Marketing",
      description: "Especialista em marketing digital e crescimento",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a Compare Solar
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Somos a maior plataforma do Brasil para conectar pessoas e empresas 
              às melhores soluções em energia solar
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`${stat.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`${stat.color} w-8 h-8`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Democratizar o acesso à energia solar no Brasil, conectando pessoas e empresas 
                às melhores soluções do mercado de forma transparente, confiável e eficiente.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Acreditamos que a energia solar é o futuro e queremos facilitar essa transição 
                para todos os brasileiros, oferecendo uma plataforma onde é possível comparar, 
                avaliar e escolher as melhores empresas do setor.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="text-blue-800 font-medium italic">
                  "Nosso objetivo é tornar a energia solar acessível e confiável para todos, 
                  contribuindo para um Brasil mais sustentável e independente energeticamente."
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
                alt="Painéis solares"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os princípios que guiam nossa empresa e definem como trabalhamos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa História
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Como começamos e onde chegamos
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="bg-blue-600 text-white p-6 rounded-xl text-center">
                  <h3 className="text-2xl font-bold mb-2">2020</h3>
                  <p className="text-blue-100">Fundação</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold text-gray-900 mb-3">O Início</h4>
                <p className="text-gray-700 leading-relaxed">
                  A Compare Solar nasceu da necessidade de simplificar a busca por empresas 
                  de energia solar confiáveis. Nossos fundadores, com experiência no setor, 
                  identificaram a dificuldade dos consumidores em encontrar e comparar 
                  fornecedores qualificados.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/3">
                <div className="bg-green-600 text-white p-6 rounded-xl text-center">
                  <h3 className="text-2xl font-bold mb-2">2022</h3>
                  <p className="text-green-100">Expansão</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Crescimento Nacional</h4>
                <p className="text-gray-700 leading-relaxed">
                  Expandimos para todo o território nacional, conectando empresas de energia 
                  solar de todas as regiões do Brasil. Implementamos nosso sistema de 
                  avaliações e certificação de empresas parceiras.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="bg-yellow-600 text-white p-6 rounded-xl text-center">
                  <h3 className="text-2xl font-bold mb-2">2024</h3>
                  <p className="text-yellow-100">Liderança</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Líder do Mercado</h4>
                <p className="text-gray-700 leading-relaxed">
                  Hoje somos a maior plataforma de comparação de empresas de energia solar 
                  do Brasil, com mais de 500 empresas parceiras e milhares de projetos 
                  facilitados através da nossa plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça as pessoas por trás da Compare Solar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Encontrar sua Empresa Solar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de brasileiros que já encontraram a empresa ideal 
            através da nossa plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/busca-avancada"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Encontrar Empresas
            </a>
            <a
              href="/empresa/cadastro"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Cadastrar Empresa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;