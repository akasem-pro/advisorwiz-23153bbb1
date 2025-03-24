
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
   * Checks network status and handles errors
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
