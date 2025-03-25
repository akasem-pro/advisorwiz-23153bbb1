
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../integrations/supabase/client';
import { useProfileCreation } from '../useProfileCreation';
import { UserType } from '../../../../types/profileTypes';

/**
 * Custom hook for sign-up operation with improved error handling
 */
export const useSignUpOperation = (
  networkStatus: 'online' | 'offline' | 'checking', 
  setLoading: (loading: boolean) => void
) => {
  const navigate = useNavigate();
  const { createUserProfile } = useProfileCreation();

  const signUp = async (
    email: string, 
    password: string, 
    userType: UserType = 'consumer'
  ): Promise<boolean> => {
    if (networkStatus === 'offline') {
      toast.error('You appear to be offline. Please check your internet connection.');
      return false;
    }
    
    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting sign up process with email:", email);
      
      // Check for preview environments
      const isPreviewEnv = window.location.hostname.includes('preview') || 
                           window.location.hostname.includes('lovableproject') ||
                           window.location.hostname.includes('localhost');
      
      // For preview environments, simulate the signup process without email verification
      if (isPreviewEnv) {
        console.log("[Auth Debug] Preview environment detected, simulating signup");
        
        // Add a small delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create a mock user for preview environments
        const mockUser = {
          id: `mock-${Date.now()}`,
          email: email,
          user_metadata: {},
          app_metadata: {}
        };
        
        // Create profile for the mock user
        await createUserProfile(mockUser as any, userType);
        
        toast.success("Account created successfully! In a production environment, you would receive an email verification link.");
        return true;
      }
      
      // Real signup process for production
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            user_type: userType
          }
        }
      });
      
      if (error) {
        console.error("[Auth Debug] Sign up error:", error);
        throw error;
      }
      
      console.log("[Auth Debug] Sign up response:", data);
      
      if (data.user) {
        // Create profile for the new user
        await createUserProfile(data.user, userType);
        
        if (data.session) {
          // User was immediately signed in
          toast.success("Account created successfully!");
          navigate('/');
          return true;
        } else {
          // Email confirmation is required
          toast.success("Sign up successful! Please check your email to verify your account.");
          return true;
        }
      } else {
        throw new Error("Unknown error occurred during sign up");
      }
    } catch (error: any) {
      console.error("[Auth Debug] Detailed sign up error:", error);
      
      if (error.message?.includes('already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (!navigator.onLine || error.message?.includes('network') || 
                 error.message?.includes('connection')) {
        throw new Error('Unable to connect to authentication service. Please check your connection and try again.');
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return { signUp };
};
