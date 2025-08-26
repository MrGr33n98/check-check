import { FileText, Shield, AlertTriangle, Scale, Users, Mail } from 'lucide-react';

const TermsOfServicePage = () => {
  const lastUpdated = "15 de dezembro de 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Scale className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Termos de Uso
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Condições gerais para uso da plataforma Compare Solar
            </p>
            <p className="text-blue-200 mt-4">
              Última atualização: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bem-vindo à Compare Solar
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Estes Termos de Uso ("Termos") regem o uso da plataforma Compare Solar, 
              operada pela Compare Solar Ltda. ("nós", "nosso" ou "empresa"), 
              localizada na Av. Paulista, 1000, São Paulo - SP.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Ao acessar ou usar nossa plataforma, você concorda em ficar vinculado 
              a estes Termos. Se você não concordar com alguma parte destes termos, 
              não poderá acessar o serviço.
            </p>
          </div>

          {/* Section 1: Definitions */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-blue-600 w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-900">
                1. Definições
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Plataforma:</h3>
                <p className="text-gray-700">
                  O website, aplicativo móvel e todos os serviços relacionados oferecidos 
                  pela Compare Solar para conectar usuários a empresas de energia solar.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Usuário:</h3>
                <p className="text-gray-700">
                  Qualquer pessoa física ou jurídica que acesse ou use a Plataforma.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Empresa Parceira:</h3>
                <p className="text-gray-700">
                  Empresas do setor de energia solar cadastradas e verificadas em nossa plataforma.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Serviços:</h3>
                <p className="text-gray-700">
                  Todos os recursos, funcionalidades e conteúdos disponibilizados através da Plataforma.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Services */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-blue-600 w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-900">
                2. Descrição dos Serviços
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              A Compare Solar é uma plataforma digital que oferece:
            </p>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Busca e comparação de empresas de energia solar</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Sistema de avaliações e comentários de usuários</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Facilitação de contato entre usuários e empresas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Conteúdo educativo sobre energia solar</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ferramentas de cálculo e simulação</span>
              </li>
            </ul>
          </div>

          {/* Section 3: User Obligations */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-blue-600 w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-900">
                3. Obrigações do Usuário
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Ao usar nossa plataforma, você se compromete a:
            </p>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-600 p-4">
                <h4 className="font-semibold text-green-800 mb-2">Uso Adequado</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Fornecer informações verdadeiras e atualizadas</li>
                  <li>• Usar a plataforma apenas para fins legítimos</li>
                  <li>• Respeitar os direitos de outros usuários e empresas</li>
                  <li>• Manter a confidencialidade de suas credenciais de acesso</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-600 p-4">
                <h4 className="font-semibold text-red-800 mb-2">Condutas Proibidas</h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Publicar conteúdo falso, enganoso ou difamatório</li>
                  <li>• Usar a plataforma para atividades ilegais ou fraudulentas</li>
                  <li>• Tentar acessar sistemas ou dados não autorizados</li>
                  <li>• Interferir no funcionamento da plataforma</li>
                  <li>• Violar direitos de propriedade intelectual</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Reviews and Content */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              4. Avaliações e Conteúdo do Usuário
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Responsabilidade pelo Conteúdo</h3>
                <p className="text-gray-700 leading-relaxed">
                  Você é totalmente responsável pelo conteúdo que publica, incluindo 
                  avaliações, comentários e informações pessoais. O conteúdo deve ser 
                  verdadeiro, baseado em experiência real e não violar direitos de terceiros.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Moderação</h3>
                <p className="text-gray-700 leading-relaxed">
                  Reservamo-nos o direito de moderar, editar ou remover qualquer conteúdo 
                  que viole estes Termos, seja inadequado ou potencialmente prejudicial.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Licença de Uso</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ao publicar conteúdo, você nos concede uma licença não exclusiva, 
                  mundial e livre de royalties para usar, reproduzir e exibir esse 
                  conteúdo na plataforma.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Limitations */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-yellow-600 w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-900">
                5. Limitações e Isenções
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Papel de Intermediação</h3>
                <p className="text-gray-700 leading-relaxed">
                  A Compare Solar atua apenas como intermediadora, facilitando o contato 
                  entre usuários e empresas. Não somos responsáveis pelos serviços prestados 
                  pelas empresas parceiras, qualidade dos produtos ou cumprimento de contratos.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Disponibilidade</h3>
                <p className="text-gray-700 leading-relaxed">
                  Embora nos esforcemos para manter a plataforma sempre disponível, 
                  não garantimos operação ininterrupta. Podemos realizar manutenções 
                  programadas ou enfrentar indisponibilidades técnicas.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informações de Terceiros</h3>
                <p className="text-gray-700 leading-relaxed">
                  As informações sobre empresas parceiras são fornecidas por elas mesmas. 
                  Embora façamos verificações, não garantimos a precisão completa de 
                  todas as informações apresentadas.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Privacy */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              6. Privacidade e Proteção de Dados
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              O tratamento de seus dados pessoais é regido por nossa Política de Privacidade, 
              que faz parte integrante destes Termos. Recomendamos a leitura atenta da política 
              para compreender como coletamos, usamos e protegemos suas informações.
            </p>
            
            <a
              href="/privacidade"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Shield className="w-4 h-4" />
              Ler Política de Privacidade
            </a>
          </div>

          {/* Section 7: Modifications */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              7. Alterações nos Termos
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. 
              Alterações significativas serão comunicadas através de:
            </p>
            
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span>Notificação por e-mail para usuários cadastrados</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span>Aviso destacado na plataforma</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span>Atualização da data no topo desta página</span>
              </li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed">
              O uso continuado da plataforma após as alterações constitui aceitação 
              dos novos termos.
            </p>
          </div>

          {/* Section 8: Termination */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              8. Encerramento
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pelo Usuário</h3>
                <p className="text-gray-700 leading-relaxed">
                  Você pode encerrar sua conta a qualquer momento através das 
                  configurações da plataforma ou entrando em contato conosco.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pela Compare Solar</h3>
                <p className="text-gray-700 leading-relaxed">
                  Podemos suspender ou encerrar sua conta em caso de violação destes 
                  Termos, atividade suspeita ou por outros motivos justificados, 
                  com notificação prévia quando possível.
                </p>
              </div>
            </div>
          </div>

          {/* Section 9: Governing Law */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              9. Lei Aplicável e Jurisdição
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              Estes Termos são regidos pelas leis brasileiras. Qualquer disputa 
              será submetida ao foro da comarca de São Paulo - SP, com exclusão 
              de qualquer outro, por mais privilegiado que seja.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <h2 className="text-xl font-bold">
                Dúvidas sobre os Termos?
              </h2>
            </div>
            <p className="text-blue-100 mb-6">
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-1">E-mail:</p>
                <a
                  href="mailto:juridico@comparesolar.com.br"
                  className="text-blue-100 hover:text-white"
                >
                  juridico@comparesolar.com.br
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
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;