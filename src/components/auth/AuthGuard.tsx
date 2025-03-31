
import React, { useEffect, useState, useTransition } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { getEffectiveAuthStatus } from '../../utils/mockAuthUtils';
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
  const [isPending, startTransition] = useTransition();
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("[AuthGuard] Starting auth verification...");
        
        if (user) {
          console.log("[AuthGuard] User authenticated via Auth context:", user.email);
          startTransition(() => {
            setIsAuthenticated(true);
            setChecking(false);
          });
          return;
        }
        
        const isPreviewEnv = window.location.hostname.includes('preview') || 
                             window.location.hostname.includes('lovableproject') ||
                             window.location.hostname.includes('localhost');
        
        if (isPreviewEnv && localStorage.getItem('mock_auth_user')) {
          console.log("[AuthGuard] Preview environment with mock user detected");
          startTransition(() => {
            setIsAuthenticated(true);
            setChecking(false);
          });
          return;
        }
        
        const { data, error } = await supabase.auth.getUser();
        
        startTransition(() => {
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
          setChecking(false);
        });
      } catch (err) {
        console.error("[AuthGuard] Exception during auth check:", err);
        startTransition(() => {
          setIsAuthenticated(false);
          setChecking(false);
        });
      }
    };
    
    verifyAuth();
  }, [setIsAuthenticated, location.pathname, user, startTransition]);
  
  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  const effectiveIsAuthenticated = getEffectiveAuthStatus(isAuthenticated);
  
  console.log("[AuthGuard] Auth decision:", { 
    effectiveIsAuthenticated, 
    isAuthenticated, 
    isPreviewEnv: window.location.hostname.includes('preview') || 
                  window.location.hostname.includes('lovableproject') ||
                  window.location.hostname.includes('localhost'), 
    hasMockUser: !!localStorage.getItem('mock_auth_user'),
    path: location.pathname
  });

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
    }
  }

  return <>{children}</>;
};

export default React.memo(AuthGuard);
