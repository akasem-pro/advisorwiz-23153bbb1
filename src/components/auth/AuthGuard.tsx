
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { AlertCircle } from 'lucide-react';

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
  const { user } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  
  // Check if this is a preview environment
  const isPreviewEnv = window.location.hostname.includes('preview') || 
                       window.location.hostname.includes('lovableproject') ||
                       window.location.hostname.includes('localhost');
  
  // Check auth status from multiple sources
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("[AuthGuard] Starting auth verification...");
        
        // For preview environment with mock auth, skip checks
        if (isPreviewEnv && localStorage.getItem('mock_auth_user')) {
          console.log("[AuthGuard] Preview environment with mock user detected");
          setIsAuthenticated(true);
          setChecking(false);
          return;
        }
        
        // First check if we have a user from Auth context
        if (user) {
          console.log("[AuthGuard] User authenticated via Auth context:", user.email);
          setIsAuthenticated(true);
          setChecking(false);
          return;
        }
        
        // If not, check with Supabase directly
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("[AuthGuard] Error checking authentication:", error);
          setIsAuthenticated(false);
        } else if (data?.user) {
          console.log("[AuthGuard] User authenticated via Supabase:", data.user.email);
          setIsAuthenticated(true);
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
  }, [setIsAuthenticated, location.pathname, user, isPreviewEnv]);
  
  // Show loading state while checking
  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  // Check if authenticated or we're in a preview env with mock user
  const effectiveIsAuthenticated = isAuthenticated || 
    (isPreviewEnv && !!localStorage.getItem('mock_auth_user'));

  console.log("[AuthGuard] Auth decision:", { 
    effectiveIsAuthenticated, 
    isAuthenticated, 
    isPreviewEnv, 
    hasMockUser: !!localStorage.getItem('mock_auth_user'),
    path: location.pathname
  });

  if (!effectiveIsAuthenticated) {
    // Store the intended destination for after login
    const destination = location.pathname !== "/" ? location.pathname : undefined;
    
    // Show toast to inform user
    toast.error("Please sign in to access this page");
    
    // Redirect to login if not authenticated
    return <Navigate to="/sign-in" state={{ from: destination }} replace />;
  }

  // If userTypes is provided, check if current user type is allowed
  if (userTypes && userTypes.length > 0 && userType && !userTypes.includes(userType)) {
    console.log("[AuthGuard] User type not allowed:", { userType, allowedTypes: userTypes });
    
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
