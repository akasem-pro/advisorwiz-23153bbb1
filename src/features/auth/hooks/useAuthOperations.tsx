
import { useNavigate } from 'react-router-dom';
import { supabase, checkSupabaseConnection } from '../../../integrations/supabase/client';
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
    
    // More extensive error detection for network issues
    return !!(
      error?.message?.toLowerCase().includes('network') ||
      error?.message?.toLowerCase().includes('connection') ||
      error?.message?.toLowerCase().includes('failed to fetch') ||
      error?.message?.toLowerCase().includes('offline') ||
      error?.name === 'AbortError' ||
      error?.name === 'AuthRetryableFetchError' ||
      error?.message?.includes('Network Error') ||
      error?.code === 'NETWORK_ERROR' ||
      error?.status === 0 ||
      error?.__isAuthError === true
    );
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if we're offline before even trying
      if (networkStatus === 'offline' || !navigator.onLine) {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      console.log("Starting sign in process with email:", email);
      
      // First verify Supabase connection
      const canConnect = await checkSupabaseConnection();
      if (!canConnect) {
        throw new Error('Cannot connect to the authentication service. Please try again later.');
      }
      
      // Directly use the Supabase client for authentication
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
      if (networkStatus === 'offline' || !navigator.onLine) {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      console.log("Starting sign up process with email:", email);
      
      // Verify Supabase connection first
      const canConnect = await checkSupabaseConnection();
      if (!canConnect) {
        throw new Error('Cannot connect to the authentication service. Please try again later.');
      }
      
      // Directly use the Supabase client for sign up
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
