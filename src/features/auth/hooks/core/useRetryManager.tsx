
import { useState, useCallback } from 'react';

/**
 * Hook for managing retry attempts with improved tracking
 */
export const useRetryManager = () => {
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  const incrementRetry = useCallback(() => {
    setRetryAttempts(prev => {
      const newValue = prev + 1;
      console.log(`[Auth] Incrementing retry attempts: ${prev} -> ${newValue}`);
      return newValue;
    });
  }, []);
  
  const resetRetryAttempts = useCallback(() => {
    console.log('[Auth] Resetting retry attempts to 0');
    setRetryAttempts(0);
  }, []);
  
  return {
    retryAttempts,
    incrementRetry,
    resetRetryAttempts
  };
};
