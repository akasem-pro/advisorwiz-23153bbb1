
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
      
      // Basic check using navigator.onLine
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        setLastChecked(new Date());
        return false;
      }
      
      // Attempt a lightweight fetch to verify actual connectivity
      // Using a reliable endpoint to check connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors', // This works for cross-origin requests
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // If we get here, we're online
      setNetworkStatus('online');
      setLastChecked(new Date());
      return true;
    } catch (error) {
      console.log("Network check failed:", error);
      setNetworkStatus('offline');
      setLastChecked(new Date());
      return false;
    }
  }, []);

  useEffect(() => {
    // Set initial status based on browser's online property
    checkNetworkStatus();
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      // Don't immediately trust the browser - verify with a real request
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
