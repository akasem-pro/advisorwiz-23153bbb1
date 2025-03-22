
import { useState, useEffect, useCallback } from 'react';
import { checkSupabaseConnection } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status with more reliable checks
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  // Simplified network check function that relies on browser APIs
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // Use the navigator.onLine as primary source of truth
      const isOnline = navigator.onLine;
      
      // Only attempt connection check if browser reports online
      if (isOnline) {
        try {
          // Double-check with our simplified check
          const supabaseOnline = await checkSupabaseConnection();
          setNetworkStatus(supabaseOnline ? 'online' : 'offline');
          setLastChecked(new Date());
          return supabaseOnline;
        } catch (error) {
          console.error("Supabase connection check failed:", error);
          // Fall back to browser online status
          setNetworkStatus(isOnline ? 'online' : 'offline');
          setLastChecked(new Date());
          return isOnline;
        }
      } else {
        setNetworkStatus('offline');
        setLastChecked(new Date());
        return false;
      }
    } catch (error) {
      console.error("Network status check failed:", error);
      // Fall back to browser online status as last resort
      const browserOnline = navigator.onLine;
      setNetworkStatus(browserOnline ? 'online' : 'offline');
      setLastChecked(new Date());
      return browserOnline;
    }
  }, []);

  useEffect(() => {
    // Initial network check
    checkNetworkStatus();
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      setNetworkStatus('online');
      setLastChecked(new Date());
    };
    
    const handleOffline = () => {
      console.log("Browser reports offline status");
      setNetworkStatus('offline');
      setLastChecked(new Date());
    };
    
    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set up periodic check (less frequent to reduce unnecessary calls)
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 60000); // Check every minute
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [checkNetworkStatus]);

  return { 
    networkStatus,
    lastChecked,
    checkNetworkStatus
  };
};
