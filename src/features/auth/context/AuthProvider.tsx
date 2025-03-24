
import React, { createContext, useContext, useMemo } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthSession } from '../hooks/useAuthSession';
import { useNetworkRetry } from '../hooks/useNetworkRetry';
import { useAuthActions } from '../hooks/useAuthActions';
import { checkSupabaseConnection } from '../../../integrations/supabase/client';

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
    checkNetworkStatus: baseCheckNetworkStatus, 
    incrementRetry, 
    resetRetryAttempts 
  } = useNetworkRetry();
  const { signIn, signUp, signOut, loading: authActionLoading } = useAuthActions();
  
  // Enhanced network check that uses both our built-in check and the Supabase connection check
  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      console.log("[Auth Provider] Starting network status check");
      
      // Check via our standard method
      const basicNetworkOk = await baseCheckNetworkStatus();
      console.log("[Auth Provider] Basic network check result:", basicNetworkOk);
      
      if (!basicNetworkOk) {
        console.log("[Auth Provider] Basic network check failed, returning false");
        return false;
      }
      
      // In preview/dev environments, skip additional check
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('localhost')) {
        console.log("[Auth Provider] Preview environment detected, skipping Supabase connection check");
        return true;
      }
      
      // Double check with Supabase-specific connection test
      console.log("[Auth Provider] Running Supabase-specific connection test");
      const supabaseConnectionOk = await checkSupabaseConnection();
      console.log("[Auth Provider] Supabase connection check result:", supabaseConnectionOk);
      
      return supabaseConnectionOk;
    } catch (error) {
      console.error("[Auth Provider] Enhanced network check failed:", error);
      return false;
    }
  };
  
  // Combine loading states
  const loading = sessionLoading || authActionLoading;

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
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
  }), [
    session, 
    user, 
    signIn, 
    signUp, 
    signOut, 
    loading,
    networkStatus,
    retryAttempts
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
