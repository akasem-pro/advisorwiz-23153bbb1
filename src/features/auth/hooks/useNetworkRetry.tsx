
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook for managing network status and retry attempts with improved reliability
 */
export const useNetworkRetry = () => {
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  // Perform full network check with multiple endpoints for better reliability
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // First check navigator.onLine
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        return false;
      }
      
      // Try to ping multiple endpoints for better reliability
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        // Use a more reliable endpoint than google.com which might be blocked in some environments
        const endpoints = [
          'https://gkymvotqrdecjjymmmef.supabase.co/auth/v1/',
          'https://httpbin.org/status/200',
          'https://www.cloudflare.com'
        ];
        
        const results = await Promise.allSettled(
          endpoints.map(endpoint => 
            fetch(endpoint, { 
              method: 'HEAD',
              mode: 'no-cors',
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              }
            })
          )
        );
        
        clearTimeout(timeoutId);
        
        // Check if at least one endpoint is reachable
        const isOnline = results.some(result => result.status === 'fulfilled');
        
        setNetworkStatus(isOnline ? 'online' : 'offline');
        return isOnline;
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Network connectivity check failed:", error);
        setNetworkStatus('offline');
        return false;
      }
    } catch (error) {
      console.error("Network status check error:", error);
      setNetworkStatus('offline');
      return false;
    }
  }, []);

  // Update network status based on browser's online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus('online');
      // Reload the page when connection is restored to ensure fresh state
      if (retryAttempts > 2) {
        window.location.reload();
      }
    };
    
    const handleOffline = () => setNetworkStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    checkNetworkStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [retryAttempts, checkNetworkStatus]);

  // Monitor network changes and notify user
  useEffect(() => {
    // Only show online notifications if user had previously experienced offline issues
    if (networkStatus === 'online' && retryAttempts > 0) {
      toast.success("You're back online! You can now try again.");
    }
  }, [networkStatus, retryAttempts]);

  const incrementRetry = useCallback(() => {
    setRetryAttempts(prev => prev + 1);
  }, []);

  const resetRetryAttempts = useCallback(() => {
    setRetryAttempts(0);
  }, []);

  return {
    networkStatus,
    retryAttempts,
    checkNetworkStatus,
    incrementRetry,
    resetRetryAttempts
  };
};
