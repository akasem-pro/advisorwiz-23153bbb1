
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSignInForm } from './useSignInForm';
import { useAuthFormSubmit } from './useAuthFormSubmit';
import { useAuth } from '../context/AuthProvider';
import { useRetryHandler } from './useRetryHandler';
import { useSignInHandler } from './useSignInHandler';
import { useSignUpHandler } from './useSignUpHandler';
import { toast } from 'sonner';

/**
 * Custom hook for managing the Sign In page functionality
 */
export const useSignInPage = () => {
  const { user, networkStatus, checkNetworkStatus } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state, default to home
  const from = location.state?.from || '/';
  
  // Initialize form state using existing hooks
  const formState = useSignInForm();
  const { handleAuthError } = useAuthFormSubmit();
  const { isRetrying, retryConnection, handleRetry } = useRetryHandler();
  const { handleSignIn } = useSignInHandler();
  const { handleSignUp } = useSignUpHandler();
  
  // Destructure form state for easier access
  const {
    setFormError,
    setIsLoading,
    setActiveTab,
    setSignInEmail,
    validateSignInForm,
    validateSignUpForm
  } = formState;
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      console.log("[SignIn] User already authenticated, redirecting to:", from);
      navigate(from);
    }
  }, [user, navigate, from]);
  
  // Handle sign in form submission
  const handleSignInSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      const success = await handleSignIn(
        e, 
        formState.signInEmail, 
        formState.signInPassword, 
        validateSignInForm, 
        setFormError, 
        setIsLoading
      );
      
      if (success) {
        console.log("[SignIn] Successfully signed in, redirecting to:", from);
        navigate(from);
        return true;
      }
      return false;
    } catch (error) {
      console.error("[SignIn] Error during sign in:", error);
      setFormError('An unexpected error occurred during sign in.');
      setIsLoading(false);
      return false;
    }
  };
  
  // Handle sign up form submission
  const handleSignUpSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      const success = await handleSignUp(
        e, 
        formState.signUpEmail, 
        formState.signUpPassword, 
        validateSignUpForm, 
        setFormError, 
        setIsLoading, 
        setActiveTab, 
        setSignInEmail, 
        () => {
          formState.setSignUpEmail('');
          formState.setSignUpPassword('');
          formState.setConfirmPassword('');
        }
      );
      
      if (success) {
        console.log("[SignUp] Successfully signed up, redirecting to:", from);
        navigate(from);
        return true;
      }
      return false;
    } catch (error) {
      console.error("[SignUp] Error during sign up:", error);
      setFormError('An unexpected error occurred during sign up.');
      setIsLoading(false);
      return false;
    }
  };
  
  // Handler for retrying submission after network error
  const handleRetrySubmit = async () => {
    setFormError('');
    
    toast.loading('Preparing to retry...');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await handleRetry(
      formState.activeTab,
      formState.signInEmail,
      formState.signInPassword,
      formState.signUpEmail,
      formState.signUpPassword,
      formState.confirmPassword,
      handleSignInSubmit,
      handleSignUpSubmit,
      setFormError
    );
  };
  
  // Handler for retrying connection
  const handleConnectionRetry = async () => {
    try {
      const connected = await retryConnection();
      
      if (connected) {
        await handleRetrySubmit();
      }
    } catch (error) {
      console.error("Error during retry flow:", error);
      setFormError('Connection check failed. Please try again.');
    }
  };
  
  // Calculate disabled states
  const isSignInDisabled = formState.isLoading;
  const isSignUpDisabled = formState.isLoading;
  
  return {
    formState,
    networkStatus,
    isRetrying,
    handleSignInSubmit,
    handleSignUpSubmit,
    handleConnectionRetry,
    isSignInDisabled,
    isSignUpDisabled,
    from
  };
};
