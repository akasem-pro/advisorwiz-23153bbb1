
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

  // Convert to async/Promise-based to maintain API compatibility
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      // Use the browser's navigator.onLine as the primary check
      const isOnline = navigator.onLine && checkSupabaseConnection();
      setNetworkStatus(isOnline ? 'online' : 'offline');
      setLastChecked(new Date());
      return Promise.resolve(isOnline);
    } catch (error) {
      console.error("Network status check failed:", error);
      const browserOnline = navigator.onLine;
      setNetworkStatus(browserOnline ? 'online' : 'offline');
      setLastChecked(new Date());
      return Promise.resolve(browserOnline);
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
    
    // Less frequent checks to reduce unnecessary operations
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 120000); // Check only every 2 minutes
    
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
