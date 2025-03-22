
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
      toast.success("Connection restored! You can now try again.");
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
    
    // Check network status - now synchronous
    const isOnline = checkNetworkStatus();
    if (!isOnline) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
      incrementRetry();
      return;
    }
    
    setFormError('');
    setIsLoading(true);
    resetRetryAttempts();
    
    try {
      console.log("Attempting sign in with:", { email });
      const success = await signIn(email, password);
      console.log("Sign in result:", success ? "success" : "failed");
      
      if (!success) {
        // Handle unsuccessful sign-in
        setFormError('Authentication failed. Please check your credentials and try again.');
      }
    } catch (error: any) {
      console.error('Failed to sign in:', error);
      
      if (error.message?.includes('Invalid login credentials') || 
          error.message?.includes('Invalid email or password')) {
        setFormError('Invalid email or password. Please try again.');
      } else if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
        setFormError('Authentication request timed out. Please try again.');
        incrementRetry();
      } else if (!navigator.onLine || error.message?.includes('network') || 
                error.message?.includes('connection') || error.message?.includes('Unable to connect')) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        incrementRetry();
      } else {
        setFormError(error.message || 'An error occurred during sign in');
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
    
    // Check network status - now synchronous
    const isOnline = checkNetworkStatus();
    if (!isOnline) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
      incrementRetry();
      return;
    }
    
    setFormError('');
    setIsLoading(true);
    resetRetryAttempts();
    
    try {
      console.log('Attempting signup with:', { email });
      const success = await signUp(email, password);
      
      if (success) {
        // Switch to sign in tab
        resetFields();
        setActiveTab('signin');
        setSignInEmail(email);
        
        toast.success("Registration successful! Please check your email to verify your account.");
      } else {
        // Handle unsuccessful sign-up
        setFormError('Registration failed. Please try again later.');
      }
    } catch (error: any) {
      console.error('Failed to sign up:', error);
      
      if (error.message?.includes('already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
        setActiveTab('signin');
        setSignInEmail(email);
      } else if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
        setFormError('Registration request timed out. Please try again.');
        incrementRetry();
      } else if (!navigator.onLine || error.message?.includes('network') || 
                error.message?.includes('connection') || error.message?.includes('Unable to connect')) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        incrementRetry();
      } else {
        setFormError(error.message || 'An error occurred during registration');
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
    // Clear any existing error message
    setFormError('');
    
    // Show loading state
    toast.loading('Checking connection...');
    
    // Check network status - now synchronous
    const isOnline = checkNetworkStatus();
    console.log("Retry network check result:", isOnline ? "online" : "offline");
    
    // Dismiss loading toast
    toast.dismiss();
    
    if (!isOnline) {
      setFormError('Still unable to connect to authentication service. Please check your connection and try again.');
      return;
    }
    
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
  
  return {
    authLoading,
    networkStatus,
    handleSignIn,
    handleSignUp,
    handleRetry
  };
};
