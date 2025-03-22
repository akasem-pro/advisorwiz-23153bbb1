
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
      // Use a more reliable endpoint with a shorter timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // Reduced timeout to 3 seconds
      
      // Try a simple HEAD request to a reliable endpoint
      const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace', { 
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setNetworkStatus('online');
      } else {
        setNetworkStatus(navigator.onLine ? 'online' : 'offline');
      }
    } catch (error) {
      console.log("Network check failed:", error);
      // If using navigator.onLine as fallback when fetch fails
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
