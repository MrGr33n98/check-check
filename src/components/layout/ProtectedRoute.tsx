import { ReactNode } from 'react';

const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: ReactNode; 
  requiredRole: string;
}) => {
  // Simple placeholder - in a real app, you would check authentication
  const isAuthenticated = true;
  const userRole = 'admin';
  
  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <div>You don't have permission to access this page.</div>;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
