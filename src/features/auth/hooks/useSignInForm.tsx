
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

export type SignInFormErrors = {
  signInEmail: string;
  signInPassword: string;
  signUpEmail: string;
  signUpPassword: string;
  confirmPassword: string;
};

/**
 * Custom hook for managing sign in form state and validation
 */
export const useSignInForm = () => {
  const { networkStatus, checkNetworkStatus } = useAuth();
  
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [errors, setErrors] = useState<SignInFormErrors>({
    signInEmail: '',
    signInPassword: '',
    signUpEmail: '',
    signUpPassword: '',
    confirmPassword: '',
  });
  
  useEffect(() => {
    if (networkStatus === 'online' && formError && formError.toLowerCase().includes('network')) {
      setFormError('');
    } else if (networkStatus === 'offline' && !formError) {
      setFormError('You appear to be offline. Please check your internet connection.');
    }
  }, [networkStatus, formError]);
  
  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const validateSignInForm = (): boolean => {
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    });
    
    let hasErrors = false;
    
    if (!signInEmail) {
      setErrors(prev => ({ ...prev, signInEmail: 'Email is required' }));
      hasErrors = true;
    } else if (!validateEmail(signInEmail)) {
      setErrors(prev => ({ ...prev, signInEmail: 'Please enter a valid email' }));
      hasErrors = true;
    }
    
    if (!signInPassword) {
      setErrors(prev => ({ ...prev, signInPassword: 'Password is required' }));
      hasErrors = true;
    }
    
    return !hasErrors;
  };
  
  const validateSignUpForm = (): boolean => {
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    });
    
    let hasErrors = false;
    
    if (!signUpEmail) {
      setErrors(prev => ({ ...prev, signUpEmail: 'Email is required' }));
      hasErrors = true;
    } else if (!validateEmail(signUpEmail)) {
      setErrors(prev => ({ ...prev, signUpEmail: 'Please enter a valid email' }));
      hasErrors = true;
    }
    
    if (!signUpPassword) {
      setErrors(prev => ({ ...prev, signUpPassword: 'Password is required' }));
      hasErrors = true;
    } else if (signUpPassword.length < 6) {
      setErrors(prev => ({ ...prev, signUpPassword: 'Password must be at least 6 characters' }));
      hasErrors = true;
    }
    
    if (signUpPassword !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords don't match" }));
      hasErrors = true;
    }
    
    return !hasErrors;
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    });
    setFormError('');
  };
  
  const resetFormErrors = () => {
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    });
    setFormError('');
  };
  
  return {
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
    activeTab,
    setActiveTab,
    formError,
    setFormError,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    validateEmail,
    validateSignInForm,
    validateSignUpForm,
    handleTabChange,
    resetFormErrors
  };
};
