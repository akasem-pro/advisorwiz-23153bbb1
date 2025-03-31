
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../../integrations/supabase/client';
import { useAuthState } from '../hooks/useAuthState';
import { useProfileCreation } from '../hooks/useProfileCreation';
import { UserType } from '../../../types/profileTypes';
import { Session, User } from '@supabase/supabase-js';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

// Define the context type
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  networkStatus: 'online' | 'offline' | 'checking';
  checkNetworkStatus: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userType: UserType) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  updateEmail: (newEmail: string) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  setMockUser: (user: any) => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  networkStatus: 'online',
  checkNetworkStatus: async () => true,
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => false,
  resetPassword: async () => false,
  updatePassword: async () => false,
  updateEmail: async () => false,
  sendPasswordResetEmail: async () => false,
  setMockUser: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, session, loading } = useAuthState();
  const { createUserProfile } = useProfileCreation();
  const { networkStatus, checkNetworkStatus } = useNetworkStatus();
  const [mockUser, setMockUser] = useState<any>(null);
  
  // Effect to check for mock user in localStorage (for preview environments)
  useEffect(() => {
    const storedMockUser = localStorage.getItem('mock_auth_user');
    if (storedMockUser) {
      try {
        setMockUser(JSON.parse(storedMockUser));
      } catch (error) {
        console.error('Error parsing stored mock user:', error);
      }
    }
  }, []);
  
  // Authentication functions
  const signIn = async (email: string, password: string) => {
    try {
      // Check for preview environments
      const isPreviewEnv = window.location.hostname.includes('preview') || 
                          window.location.hostname.includes('lovableproject') ||
                          window.location.hostname.includes('localhost');
      
      if (isPreviewEnv && mockUser) {
        return true;
      }
      
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
    user: mockUser || user,
    session,
    loading,
    networkStatus,
    checkNetworkStatus,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
    sendPasswordResetEmail,
    setMockUser,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
