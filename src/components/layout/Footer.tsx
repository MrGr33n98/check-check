import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight, Shield, Award, Users } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aqui seria feita a integração com o serviço de newsletter
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Fique por dentro das novidades
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Receba dicas exclusivas, tendências do mercado solar e ofertas especiais das melhores empresas
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none text-lg"
                required
              />
              <button 
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                {isSubscribed ? 'Inscrito!' : 'Assinar'}
                {!isSubscribed && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-blue-100 mt-4 font-medium">
                ✅ Obrigado! Você receberá nossas novidades em breve.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CS</span>
                </div>
                <span className="text-2xl font-bold">Compare Solar</span>
              </Link>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A plataforma líder no Brasil para conectar você às melhores empresas de energia solar. 
                Compare, avalie e escolha com segurança e inteligência.
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Empresas Verificadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Avaliações Reais</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>+50.000 Usuários</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-gray-300 font-medium mb-4">Siga-nos nas redes sociais</p>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/comparesolar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                  aria-label="Instagram da Compare Solar"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/comparesolar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="Facebook da Compare Solar"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/comparesolar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="LinkedIn da Compare Solar"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Categorias</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/categoria/geracao-distribuida" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Geração Distribuída</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categoria/comercial" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Energia Comercial</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categoria/industrial" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Energia Industrial</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categoria/residencial" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Energia Residencial</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categorias" 
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span>Ver todas as categorias</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* For Companies Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Para Empresas</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/empresa/cadastro" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Cadastrar empresa</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/empresa/dashboard" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Painel de controle</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/empresa/recursos" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Recursos empresariais</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/empresa/suporte" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Suporte especializado</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Recursos</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/guia-completo" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Guia completo</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/consultoria" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Consultoria gratuita</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/calculadora" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Calculadora de economia</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/webinars" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Webinars gratuitos</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>Blog e artigos</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">E-mail</p>
                <a href="mailto:contato@comparesolar.com.br" className="text-white hover:text-blue-400 transition-colors">
                  contato@comparesolar.com.br
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Phone className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Telefone</p>
                <a href="tel:+551140041234" className="text-white hover:text-green-400 transition-colors">
                  (11) 4004-1234
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <MapPin className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-gray-400 text-sm">Localização</p>
                <span className="text-white">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-center lg:text-left">
              <p className="mb-2">
                © {new Date().getFullYear()} Compare Solar. Todos os direitos reservados.
              </p>
              <p className="text-sm text-gray-500">
                Compare com segurança. Escolha com inteligência.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center lg:justify-end gap-6">
              <Link 
                to="/privacidade" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Política de Privacidade
              </Link>
              <Link 
                to="/termos" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Termos de Uso
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Política de Cookies
              </Link>
              <Link 
                to="/sobre" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Sobre Nós
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;