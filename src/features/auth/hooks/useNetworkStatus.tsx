
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track network connectivity status using browser's built-in navigator.onLine
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkNetworkStatus = useCallback(() => {
    // Simply use the browser's navigator.onLine
    const isOnline = navigator.onLine;
    setNetworkStatus(isOnline ? 'online' : 'offline');
    setLastChecked(new Date());
    return isOnline;
  }, []);

  useEffect(() => {
    // Set initial status based on browser's online property
    checkNetworkStatus();
    
    const handleOnline = () => {
      console.log("Browser reports online status");
      setNetworkStatus('online');
      setLastChecked(new Date());
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
