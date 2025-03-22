
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
      // Start with browser's navigator.onLine as initial check
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }

      // Set to checking while we verify the connection
      setNetworkStatus('checking');
      
      // Simply assume we're online if we can run code in the browser
      // This is the most reliable approach since we're already loading the app
      setNetworkStatus('online');
      
      // Do a quick background check to Supabase but don't wait for it
      // or let it affect our immediate "online" status
      checkSupabaseConnection().catch(console.error);
      
      return true;
    } catch (error) {
      console.log("Network check failed:", error);
      
      // Fallback to navigator.onLine if everything else fails
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
      // Lightweight query just to verify connectivity
      const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).limit(1);
      return !error;
    } catch (error) {
      console.error('Supabase connection check failed:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check initial status
    checkNetworkStatus();
    
    // Setup periodic checks every 30 seconds
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 30000);
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      setNetworkStatus('online'); // Immediately set to online
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
