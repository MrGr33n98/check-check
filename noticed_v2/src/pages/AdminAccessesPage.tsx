import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProductAccessesCrud from '@/components/ProductAccessesCrud';

const AdminAccessesPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Gestão de Acessos
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie acessos de membros às soluções e níveis de permissão
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <ProductAccessesCrud />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAccessesPage;