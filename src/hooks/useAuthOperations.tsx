
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

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
    return (
      !navigator.onLine ||
      error?.message?.toLowerCase().includes('network') ||
      error?.message?.toLowerCase().includes('connection') ||
      error?.message?.toLowerCase().includes('failed to fetch') ||
      error?.message?.toLowerCase().includes('offline') ||
      error?.name === 'AuthRetryableFetchError' ||
      error?.message?.includes('Network Error') ||
      error?.code === 'NETWORK_ERROR'
    );
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if we're online
      if (networkStatus === 'offline') {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      console.log("Starting sign in process with email:", email);
      
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
      
      // Use direct timeout to check for network availability before proceeding
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          if (!navigator.onLine) {
            reject(new Error('Network connection appears to be unavailable. Please check your internet connection.'));
          } else {
            clearTimeout(timeoutId);
            resolve(true);
          }
        }, 1000);
      });
      
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
