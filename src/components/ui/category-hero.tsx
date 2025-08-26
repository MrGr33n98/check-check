import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BatteryCharging, Zap } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  badgeText?: string;
  icon?: React.ReactNode;
  cornerIcon?: React.ReactNode;
}

const CategoryHero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  description, 
  primaryButtonText = "Saiba mais", 
  secondaryButtonText = "Cadastrar empresa",
  onPrimaryClick,
  onSecondaryClick,
  badgeText = "Categoria em destaque",
  icon = <BatteryCharging className="h-32 w-32 text-white" />,
  cornerIcon = <Zap className="h-8 w-8 text-yellow-800" />
}) => {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4" variant="secondary">
              {badgeText}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={onPrimaryClick}>
                {primaryButtonText}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-xl">
                {icon}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg">
                {cornerIcon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;