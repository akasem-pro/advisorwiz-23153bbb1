
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';

/**
 * Core hook for handling auth operations with network checking
 */
export const useAuthCore = () => {
  const { 
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
  
  /**
   * Checks network status and handles retry attempts
   */
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    try {
      // First check network status
      const isOnline = await checkNetworkStatus();
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        incrementRetry();
        return false;
      }
      
      resetRetryAttempts();
      return true;
    } catch (error) {
      console.error("Failed to validate network connection:", error);
      // Default to online if checking fails to prevent blocking the form
      return true;
    }
  };
  
  /**
   * Generic form submission error handler
   */
  const handleAuthError = (
    error: any, 
    setFormError: (error: string) => void,
    isSignIn: boolean = true
  ) => {
    const errorMessage = error.message || `An error occurred during ${isSignIn ? 'sign in' : 'sign up'}`;
    console.error(`Failed to ${isSignIn ? 'sign in' : 'sign up'}:`, errorMessage);
    
    // Handle network and timeout errors
    if (error.message?.includes('timeout') || 
        error.message?.includes('timed out') || 
        error.message?.includes('fetch failed') ||
        error.message?.includes('Failed to fetch')) {
      setFormError('Authentication request timed out. Please try again.');
      incrementRetry();
      return;
    }
    
    // Handle offline errors
    if (!navigator.onLine || 
        error.message?.includes('network') || 
        error.message?.includes('connection') || 
        error.message?.includes('Unable to connect')) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
      incrementRetry();
      return;
    }
    
    // Handle specific auth errors
    if (isSignIn) {
      if (error.message?.includes('Invalid login credentials') || 
          error.message?.includes('Invalid email or password')) {
        setFormError('Invalid email or password. Please try again.');
      } else {
        setFormError(errorMessage);
      }
    } else {
      if (error.message?.includes('email already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
      } else {
        setFormError(errorMessage);
      }
    }
  };
  
  return {
    authLoading,
    networkStatus,
    validateNetworkConnection,
    handleAuthError,
    incrementRetry,
    resetRetryAttempts
  };
};
