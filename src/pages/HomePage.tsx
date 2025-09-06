import React, { useEffect, useState } from 'react';
import { useCompanyService } from '@/hooks/useCompanyService';
import { Company } from '@/types/company';
import Hero from '@/components/ui/hero';
import ConversionPoints from '@/components/ui/conversion-points';
import CompanyList from '@/components/ui/company-list';
import CtaBanner from '@/components/CtaBanner';
import { mockCompanies } from '@/mocks/mockData';

const HomePage: React.FC = () => {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
  const { getCompanies } = useCompanyService();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    if (useMocks) {
      setCompanies(mockCompanies.slice(0, 6));
    } else {
      getCompanies().then(data => setCompanies(data.slice(0, 6))).catch(() => setCompanies([]));
    }
  }, [useMocks, getCompanies]);

  return (
    <div className="min-h-screen">
      <Hero />
      <ConversionPoints />
      <CompanyList
        companies={companies}
      />
      <div className="container mx-auto px-4 py-12">
        <CtaBanner position="homepage" className="mb-8" />
      </div>
    </div>
  );
};

export default HomePage;
