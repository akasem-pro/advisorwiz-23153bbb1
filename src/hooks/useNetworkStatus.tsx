
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track network connectivity status
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkNetworkStatus = useCallback(async () => {
    // Using navigator.onLine for immediate status
    if (!navigator.onLine) {
      setNetworkStatus('offline');
      return;
    }

    // Set to checking while we verify the connection
    setNetworkStatus('checking');
    
    try {
      // Try to fetch a small amount of data to validate the connection
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://www.google.com/favicon.ico', { 
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      setNetworkStatus('online');
    } catch (error) {
      console.log("Network check failed:", error);
      // If fetch fails, we might be offline
      setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    }
    
    setLastChecked(new Date());
  }, []);

  useEffect(() => {
    // Check initial status
    checkNetworkStatus();
    
    const handleOnline = () => {
      checkNetworkStatus();
    };
    
    const handleOffline = () => {
      setNetworkStatus('offline');
      setLastChecked(new Date());
    };
    
    // Set up listeners for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check network status every 30 seconds when the app is active
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
