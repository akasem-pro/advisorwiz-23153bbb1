
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
      // In browser environments, navigator.onLine is sufficient
      return navigator.onLine;
    } catch (error) {
      console.error("Error checking network status:", error);
      // Default to online to prevent blocking the UI
      return true;
    }
  };

  /**
   * Checks network status and handles errors
   */
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    try {
      // In browser environments, navigator.onLine is sufficient
      const isOnline = navigator.onLine;
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        return false;
      }
      
      // Default to online to prevent blocking the UI
      return true;
    } catch (error) {
      console.error("Failed to validate network connection:", error);
      // Default to online to prevent blocking the UI
      return true;
    }
  };
  
  return {
    validateNetworkConnection,
    checkNetworkStatus
  };
};
