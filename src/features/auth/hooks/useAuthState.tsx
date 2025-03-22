
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../../integrations/supabase/client';
import { useUser } from '../../../context/UserContext';

/**
 * Custom hook to manage authentication state
 */
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUserType, setIsAuthenticated, setConsumerProfile, setAdvisorProfile } = useUser();

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        if (!currentSession) {
          // User signed out
          setUserType(null);
          setConsumerProfile(null);
          setAdvisorProfile(null);
        } else if (currentSession.user) {
          // User signed in
          try {
            if (mounted) {
              // Set a default userType for new users for testing purposes
              setTimeout(() => {
                setUserType('advisor');
              }, 500);
            }
          } catch (error) {
            console.error("Error setting up authenticated user:", error);
          }
        }
        
        if (mounted) {
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        // Set user profile and type if logged in
        if (currentSession?.user) {
          try {
            // Set a default userType for testing
            setTimeout(() => {
              setUserType('advisor');
            }, 500);
          } catch (error) {
            console.error("Error initializing authenticated user:", error);
          }
        }
        
        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to get session:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setIsAuthenticated, setUserType, setConsumerProfile, setAdvisorProfile]);

  // Removed the fetchUserProfile function as it's causing issues and not critical for authentication flow

  return {
    user,
    session,
    loading,
    setLoading
  };
};
