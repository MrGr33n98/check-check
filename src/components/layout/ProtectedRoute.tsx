import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[]; // e.g., ['admin', 'company_owner']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can render a loading spinner here if you prefer
    return <div>Loading authentication status...</div>;
  }

  if (!user) {
    // User not logged in, redirect to login page
    // Pass the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0) {
    // If roles are required, check if the user has at least one of them
    const userHasRequiredRole = hasRole(roles);
    if (!userHasRequiredRole) {
      // User does not have the required role, redirect to an unauthorized page or home
      // You might want to create a specific "403 Forbidden" page
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If everything is fine, render the protected component
  return children;
};

export default ProtectedRoute;
