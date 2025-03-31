
import { useNetworkValidation } from './core/useNetworkValidation';

/**
 * Core auth hook for common functionality 
 */
export const useAuthCore = () => {
  const { validateNetworkConnection, checkNetworkStatus } = useNetworkValidation();
  
  /**
   * Handle authentication errors in a consistent way
   */
  const handleAuthError = (
    error: any, 
    setFormError: (message: string) => void,
    isSignIn = true
  ) => {
    console.error("Auth error:", error);
    
    const errorMessage = error?.message || 'An unknown error occurred';
    
    if (errorMessage.includes('network') || errorMessage.includes('connection')) {
      setFormError('Network error. Please check your connection and try again.');
    } else if (errorMessage.includes('email') && errorMessage.includes('password')) {
      setFormError('Invalid login credentials. Please check your email and password.');
    } else if (isSignIn && errorMessage.includes('credentials')) {
      setFormError('Invalid login credentials. Please check your email and password.');
    } else if (errorMessage.includes('already registered')) {
      setFormError('This email is already registered. Please sign in instead.');
    } else if (errorMessage.includes('Email link is invalid or has expired')) {
      setFormError('The email link is invalid or has expired. Please request a new one.');
    } else {
      setFormError(errorMessage);
    }
  };
  
  return {
    validateNetworkConnection,
    checkNetworkStatus,
    handleAuthError
  };
};
