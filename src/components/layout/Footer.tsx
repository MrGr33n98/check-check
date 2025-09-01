import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/compare-solar',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/compare.solar',
      color: 'hover:text-pink-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/compare.solar',
      color: 'hover:text-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/compare_solar',
      color: 'hover:text-blue-400'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@compare-solar',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="Compare Solar" 
                className="h-8 w-8 rounded-lg"
              />
              <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Compare Solar
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              A plataforma líder para encontrar e comparar as melhores empresas de energia solar do Brasil. 
              Conectamos você com fornecedores qualificados e confiáveis.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@comparesolar.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Empresa</h4>
            <ul className="space-y-3">
              {[
                { name: 'Sobre Nós', path: '/sobre' },
                { name: 'Como Funciona', path: '/como-funciona' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contato', path: '/contato' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-slate-300 hover:text-yellow-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Suporte</h4>
            <ul className="space-y-3">
              {[
                { name: 'Central de Ajuda', path: '/faq' },
                { name: 'Política de Privacidade', path: '/privacidade' },
                { name: 'Termos de Uso', path: '/termos' },
                { name: 'Avaliações', path: '/avaliacoes' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-slate-300 hover:text-yellow-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Companies */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Para Empresas</h4>
            <ul className="space-y-3">
              {[
                { name: 'Cadastrar Empresa', path: '/empresa/cadastro' },
                { name: 'Login Empresas', path: '/login' },
                { name: 'Dashboard', path: '/empresa/dashboard' },
                { name: 'Planos e Preços', path: '/planos' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-slate-300 hover:text-yellow-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Links */}
            <div className="flex items-center space-x-1">
              <span className="text-slate-400 text-sm mr-4">Siga-nos:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-slate-800 text-slate-400 ${social.color} transition-all duration-200 hover:bg-slate-700 hover:scale-110`}
                    aria-label={`Seguir no ${social.name}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">Newsletter:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-l-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 w-48"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-r-lg text-sm font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-slate-400">
            <div className="flex items-center space-x-4">
              <span>© {currentYear} Compare Solar. Todos os direitos reservados.</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Feito com ❤️ no Brasil</span>
              <div className="flex items-center space-x-1">
                <span>Powered by</span>
                <span className="text-yellow-400 font-medium">Solar Tech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;