import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import LeadsCrud from '@/components/LeadsCrud';

const AdminLeadsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Gestão de Leads
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie leads recebidos e status de conversão
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <LeadsCrud />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeadsPage;