import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Award, 
  Calendar,
  Users,
  DollarSign,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

// Interface para empresa da API
interface SolarCompany {
  id: number;
  name: string;
  title: string;
  short_description: string;
  country: string;
  address: string;
  phone: string;
  foundation_year: number;
  members_count: number;
  revenue: string;
  social_links: string[];
  tags: string[];
  status: string;
  slug: string; // Added
}

const CompanyProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<SolarCompany | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompany = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/solar_companies/${id}`);
        // A API retorna diretamente o objeto da empresa, não wrapped
        setCompany(response.data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar empresa:', err);
        setError('Empresa não encontrada');
      } finally {
        setIsLoading(false);
      }
    };

    loadCompany();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg p-8">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Link to="/busca-avancada" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à busca
          </Link>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Empresa não encontrada</h2>
              <p className="text-gray-600 mb-4">A empresa que você está procurando não foi encontrada.</p>
              <Button asChild>
                <Link to="/busca-avancada">Voltar à busca</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Gerar rating aleatório para demonstração
  const rating = Math.round((4.0 + Math.random() * 1.0) * 10) / 10;
  const reviewCount = Math.floor(Math.random() * 200) + 20;
  
  // Calcular anos de experiência
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - company.foundation_year;

  // Extrair website dos social links
  const website = company.social_links.find(link => 
    !link.includes('facebook') && !link.includes('instagram') && !link.includes('linkedin')
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Link to="/busca-avancada" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à busca
        </Link>

        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 mr-3">{company.name}</h1>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Award className="w-3 h-3 mr-1" />
                    Verificada
                  </Badge>
                </div>
                
                <p className="text-xl text-gray-600 mb-4">{company.title}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">{rating}</span>
                  <span className="ml-1 text-sm text-gray-600">({reviewCount} avaliações)</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{company.address}</span>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex flex-col space-y-3 md:ml-8">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    if (company.phone) {
                      window.open(`tel:${company.phone}`, '_self');
                    }
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {company.phone}
                </Button>
                
                {website && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open(`https://${website}`, '_blank')}
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Visitar Site
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Sobre a Empresa</h2>
                <p className="text-gray-600 leading-relaxed">{company.short_description}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Especialidades</h2>
                <div className="flex flex-wrap gap-2">
                  {company.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informações da Empresa</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Fundada em</p>
                      <p className="font-medium">{company.foundation_year} ({yearsExperience} anos)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Funcionários</p>
                      <p className="font-medium">{company.members_count}+ pessoas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Faturamento</p>
                      <p className="font-medium">{company.revenue}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            {company.social_links.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                  <div className="space-y-2">
                    {company.social_links.map((link, index) => {
                      let platform = 'Website';
                      if (link.includes('facebook')) platform = 'Facebook';
                      else if (link.includes('instagram')) platform = 'Instagram';
                      else if (link.includes('linkedin')) platform = 'LinkedIn';
                      
                      return (
                        <a
                          key={index}
                          href={link.startsWith('http') ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {platform}
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;