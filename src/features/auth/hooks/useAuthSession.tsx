
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../../integrations/supabase/client';
import { useSupabase } from '../../../hooks/useSupabase';

/**
 * Hook for managing authentication session state
 */
export const useAuthSession = () => {
  const { getCurrentSession } = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Set up subscription to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, !!currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );
    
    // Get initial session
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
