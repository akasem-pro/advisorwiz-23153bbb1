
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
      
      // Try a simple fetch to Supabase with a reasonable timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout, increased from 3s
      
      try {
        // Use a simple HEAD request which is faster than a GET request
        const response = await fetch(`${SUPABASE_URL}/auth/v1/`, {
          method: 'HEAD', // Changed from GET to HEAD
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
        
        // Fall back to a more reliable public endpoint
        try {
          const publicResponse = await fetch('https://www.cloudflare.com/cdn-cgi/trace', { 
            method: 'HEAD',
            signal: AbortSignal.timeout(3000) // 3 second timeout using newer AbortSignal.timeout()
          });
          
          const isOnline = publicResponse.ok;
          setNetworkStatus(isOnline ? 'online' : 'offline');
          setLastChecked(new Date());
          return isOnline;
        } catch (fallbackError) {
          console.log("Fallback network check failed:", fallbackError);
          setNetworkStatus('offline');
          setLastChecked(new Date());
          return false;
        }
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
    
    // Check connectivity periodically but less frequently (every minute)
    const intervalId = setInterval(() => {
      checkNetworkStatus();
    }, 60000);
    
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
