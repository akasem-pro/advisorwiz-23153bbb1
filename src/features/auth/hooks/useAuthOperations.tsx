
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Custom hook for authentication operations with improved error handling
 */
export const useAuthOperations = (
  networkStatus: 'online' | 'offline' | 'checking', 
  setLoading: (loading: boolean) => void,
  checkNetworkStatus: () => Promise<boolean>
) => {
  const navigate = useNavigate();

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Check online status first
      if (networkStatus === 'offline') {
        throw new Error('Unable to connect to authentication service. Please check your connection and try again.');
      }
      
      console.log("Starting sign in process with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          // Add some additional options for better reliability
          captchaToken: undefined,
        }
      });
      
      if (error) throw error;
      
      console.log("Sign in successful, redirecting to home page");
      toast.success("Successfully signed in!");
      navigate('/');
      return true;
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please try again.');
      } else if (error.message?.includes('User not found')) {
        throw new Error('No account found with this email. Please check your email or sign up.');
      } else if (error.status === 429) {
        throw new Error('Too many sign-in attempts. Please try again later.');
      } else if (!navigator.onLine || error.message?.includes('network') || 
                error.message?.includes('connection') || error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your connection and try again.');
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Check online status first
      if (networkStatus === 'offline') {
        throw new Error('Unable to connect to authentication service. Please check your connection and try again.');
      }
      
      console.log("Starting sign up process with email:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          captchaToken: undefined,
        }
      });
      
      if (error) throw error;
      
      console.log("Sign up successful:", data.user?.id);
      return true;
    } catch (error: any) {
      console.error("Error signing up:", error);
      
      if (error.message?.includes('email already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (error.status === 429) {
        throw new Error('Too many sign-up attempts. Please try again later.');
      } else if (!navigator.onLine || error.message?.includes('network') || 
                error.message?.includes('connection') || error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your connection and try again.');
      } else {
        throw new Error(error.message || 'An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      
      await supabase.auth.signOut();
      toast.success("Successfully signed out");
      navigate('/sign-in');
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return {
    signIn,
    signUp,
    signOut
  };
};
