
import { useState, useEffect, useCallback } from 'react';
import { checkSupabaseConnection } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status with more reliable checks
 */
export const useNetworkStatus = () => {
  // Default to online to avoid blocking sign-up functionality
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    'online'
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
      
      // Simple lightweight check - assume we're online if the browser reports we are
      // This will allow the button to be enabled by default
      setNetworkStatus('online');
      
      // Then do a real connection test to Supabase in the background
      checkSupabaseConnection().then(isConnected => {
        if (!isConnected) {
          console.log("Background network check failed, but not blocking UI");
          // Don't set offline here to prevent blocking the UI
        }
      });
      
      return true;
    } catch (error) {
      console.error("Network status check failed:", error);
      // Default to online state to prevent blocking the UI
      setNetworkStatus('online');
      return true;
    }
  }, []);

  useEffect(() => {
    // Initial network check
    checkNetworkStatus();
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      setNetworkStatus('online');
    };
    
    const handleOffline = () => {
      console.log("Browser reports offline status");
      setNetworkStatus('offline');
    };
    
    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkNetworkStatus]);

  return { 
    networkStatus,
    checkNetworkStatus
  };
};
