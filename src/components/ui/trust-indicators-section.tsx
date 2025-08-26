import React from 'react';

interface TrustIndicator {
  id: number;
  value: string;
  label: string;
}

interface TrustIndicatorsSectionProps {
  title?: string;
  indicators: TrustIndicator[];
}

const TrustIndicatorsSection: React.FC<TrustIndicatorsSectionProps> = ({ 
  title = "Prova social",
  indicators 
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {indicators.map((indicator) => (
            <div key={indicator.id} className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {indicator.value}
              </div>
              <div className="text-lg text-gray-700">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;