
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../../integrations/supabase/client';
import { useAuthState } from '../hooks/useAuthState';
import { useProfileCreation } from '../hooks/useProfileCreation';
import { UserType } from '../../../types/profileTypes';
import { Session, User } from '@supabase/supabase-js';

// Define the context type
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userType: UserType) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  updateEmail: (newEmail: string) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => false,
  resetPassword: async () => false,
  updatePassword: async () => false,
  updateEmail: async () => false,
  sendPasswordResetEmail: async () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, session, loading } = useAuthState();
  const { createUserProfile } = useProfileCreation();
  
  // Authentication functions
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };
  
  const signUp = async (email: string, password: string, userType: UserType) => {
    try {
      // Only allow valid user types for registration
      const validUserType = (userType === 'consumer' || 
                            userType === 'advisor' || 
                            userType === 'firm_admin') 
                            ? userType 
                            : 'consumer';
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: validUserType,
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error.message);
        return false;
      }
      
      if (data?.user) {
        // Create user profile in the database
        await createUserProfile(data.user, validUserType);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };
  
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        console.error('Reset password error:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };
  
  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        console.error('Update password error:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Update password error:', error);
      return false;
    }
  };
  
  const updateEmail = async (newEmail: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      
      if (error) {
        console.error('Update email error:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Update email error:', error);
      return false;
    }
  };
  
  const sendPasswordResetEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        console.error('Send password reset email error:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Send password reset email error:', error);
      return false;
    }
  };

  // Provide all auth functions and state to the context
  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
    sendPasswordResetEmail,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
