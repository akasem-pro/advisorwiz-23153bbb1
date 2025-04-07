
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInHandler } from './useSignInHandler';
import { useSignUpHandler } from './useSignUpHandler';
import { useNetworkStatus } from './useNetworkStatus';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Custom hook for managing sign in page state and operations with improved connection handling
 */
export const useSignInPage = () => {
  // Form state
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Sign in form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [errors, setErrors] = useState({
    signInEmail: '',
    signInPassword: '',
    signUpEmail: '',
    signUpPassword: '',
    confirmPassword: ''
  });
  
  // Sign up form state
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Custom hooks
  const navigate = useNavigate();
  const { handleSignIn } = useSignInHandler();
  const { handleSignUp } = useSignUpHandler();
  const { networkStatus, checkNetworkStatus } = useNetworkStatus();
  const { checkSupabaseConnection } = useAuth();
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    console.log("Changing tab to:", value);
    setActiveTab(value);
    setFormError('');
    resetErrors();
  };
  
  // Reset form fields
  const resetFields = () => {
    if (activeTab === 'signin') {
      setSignInPassword('');
    } else {
      setSignUpEmail('');
      setSignUpPassword('');
      setConfirmPassword('');
    }
    resetErrors();
  };
  
  // Reset error messages
  const resetErrors = () => {
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: ''
    });
  };
  
  // Validate sign in form
  const validateSignInForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!signInEmail) {
      newErrors.signInEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signInEmail)) {
      newErrors.signInEmail = 'Please enter a valid email';
      isValid = false;
    } else {
      newErrors.signInEmail = '';
    }
    
    if (!signInPassword) {
      newErrors.signInPassword = 'Password is required';
      isValid = false;
    } else {
      newErrors.signInPassword = '';
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Validate sign up form
  const validateSignUpForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!signUpEmail) {
      newErrors.signUpEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signUpEmail)) {
      newErrors.signUpEmail = 'Please enter a valid email';
      isValid = false;
    } else {
      newErrors.signUpEmail = '';
    }
    
    if (!signUpPassword) {
      newErrors.signUpPassword = 'Password is required';
      isValid = false;
    } else if (signUpPassword.length < 6) {
      newErrors.signUpPassword = 'Password must be at least 6 characters';
      isValid = false;
    } else {
      newErrors.signUpPassword = '';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (confirmPassword !== signUpPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Connection retry handler with improved diagnostics
  const handleConnectionRetry = useCallback(async () => {
    setFormError('');
    setIsLoading(true);
    
    try {
      // First check browser network status
      const isNetworkOnline = await checkNetworkStatus();
      if (!isNetworkOnline) {
        setFormError('Your device appears to be offline. Please check your internet connection.');
        return false;
      }
      
      // Then check Supabase connection specifically
      console.log("[SignInPage] Testing connection to Supabase...");
      const canConnectSupabase = await checkSupabaseConnection();
      
      if (!canConnectSupabase) {
        setFormError('Could not connect to authentication service. Please check your connection and try again.');
        toast.error('Connection to authentication service failed');
        return false;
      }
      
      toast.success('Connection successful');
      setFormError('');
      return true;
    } catch (error) {
      console.error("[SignInPage] Connection retry error:", error);
      setFormError('Connection check failed. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [checkNetworkStatus, checkSupabaseConnection]);
  
  // Handle sign in form submission
  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Sign In form submitted");
    return handleSignIn(
      e, 
      signInEmail, 
      signInPassword, 
      validateSignInForm, 
      setFormError, 
      setIsLoading,
      navigate
    );
  };
  
  // Handle sign up form submission
  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Sign Up form submitted");
    return handleSignUp(
      e, 
      signUpEmail,
      signUpPassword, 
      validateSignUpForm, 
      setFormError, 
      setIsLoading, 
      setActiveTab,
      setSignInEmail,
      resetFields
    );
  };
  
  // Determine if sign in button should be disabled
  const isSignInDisabled = isLoading || networkStatus === 'checking';
  
  // Determine if sign up button should be disabled
  const isSignUpDisabled = isLoading || networkStatus === 'checking';
  
  return {
    formState: {
      activeTab,
      handleTabChange,
      isLoading,
      formError,
      signInEmail,
      setSignInEmail,
      signInPassword,
      setSignInPassword,
      signUpEmail,
      setSignUpEmail,
      signUpPassword,
      setSignUpPassword,
      confirmPassword,
      setConfirmPassword,
      errors
    },
    networkStatus,
    handleSignInSubmit,
    handleSignUpSubmit,
    handleConnectionRetry,
    isSignInDisabled,
    isSignUpDisabled
  };
};
