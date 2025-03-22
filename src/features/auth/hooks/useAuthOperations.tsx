
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
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) throw error;
      return profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Verify network connectivity first
      const isOnline = await checkNetworkStatus();
      if (!isOnline) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      console.log("Starting sign in process with email:", email);
      
      // Set a timeout for the sign-in process
      const signInPromise = supabase.auth.signInWithPassword({ email, password });
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign in request timed out')), 10000);
      });
      
      // Race the sign-in process against the timeout
      const { data, error } = await Promise.race([
        signInPromise,
        timeoutPromise.then(() => { throw new Error('Sign in request timed out'); })
      ]) as { data: any, error: any };
      
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
      } else if (error.message?.includes('timed out') || error.message?.includes('Failed to fetch')) {
        throw new Error('Request timed out. Please try again.');
      } else if (error.message?.includes('network') || error.message?.includes('fetch') || !navigator.onLine) {
        throw new Error('Network error. Please check your connection and try again.');
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
      
      // Verify network connectivity first
      const isOnline = await checkNetworkStatus();
      if (!isOnline) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      console.log("Starting sign up process with email:", email);
      
      // Set a timeout for the sign-up process
      const signUpPromise = supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign up request timed out')), 10000);
      });
      
      // Race the sign-up process against the timeout
      const { data, error } = await Promise.race([
        signUpPromise,
        timeoutPromise.then(() => { throw new Error('Sign up request timed out'); })
      ]) as { data: any, error: any };
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error('No user data returned from signup');
      }
      
      console.log("Sign up successful, user data:", data.user.id, "confirmation sent:", data.session === null);
      
      toast.success("Registration successful! Please check your email to verify your account.");
      
      // Only redirect if there's an active session (no email confirmation required)
      if (data.session) {
        navigate('/');
      }
      
    } catch (error: any) {
      console.error("Error signing up:", error);
      
      if (error.message?.includes('email already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (error.message?.includes('timed out')) {
        throw new Error('Request timed out. Please try again.');
      } else if (error.message?.includes('network') || error.message?.includes('fetch') || !navigator.onLine) {
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
      
      // Verify network connectivity first
      const isOnline = await checkNetworkStatus();
      if (!isOnline) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
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
