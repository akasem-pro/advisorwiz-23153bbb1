
import { useState, useEffect, useCallback } from 'react';

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
      // Try to fetch the favicon from root path to check connectivity
      // This avoids CORS issues that can occur with third-party domains
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      // Use a cached asset that's guaranteed to exist in the public folder
      const response = await fetch('/favicon.ico?nocache=' + new Date().getTime(), { 
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setNetworkStatus('online');
        return true;
      } else {
        setNetworkStatus(navigator.onLine ? 'online' : 'offline');
        return navigator.onLine;
      }
    } catch (error) {
      console.log("Network check failed:", error);
      // If fetch fails but navigator.onLine is true, we'll trust the browser
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
