
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Custom hook for authentication operations
 */
export const useAuthOperations = (
  networkStatus: 'online' | 'offline' | 'checking', 
  setLoading: (loading: boolean) => void
) => {
  const navigate = useNavigate();
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      return profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const isNetworkError = (error: any): boolean => {
    // Check if browser says we're online
    if (navigator.onLine) {
      return false;
    }
    
    // Standard checks for network-related errors
    const errorMsg = error?.message?.toLowerCase() || '';
    return !!(
      errorMsg.includes('network') ||
      errorMsg.includes('connection') ||
      errorMsg.includes('failed to fetch') ||
      errorMsg.includes('offline') ||
      error?.name === 'AbortError' ||
      error?.name === 'AuthRetryableFetchError' ||
      errorMsg.includes('network error') ||
      error?.code === 'NETWORK_ERROR' ||
      error?.status === 0 ||
      error?.__isAuthError === true
    );
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      console.log("Starting sign in process with email:", email);
      
      // Add a brief timeout to ensure UI feedback
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      console.log("Sign in successful, user data:", data?.user?.id);
      
      if (!data?.user) {
        throw new Error('Authentication failed. Please try again.');
      }
      
      toast.success("Successfully signed in!");
      
      // Fetch user profile data after successful login
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
      
      // Navigate after successful sign-in
      navigate('/');
      
    } catch (error: any) {
      console.error("Error signing in:", error.message, error);
      
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please try again.');
      } else if (!navigator.onLine) {
        throw new Error('You appear to be offline. Please check your internet connection.');
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
      
      if (!data.user) {
        throw new Error('No user data returned from signup');
      }
      
      console.log("Sign up successful, user data:", data.user.id, "confirmation sent:", data.session === null);
      
      toast.success("Registration successful! Please check your email to verify your account.");
      
      // Don't navigate away if email confirmation is required
      // We'll stay on the sign-in page with a success message
      
    } catch (error: any) {
      console.error("Error signing up:", error);
      
      if (error.message?.includes('email already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (!navigator.onLine) {
        throw new Error('You appear to be offline. Please check your internet connection.');
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
      toast.error(error.message || "Failed to sign out");
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
