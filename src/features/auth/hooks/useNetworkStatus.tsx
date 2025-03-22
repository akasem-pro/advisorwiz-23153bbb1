
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

  // Async function to check network status
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // First check browser's online status
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        setLastChecked(new Date());
        return false;
      }
      
      // Then do a real connection test to Supabase
      const isConnected = await checkSupabaseConnection();
      setNetworkStatus(isConnected ? 'online' : 'offline');
      setLastChecked(new Date());
      return isConnected;
    } catch (error) {
      console.error("Network status check failed:", error);
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
      console.log("Browser reports online status, verifying connection...");
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
    
    // Periodic checks
    const intervalId = setInterval(() => {
      if (networkStatus === 'offline') {
        // Check more frequently when offline to detect recovery
        checkNetworkStatus();
      } else {
        // Just verify connection occasionally when already online
        checkNetworkStatus();
      }
    }, networkStatus === 'offline' ? 10000 : 60000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [checkNetworkStatus, networkStatus]);

  return { 
    networkStatus,
    lastChecked,
    checkNetworkStatus
  };
};
