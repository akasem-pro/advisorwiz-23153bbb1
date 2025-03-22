
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthState } from '../../hooks/useAuthState';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useAuthOperations } from '../../hooks/useAuthOperations';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  networkStatus: 'online' | 'offline' | 'checking';
  checkNetworkStatus: () => Promise<void>;
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
  checkNetworkStatus: async () => {},
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
  const { signIn, signUp, signOut } = useAuthOperations(networkStatus, setLoading);

  // Monitor network changes and notify user
  useEffect(() => {
    if (networkStatus === 'online' && retryAttempts > 0) {
      toast.success("You're back online! You can now try again.");
    } else if (networkStatus === 'offline') {
      toast.error("You're offline. Some features may not work.");
    }
  }, [networkStatus, retryAttempts]);

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
