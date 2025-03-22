
import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Core hook for handling auth operations with network checking
 */
export const useAuthCore = () => {
  const { 
    loading: authLoading, 
    networkStatus, 
    checkNetworkStatus,
    retryAttempts,
    incrementRetry,
    resetRetryAttempts
  } = useAuth();
  
  // Watch for network status changes
  useEffect(() => {
    if (networkStatus === 'online' && retryAttempts > 0) {
      toast.success("Connection restored! You can now try again.");
    }
  }, [networkStatus, retryAttempts]);
  
  /**
   * Checks network status and handles retry attempts
   */
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    // First check network status
    const isOnline = await checkNetworkStatus();
    if (!isOnline) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
      incrementRetry();
      return false;
    }
    
    resetRetryAttempts();
    return true;
  };
  
  /**
   * Generic form submission error handler
   */
  const handleAuthError = (
    error: any, 
    setFormError: (error: string) => void,
    isSignIn: boolean = true
  ) => {
    console.error(`Failed to ${isSignIn ? 'sign in' : 'sign up'}:`, error);
    
    if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
      setFormError('Authentication request timed out. Please try again.');
      incrementRetry();
    } else if (!navigator.onLine || 
              error.message?.includes('network') || 
              error.message?.includes('connection') || 
              error.message?.includes('Unable to connect') ||
              error.message?.includes('Failed to fetch')) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
      incrementRetry();
    } else {
      setFormError(error.message || `An error occurred during ${isSignIn ? 'sign in' : 'registration'}`);
    }
  };
  
  return {
    authLoading,
    networkStatus,
    validateNetworkConnection,
    handleAuthError,
    incrementRetry,
    resetRetryAttempts
  };
};
