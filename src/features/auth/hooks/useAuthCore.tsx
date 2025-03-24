
import { useNetworkValidation } from './core/useNetworkValidation';
import { useAuthErrorHandler } from './core/useAuthErrorHandler';
import { useRetryManager } from './core/useRetryManager';

/**
 * Core hook for handling auth operations with improved error handling
 * Composes smaller, focused hooks
 */
export const useAuthCore = () => {
  const { retryAttempts, incrementRetry, resetRetryAttempts } = useRetryManager();
  const { validateNetworkConnection, checkNetworkStatus } = useNetworkValidation();
  const { handleAuthError } = useAuthErrorHandler();
  
  return {
    retryAttempts,
    validateNetworkConnection,
    handleAuthError,
    incrementRetry,
    resetRetryAttempts,
    checkNetworkStatus
  };
};
