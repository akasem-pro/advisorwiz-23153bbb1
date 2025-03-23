
import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthSession } from '../hooks/useAuthSession';
import { useNetworkRetry } from '../hooks/useNetworkRetry';
import { useAuthActions } from '../hooks/useAuthActions';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
  networkStatus: 'online' | 'offline' | 'checking';
  checkNetworkStatus: () => Promise<boolean>;
  retryAttempts: number;
  incrementRetry: () => void;
  resetRetryAttempts: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => {},
  loading: true,
  networkStatus: 'checking',
  checkNetworkStatus: async () => false,
  retryAttempts: 0,
  incrementRetry: () => {},
  resetRetryAttempts: () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use custom hooks to separate concerns
  const { user, session, loading: sessionLoading } = useAuthSession();
  const { 
    networkStatus, 
    retryAttempts, 
    checkNetworkStatus, 
    incrementRetry, 
    resetRetryAttempts 
  } = useNetworkRetry();
  const { signIn, signUp, signOut, loading: authActionLoading } = useAuthActions();
  
  // Combine loading states
  const loading = sessionLoading || authActionLoading;

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      networkStatus,
      checkNetworkStatus,
      retryAttempts,
      incrementRetry,
      resetRetryAttempts
    }}>
      {children}
    </AuthContext.Provider>
  );
};
