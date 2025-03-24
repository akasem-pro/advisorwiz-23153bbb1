
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../integrations/supabase/client';

/**
 * Custom hook for sign-up operation with improved error handling
 */
export const useSignUpOperation = (
  networkStatus: 'online' | 'offline' | 'checking', 
  setLoading: (loading: boolean) => void
) => {
  const navigate = useNavigate();

  const signUp = async (email: string, password: string): Promise<boolean> => {
    if (networkStatus === 'offline') {
      toast.error('You appear to be offline. Please check your internet connection.');
      return false;
    }
    
    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting sign up process with email:", email);
      console.log("[Auth Debug] Network status:", networkStatus);
      console.log("[Auth Debug] Redirect URL will be:", window.location.origin || 'https://preview--advisorwiz.lovable.app/auth/callback');
      
      // Use direct call to Supabase auth API with proper redirect URL
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin || 'https://preview--advisorwiz.lovable.app/auth/callback'
        }
      });
      
      // Detailed logging for signup response
      if (error) {
        console.error("[Auth Debug] Sign up error details:", {
          message: error.message,
          status: error.status,
          name: error.name,
        });
        throw error;
      }
      
      console.log("[Auth Debug] Sign up successful:", {
        userId: data.user?.id,
        emailConfirmed: data.user?.email_confirmed_at,
        identities: data.user?.identities,
        session: !!data.session,
      });
      
      toast.success("Registration successful! Please check your email to verify your account.");
      return true;
    } catch (error: any) {
      console.error("[Auth Debug] Detailed sign up error:", {
        message: error.message,
        status: error?.status,
        name: error?.name, 
        stack: error?.stack,
        onLine: navigator.onLine,
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
      
      if (error.message?.includes('email already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (!navigator.onLine || error.message?.includes('network') || 
                error.message?.includes('connection') ||
                error.message?.includes('timed out') ||
                error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your connection and try again.');
      } else {
        // Log more detailed raw error for debugging
        console.error("[Auth Debug] Uncategorized error:", error);
        throw new Error(error.message || 'An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { signUp };
};
