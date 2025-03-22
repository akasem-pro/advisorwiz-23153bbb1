
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
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;
    setFormError('');
    
    // Skip additional network check - we'll rely on the browser's navigator.onLine
    if (!navigator.onLine) {
      setFormError('You are currently offline. Please check your internet connection and try again.');
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
      
      if (error.message?.includes('network') || error.message?.includes('connection') || error.message?.includes('offline')) {
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
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;
    setFormError('');
    
    // Skip additional network check - we'll rely on the browser's navigator.onLine
    if (!navigator.onLine) {
      setFormError('You are currently offline. Please check your internet connection and try again.');
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    resetRetryAttempts();
    
    try {
      console.log('Attempting signup with:', { email });
      await signUp(email, password);
      
      setActiveTab('signin');
      resetFields();
      
      toast.success("Registration successful! Please check your email to verify your account.");
    } catch (error: any) {
      console.error('Failed to sign up:', error);
      
      if (error.message?.includes('already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
        setActiveTab('signin');
        setSignInEmail(email);
      } else {
        setFormError(error.message || 'Failed to sign up');
        
        if (error.message?.includes('network') || error.message?.includes('connection') || error.message?.includes('offline')) {
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
    incrementRetry();
    
    if (!navigator.onLine) {
      setFormError('Still offline. Please check your internet connection and try again.');
      return;
    }
    
    if (activeTab === 'signin' && signInEmail && signInPassword) {
      handleSignInSubmit(new CustomEvent('retry') as unknown as React.FormEvent<HTMLFormElement>);
    } else if (activeTab === 'signup' && signUpEmail && signUpPassword && confirmPassword) {
      handleSignUpSubmit(new CustomEvent('retry') as unknown as React.FormEvent<HTMLFormElement>);
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
