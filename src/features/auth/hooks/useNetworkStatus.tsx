
import { useState, useEffect, useCallback } from 'react';
import { checkSupabaseConnection } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status with more reliable checks
 */
export const useNetworkStatus = () => {
  // Default to online if navigator is online
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    navigator.onLine ? 'online' : 'offline'
  );
  
  // Async function to check network status
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // First check browser's online status
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }
      
      // Simple lightweight check - just assume we're online if the browser reports we are
      // This will allow the button to be enabled by default
      setNetworkStatus('online');
      
      // Then do a real connection test to Supabase in the background
      checkSupabaseConnection().then(isConnected => {
        if (!isConnected) {
          setNetworkStatus('offline');
        }
      });
      
      return true;
    } catch (error) {
      console.error("Network status check failed:", error);
      const browserOnline = navigator.onLine;
      setNetworkStatus(browserOnline ? 'online' : 'offline');
      return browserOnline;
    }
  }, []);

  useEffect(() => {
    // Initial network check
    checkNetworkStatus();
    
    const handleOnline = () => {
      console.log("Browser reports online status, verifying connection...");
      setNetworkStatus('online'); // Set it to online immediately
      checkNetworkStatus();
    };
    
    const handleOffline = () => {
      console.log("Browser reports offline status");
      setNetworkStatus('offline');
    };
    
    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Periodic checks - reduced frequency to avoid excessive requests
    const intervalId = setInterval(() => {
      // Only do periodic checks if we're in a problematic state
      if (networkStatus !== 'online') {
        checkNetworkStatus();
      }
    }, 10000); // Check every 10 seconds when in problem state
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [checkNetworkStatus, networkStatus]);

  return { 
    networkStatus,
    checkNetworkStatus
  };
};
