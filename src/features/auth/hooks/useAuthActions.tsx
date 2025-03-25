
import { useState } from 'react';
import { supabase } from '../../../integrations/supabase/client';
import { toast } from 'sonner';
import { UserType } from '../../../types/profileTypes';

/**
 * Hook for handling authentication actions
 */
export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  
  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('[Auth Actions] Signing in with email', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('[Auth Actions] Sign in error:', error);
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else {
          toast.error('Failed to sign in. Please try again.');
        }
        return false;
      }
      
      console.log('[Auth Actions] Sign in successful');
      toast.success('Sign in successful!');
      return true;
    } catch (error: any) {
      console.error('[Auth Actions] Sign in exception:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Sign up with email and password
   */
  const signUp = async (
    email: string, 
    password: string, 
    userType: UserType = 'consumer'
  ): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('[Auth Actions] Signing up with email', email);
      
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
        console.error('[Auth Actions] Sign up error:', error);
        toast.error('Failed to sign up. Please try again.');
        return false;
      }
      
      if (data.user) {
        if (data.session) {
          console.log('[Auth Actions] Sign up successful with session');
          return true;
        }
        
        console.log('[Auth Actions] Sign up successful, email confirmation needed');
        return true;
      }
      
      console.error('[Auth Actions] Sign up failed, no user returned');
      toast.error('Failed to create account. Please try again.');
      return false;
    } catch (error: any) {
      console.error('[Auth Actions] Sign up exception:', error);
      toast.error(error.message || 'An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Sign out the current user
   */
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log('[Auth Actions] Signing out');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[Auth Actions] Sign out error:', error);
        toast.error('Failed to sign out. Please try again.');
        return;
      }
      
      console.log('[Auth Actions] Sign out successful');
      toast.success('You have been signed out');
    } catch (error) {
      console.error('[Auth Actions] Sign out exception:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    signIn,
    signUp,
    signOut
  };
};
