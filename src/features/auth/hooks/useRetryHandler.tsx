
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
    
    // Try multiple endpoints to verify connection
    try {
      const isOnline = await Promise.race([
        checkNetworkStatus(),
        // Add timeout to ensure we don't wait too long
        new Promise<boolean>(resolve => setTimeout(() => resolve(false), 7000))
      ]);
      
      // Dismiss loading toast
      toast.dismiss();
      setIsRetrying(false);
      
      if (!isOnline) {
        setFormError('Still unable to connect to authentication service. Please check your connection and try again.');
        return;
      }
      
      toast.success('Connection restored! Retrying...');
      
      // Create a synthetic event to pass to the form handlers
      const syntheticEvent = {} as React.FormEvent<HTMLFormElement>;
      
      if (activeTab === 'signin' && signInEmail && signInPassword) {
        await handleSignInSubmit(syntheticEvent);
      } else if (activeTab === 'signup' && signUpEmail && signUpPassword && confirmPassword) {
        await handleSignUpSubmit(syntheticEvent);
      } else {
        setFormError('Please fill in all fields before retrying.');
      }
    } catch (error) {
      toast.dismiss();
      setIsRetrying(false);
      console.error("Retry failed:", error);
      setFormError('Connection check failed. Please try again later.');
    }
  }, [checkNetworkStatus]);
  
  return { handleRetry, isRetrying };
};
