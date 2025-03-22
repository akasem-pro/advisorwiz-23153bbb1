
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Hook for handling retry operations
 */
export const useRetryHandler = () => {
  const { checkNetworkStatus } = useAuth();
  
  const handleRetry = async (
    activeTab: string,
    signInEmail: string,
    signInPassword: string,
    signUpEmail: string,
    signUpPassword: string,
    confirmPassword: string,
    handleSignInSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleSignUpSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    setFormError: (error: string) => void
  ) => {
    // Clear any existing error message
    setFormError('');
    
    // Show loading state
    toast.loading('Checking connection...');
    
    // Check network status with a timeout
    const isOnline = await Promise.race([
      checkNetworkStatus(),
      new Promise<boolean>(resolve => setTimeout(() => resolve(false), 5000))
    ]);
    
    console.log("Retry network check result:", isOnline ? "online" : "offline");
    
    // Dismiss loading toast
    toast.dismiss();
    
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
  };
  
  return { handleRetry };
};
