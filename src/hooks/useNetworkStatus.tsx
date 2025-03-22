
import { useState, useEffect } from 'react';

/**
 * Custom hook to track network connectivity status
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    // Check initial status
    setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    
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
