
import { useState, useCallback } from 'react';

interface UseNetworkRetryProps {
  maxRetries?: number;
  timeout?: number;
}

/**
 * Hook for handling network retry logic
 */
export const useNetworkRetry = (props?: UseNetworkRetryProps) => {
  const { 
    maxRetries = 3,
    timeout = 2000
  } = props || {};
  
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  
  /**
   * Check if the device is online by making a simple fetch request
   */
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    try {
      setNetworkStatus('checking');
      
      // First check if navigator.onLine is false, which is a quick way to know we're offline
      if (navigator.onLine === false) {
        setNetworkStatus('offline');
        return false;
      }
      
      // Make a simple fetch to a reliable endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache',
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setNetworkStatus('online');
        return true;
      } else {
        setNetworkStatus('offline');
        return false;
      }
    } catch (error) {
      console.error('Network check failed:', error);
      setNetworkStatus('offline');
      return false;
    }
  }, [timeout]);
  
  /**
   * Increment the retry counter
   */
  const incrementRetry = useCallback(() => {
    setRetryAttempts(prev => {
      const newCount = prev + 1;
      return newCount > maxRetries ? maxRetries : newCount;
    });
  }, [maxRetries]);
  
  /**
   * Reset the retry counter
   */
  const resetRetryAttempts = useCallback(() => {
    setRetryAttempts(0);
  }, []);
  
  /**
   * Attempt to reconnect with exponential backoff
   */
  const retryConnection = useCallback(async (): Promise<boolean> => {
    if (isRetrying || retryAttempts >= maxRetries) {
      return false;
    }
    
    setIsRetrying(true);
    
    try {
      // Exponential backoff
      const backoffTime = Math.min(timeout * Math.pow(2, retryAttempts), 10000);
      console.log(`Retrying connection in ${backoffTime}ms (attempt ${retryAttempts + 1}/${maxRetries})`);
      
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      
      const isOnline = await checkNetworkStatus();
      
      if (isOnline) {
        resetRetryAttempts();
        return true;
      } else {
        incrementRetry();
        return false;
      }
    } finally {
      setIsRetrying(false);
    }
  }, [checkNetworkStatus, incrementRetry, isRetrying, maxRetries, resetRetryAttempts, retryAttempts, timeout]);
  
  return {
    networkStatus,
    retryAttempts,
    isRetrying,
    checkNetworkStatus,
    retryConnection,
    incrementRetry,
    resetRetryAttempts,
    hasExceededMaxRetries: retryAttempts >= maxRetries
  };
};
