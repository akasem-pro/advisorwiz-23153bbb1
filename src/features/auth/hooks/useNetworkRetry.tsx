
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
      
      // Try to ping Supabase directly to check actual connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        // Use a more reliable endpoint than google.com which might be blocked in some environments
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://gkymvotqrdecjjymmmef.supabase.co";
        const response = await fetch(`${supabaseUrl}/auth/v1/`, { 
          method: 'HEAD',
          mode: 'cors',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        clearTimeout(timeoutId);
        
        setNetworkStatus('online');
        return true;
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Supabase connectivity check failed:", error);
        
        // Fallback to checking another reliable endpoint if Supabase check fails
        try {
          const response = await fetch('https://httpbin.org/status/200', { 
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal
          });
          
          setNetworkStatus('online');
          return true;
        } catch (secondError) {
          console.error("Backup network check failed:", secondError);
          setNetworkStatus('offline');
          return false;
        }
      }
    } catch (error) {
      console.error("Network status check error:", error);
      setNetworkStatus('offline');
      return false;
    }
  };

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
  }, [retryAttempts]);

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
