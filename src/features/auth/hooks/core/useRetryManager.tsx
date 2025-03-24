
import { useState } from 'react';

/**
 * Hook for managing authentication retry attempts
 */
export const useRetryManager = () => {
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  const incrementRetry = () => {
    setRetryAttempts(prev => prev + 1);
  };

  const resetRetryAttempts = () => {
    setRetryAttempts(0);
  };
  
  return {
    retryAttempts,
    incrementRetry,
    resetRetryAttempts
  };
};
