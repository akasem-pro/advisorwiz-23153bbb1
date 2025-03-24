
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
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
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial connection check
    setIsOnline(navigator.onLine);

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

  // Specific data operations
  const getProfile = useCallback((userId: string, useCache: boolean = true) => {
    return fetchData(() => dataLayer.getProfile(userId, useCache));
  }, [fetchData]);

  const updateProfile = useCallback((userId: string, profileData: any, schema?: any) => {
    return fetchData(() => dataLayer.updateProfile(userId, profileData, schema));
  }, [fetchData]);

  const getAdvisorProfiles = useCallback((limit: number = 10, filters: any = {}, useCache: boolean = true) => {
    return fetchData(() => dataLayer.getAdvisorProfiles(limit, filters, useCache));
  }, [fetchData]);

  const getCompatibilityScores = useCallback((
    userType: 'consumer' | 'advisor',
    userId: string,
    limit: number = 10,
    useCache: boolean = true
  ) => {
    return fetchData(() => dataLayer.getCompatibilityScores(userType, userId, limit, useCache));
  }, [fetchData]);

  const getAppointments = useCallback((userId: string, useCache: boolean = true) => {
    return fetchData(() => dataLayer.getAppointments(userId, useCache));
  }, [fetchData]);

  const getChatMessages = useCallback((userId1: string, userId2: string, useCache: boolean = true) => {
    return fetchData(() => dataLayer.getChatMessages(userId1, userId2, useCache));
  }, [fetchData]);

  // Auth operations
  const getCurrentSession = useCallback(() => {
    return fetchData(dataLayer.getCurrentSession);
  }, [fetchData]);

  const signInWithEmail = useCallback((email: string, password: string) => {
    return fetchData(() => dataLayer.signInWithEmail(email, password));
  }, [fetchData]);

  const signUpWithEmail = useCallback((email: string, password: string) => {
    return fetchData(() => dataLayer.signUpWithEmail(email, password));
  }, [fetchData]);

  const signOut = useCallback(() => {
    return fetchData(dataLayer.signOut);
  }, [fetchData]);

  // Subscription utilities
  const subscribeToChats = useCallback((userId: string, callback: (payload: any) => void) => {
    return dataLayer.subscribeToChats(userId, callback);
  }, []);

  const subscribeToAppointments = useCallback((userId: string, callback: (payload: any) => void) => {
    return dataLayer.subscribeToAppointments(userId, callback);
  }, []);

  // Cache management
  const invalidateCache = useCallback((key: string) => {
    dataLayer.invalidateCache(key);
  }, []);

  const invalidateAllCache = useCallback(() => {
    dataLayer.invalidateAllCache();
  }, []);

  return {
    isOnline,
    isLoading,
    error,
    // Data operations
    getProfile,
    updateProfile,
    getAdvisorProfiles,
    getCompatibilityScores,
    getAppointments,
    getChatMessages,
    // Auth operations
    getCurrentSession,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    // Subscription utilities
    subscribeToChats,
    subscribeToAppointments,
    // Cache management
    invalidateCache,
    invalidateAllCache,
    // Add tooltips functions
    getTooltips: useCallback((useCache: boolean = true) => {
      return fetchData(() => dataLayer.getTooltips(useCache));
    }, [fetchData]),
    
    getTooltipByKey: useCallback((sectionKey: string, useCache: boolean = true) => {
      return fetchData(() => dataLayer.getTooltipByKey(sectionKey, useCache));
    }, [fetchData])
  };
};
