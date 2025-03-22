
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthState } from '../hooks/useAuthState';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useAuthOperations } from '../hooks/useAuthOperations';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
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
  signIn: async () => {},
  signUp: async () => {},
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
  // Use our custom hooks
  const { user, session, loading, setLoading } = useAuthState();
  const { networkStatus, checkNetworkStatus } = useNetworkStatus();
  const [retryAttempts, setRetryAttempts] = useState(0);
  const { signIn, signUp, signOut } = useAuthOperations(networkStatus, setLoading, checkNetworkStatus);

  // Monitor network changes and notify user
  useEffect(() => {
    // We only want to show online notifications if user had previously experienced offline issues
    if (networkStatus === 'online' && retryAttempts > 0) {
      toast.success("You're back online! You can now try again.");
    }
  }, [networkStatus, retryAttempts]);

  // Check network periodically to ensure status is accurate
  useEffect(() => {
    // Initial check
    checkNetworkStatus();
    
    // Periodic check every minute
    const checkInterval = setInterval(() => {
      if (retryAttempts > 0) {
        checkNetworkStatus();
      }
    }, 60000);
    
    return () => clearInterval(checkInterval);
  }, [checkNetworkStatus, retryAttempts]);

  const incrementRetry = () => {
    setRetryAttempts(prev => prev + 1);
  };

  const resetRetryAttempts = () => {
    setRetryAttempts(0);
  };

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
