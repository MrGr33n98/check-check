from 'react';

interface AdminDashboardProps {
  // Adicione as props necessárias aqui
}

export default function AdminDashboard({}: AdminDashboardProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Adicione os componentes do dashboard aqui */}
      </div>
    </div>
  );
}