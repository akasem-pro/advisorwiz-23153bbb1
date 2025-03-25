
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook for handling network retry operations
 */
export const useNetworkRetry = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  const incrementRetry = useCallback(() => {
    setRetryAttempts(prev => prev + 1);
  }, []);
  
  const resetRetryAttempts = useCallback(() => {
    setRetryAttempts(0);
  }, []);
  
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // For preview environments, simulate a connection check
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('lovableproject') ||
          window.location.hostname.includes('localhost')) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setNetworkStatus('online');
        return true;
      }
      
      // Try to fetch a small resource to test connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      setNetworkStatus('online');
      return true;
    } catch (error) {
      console.error("Network status check failed:", error);
      setNetworkStatus('offline');
      return false;
    }
  }, []);
  
  return {
    networkStatus,
    retryAttempts,
    checkNetworkStatus,
    incrementRetry,
    resetRetryAttempts
  };
};
