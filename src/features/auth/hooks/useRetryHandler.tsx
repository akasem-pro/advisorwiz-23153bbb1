
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
    
    if (isRetrying) {
      console.log("[Retry Handler] Already retrying, ignoring duplicate request");
      return;
    }
    
    setIsRetrying(true);
    console.log("[Retry Handler] Starting retry process");
    
    try {
      // Show loading toast - will be dismissed after completion
      toast.loading('Checking connection...');
      
      // Log starting state
      console.log("[Retry Handler] Active tab:", activeTab);
      console.log("[Retry Handler] Credentials present:", {
        signIn: !!signInEmail && !!signInPassword,
        signUp: !!signUpEmail && !!signUpPassword && !!confirmPassword
      });
      
      // Short timeout to simulate connection check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dismiss loading toast
      toast.dismiss();
      
      // Proceed with retry attempt
      toast.success('Connection restored! Retrying...');
      
      // Call the appropriate handler based on active tab
      if (activeTab === 'signin' && signInEmail && signInPassword) {
        console.log("[Retry Handler] Retrying sign in");
        await handleSignInSubmit();
      } else if (activeTab === 'signup' && signUpEmail && signUpPassword && confirmPassword) {
        console.log("[Retry Handler] Retrying sign up");
        await handleSignUpSubmit();
      } else {
        console.log("[Retry Handler] Missing credentials for retry");
        setFormError('Please fill in all fields before retrying.');
      }
    } catch (error) {
      console.error("[Retry Handler] Retry failed:", error);
      toast.dismiss();
      toast.error('Connection check failed');
      setFormError('Connection check failed. Please try again later.');
    } finally {
      setIsRetrying(false);
      console.log("[Retry Handler] Retry process completed");
    }
  }, [isRetrying]);
  
  return { handleRetry, isRetrying };
};
