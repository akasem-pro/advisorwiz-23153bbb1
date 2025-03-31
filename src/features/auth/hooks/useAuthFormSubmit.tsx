
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';

/**
 * Custom hook for handling auth form submissions with improved error handling
 */
export const useAuthFormSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { handleAuthError } = useAuthCore();

  // Reset form error
  const resetError = () => setFormError('');
  
  // Check if auth system is ready to handle requests
  const checkAuthSystemReady = async (): Promise<boolean> => {
    const { networkStatus, checkNetworkStatus } = useAuth();
    
    if (networkStatus === 'offline') {
      setFormError('You appear to be offline. Please check your internet connection.');
      return false;
    }
    
    // Only run the actual check if we're not already offline
    if (networkStatus !== 'online') {
      const isOnline = await checkNetworkStatus();
      if (!isOnline) {
        setFormError('Network connection issue detected. Please check your connection and try again.');
        return false;
      }
    }
    
    return true;
  };

  return {
    isLoading,
    setIsLoading,
    formError,
    setFormError,
    resetError,
    checkAuthSystemReady,
    handleAuthError
  };
};
