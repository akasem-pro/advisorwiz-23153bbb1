
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track network connectivity status using browser's built-in navigator.onLine
 * with more reliable fallbacks and timeout handling
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
        return false;
      }
      
      // Try a simple HEAD request to a reliable domain
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        // Use Google's domain as it's highly reliable
        const response = await fetch('https://www.google.com', {
          method: 'HEAD',
          mode: 'no-cors', // Important for CORS issues
          cache: 'no-store',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // If we get here without error, we're online
        setNetworkStatus('online');
        setLastChecked(new Date());
        return true;
      } catch (error) {
        clearTimeout(timeoutId);
        console.log("Network check failed:", error);
        
        // If we're here, the request failed but navigator might still report online
        const isOnline = navigator.onLine;
        setNetworkStatus(isOnline ? 'online' : 'offline');
        setLastChecked(new Date());
        return isOnline;
      }
    } catch (error) {
      console.log("Network status check error:", error);
      const isOnline = navigator.onLine;
      setNetworkStatus(isOnline ? 'online' : 'offline');
      setLastChecked(new Date());
      return isOnline;
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
