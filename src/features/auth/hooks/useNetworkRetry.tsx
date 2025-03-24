
import { useState, useEffect, useCallback } from 'react';
import { useNetworkStatus } from '../../offline/useNetworkStatus';
import { useRetryManager } from './core/useRetryManager';

// Maximum number of retry attempts
const MAX_RETRY_ATTEMPTS = 3;

// Retry delay in ms (with exponential backoff)
const getRetryDelay = (attempt: number) => Math.min(2000 * Math.pow(2, attempt), 30000);

interface UseNetworkRetryResult {
  /**
   * Current network status
   */
  networkStatus: 'online' | 'offline' | 'checking';
  
  /**
   * Number of retry attempts made
   */
  retryAttempts: number;
  
  /**
   * Check network status
   */
  checkNetworkStatus: () => Promise<boolean>;
  
  /**
   * Increment retry counter
   */
  incrementRetry: () => void;
  
  /**
   * Reset retry counter
   */
  resetRetryAttempts: () => void;
  
  /**
   * Whether max retries have been reached
   */
  maxRetriesReached: boolean;
  
  /**
   * Time until next retry (ms)
   */
  retryDelay: number;
}

/**
 * Hook for managing network retries with improved error handling
 */
export const useNetworkRetry = (): UseNetworkRetryResult => {
  const { isOnline, isChecking, checkConnectionNow } = useNetworkStatus({
    pollingInterval: 60000
  });
  
  const { retryAttempts, incrementRetry, resetRetryAttempts } = useRetryManager();
  const [retryDelay, setRetryDelay] = useState(getRetryDelay(0));
  
  // Update retry delay when attempts change
  useEffect(() => {
    setRetryDelay(getRetryDelay(retryAttempts));
  }, [retryAttempts]);
  
  // Get network status string
  const networkStatus = isChecking 
    ? 'checking' 
    : isOnline ? 'online' : 'offline';
    
  // Check if max retries reached
  const maxRetriesReached = retryAttempts >= MAX_RETRY_ATTEMPTS;
  
  // Check network status
  const checkNetworkStatus = useCallback(async (): Promise<boolean> => {
    return await checkConnectionNow();
  }, [checkConnectionNow]);
  
  return {
    networkStatus,
    retryAttempts, 
    checkNetworkStatus,
    incrementRetry,
    resetRetryAttempts,
    maxRetriesReached,
    retryDelay
  };
};
