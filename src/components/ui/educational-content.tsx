import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface EducationalContentProps {
  title: string;
  description: string;
  content: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
}

const EducationalContent: React.FC<EducationalContentProps> = ({ 
  title, 
  description, 
  content,
  ctaText = "Saiba mais",
  onCtaClick 
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <Card className="border-0 shadow-none bg-gray-50 rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              {content}
            </div>
            
            {onCtaClick && (
              <div className="mt-8">
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-semibold text-lg"
                  onClick={onCtaClick}
                >
                  {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EducationalContent;