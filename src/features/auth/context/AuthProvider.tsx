
import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';
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
  // Check if mock auth is active (for preview environments)
  const [mockUser, setMockUser] = useState<any>(null);
  
  // Use custom hooks to separate concerns
  const { user: supabaseUser, session, loading: sessionLoading } = useAuthSession();
  const { 
    networkStatus, 
    retryAttempts, 
    checkNetworkStatus: baseCheckNetworkStatus, 
    incrementRetry, 
    resetRetryAttempts 
  } = useNetworkRetry();
  const { signIn: supabaseSignIn, signUp, loading: authActionLoading } = useAuthActions();
  
  // Enhanced sign-in function that handles both real and mock auth
  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Check if we're in a preview environment
    const isPreviewEnv = window.location.hostname.includes('preview') || 
                         window.location.hostname.includes('lovableproject') ||
                         window.location.hostname.includes('localhost');
    
    if (isPreviewEnv) {
      // Preview sign-in is handled in useSignInHandler for simplicity
      // Just pass through to Supabase but don't worry if it fails
      try {
        await supabaseSignIn(email, password);
      } catch (error) {
        console.log("[Auth Provider] Preview mode - ignoring Supabase sign-in error");
      }
      
      return true;
    } else {
      // Real authentication via Supabase
      return supabaseSignIn(email, password);
    }
  };
  
  // Enhanced sign-out function that handles both real and mock auth
  const signOut = async (): Promise<void> => {
    // Clear mock auth if it exists
    localStorage.removeItem('mock_auth_user');
    setMockUser(null);
    
    // Also try regular sign out
    try {
      await useAuthActions().signOut();
    } catch (error) {
      console.error("[Auth Provider] Error during sign out:", error);
    }
  };
  
  // Check for mock auth on load
  useEffect(() => {
    const mockAuthData = localStorage.getItem('mock_auth_user');
    if (mockAuthData) {
      try {
        setMockUser(JSON.parse(mockAuthData));
      } catch (error) {
        console.error("[Auth Provider] Error parsing mock auth data:", error);
        localStorage.removeItem('mock_auth_user');
      }
    }
  }, []);
  
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
  
  // Determine actual user - could be from Supabase or from mock auth
  const user = supabaseUser || mockUser;

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
    mockUser,
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
