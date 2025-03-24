
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Core hook for handling auth operations with network checking
 */
export const useAuthCore = () => {
  const { 
    networkStatus, 
    checkNetworkStatus,
    retryAttempts,
    incrementRetry,
    resetRetryAttempts
  } = useAuth();
  
  /**
   * Checks network status and handles retry attempts
   */
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    try {
      // First check network status
      const isOnline = await Promise.race([
        checkNetworkStatus(),
        // Add timeout to ensure we don't wait too long
        new Promise<boolean>(resolve => setTimeout(() => resolve(false), 8000))
      ]);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        incrementRetry();
        return false;
      }
      
      resetRetryAttempts();
      return true;
    } catch (error) {
      console.error("Failed to validate network connection:", error);
      setFormError('Connection check failed. Please try again.');
      // Default to offline to trigger retry logic
      return false;
    }
  };
  
  /**
   * Generic form submission error handler
   */
  const handleAuthError = (
    error: any, 
    setFormError: (error: string) => void,
    isSignIn: boolean = true
  ) => {
    const errorMessage = error.message || `An error occurred during ${isSignIn ? 'sign in' : 'sign up'}`;
    console.error(`Failed to ${isSignIn ? 'sign in' : 'sign up'}:`, errorMessage);
    
    // Handle network and timeout errors
    if (!navigator.onLine || 
        error.message?.includes('timeout') || 
        error.message?.includes('timed out') || 
        error.message?.includes('fetch failed') ||
        error.message?.includes('Failed to fetch') ||
        error.message?.includes('network request failed')) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
      incrementRetry();
      return;
    }
    
    // Handle specific auth errors
    if (isSignIn) {
      if (error.message?.includes('Invalid login credentials') || 
          error.message?.includes('Invalid email or password')) {
        setFormError('Invalid email or password. Please try again.');
      } else {
        setFormError(errorMessage);
      }
    } else {
      if (error.message?.includes('email already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
      } else {
        setFormError(errorMessage);
      }
    }
  };
  
  return {
    networkStatus,
    validateNetworkConnection,
    handleAuthError,
    incrementRetry,
    resetRetryAttempts
  };
};
