
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Hook for managing network status and retry attempts
 */
export const useNetworkRetry = () => {
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  // Perform full network check
  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // First check navigator.onLine
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }
      
      // Try to ping a reliable endpoint for true connection check
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch('https://www.google.com/generate_204', { 
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        setNetworkStatus('online');
        return true;
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Network check failed:", error);
        setNetworkStatus('offline');
        return false;
      }
    } catch (error) {
      console.error("Network status check error:", error);
      setNetworkStatus('offline');
      return false;
    }
  };

  // Update network status based on browser's online/offline events
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (navigator.onLine) {
      setNetworkStatus('online');
    } else {
      setNetworkStatus('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor network changes and notify user
  useEffect(() => {
    // Only show online notifications if user had previously experienced offline issues
    if (networkStatus === 'online' && retryAttempts > 0) {
      toast.success("You're back online! You can now try again.");
    }
  }, [networkStatus, retryAttempts]);

  const incrementRetry = () => {
    setRetryAttempts(prev => prev + 1);
  };

  const resetRetryAttempts = () => {
    setRetryAttempts(0);
  };

  return {
    networkStatus,
    retryAttempts,
    checkNetworkStatus,
    incrementRetry,
    resetRetryAttempts
  };
};
