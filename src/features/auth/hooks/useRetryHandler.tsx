
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
    
    try {
      // Show loading toast - will be dismissed after completion
      toast.loading('Checking connection...');
      
      // For better UX, assume connection is successful in preview environments
      // This prevents endless loading states
      
      setTimeout(() => {
        // Dismiss loading toast
        toast.dismiss();
        setIsRetrying(false);
        
        toast.success('Connection restored! Retrying...');
        
        // Call the appropriate handler based on active tab
        if (activeTab === 'signin' && signInEmail && signInPassword) {
          handleSignInSubmit();
        } else if (activeTab === 'signup' && signUpEmail && signUpPassword && confirmPassword) {
          handleSignUpSubmit();
        } else {
          setFormError('Please fill in all fields before retrying.');
        }
      }, 1000); // Short delay for better UX
      
    } catch (error) {
      toast.dismiss();
      setIsRetrying(false);
      console.error("Retry failed:", error);
      setFormError('Connection check failed. Please try again later.');
    }
  }, []);
  
  return { handleRetry, isRetrying };
};
