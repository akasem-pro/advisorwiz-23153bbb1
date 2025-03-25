
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

/**
 * Enhanced network retry manager with improved performance
 */
export const useNetworkRetryManager = () => {
  const [retryStatus, setRetryStatus] = useState<'idle' | 'checking' | 'retrying'>('idle');
  const retryAttemptsRef = useRef(0);
  const lastRetryTimestampRef = useRef(0);
  
  // Get retry count without causing re-renders
  const getRetryAttempts = useCallback(() => {
    return retryAttemptsRef.current;
  }, []);
  
  // Increment retry without causing unnecessary re-renders
  const incrementRetry = useCallback(() => {
    retryAttemptsRef.current += 1;
    lastRetryTimestampRef.current = Date.now();
    console.log(`[Auth] Incrementing retry attempts: ${retryAttemptsRef.current - 1} -> ${retryAttemptsRef.current}`);
    return retryAttemptsRef.current;
  }, []);
  
  // Reset retry without causing unnecessary re-renders
  const resetRetryAttempts = useCallback(() => {
    console.log('[Auth] Resetting retry attempts to 0');
    retryAttemptsRef.current = 0;
    lastRetryTimestampRef.current = 0;
  }, []);
  
  // Check if we should throttle retries based on attempts
  const shouldThrottleRetry = useCallback(() => {
    const attempts = retryAttemptsRef.current;
    const now = Date.now();
    const timeSinceLastRetry = now - lastRetryTimestampRef.current;
    
    // Exponential backoff: 2^attempts seconds (with a cap)
    const minWaitTime = Math.min(Math.pow(2, attempts) * 1000, 30000); // Cap at 30 seconds
    
    if (attempts > 0 && timeSinceLastRetry < minWaitTime) {
      const waitTimeRemaining = Math.ceil((minWaitTime - timeSinceLastRetry) / 1000);
      console.log(`[Auth] Throttling retry attempt. Please wait ${waitTimeRemaining} seconds.`);
      toast.error(`Too many attempts. Please wait ${waitTimeRemaining} seconds before trying again.`);
      return true;
    }
    
    return false;
  }, []);
  
  // Get retry recommendation based on the number of attempts
  const getRetryRecommendation = useCallback(() => {
    const attempts = retryAttemptsRef.current;
    
    if (attempts === 0) {
      return null;
    } else if (attempts < 3) {
      return "You can try again now.";
    } else if (attempts < 5) {
      return "You've made several attempts. Consider checking your credentials or network connection.";
    } else {
      return "You've made many attempts. Please contact support if you continue to have issues.";
    }
  }, []);
  
  return {
    retryStatus,
    setRetryStatus,
    getRetryAttempts,
    incrementRetry,
    resetRetryAttempts,
    shouldThrottleRetry,
    getRetryRecommendation
  };
};
