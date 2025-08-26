import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/ui/hero';
import ConversionPoints from '@/components/ui/conversion-points';
import CompanyList from '@/components/ui/company-list';
import { mockCompanies, mockConversionPoints } from '@/data/mockData';
import { useLeads } from '@/hooks/useLeads';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { addLead } = useLeads();

  const handleCompanySelect = (companyId: number) => {
    navigate(`/company/${companyId}`);
  };

  const handleLeadCapture = (leadData: any) => {
    const newLead = {
      id: Date.now(),
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || '',
      address: '',
      propertyType: 'residential' as const,
      energyBill: 0,
      timeline: 'Em até 3 meses',
      message: `Interesse em: ${leadData.leadMagnet}`,
      intentionScore: 75,
      budget: 'Até R$ 50.000',
      purchaseIntention: 'high',
      status: 'new' as const,
      leadSource: 'Conversion Point',
      companyId: 0, // General lead, not company-specific
      created_at: new Date().toISOString()
    };

    addLead(newLead);
    
    // Show success message (you could implement a toast notification here)
    alert('Obrigado! Você receberá o material em seu e-mail em breve.');
  };

  const handleRequestQuote = (company: any) => {
    navigate(`/company/${company.id}?openLead=true`);
  };

  return (
    <div className="min-h-screen">
      <Hero 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ConversionPoints 
        conversionPoints={mockConversionPoints}
        onLeadCapture={handleLeadCapture}
      />
      <CompanyList 
        companies={mockCompanies.slice(0, 6)}
        onCompanySelect={handleCompanySelect}
        onRequestQuote={handleRequestQuote}
      />
    </div>
  );
};

export default HomePage;