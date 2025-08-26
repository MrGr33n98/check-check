import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import MembersCrud from '@/components/MembersCrud';

const AdminMembersPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Gestão de Membros
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie todos os membros da plataforma, planos de assinatura e status
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <MembersCrud />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMembersPage;