import React from 'react';
import Hero from '@/components/ui/hero';
import ConversionPoints from '@/components/ui/conversion-points';
import CompanyList from '@/components/ui/company-list';
import CtaBanner from '@/components/CtaBanner';
import { mockCompanies } from '@/data/mockData';

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen">
      <Hero />
      <ConversionPoints />
      <CompanyList 
        companies={mockCompanies.slice(0, 6)}
      />
      <div className="container mx-auto px-4 py-12">
        <CtaBanner position="homepage" className="mb-8" />
      </div>
    </div>
  );
};

export default HomePage;