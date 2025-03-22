
import { useState, useEffect } from 'react';

/**
 * Custom hook to track network connectivity status
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    const checkNetworkStatus = () => {
      // Using navigator.onLine for immediate status
      if (navigator.onLine) {
        setNetworkStatus('online');
      } else {
        setNetworkStatus('offline');
      }
    };
    
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    // Check initial status
    checkNetworkStatus();
    
    // Perform a fetch to validate connectivity
    const validateConnection = async () => {
      try {
        // Try to fetch a small amount of data to validate the connection
        await fetch('https://www.google.com/favicon.ico', { 
          mode: 'no-cors',
          cache: 'no-store',
          // Quick timeout for faster response
          signal: AbortSignal.timeout(3000)
        });
        setNetworkStatus('online');
      } catch (error) {
        // If fetch fails, we might be offline
        if (!navigator.onLine) {
          setNetworkStatus('offline');
        }
      }
    };
    
    validateConnection();
    
    // Set up listeners for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { networkStatus };
};
