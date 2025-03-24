
import { useState, useCallback } from 'react';
import { useSignInHandler } from './useSignInHandler';
import { useSignUpHandler } from './useSignUpHandler';
import { useRetryHandler } from './useRetryHandler';
import { useAuth } from '../context/AuthProvider';

/**
 * Combined hook for handling authentication form submissions with improved error handling
 */
export const useAuthFormSubmit = () => {
  // Get the necessary auth context
  const { loading: authLoading, networkStatus } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Import the individual handlers
  const { handleSignIn } = useSignInHandler();
  const { handleSignUp } = useSignUpHandler();
  const { handleRetry, isRetrying } = useRetryHandler();
  
  // Combined loading state
  const isLoading = authLoading || isSubmitting || isRetrying;
  
  return {
    authLoading,
    networkStatus,
    isSubmitting,
    setIsSubmitting,
    isRetrying,
    isLoading,
    handleSignIn,
    handleSignUp,
    handleRetry
  };
};
