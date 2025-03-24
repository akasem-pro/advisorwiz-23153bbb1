import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';
import * as dataLayer from '../lib/supabase/dataLayer';
import { Session, User } from '@supabase/supabase-js';

/**
 * Custom hook for using Supabase data with improved error handling and offline support
 * This provides a consistent interface for data operations
 */
export const useSupabase = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Set up connection listener
  useEffect(() => {
    const handleOnline = () => {
      console.log("[useSupabase] Browser reports online");
      setIsOnline(true);
    };
    
    const handleOffline = () => {
      console.log("[useSupabase] Browser reports offline");
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial connection check
    console.log("[useSupabase] Initial online status:", navigator.onLine);
    setIsOnline(navigator.onLine);

    // Test Supabase connection on mount
    const testConnection = async () => {
      try {
        console.log("[useSupabase] Testing Supabase connection");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("[useSupabase] Supabase connection error:", error);
        } else {
          console.log("[useSupabase] Supabase connection successful");
        }
      } catch (err) {
        console.error("[useSupabase] Failed to test Supabase connection:", err);
      }
    };
    
    testConnection();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync offline changes when reconnecting
  useEffect(() => {
    if (isOnline) {
      dataLayer.syncOfflineChanges()
        .then(success => {
          if (success) {
            toast.success('Successfully synced offline changes');
          }
        })
        .catch(() => {
          toast.error('Failed to sync some offline changes');
        });
    }
  }, [isOnline]);

  // Generic data fetching wrapper
  const fetchData = useCallback(async <T,>(
    fetchFunction: () => Promise<dataLayer.DataResult<T>>,
    successCallback?: (data: T) => void,
    errorCallback?: (error: string) => void
  ): Promise<dataLayer.DataResult<T>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      
      if (result.error) {
        setError(result.error);
        if (errorCallback) errorCallback(result.error);
        if (!result.isFromCache) toast.error(result.error);
      } else if (result.data && successCallback) {
        successCallback(result.data);
      }
      
      if (result.isFromCache && !isOnline) {
        toast.info('You are viewing cached data while offline');
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      if (errorCallback) errorCallback(errorMessage);
      toast.error(errorMessage);
      
      return { data: null, error: errorMessage, isFromCache: false };
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);

  // Authentication operations with enhanced logging
  const getCurrentSession = useCallback(() => {
    console.log("[useSupabase] Getting current session");
    return fetchData(() => {
      return dataLayer.getCurrentSession().then(result => {
        console.log("[useSupabase] Current session result:", {
          hasError: !!result.error,
          hasData: !!result.data,
          hasUser: !!result.data?.user,
          hasSession: !!result.data?.session
        });
        return result;
      });
    });
  }, [fetchData]);

  const signInWithEmail = useCallback((email: string, password: string) => {
    console.log("[useSupabase] Signing in with email", email);
    return fetchData(() => {
      return dataLayer.signInWithEmail(email, password).then(result => {
        console.log("[useSupabase] Sign in result:", {
          hasError: !!result.error,
          hasData: !!result.data,
          hasUser: !!result.data?.user,
          hasSession: !!result.data?.session
        });
        return result;
      });
    });
  }, [fetchData]);

  const signUpWithEmail = useCallback((email: string, password: string) => {
    console.log("[useSupabase] Signing up with email", email);
    return fetchData(() => {
      return dataLayer.signUpWithEmail(email, password).then(result => {
        console.log("[useSupabase] Sign up result:", {
          hasError: !!result.error,
          hasData: !!result.data,
          hasUser: !!result.data?.user,
          hasSession: !!result.data?.session
        });
        return result;
      });
    });
  }, [fetchData]);

  // Keep other methods the same
  // ... keep existing code

  return {
    isOnline,
    isLoading,
    error,
    // Data operations
    getProfile: useCallback((userId: string, useCache: boolean = true) => {
      return fetchData(() => dataLayer.getProfile(userId, useCache));
    }, [fetchData]),
    updateProfile: useCallback((userId: string, profileData: any, schema?: any) => {
      return fetchData(() => dataLayer.updateProfile(userId, profileData, schema));
    }, [fetchData]),
    getAdvisorProfiles: useCallback((limit: number = 10, filters: any = {}, useCache: boolean = true) => {
      return fetchData(() => dataLayer.getAdvisorProfiles(limit, filters, useCache));
    }, [fetchData]),
    getCompatibilityScores: useCallback((
      userType: 'consumer' | 'advisor',
      userId: string,
      limit: number = 10,
      useCache: boolean = true
    ) => {
      return fetchData(() => dataLayer.getCompatibilityScores(userType, userId, limit, useCache));
    }, [fetchData]),
    getAppointments: useCallback((userId: string, useCache: boolean = true) => {
      return fetchData(() => dataLayer.getAppointments(userId, useCache));
    }, [fetchData]),
    getChatMessages: useCallback((userId1: string, userId2: string, useCache: boolean = true) => {
      return fetchData(() => dataLayer.getChatMessages(userId1, userId2, useCache));
    }, [fetchData]),
    // Auth operations - now with enhanced logging
    getCurrentSession,
    signInWithEmail,
    signUpWithEmail,
    signOut: useCallback(() => {
      console.log("[useSupabase] Signing out");
      return fetchData(dataLayer.signOut);
    }, [fetchData]),
    // Subscription utilities
    subscribeToChats: useCallback((userId: string, callback: (payload: any) => void) => {
      return dataLayer.subscribeToChats(userId, callback);
    }, []),
    subscribeToAppointments: useCallback((userId: string, callback: (payload: any) => void) => {
      return dataLayer.subscribeToAppointments(userId, callback);
    }, []),
    // Cache management
    invalidateCache: useCallback((key: string) => {
      dataLayer.invalidateCache(key);
    }, []),
    invalidateAllCache: useCallback(() => {
      dataLayer.invalidateAllCache();
    }, []),
    // Add tooltips functions
    getTooltips: useCallback((useCache: boolean = true) => {
      return fetchData(() => Promise.resolve(dataLayer.getTooltips(useCache)));
    }, [fetchData]),
    getTooltipByKey: useCallback((sectionKey: string, useCache: boolean = true) => {
      return fetchData(() => Promise.resolve(dataLayer.getTooltipByKey(sectionKey, useCache)));
    }, [fetchData])
  };
};
