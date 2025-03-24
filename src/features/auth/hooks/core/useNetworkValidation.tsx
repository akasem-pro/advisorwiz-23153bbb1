
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../../../integrations/supabase/client';

/**
 * Hook for validating network connection with improved reliability
 */
export const useNetworkValidation = () => {
  const [isChecking, setIsChecking] = useState(false);
  
  /**
   * Checks network status with improved reliability and preview environment handling
   */
  const checkNetworkStatus = async (): Promise<boolean> => {
    setIsChecking(true);
    console.log("[Network Validation] Starting network status check");
    
    try {
      // First check if we're in a preview environment
      const isPreviewEnv = window.location.hostname.includes('preview') || 
                           window.location.hostname.includes('lovableproject') ||
                           window.location.hostname.includes('localhost');
      
      if (isPreviewEnv) {
        console.log("[Network Validation] Preview environment detected, assuming online");
        setIsChecking(false);
        return true;
      }
      
      // First check browser's online status
      const browserOnline = navigator.onLine;
      console.log("[Network Validation] Browser reports online status:", browserOnline);
      
      if (!browserOnline) {
        console.log("[Network Validation] Browser reports offline, returning false");
        setIsChecking(false);
        return false;
      }
      
      // Assume online if browser reports online
      setIsChecking(false);
      return true;
    } catch (error) {
      console.error("[Network Validation] Error checking network status:", error);
      setIsChecking(false);
      // Default to online to prevent blocking the UI
      return true;
    }
  };

  /**
   * Checks network status and handles errors
   */
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    setIsChecking(true);
    console.log("[Network Validation] Starting network validation");
    
    try {
      // Check if we're in a preview environment
      const isPreviewEnv = window.location.hostname.includes('preview') || 
                           window.location.hostname.includes('lovableproject') ||
                           window.location.hostname.includes('localhost');
      
      if (isPreviewEnv) {
        console.log("[Network Validation] Preview environment detected, skipping checks");
        setIsChecking(false);
        return true;
      }
      
      // First check browser's online status
      const browserOnline = navigator.onLine;
      console.log("[Network Validation] Browser reports online status:", browserOnline);
      
      if (!browserOnline) {
        setFormError('Your device appears to be offline. Please check your connection and try again.');
        setIsChecking(false);
        return false;
      }
      
      // Simple fetch test to validate connectivity
      try {
        console.log("[Network Validation] Checking if we can make a network request");
        const response = await fetch('https://www.google.com/favicon.ico', { 
          mode: 'no-cors',
          cache: 'no-cache',
          method: 'HEAD',
          // Set a short timeout to avoid prolonged waits
          signal: AbortSignal.timeout(3000) 
        });
        
        console.log("[Network Validation] Network check completed");
        setIsChecking(false);
        return true;
      } catch (error) {
        console.error("[Network Validation] Network check failed:", error);
        setFormError('Unable to connect to the internet. Please check your connection and try again.');
        setIsChecking(false);
        return false;
      }
    } catch (error) {
      console.error("[Network Validation] Error validating network connection:", error);
      setIsChecking(false);
      // Default to online to prevent blocking the UI
      return true;
    } finally {
      setIsChecking(false);
    }
  };
  
  return {
    validateNetworkConnection,
    checkNetworkStatus,
    isChecking
  };
};
