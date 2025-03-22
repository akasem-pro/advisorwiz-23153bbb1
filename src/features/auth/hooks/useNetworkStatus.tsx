
import { useState, useEffect, useCallback } from 'react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../../../integrations/supabase/client';

/**
 * Custom hook to track network connectivity status with Supabase
 * using simplified and more reliable checks
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    navigator.onLine ? 'checking' : 'offline'
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  // Check network connectivity with Supabase
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // First check browser's online status
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        setLastChecked(new Date());
        return false;
      }
      
      // Try a simple GET request to Supabase auth endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_PUBLISHABLE_KEY,
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const isOnline = response.ok;
        setNetworkStatus(isOnline ? 'online' : 'offline');
        setLastChecked(new Date());
        return isOnline;
      } catch (error) {
        clearTimeout(timeoutId);
        console.log("Network check failed:", error);
        
        // If request fails, use navigator.onLine as fallback
        setNetworkStatus('offline');
        setLastChecked(new Date());
        return false;
      }
    } catch (error) {
      console.log("Network status check error:", error);
      setNetworkStatus('offline');
      setLastChecked(new Date());
      return false;
    }
  }, []);

  useEffect(() => {
    // Set initial status
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
    
    // Set up listeners for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check connectivity periodically (every 30 seconds)
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 30000);
    
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
