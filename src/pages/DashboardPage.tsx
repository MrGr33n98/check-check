import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import ModernDashboard from '@/components/dashboard/ModernDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return <div>Carregando...</div>;
  }

  return <ModernDashboard />;
};

export default DashboardPage;