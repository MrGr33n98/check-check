import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  requiredRole?: 'admin' | 'moderator' | 'user' | 'empresa';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  isAuthenticated, 
  requiredRole 
}) => {
  const { user } = useAuth();
  
  // Use auth context user if isAuthenticated is not provided
  const authenticated = isAuthenticated !== undefined ? isAuthenticated : !!user;
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check role requirement if specified
  if (requiredRole && user && user.role !== requiredRole) {
    // Redirect based on user role
    if (user.role === 'empresa') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;