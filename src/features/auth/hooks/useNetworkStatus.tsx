
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track network connectivity status using browser's built-in navigator.onLine
 * with actual network check via fetch
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  // Check network connectivity by making a simple fetch request
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // First quick check using navigator.onLine
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        setLastChecked(new Date());
        return Promise.resolve(false);
      }
      
      // For more reliability, try a simple head request to the supabase domain
      // This doesn't require auth and just checks if the domain is reachable
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://gkymvotqrdecjjymmmef.supabase.co/rest/v1/', {
        method: 'HEAD',
        mode: 'cors',
        cache: 'no-store',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      // If we get here, we're online
      setNetworkStatus('online');
      setLastChecked(new Date());
      return true;
    } catch (error) {
      console.log("Network check failed:", error);
      
      // If navigator says we're online but the request failed, we might have limited connectivity
      // In this case, we'll trust navigator.onLine as a fallback
      const isOnline = navigator.onLine;
      setNetworkStatus(isOnline ? 'online' : 'offline');
      setLastChecked(new Date());
      return isOnline;
    }
  }, []);

  useEffect(() => {
    // Set initial status based on browser's online property
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
    
    // Check connectivity periodically (every 30 seconds) when the app thinks it's offline
    const intervalId = setInterval(() => {
      if (networkStatus === 'offline') {
        checkNetworkStatus();
      }
    }, 30000);
    
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
