
import { useEffect } from 'react';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { supabase } from '../../integrations/supabase/client';

/**
 * Hook to manage authentication state synchronization
 */
export const useAuthStateManagement = (
  setIsAuthenticated: (value: boolean) => void
) => {
  const { user } = useAuth();
  
  // Effect to set the authenticated state based on user existence
  useEffect(() => {
    const updateAuthState = async () => {
      // Check if we have a user from the auth context
      if (user) {
        setIsAuthenticated(true);
        console.log("[AuthStateManagement] User authenticated from context:", user.email);
      } else {
        // Fallback to checking with supabase directly
        try {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("[AuthStateManagement] Error checking session:", error);
            setIsAuthenticated(false);
            return;
          }
          
          if (data?.session?.user) {
            setIsAuthenticated(true);
            console.log("[AuthStateManagement] User authenticated from Supabase session:", data.session.user.email);
          } else {
            setIsAuthenticated(false);
            console.log("[AuthStateManagement] No authenticated user found");
          }
        } catch (err) {
          console.error("[AuthStateManagement] Exception checking auth state:", err);
          setIsAuthenticated(false);
        }
      }
    };
    
    updateAuthState();
    
    // Setup auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[AuthStateManagement] Auth state changed:", event, !!session);
      setIsAuthenticated(!!session);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user, setIsAuthenticated]);
};
