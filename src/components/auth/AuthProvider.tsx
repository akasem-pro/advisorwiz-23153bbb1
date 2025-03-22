
import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthState } from '../../hooks/useAuthState';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useAuthOperations } from '../../hooks/useAuthOperations';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  networkStatus: 'online' | 'offline' | 'checking';
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  loading: true,
  networkStatus: 'checking'
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use our custom hooks
  const { user, session, loading, setLoading } = useAuthState();
  const { networkStatus } = useNetworkStatus();
  const { signIn, signUp, signOut } = useAuthOperations(networkStatus, setLoading);

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      networkStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
