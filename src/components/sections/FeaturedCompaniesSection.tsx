import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { api } from '@/middleware/authMiddleware';

// Define a type for the company data
interface Company {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  short_description: string;
  rating: number;
  review_count: number;
  installed_capacity_mw: number;
  location: string;
  premium: boolean;
}

const FeaturedCompaniesSection: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCompanies = async () => {
      try {
        setLoading(true);
        // Example API call: fetch companies marked as 'featured' or 'premium'
        const response = await api.get('/companies/search?premium=true&limit=4');
        setCompanies(response.data.results || []);
      } catch (error) {
        console.error("Failed to fetch featured companies:", error);
        // Optionally set some mock data on error for UI development
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCompanies();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Empresas em Destaque</h2>
            <p className="mt-3 text-lg text-gray-600">Carregando empresas confiáveis e bem avaliadas...</p>
          </div>
          {/* Skeleton loader can be placed here */}
        </div>
      </section>
    );
  }

  if (companies.length === 0) {
    return null; // Don't render the section if there are no featured companies
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Empresas em Destaque</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça algumas das empresas mais confiáveis e bem avaliadas da nossa plataforma.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex items-start gap-4">
                    <img src={company.logo_url} alt={`${company.name} logo`} className="w-16 h-16 rounded-lg object-contain border" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.location}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4 h-16 line-clamp-3">{company.short_description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-700">{company.rating.toFixed(1)}</span>
                      <span>({company.review_count})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-gray-700">{company.installed_capacity_mw} MW</span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/company/${company.slug}`}>
                      Ver Perfil <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/busca-avancada">
              Ver Todas as Empresas
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompaniesSection;
