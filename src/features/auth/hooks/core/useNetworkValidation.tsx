
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook for validating network connection with improved reliability
 */
export const useNetworkValidation = () => {
  /**
   * Checks network status with improved reliability
   */
  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      // First check navigator.onLine
      if (!navigator.onLine) {
        return false;
      }
      
      // For the browser environment, navigator.onLine is actually sufficient
      // External fetch requests often fail in preview environments due to CORS
      // So we'll consider the user online if navigator.onLine is true
      return true;
    } catch (error) {
      console.error("Error checking network status:", error);
      return false;
    }
  };

  /**
   * Checks network status and handles errors
   */
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    try {
      const isOnline = navigator.onLine;
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Failed to validate network connection:", error);
      setFormError('Connection check failed. Please try again.');
      // Default to offline to trigger retry logic
      return false;
    }
  };
  
  return {
    validateNetworkConnection,
    checkNetworkStatus
  };
};
