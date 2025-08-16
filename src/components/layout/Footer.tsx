import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SF</span>
              </div>
              <span className="text-xl font-bold">SolarFinder</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              A plataforma líder para encontrar e avaliar empresas de energia solar no Brasil.
              Conectamos consumidores com as melhores empresas do setor.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Carreiras
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a 
                  href="mailto:contato@solarfinder.com.br" 
                  className="hover:text-white transition-colors"
                >
                  contato@solarfinder.com.br
                </a>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a 
                  href="tel:+5511999999999" 
                  className="hover:text-white transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  São Paulo, SP<br />
                  Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 SolarFinder. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer