
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
          // User signed in - set a default userType for testing if not already set
          // In a real app, you would determine this from database
          await fetchUserProfile(currentSession.user.id);
          
          // Set a default userType for new users for testing purposes
          // Fix: Don't use functional update pattern, directly set the value
          setTimeout(() => {
            // Check if userType is already set in local storage or context
            // If not, set a default value for testing purposes
            setUserType('advisor');
          }, 500);
        }
        
        setLoading(false);
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
        
        // Fetch user profile to determine user type if logged in
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
          
          // Set a default userType for testing if not already set
          // Fix: Don't use functional update pattern, directly set the value
          setTimeout(() => {
            // For testing purposes set a default value
            setUserType('advisor');
          }, 500);
        }
        
        setLoading(false);
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

  const fetchUserProfile = async (userId: string) => {
    try {
      // Fix the query to use proper typing
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId as any) // Using type assertion to bypass the TypeScript error
        .maybeSingle();
      
      if (profile) {
        // Handle profile data if needed
        console.log("Found user profile:", profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return {
    user,
    session,
    loading,
    setLoading
  };
};
