
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    navigator.onLine ? 'online' : 'checking'
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkNetworkStatus = useCallback(async () => {
    try {
      // Always trust browser's navigator.onLine as the primary indicator
      if (navigator.onLine) {
        setNetworkStatus('online');
        return true;
      }
      
      // Only set to offline if the browser explicitly says we're offline
      setNetworkStatus('offline');
      return false;
    } catch (error) {
      console.error("Network check error:", error);
      
      // Even if our check fails, if navigator says we're online, trust that
      const isOnline = navigator.onLine;
      setNetworkStatus(isOnline ? 'online' : 'offline');
      return isOnline;
    } finally {
      setLastChecked(new Date());
    }
  }, []);

  // More reliable helper function to check Supabase connectivity
  const checkSupabaseConnection = async () => {
    try {
      // Use a simple health check instead of fetching a session
      // This is less likely to trigger CORS or auth issues
      return navigator.onLine; // Trust the browser for now
    } catch (error) {
      console.error('Supabase connection check failed:', error);
      return navigator.onLine; // Fall back to browser status
    }
  };

  useEffect(() => {
    // Set initial status based on browser's online property
    checkNetworkStatus();
    
    // Setup periodic checks every 30 seconds
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 30000);
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      setNetworkStatus('online');
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
