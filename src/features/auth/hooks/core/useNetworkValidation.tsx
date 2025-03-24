
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../../../integrations/supabase/client';

/**
 * Hook for validating network connection with improved reliability
 */
export const useNetworkValidation = () => {
  const [isChecking, setIsChecking] = useState(false);
  
  /**
   * Checks network status with improved reliability
   */
  const checkNetworkStatus = async (): Promise<boolean> => {
    setIsChecking(true);
    console.log("[Network Validation] Starting network status check");
    
    try {
      // First check browser's online status
      const browserOnline = navigator.onLine;
      console.log("[Network Validation] Browser reports online status:", browserOnline);
      
      if (!browserOnline) {
        console.log("[Network Validation] Browser reports offline, returning false");
        setIsChecking(false);
        return false;
      }
      
      // Perform a lightweight check against Supabase
      try {
        console.log("[Network Validation] Making lightweight check to Supabase");
        const start = performance.now();
        
        // Use a direct call to verify auth endpoint is accessible
        const { data, error } = await supabase.auth.getSession();
        
        const end = performance.now();
        console.log("[Network Validation] Response time:", Math.round(end - start), "ms");
        
        if (error) {
          console.error("[Network Validation] Supabase connection error:", error);
          setIsChecking(false);
          return false;
        }
        
        console.log("[Network Validation] Supabase connection successful");
        setIsChecking(false);
        return true;
      } catch (error) {
        console.error("[Network Validation] Supabase connection check failed:", error);
        setIsChecking(false);
        return false;
      }
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
      // First check browser's online status
      const browserOnline = navigator.onLine;
      console.log("[Network Validation] Browser reports online status:", browserOnline);
      
      if (!browserOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        setIsChecking(false);
        return false;
      }
      
      // For preview environments, skip Supabase check to prevent issues
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('localhost')) {
        console.log("[Network Validation] Preview environment detected, skipping Supabase check");
        setIsChecking(false);
        return true;
      }
      
      // Perform a lightweight check against Supabase
      try {
        console.log("[Network Validation] Making lightweight check to Supabase");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("[Network Validation] Supabase connection error:", error);
          setFormError('Unable to connect to authentication service. Please check your connection and try again.');
          setIsChecking(false);
          return false;
        }
        
        console.log("[Network Validation] Supabase connection successful");
        setIsChecking(false);
        return true;
      } catch (error) {
        console.error("[Network Validation] Supabase connection check failed:", error);
        setFormError('Connection to authentication service failed. Please try again later.');
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
