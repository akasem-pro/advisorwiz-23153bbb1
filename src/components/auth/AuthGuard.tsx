
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { getEffectiveAuthStatus, isPreviewEnvironment } from '../../utils/mockAuthUtils';
import { UserType } from '../../types/profileTypes';

interface AuthGuardProps {
  children: React.ReactNode;
  userTypes?: UserType[];
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
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("[AuthGuard] Starting auth verification...");
        
        // For development/testing purposes
        // This allows us to bypass authentication in development
        if (isPreviewEnvironment()) {
          console.log("[AuthGuard] Development/preview environment detected, bypassing auth check");
          setIsAuthenticated(true);
          setChecking(false);
          return;
        }
        
        if (user) {
          console.log("[AuthGuard] User authenticated via Auth context:", user.email);
          setIsAuthenticated(true);
          setChecking(false);
          return;
        }
        
        // Attempt to get user from Supabase
        try {
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
        } catch (supabaseError) {
          console.error("[AuthGuard] Supabase auth check failed:", supabaseError);
          // If Supabase check fails, allow access in development environments
          setIsAuthenticated(isPreviewEnvironment());
        }
      } catch (err) {
        console.error("[AuthGuard] Exception during auth check:", err);
        // For safety, allow access in development environments
        setIsAuthenticated(isPreviewEnvironment());
      } finally {
        setChecking(false);
      }
    };
    
    verifyAuth();
  }, [setIsAuthenticated, location.pathname, user]);
  
  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  // Use the effective auth status for development/preview environments
  const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);
  
  console.log("[AuthGuard] Auth decision:", { 
    effectiveIsAuthenticated,
    isAuthenticated,
    isPreviewEnv: isPreviewEnvironment(),
    hasMockUser: !!localStorage.getItem('mock_auth_user'),
    path: location.pathname
  });

  // For development/preview environments, always treat as authenticated
  if (isPreviewEnvironment()) {
    console.log("[AuthGuard] Development/preview environment, bypassing auth check");
    
    // Handle user type restrictions even in development
    if (userTypes && userTypes.length > 0 && userType && !userTypes.includes(userType)) {
      console.log("[AuthGuard] User type not allowed in dev/preview:", { userType, allowedTypes: userTypes });
      return <>{children}</>; // In dev/preview, still render but log the restriction
    }
    
    return <>{children}</>;
  }

  if (!effectiveIsAuthenticated) {
    const destination = location.pathname !== "/" ? location.pathname : undefined;
    
    toast.error("Please sign in to access this page");
    
    return <Navigate to="/signin" state={{ from: destination }} replace />;
  }

  if (userTypes && userTypes.length > 0 && userType && !userTypes.includes(userType)) {
    console.log("[AuthGuard] User type not allowed:", { userType, allowedTypes: userTypes });
    
    if (userType === 'consumer') {
      return <Navigate to="/consumer-dashboard" replace />;
    } else if (userType === 'advisor') {
      return <Navigate to="/advisor-dashboard" replace />;
    } else if (userType === 'firm_admin') {
      return <Navigate to="/firm-dashboard" replace />;
    } else if (userType === 'admin') {
      return <Navigate to="/admin/analytics" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
