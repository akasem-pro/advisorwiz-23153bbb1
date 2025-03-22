
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../integrations/supabase/client';
import { useUser } from '../../context/UserContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const { setUserType, setIsAuthenticated, setConsumerProfile, setAdvisorProfile } = useUser();
  const navigate = useNavigate();

  // Network status check
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    // Check initial status
    setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    
    // Set up listeners for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        if (!currentSession) {
          // User signed out
          setUserType(null);
          setConsumerProfile(null);
          setAdvisorProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        setLoading(false);
        
        // Fetch user profile to determine user type if logged in
        if (currentSession?.user) {
          fetchUserProfile(currentSession.user.id);
        }
      } catch (error) {
        console.error("Failed to get session:", error);
        setLoading(false);
      }
    };

    initializeAuth();
    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profile) {
        // Logic to set user type based on profile
        // For demo, this would typically be stored in the profile
        // Here we're just using a simple approach
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Ping Supabase to verify connectivity
  const checkSupabaseConnection = async (): Promise<boolean> => {
    try {
      // Simple test query to verify connection
      await supabase.from('profiles').select('count').limit(1);
      return true;
    } catch (error) {
      console.error("Supabase connection check failed:", error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if we're online
      if (networkStatus === 'offline') {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      // Test Supabase connection
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to the authentication service. Please try again later.');
      }
      
      // Attempt sign in with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      clearTimeout(timeoutId);
      
      if (error) throw error;
      
      toast.success("Successfully signed in!");
      navigate('/');
      
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      
      if (error.name === 'AbortError') {
        throw new Error('The request took too long to complete. Please try again.');
      }
      
      // Add more user-friendly error messages
      if (error.message?.includes('Failed to fetch') || navigator.onLine === false) {
        throw new Error('Network error. Please check your connection and try again.');
      } else if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please try again.');
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if we're online
      if (networkStatus === 'offline') {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      // Test Supabase connection
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to the authentication service. Please try again later.');
      }
      
      console.log("Starting sign up process");
      
      // Attempt signup with timeout protection
      const signupPromise = supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('The request timed out. Please try again later.')), 15000);
      });
      
      // Race the sign up request against the timeout
      const result = await Promise.race([signupPromise, timeoutPromise]) as { data: any, error: any } | Error;
      
      // Handle timeout case
      if (result instanceof Error) {
        throw result;
      }
      
      const { data, error } = result;
      
      if (error) throw error;
      
      if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
          throw new Error('This email is already registered. Please sign in instead.');
        }
        
        toast.success("Registration successful! Please check your email to verify your account.");
        
        // Navigate to sign-in after successful signup
        navigate('/sign-in');
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      
      // More user-friendly error messages
      if (error.message?.includes('timed out')) {
        throw new Error('The request took too long to complete. Please try again later.');
      } else if (error.message?.includes('Failed to fetch') || navigator.onLine === false || error.code === 20) {
        throw new Error('Network error. Please check your connection and try again.');
      } else if (error.message?.includes('already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      } else {
        throw new Error(error.message || 'An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast.success("Successfully signed out");
      navigate('/sign-in');
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      toast.error(error.message || "Failed to sign out");
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
      loading,
      networkStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
