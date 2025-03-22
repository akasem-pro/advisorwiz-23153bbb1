
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

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      console.log("Starting sign in process with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
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
      } else if (error.message?.includes('timed out') || error.message?.includes('timeout')) {
        throw new Error('Request timed out. Please try again later.');
      } else if (!navigator.onLine || error.message?.includes('network') || error.message?.includes('connection')) {
        throw new Error('Network connection issue. Please check your internet connection and try again.');
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      console.log("Starting sign up process with email:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
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
      } else if (error.message?.includes('timed out') || error.message?.includes('timeout')) {
        throw new Error('Request timed out. Please try again later.');
      } else if (!navigator.onLine || error.message?.includes('network') || error.message?.includes('connection')) {
        throw new Error('Network connection issue. Please check your internet connection and try again.');
      } else {
        throw new Error(error.message || 'An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
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
