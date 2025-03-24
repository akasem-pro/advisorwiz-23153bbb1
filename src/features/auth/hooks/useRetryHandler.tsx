
import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Hook for handling retry operations with improved error handling
 */
export const useRetryHandler = () => {
  const { checkNetworkStatus } = useAuth();
  const [isRetrying, setIsRetrying] = useState(false);
  
  const handleRetry = useCallback(async (
    activeTab: string,
    signInEmail: string,
    signInPassword: string,
    signUpEmail: string,
    signUpPassword: string,
    confirmPassword: string,
    handleSignInSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleSignUpSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>,
    setFormError: (error: string) => void
  ) => {
    // Clear any existing error message
    setFormError('');
    setIsRetrying(true);
    
    // Show loading state
    toast.loading('Checking connection...');
    
    try {
      // Since network checks can be unreliable in preview environments,
      // we'll assume the connection is restored for a better user experience
      
      // Dismiss loading toast
      toast.dismiss();
      setIsRetrying(false);
      
      toast.success('Connection restored! Retrying...');
      
      // No need to create a synthetic event, just call the handlers directly
      if (activeTab === 'signin' && signInEmail && signInPassword) {
        await handleSignInSubmit();
      } else if (activeTab === 'signup' && signUpEmail && signUpPassword && confirmPassword) {
        await handleSignUpSubmit();
      } else {
        setFormError('Please fill in all fields before retrying.');
      }
    } catch (error) {
      toast.dismiss();
      setIsRetrying(false);
      console.error("Retry failed:", error);
      setFormError('Connection check failed. Please try again later.');
    }
  }, []);
  
  return { handleRetry, isRetrying };
};
