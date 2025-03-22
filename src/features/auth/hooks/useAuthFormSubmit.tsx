
import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Custom hook for handling auth form submissions and retries
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
    
    // Check if we're online
    if (!navigator.onLine) {
      setFormError('You appear to be offline. Please check your internet connection.');
      return;
    }
    
    setIsLoading(true);
    resetRetryAttempts();
    
    try {
      console.log("Attempting sign in with:", { email });
      await signIn(email, password);
      // Navigation will be handled in AuthProvider after successful login
    } catch (error: any) {
      console.error('Failed to sign in:', error);
      setFormError(error.message || 'Failed to sign in');
      
      if (!navigator.onLine) {
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
    
    // Check if we're online
    if (!navigator.onLine) {
      setFormError('You appear to be offline. Please check your internet connection.');
      return;
    }
    
    setIsLoading(true);
    resetRetryAttempts();
    
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
        
        if (!navigator.onLine) {
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
    setFormError('');
    
    // Check if we're online now
    if (!navigator.onLine) {
      setFormError('You are still offline. Please check your internet connection and try again.');
      return;
    }
    
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
