
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
      // First, try the browser's navigator.onLine
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }
      
      // Simple ping test to validate real connectivity
      // Use the window.location.origin to ensure we're testing our own domain
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const pingUrl = `${window.location.origin}/favicon.ico?_=${Date.now()}`;
      console.log("Testing network connection with: ", pingUrl);
      
      const response = await fetch(pingUrl, { 
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setNetworkStatus('online');
        return true;
      } else {
        setNetworkStatus('offline');
        return false;
      }
    } catch (error) {
      console.log("Network check failed:", error);
      
      // If error is due to abort, the request timed out
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log("Network request timed out");
      }
      
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
