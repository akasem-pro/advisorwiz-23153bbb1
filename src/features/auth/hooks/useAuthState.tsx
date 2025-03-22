
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../../integrations/supabase/client';

/**
 * Hook for managing authentication state
 */
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initial session check
    const initAuth = async () => {
      setLoading(true);
      // Get the current session
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData?.session) {
        setSession(sessionData.session);
        setUser(sessionData.session.user);
      }
      
      setLoading(false);
    };
    
    // Call the init function
    initAuth();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, !!currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );
    
    // Cleanup: unsubscribe on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  return { user, session, loading, setLoading };
};
