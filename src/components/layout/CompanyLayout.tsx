import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/middleware/authMiddleware'; // Using the centralized api instance
import { Company } from '@/types/company'; // Assuming a Company type definition
import CompanyHeader from '@/components/company/CompanyHeader';
import CompanyNavigation from '@/components/company/CompanyNavigation';
import { Toaster } from '@/components/ui/sonner';

interface CompanyLayoutProps {
  children: React.ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyId) {
        setError("Company ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get<Company>(`/companies/${companyId}`);
        setCompany(response.data);
      } catch (err) {
        setError("Failed to load company data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (loading) {
    return <div>Loading company profile...</div>;
  }

  if (error || !company) {
    return <div className="text-center py-10 text-red-500">{error || "Company not found."}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <CompanyHeader company={company} />
      <CompanyNavigation companyId={company.id} />
      <main className="container mx-auto px-4 py-8">
        {/* Pass company data to children if they need it */}
        {React.Children.map(children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { company })
            : child
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default CompanyLayout;
