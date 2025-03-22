
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
        .single();
      
      return profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if we're online
      if (networkStatus === 'offline') {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success("Successfully signed in!");
      navigate('/');
      
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      
      if (error.message?.includes('Failed to fetch') || navigator.onLine === false) {
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
      
      console.log("Starting sign up process");
      
      // Use Supabase client directly instead of fetch API
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
      
      toast.success("Registration successful! Please check your email to verify your account.");
      
      // Don't navigate away if email confirmation is required
      // We'll stay on the sign-in page with a success message
      
    } catch (error: any) {
      console.error("Error signing up:", error);
      
      // More user-friendly error messages
      if (error.message?.includes('email already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (error.message?.includes('Failed to fetch') || navigator.onLine === false) {
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
