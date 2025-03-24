
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../integrations/supabase/client';

/**
 * Custom hook for sign-in operation with improved error handling
 */
export const useSignInOperation = (
  networkStatus: 'online' | 'offline' | 'checking', 
  setLoading: (loading: boolean) => void
) => {
  const navigate = useNavigate();

  const signIn = async (email: string, password: string): Promise<boolean> => {
    if (networkStatus === 'offline') {
      toast.error('You appear to be offline. Please check your internet connection.');
      return false;
    }
    
    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting sign in process with email:", email);
      console.log("[Auth Debug] Network status:", networkStatus);
      
      // Detailed logging of the request
      console.log("[Auth Debug] Making auth request to Supabase");
      
      // Use a direct call to Supabase auth API
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      // Log the raw response for debugging
      if (error) {
        console.error("[Auth Debug] Sign in error details:", {
          message: error.message,
          status: error.status,
          name: error.name,
          stack: error.stack,
        });
        throw error;
      }
      
      console.log("[Auth Debug] Sign in successful, user data:", {
        id: data.user?.id,
        email: data.user?.email,
        sessionExists: !!data.session,
      });
      
      toast.success("Successfully signed in!");
      navigate('/');
      return true;
    } catch (error: any) {
      console.error("[Auth Debug] Detailed sign in error:", {
        message: error.message,
        status: error?.status,
        name: error?.name,
        statusText: error?.statusText,
        stack: error?.stack,
        onLine: navigator.onLine,
        url: window.location.href,
        origin: window.location.origin
      });
      
      // Add more detailed network diagnostic info
      console.log("[Auth Debug] Network diagnostics:", {
        navigatorOnLine: navigator.onLine,
        networkStatus: networkStatus,
        userAgent: navigator.userAgent,
        windowWidth: window.innerWidth,
        windowOrigin: window.location.origin,
        windowLocation: window.location.href,
      });
      
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please try again.');
      } else if (error.message?.includes('User not found')) {
        throw new Error('No account found with this email. Please check your email or sign up.');
      } else if (!navigator.onLine || error.message?.includes('network') || 
                error.message?.includes('connection') || 
                error.message?.includes('timed out') ||
                error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your connection and try again.');
      } else {
        // Log more detailed raw error for debugging
        console.error("[Auth Debug] Uncategorized error:", error);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return { signIn };
};
