import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface BusinessService {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: string;
}

interface BusinessServicesSectionProps {
  title?: string;
  services: BusinessService[];
}

const BusinessServicesSection: React.FC<BusinessServicesSectionProps> = ({ 
  title = "Para Empresas",
  services 
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(service.path)}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <Button variant="outline">
                Saiba mais
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessServicesSection;