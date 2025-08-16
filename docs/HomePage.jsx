import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import CompanyList from '../components/CompanyList';
import ConversionPoints from '../components/ConversionPoints';
import { mockCompanies } from '../data/mockData';

function HomePage({ searchTerm, onCompanySelect }) {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  const handleSearch = (term) => {
    // This would typically update the URL or trigger a search
    console.log('Searching for:', term);
  };

  const handleCompanySelect = (company) => {
    if (onCompanySelect) {
      onCompanySelect(company);
    }
    navigate(`/company/${company.id}`);
  };

  const handleLeadCapture = (leadData) => {
    setLeads(prev => [...prev, leadData]);
    console.log('Lead captured:', leadData);
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      
      {/* Conversion Points Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recursos Gratuitos para Você
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acesse nossos materiais exclusivos e ferramentas para tomar a melhor decisão sobre energia solar
          </p>
        </div>
        <ConversionPoints onLeadCapture={handleLeadCapture} />
      </div>

      <CompanyList 
        companies={mockCompanies}
        searchTerm={searchTerm}
        onCompanySelect={handleCompanySelect}
      />
    </>
  );
}

export default HomePage;
