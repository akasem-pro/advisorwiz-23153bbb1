
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';
import { useSignInHandler } from './useSignInHandler';
import { useSignUpHandler } from './useSignUpHandler';

/**
 * Hook for handling retry operations with auth forms
 */
export const useRetryHandler = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const { checkNetworkStatus } = useAuth();
  const { handleSignIn } = useSignInHandler();
  const { handleSignUp } = useSignUpHandler();

  const retryConnection = async (): Promise<boolean> => {
    setIsRetrying(true);
    toast.loading('Checking network connection...');
    
    try {
      const isOnline = await checkNetworkStatus();
      
      if (isOnline) {
        toast.success('Connection restored');
        return true;
      } else {
        toast.error('Still offline. Please check your connection');
        return false;
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      toast.error('Failed to check connection');
      return false;
    } finally {
      setIsRetrying(false);
    }
  };

  const handleRetry = async (
    activeTab: string,
    signInEmail: string,
    signInPassword: string,
    signUpEmail: string,
    signUpPassword: string,
    confirmPassword: string,
    handleSignInSubmit: () => Promise<boolean>,
    handleSignUpSubmit: () => Promise<boolean>,
    setFormError: (error: string) => void
  ): Promise<boolean> => {
    setIsRetrying(true);
    setFormError('');
    
    try {
      if (activeTab === 'signin') {
        return await handleSignInSubmit();
      } else {
        return await handleSignUpSubmit();
      }
    } catch (error) {
      console.error('Error during retry:', error);
      setFormError('Retry failed. Please try again.');
      return false;
    } finally {
      setIsRetrying(false);
    }
  };

  return {
    isRetrying,
    retryConnection,
    handleRetry
  };
};
