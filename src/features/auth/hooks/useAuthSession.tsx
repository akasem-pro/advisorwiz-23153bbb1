
import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../../integrations/supabase/client';
import { useSupabase } from '../../../hooks/useSupabase';

/**
 * Hook for managing authentication session state with improved error handling
 */
export const useAuthSession = () => {
  const { getCurrentSession } = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Get the initial session and set up auth listener
  useEffect(() => {
    setLoading(true);
    
    // We'll set up the subscription FIRST to not miss any auth events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, !!currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );
    
    // THEN check for existing session
    getCurrentSession().then(({ data, error }) => {
      if (!error && data) {
        setSession(data.session);
        setUser(data.user);
      } else if (error) {
        console.error("Error getting initial session:", error);
      }
      setLoading(false);
    });
    
    // Cleanup subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [getCurrentSession]);

  return { user, session, loading, setLoading };
};
