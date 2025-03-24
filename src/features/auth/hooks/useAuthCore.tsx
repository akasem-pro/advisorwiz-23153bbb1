
import { useState } from 'react';
import { toast } from 'sonner';

type NetworkStatus = 'online' | 'offline' | 'checking';

/**
 * Core hook for handling auth operations with improved error handling
 */
export const useAuthCore = () => {
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  /**
   * Checks network status with improved reliability
   */
  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      // First check navigator.onLine
      if (!navigator.onLine) {
        return false;
      }
      
      // Try multiple endpoints for better reliability
      const endpoints = [
        'https://www.google.com',
        'https://www.cloudflare.com',
        'https://httpbin.org/status/200'
      ];
      
      // We'll consider online if at least one endpoint responds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        // Try to reach any of the endpoints
        const results = await Promise.allSettled(
          endpoints.map(endpoint => 
            fetch(endpoint, { 
              method: 'HEAD',
              mode: 'no-cors',
              signal: controller.signal 
            })
          )
        );
        
        clearTimeout(timeoutId);
        
        // Check if at least one request succeeded
        const isOnline = results.some(result => result.status === 'fulfilled');
        return isOnline;
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Network check failed:", error);
        return false;
      }
    } catch (error) {
      console.error("Error checking network status:", error);
      return false;
    }
  };

  /**
   * Checks network status and handles retry attempts
   */
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    try {
      const isOnline = await Promise.race([
        checkNetworkStatus(),
        // Add timeout to ensure we don't wait too long
        new Promise<boolean>(resolve => setTimeout(() => resolve(false), 8000))
      ]);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        incrementRetry();
        return false;
      }
      
      resetRetryAttempts();
      return true;
    } catch (error) {
      console.error("Failed to validate network connection:", error);
      setFormError('Connection check failed. Please try again.');
      // Default to offline to trigger retry logic
      return false;
    }
  };
  
  /**
   * Generic form submission error handler with improved error categorization
   */
  const handleAuthError = (
    error: any, 
    setFormError: (error: string) => void,
    isSignIn: boolean = true
  ) => {
    const errorMessage = error.message || `An error occurred during ${isSignIn ? 'sign in' : 'sign up'}`;
    console.error(`Failed to ${isSignIn ? 'sign in' : 'sign up'}:`, errorMessage);
    
    // Handle network and timeout errors
    if (!navigator.onLine || 
        error.message?.includes('timeout') || 
        error.message?.includes('timed out') || 
        error.message?.includes('fetch failed') ||
        error.message?.includes('Failed to fetch') ||
        error.message?.includes('network request failed')) {
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
  
  const incrementRetry = () => {
    setRetryAttempts(prev => prev + 1);
  };

  const resetRetryAttempts = () => {
    setRetryAttempts(0);
  };
  
  return {
    retryAttempts,
    validateNetworkConnection,
    handleAuthError,
    incrementRetry,
    resetRetryAttempts,
    checkNetworkStatus
  };
};
