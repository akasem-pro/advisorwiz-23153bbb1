
import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Custom hook for handling auth form submissions and retries
 * with improved error handling and network checking
 */
export const useAuthFormSubmit = () => {
  const { 
    signIn, 
    signUp, 
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
      toast.success("You're back online! You can now try again.");
    }
  }, [networkStatus, retryAttempts]);
  
  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    validateForm: () => boolean,
    setFormError: (error: string) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;
    
    setFormError('');
    setIsLoading(true);
    resetRetryAttempts();
    
    // First check network connectivity
    if (networkStatus === 'offline') {
      // Verify network status before showing error
      const isOnline = await checkNetworkStatus();
      if (!isOnline) {
        setFormError('Network error. Please check your connection and try again.');
        setIsLoading(false);
        incrementRetry();
        return;
      }
    }
    
    try {
      console.log("Attempting sign in with:", { email });
      await signIn(email, password);
      // Navigation will be handled in AuthProvider after successful login
    } catch (error: any) {
      console.error('Failed to sign in:', error);
      setFormError(error.message || 'Failed to sign in');
      
      if (error.message?.includes('network') || error.message?.includes('connection') || !navigator.onLine) {
        incrementRetry();
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    validateForm: () => boolean,
    setFormError: (error: string) => void,
    setIsLoading: (loading: boolean) => void,
    setActiveTab: (tab: string) => void,
    setSignInEmail: (email: string) => void,
    resetFields: () => void
  ) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;
    
    setFormError('');
    setIsLoading(true);
    resetRetryAttempts();
    
    // First check network connectivity
    if (networkStatus === 'offline') {
      // Verify network status before showing error
      const isOnline = await checkNetworkStatus();
      if (!isOnline) {
        setFormError('Network error. Please check your connection and try again.');
        setIsLoading(false);
        incrementRetry();
        return;
      }
    }
    
    try {
      console.log('Attempting signup with:', { email });
      await signUp(email, password);
      
      // Switch to sign in tab
      resetFields();
      setActiveTab('signin');
      setSignInEmail(email);
      
      toast.success("Registration successful! Please check your email to verify your account.");
    } catch (error: any) {
      console.error('Failed to sign up:', error);
      
      if (error.message?.includes('already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
        setActiveTab('signin');
        setSignInEmail(email);
      } else {
        setFormError(error.message || 'Failed to sign up');
        
        if (error.message?.includes('network') || error.message?.includes('connection') || !navigator.onLine) {
          incrementRetry();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  
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
    // First check network status before attempting retry
    await checkNetworkStatus();
    
    setFormError('');
    
    // Create a synthetic event to pass to the form handlers
    const syntheticEvent = {} as React.FormEvent<HTMLFormElement>;
    
    if (activeTab === 'signin' && signInEmail && signInPassword) {
      await handleSignInSubmit(syntheticEvent);
    } else if (activeTab === 'signup' && signUpEmail && signUpPassword && confirmPassword) {
      await handleSignUpSubmit(syntheticEvent);
    }
  };
  
  return {
    authLoading,
    networkStatus,
    handleSignIn,
    handleSignUp,
    handleRetry
  };
};
