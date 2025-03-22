
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
    if (!navigator.onLine) {
      return true;
    }
    
    // Expanded error detection for network issues
    return !!(
      error?.message?.toLowerCase().includes('network') ||
      error?.message?.toLowerCase().includes('connection') ||
      error?.message?.toLowerCase().includes('failed to fetch') ||
      error?.message?.toLowerCase().includes('offline') ||
      error?.name === 'AuthRetryableFetchError' ||
      error?.message?.includes('Network Error') ||
      error?.code === 'NETWORK_ERROR' ||
      error?.status === 0 ||
      error?.__isAuthError === true
    );
  };

  const waitForNetworkConnection = async (timeoutMs = 5000): Promise<boolean> => {
    if (networkStatus === 'online') {
      return true;
    }
    
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve(navigator.onLine);
      }, timeoutMs);
      
      const checkOnline = () => {
        clearTimeout(timeoutId);
        resolve(true);
      };
      
      window.addEventListener('online', checkOnline, { once: true });
      
      // Also clean up if we resolve due to timeout
      setTimeout(() => {
        window.removeEventListener('online', checkOnline);
      }, timeoutMs + 100);
    });
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if we're offline
      if (networkStatus === 'offline') {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      console.log("Starting sign in process with email:", email);
      
      // Wait for network connection
      const hasNetwork = await waitForNetworkConnection();
      if (!hasNetwork) {
        throw new Error('Network connection unavailable. Please check your internet connection and try again.');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      console.log("Sign in successful, user data:", data.user?.id);
      
      toast.success("Successfully signed in!");
      navigate('/');
      
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      console.error("Error signing in:", error.message, error);
      
      if (isNetworkError(error)) {
        throw new Error('Network error. Please check your connection and try again.');
      } else if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please try again.');
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
      
      // Check if we're online
      if (networkStatus === 'offline') {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      console.log("Starting sign up process with email:", email);
      
      // Wait for network connection with shorter timeout
      const hasNetwork = await waitForNetworkConnection(3000);
      if (!hasNetwork) {
        throw new Error('Network connection unavailable. Please check your internet connection and try again.');
      }
      
      // Only attempt signup if we have network connection
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
      } else if (isNetworkError(error)) {
        throw new Error('Network error. Please check your connection and try again.');
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
