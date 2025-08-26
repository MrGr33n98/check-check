import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const lastUpdated = "15 de dezembro de 2024";

  const sections = [
    {
      icon: Eye,
      title: "Informações que Coletamos",
      content: [
        {
          subtitle: "Informações Pessoais",
          text: "Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone, endereço e outras informações quando você se cadastra, solicita orçamentos ou entra em contato conosco."
        },
        {
          subtitle: "Informações de Uso",
          text: "Coletamos automaticamente informações sobre como você usa nossa plataforma, incluindo páginas visitadas, tempo de permanência, cliques e outras interações."
        },
        {
          subtitle: "Informações Técnicas",
          text: "Coletamos informações técnicas como endereço IP, tipo de navegador, sistema operacional, identificadores de dispositivo e dados de localização aproximada."
        }
      ]
    },
    {
      icon: Users,
      title: "Como Usamos suas Informações",
      content: [
        {
          subtitle: "Prestação de Serviços",
          text: "Utilizamos suas informações para fornecer, manter e melhorar nossos serviços, incluindo conectá-lo com empresas de energia solar adequadas às suas necessidades."
        },
        {
          subtitle: "Comunicação",
          text: "Enviamos comunicações relacionadas aos serviços, atualizações importantes, newsletters (com seu consentimento) e respondemos às suas solicitações."
        },
        {
          subtitle: "Personalização",
          text: "Personalizamos sua experiência na plataforma, mostrando empresas e conteúdos mais relevantes para seu perfil e localização."
        },
        {
          subtitle: "Segurança e Conformidade",
          text: "Utilizamos suas informações para detectar, prevenir e responder a fraudes, abusos, problemas de segurança e atividades ilegais."
        }
      ]
    },
    {
      icon: Shield,
      title: "Compartilhamento de Informações",
      content: [
        {
          subtitle: "Empresas Parceiras",
          text: "Compartilhamos suas informações de contato e projeto com empresas de energia solar selecionadas quando você solicita orçamentos através da nossa plataforma."
        },
        {
          subtitle: "Prestadores de Serviços",
          text: "Compartilhamos informações com prestadores de serviços terceirizados que nos ajudam a operar a plataforma, como provedores de hospedagem, análise e suporte ao cliente."
        },
        {
          subtitle: "Conformidade Legal",
          text: "Podemos divulgar suas informações quando exigido por lei, ordem judicial ou para proteger nossos direitos, propriedade ou segurança."
        }
      ]
    },
    {
      icon: Lock,
      title: "Segurança dos Dados",
      content: [
        {
          subtitle: "Medidas de Proteção",
          text: "Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição."
        },
        {
          subtitle: "Criptografia",
          text: "Utilizamos criptografia SSL/TLS para proteger a transmissão de dados entre seu dispositivo e nossos servidores."
        },
        {
          subtitle: "Acesso Restrito",
          text: "Limitamos o acesso às suas informações pessoais apenas aos funcionários e prestadores de serviços que precisam dessas informações para desempenhar suas funções."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transparência total sobre como coletamos, usamos e protegemos 
              suas informações pessoais
            </p>
            <p className="text-blue-200 mt-4">
              Última atualização: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Compromisso com sua Privacidade
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Compare Solar ("nós", "nosso" ou "empresa") está comprometida em proteger 
              e respeitar sua privacidade. Esta Política de Privacidade explica como 
              coletamos, usamos, divulgamos e protegemos suas informações quando você 
              usa nossa plataforma online.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Esta política está em conformidade com a Lei Geral de Proteção de Dados 
              (LGPD - Lei nº 13.709/2018) e outras regulamentações aplicáveis de 
              proteção de dados.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <p className="text-blue-800 font-medium">
                Ao usar nossa plataforma, você concorda com a coleta e uso de informações 
                de acordo com esta política.
              </p>
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Icon className="text-blue-600 w-6 h-6" />
                      <h2 className="text-xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rights Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-blue-600 w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-900">
                Seus Direitos (LGPD)
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Confirmação e Acesso</h4>
                    <p className="text-gray-600 text-sm">Confirmar se processamos seus dados e acessá-los</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Correção</h4>
                    <p className="text-gray-600 text-sm">Corrigir dados incompletos, inexatos ou desatualizados</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Eliminação</h4>
                    <p className="text-gray-600 text-sm">Solicitar a eliminação de dados desnecessários</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Portabilidade</h4>
                    <p className="text-gray-600 text-sm">Solicitar a portabilidade dos dados</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Anonimização</h4>
                    <p className="text-gray-600 text-sm">Solicitar anonimização ou bloqueio</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Oposição</h4>
                    <p className="text-gray-600 text-sm">Opor-se ao tratamento em certas situações</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Informações</h4>
                    <p className="text-gray-600 text-sm">Obter informações sobre compartilhamento</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Consentimento</h4>
                    <p className="text-gray-600 text-sm">Revogar consentimento a qualquer momento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Cookies e Tecnologias Similares
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
              analisar o uso da plataforma e personalizar conteúdo. Você pode gerenciar 
              suas preferências de cookies através das configurações do seu navegador.
            </p>
            <a
              href="/cookies"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Saiba mais sobre nossa Política de Cookies →
            </a>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <h2 className="text-xl font-bold">
                Dúvidas sobre Privacidade?
              </h2>
            </div>
            <p className="text-blue-100 mb-6">
              Se você tiver dúvidas sobre esta Política de Privacidade ou quiser 
              exercer seus direitos, entre em contato conosco:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-1">E-mail do DPO:</p>
                <a
                  href="mailto:privacidade@comparesolar.com.br"
                  className="text-blue-100 hover:text-white"
                >
                  privacidade@comparesolar.com.br
                </a>
              </div>
              <div>
                <p className="font-medium mb-1">Telefone:</p>
                <a
                  href="tel:+551140041234"
                  className="text-blue-100 hover:text-white"
                >
                  (11) 4004-1234
                </a>
              </div>
            </div>
          </div>

          {/* Updates Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-yellow-800 mb-3">
              Alterações nesta Política
            </h2>
            <p className="text-yellow-700 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. 
              Notificaremos sobre mudanças significativas através do e-mail cadastrado 
              ou aviso em nossa plataforma. A data da última atualização será sempre 
              indicada no topo desta página.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;