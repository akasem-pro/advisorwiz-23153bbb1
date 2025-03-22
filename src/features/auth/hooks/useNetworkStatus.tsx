
import { useState, useEffect, useCallback } from 'react';
import { checkSupabaseConnection } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status with more reliable checks
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    navigator.onLine ? 'checking' : 'offline'
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  // Improved network check function with retry and fallback logic
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      const isOnline = await checkSupabaseConnection();
      
      setNetworkStatus(isOnline ? 'online' : 'offline');
      setLastChecked(new Date());
      
      return isOnline;
    } catch (error) {
      console.error("Network status check failed:", error);
      setNetworkStatus('offline');
      setLastChecked(new Date());
      return false;
    }
  }, []);

  useEffect(() => {
    // Initial network check
    checkNetworkStatus();
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      checkNetworkStatus();
    };
    
    const handleOffline = () => {
      console.log("Browser reports offline status");
      setNetworkStatus('offline');
      setLastChecked(new Date());
    };
    
    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set up periodic check with increasing intervals on failure
    let checkInterval = 60000; // 1 minute by default
    
    const intervalId = setInterval(async () => {
      const isOnline = await checkNetworkStatus();
      
      // If offline, check more frequently (every 30s)
      // If online, check less frequently (every 2 minutes)
      checkInterval = isOnline ? 120000 : 30000;
      
      // Update the interval
      clearInterval(intervalId);
      setInterval(checkNetworkStatus, checkInterval);
    }, checkInterval);
    
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
