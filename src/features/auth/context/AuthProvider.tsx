import React, { createContext, useContext, useMemo, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthSession } from '../hooks/useAuthSession';
import { useNetworkRetry } from '../hooks/useNetworkRetry';
import { useAuthActions } from '../hooks/useAuthActions';
import { checkSupabaseConnection } from '../../../integrations/supabase/client';
import { UserType } from '../../../types/profileTypes';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userType?: UserType) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
  networkStatus: 'online' | 'offline' | 'checking';
  checkNetworkStatus: () => Promise<boolean>;
  retryAttempts: number;
  incrementRetry: () => void;
  resetRetryAttempts: () => void;
  setMockUser: (user: any) => void; 
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
  resetRetryAttempts: () => {},
  setMockUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [mockUser, setMockUser] = useState<any>(null);
  
  const { user: supabaseUser, session, loading: sessionLoading } = useAuthSession();
  const { 
    networkStatus, 
    retryAttempts, 
    checkNetworkStatus: baseCheckNetworkStatus, 
    incrementRetry, 
    resetRetryAttempts 
  } = useNetworkRetry();
  const { signIn: supabaseSignIn, signUp: supabaseSignUp, signOut: supabaseSignOut, loading: authActionLoading } = useAuthActions();

  React.useEffect(() => {
    if (mockUser) {
      localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
      console.log("[Auth Provider] Updated mock auth user in localStorage:", mockUser);
    }
  }, [mockUser]);
  
  React.useEffect(() => {
    const mockAuthData = localStorage.getItem('mock_auth_user');
    if (mockAuthData) {
      try {
        const parsedUser = JSON.parse(mockAuthData);
        console.log("[Auth Provider] Found mock auth user in localStorage:", parsedUser);
        setMockUser(parsedUser);
      } catch (error) {
        console.error("[Auth Provider] Error parsing mock auth data:", error);
        localStorage.removeItem('mock_auth_user');
      }
    }
  }, []);
  
  const signIn = async (email: string, password: string): Promise<boolean> => {
    const isPreviewEnv = window.location.hostname.includes('preview') || 
                         window.location.hostname.includes('lovableproject') ||
                         window.location.hostname.includes('localhost');
    
    if (isPreviewEnv) {
      try {
        const success = await supabaseSignIn(email, password);
        if (success) {
          return true;
        }
      } catch (error) {
        console.log("[Auth Provider] Preview mode - ignoring Supabase sign-in error");
      }
      
      const mockUserData = {
        id: 'mock-user-id',
        email: email,
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {
          name: email.split('@')[0],
          avatar_url: ''
        },
        aud: 'authenticated',
        role: 'authenticated'
      };
      
      setMockUser(mockUserData);
      return true;
    } else {
      return supabaseSignIn(email, password);
    }
  };
  
  const signUp = async (email: string, password: string, userType: UserType = 'consumer'): Promise<boolean> => {
    const isPreviewEnv = window.location.hostname.includes('preview') || 
                         window.location.hostname.includes('lovableproject') ||
                         window.location.hostname.includes('localhost');
    
    if (isPreviewEnv) {
      try {
        const success = await supabaseSignUp(email, password, userType);
        if (success) {
          return true;
        }
      } catch (error) {
        console.log("[Auth Provider] Preview mode - ignoring Supabase sign-up error");
      }
      
      const mockUserData = {
        id: 'mock-user-id',
        email: email,
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {
          name: email.split('@')[0],
          avatar_url: '',
          user_type: userType
        },
        aud: 'authenticated',
        role: 'authenticated'
      };
      
      setMockUser(mockUserData);
      return true;
    } else {
      return supabaseSignUp(email, password, userType);
    }
  };
  
  const signOut = async (): Promise<void> => {
    localStorage.removeItem('mock_auth_user');
    setMockUser(null);
    
    try {
      await supabaseSignOut();
    } catch (error) {
      console.error("[Auth Provider] Error during sign out:", error);
    }
  };
  
  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      console.log("[Auth Provider] Starting network status check");
      
      const basicNetworkOk = await baseCheckNetworkStatus();
      console.log("[Auth Provider] Basic network check result:", basicNetworkOk);
      
      if (!basicNetworkOk) {
        console.log("[Auth Provider] Basic network check failed, returning false");
        return false;
      }
      
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('localhost')) {
        console.log("[Auth Provider] Preview environment detected, skipping Supabase connection check");
        return true;
      }
      
      console.log("[Auth Provider] Running Supabase-specific connection test");
      const supabaseConnectionOk = await checkSupabaseConnection();
      console.log("[Auth Provider] Supabase connection check result:", supabaseConnectionOk);
      
      return supabaseConnectionOk;
    } catch (error) {
      console.error("[Auth Provider] Enhanced network check failed:", error);
      return false;
    }
  };
  
  const loading = sessionLoading || authActionLoading;
  
  const user = supabaseUser || mockUser;

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
    resetRetryAttempts,
    setMockUser
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
