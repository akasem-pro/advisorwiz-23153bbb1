
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../../integrations/supabase/client';
import { useAuthState } from '../hooks/useAuthState';
import { useProfileCreation } from '../hooks/useProfileCreation';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useAuthOperations } from '../hooks/useAuthOperations';
import { UserType } from '../../../types/profileTypes';
import { Session, User } from '@supabase/supabase-js';

// Define the context type
export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  networkStatus: 'online' | 'offline' | 'checking';
  checkNetworkStatus: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userType: UserType) => Promise<boolean>;
  signOut: () => Promise<boolean>; // Changed from void to boolean
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  updateEmail: (newEmail: string) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  setMockUser: (user: User | null) => void;
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
  const [mockUser, setMockUser] = useState<User | null>(null);
  
  // Get the auth operations
  const {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
    sendPasswordResetEmail
  } = useAuthOperations(createUserProfile, setMockUser);
  
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

  // Provide all auth functions and state to the context
  const value: AuthContextType = {
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
