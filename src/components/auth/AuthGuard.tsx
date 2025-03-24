
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  userTypes?: ('consumer' | 'advisor' | 'firm_admin')[];
}

/**
 * AuthGuard component to protect routes that require authentication
 * Optionally restrict access to specific user types
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children, userTypes }) => {
  const { isAuthenticated, userType, setIsAuthenticated } = useUser();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  
  // Double-check auth with Supabase directly
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("[AuthGuard] Error checking authentication:", error);
          setIsAuthenticated(false);
        } else if (data?.user) {
          console.log("[AuthGuard] User authenticated via Supabase:", data.user.email);
          setIsAuthenticated(true);
          
          // Support for development with mock user
          if (process.env.NODE_ENV === 'development' && data.user.id === 'mock-user-id') {
            console.log("[AuthGuard] Using mock authentication in development");
            setIsAuthenticated(true);
          }
        } else {
          console.log("[AuthGuard] No authenticated user found in Supabase");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("[AuthGuard] Exception during auth check:", err);
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };
    
    verifyAuth();
  }, [setIsAuthenticated, location.pathname]);
  
  // Show loading state while checking
  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Show toast to inform user
    toast.error("Please sign in to access this page");
    
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
