
import { useAuthErrorHandler } from './core/useAuthErrorHandler';
import { useNetworkValidation } from './core/useNetworkValidation';

/**
 * Core auth hook for common functionality 
 */
export const useAuthCore = () => {
  const { validateNetworkConnection, checkNetworkStatus } = useNetworkValidation();
  const { handleAuthError } = useAuthErrorHandler();
  
  return {
    validateNetworkConnection,
    checkNetworkStatus,
    handleAuthError
  };
};
