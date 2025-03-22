
import { useState, useEffect, useCallback } from 'react';
import { supabase, checkSupabaseConnection } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkNetworkStatus = useCallback(async () => {
    // Start with browser's navigator.onLine as initial check
    if (!navigator.onLine) {
      setNetworkStatus('offline');
      return false;
    }

    // Set to checking while we verify the connection
    setNetworkStatus('checking');
    
    try {
      // First, try the browser's navigator.onLine
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }
      
      // Try to reach Supabase's health endpoint to verify connectivity
      const isConnected = await checkSupabaseConnection();
      
      setNetworkStatus(isConnected ? 'online' : 'offline');
      return isConnected;
    } catch (error) {
      console.log("Network check failed:", error);
      
      // Fallback to navigator.onLine if fetch fails
      const isOnline = navigator.onLine;
      setNetworkStatus(isOnline ? 'online' : 'offline');
      return isOnline;
    } finally {
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    // Check initial status
    checkNetworkStatus();
    
    // Setup periodic checks every 30 seconds
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 30000);
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      checkNetworkStatus(); // Verify with an actual request
    };
    
    const handleOffline = () => {
      console.log("Browser reports offline status");
      setNetworkStatus('offline');
      setLastChecked(new Date());
    };
    
    // Set up listeners for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkNetworkStatus]);

  return { 
    networkStatus,
    lastChecked,
    checkNetworkStatus
  };
};
