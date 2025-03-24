
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface AuthGuardProps {
  children: React.ReactNode;
  userTypes?: ('consumer' | 'advisor' | 'firm_admin')[];
}

/**
 * AuthGuard component to protect routes that require authentication
 * Optionally restrict access to specific user types
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children, userTypes }) => {
  const { isAuthenticated, userType } = useUser();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If userTypes is provided, check if current user type is allowed
  if (userTypes && userTypes.length > 0 && userType && !userTypes.includes(userType)) {
    // Redirect to appropriate dashboard based on user type
    if (userType === 'consumer') {
      return <Navigate to="/consumer-dashboard" replace />;
    } else if (userType === 'advisor') {
      return <Navigate to="/advisor-dashboard" replace />;
    } else if (userType === 'firm_admin') {
      return <Navigate to="/firm-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
