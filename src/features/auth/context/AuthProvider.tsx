import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useSupabase } from '../../../hooks/useSupabase';
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';

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
  const { 
    isOnline, 
    isLoading, 
    getCurrentSession,
    signInWithEmail,
    signUpWithEmail,
    signOut: supabaseSignOut
  } = useSupabase();
  
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    setLoading(true);
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, !!currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );
    
    getCurrentSession().then(({ session, user, error }) => {
      if (!error) {
        setSession(session);
        setUser(user);
      } else {
        console.error("Error getting initial session:", error);
      }
      setLoading(false);
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [getCurrentSession]);

  useEffect(() => {
    setNetworkStatus(isOnline ? 'online' : 'offline');
  }, [isOnline]);

  useEffect(() => {
    if (networkStatus === 'online' && retryAttempts > 0) {
      toast.success("You're back online! You can now try again.");
    }
  }, [networkStatus, retryAttempts]);

  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch('https://www.google.com/generate_204', { 
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        setNetworkStatus('online');
        return true;
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Network check failed:", error);
        setNetworkStatus('offline');
        return false;
      }
    } catch (error) {
      console.error("Network status check error:", error);
      setNetworkStatus('offline');
      return false;
    }
  };

  const incrementRetry = () => {
    setRetryAttempts(prev => prev + 1);
  };

  const resetRetryAttempts = () => {
    setRetryAttempts(0);
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { user: authUser, error } = await signInWithEmail(email, password);
      
      if (error || !authUser) {
        return false;
      }
      
      toast.success("Successfully signed in!");
      resetRetryAttempts();
      return true;
    } catch (error) {
      console.error("Sign in error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { user: authUser, error } = await signUpWithEmail(email, password);
      
      if (error || !authUser) {
        return false;
      }
      
      toast.success("Registration successful! Please check your email to verify your account.");
      resetRetryAttempts();
      return true;
    } catch (error) {
      console.error("Sign up error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabaseSignOut();
      
      if (!error) {
        toast.success("Successfully signed out");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading: loading || isLoading,
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
