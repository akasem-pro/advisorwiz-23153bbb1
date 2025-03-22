
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkNetworkStatus = useCallback(async () => {
    try {
      // If the app is running in the browser, we can assume we're online enough
      // to at least render the UI and attempt auth operations
      if (navigator.onLine) {
        setNetworkStatus('online');
        
        // Do a background check without affecting the immediate status
        checkSupabaseConnection().catch(console.error);
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

  // Helper function to check Supabase connectivity - used for background validation only
  const checkSupabaseConnection = async () => {
    try {
      // Use a more reliable approach that doesn't trigger CORS issues
      const { data, error } = await supabase.auth.getSession();
      return !error;
    } catch (error) {
      console.error('Supabase connection check failed:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check initial status but always assume online if the app is running
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
