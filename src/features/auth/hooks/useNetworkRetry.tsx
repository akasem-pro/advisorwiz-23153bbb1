
import { useState, useCallback, useEffect } from 'react';

export const useNetworkRetry = () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  // Function to increment retry attempts
  const incrementRetry = useCallback(() => {
    setRetryAttempts(prev => prev + 1);
  }, []);
  
  // Function to reset retry attempts
  const resetRetryAttempts = useCallback(() => {
    setRetryAttempts(0);
  }, []);

  // Set initial network status
  useEffect(() => {
    const checkNetworkStateInternal = async () => {
      if (navigator.onLine) {
        setNetworkStatus('online');
      } else {
        setNetworkStatus('offline');
      }
    };
    
    checkNetworkStateInternal();
    
    // Listen for online/offline events
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Function to check network status
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    // Check if we're in a preview environment
    const isPreviewEnv = window.location.hostname.includes('preview') || 
                         window.location.hostname.includes('lovableproject') ||
                         window.location.hostname.includes('localhost');
    
    // For preview environments, always return true to simulate success
    if (isPreviewEnv) {
      console.log("[Network Check] Preview environment detected, simulating online status");
      setNetworkStatus('online');
      return true;
    }
    
    // Start the check
    setNetworkStatus('checking');
    
    try {
      // Basic connectivity check
      if (!navigator.onLine) {
        console.log("[Network Check] Browser reports offline");
        setNetworkStatus('offline');
        return false;
      }
      
      // For more reliable check, ping a known endpoint
      // This endpoint should exist and return a successful response
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('https://www.google.com/generate_204', {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response) {
          console.log("[Network Check] Endpoint check successful");
          setNetworkStatus('online');
          return true;
        } else {
          console.log("[Network Check] Endpoint check failed");
          setNetworkStatus('offline');
          return false;
        }
      } catch (error) {
        console.error("[Network Check] Error checking endpoint:", error);
        setNetworkStatus('offline');
        return false;
      }
    } catch (error) {
      console.error("[Network Check] Unexpected error during network check:", error);
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
