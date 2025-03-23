
import { useState } from 'react';
import { toast } from 'sonner';
import { useSupabase } from '../../../hooks/useSupabase';

/**
 * Hook for handling authentication actions
 */
export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  
  const { 
    signInWithEmail,
    signUpWithEmail,
    signOut: supabaseSignOut
  } = useSupabase();

  // Auth operations using data layer
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await signInWithEmail(email, password);
      
      if (error || !data || !data.user) {
        return false;
      }
      
      toast.success("Successfully signed in!");
      return true;
    } catch (error) {
      console.error("Sign in error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await signUpWithEmail(email, password);
      
      if (error || !data || !data.user) {
        return false;
      }
      
      toast.success("Registration successful! Please check your email to verify your account.");
      return true;
    } catch (error) {
      console.error("Sign up error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabaseSignOut();
      
      if (!error) {
        toast.success("Successfully signed out");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    loading,
    setLoading
  };
};
