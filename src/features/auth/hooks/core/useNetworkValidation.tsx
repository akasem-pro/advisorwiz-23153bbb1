
import { toast } from 'sonner';

/**
 * Hook for network validation with improved diagnostics
 */
export const useNetworkValidation = () => {
  const validateNetworkConnection = async (setFormError: (error: string) => void): Promise<boolean> => {
    try {
      // Basic check using navigator.onLine
      if (!navigator.onLine) {
        console.log("[Auth] Browser reports device is offline");
        setFormError('Your device appears to be offline. Please check your connection and try again.');
        return false;
      }
      
      // For preview environments, skip additional checks
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('lovableproject') ||
          window.location.hostname.includes('localhost')) {
        console.log("[Auth] Preview environment detected, skipping detailed connectivity check");
        return true;
      }
      
      // Try to ping a reliable endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      console.error("[Auth] Network connectivity test failed:", error);
      setFormError('Network connectivity test failed. Please check your connection and try again.');
      return false;
    }
  };
  
  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      // For preview environments, skip checks
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('lovableproject') ||
          window.location.hostname.includes('localhost')) {
        console.log("[Auth] Preview environment detected, skipping connectivity check");
        return true;
      }
      
      // Basic check using navigator.onLine
      if (!navigator.onLine) {
        console.log("[Auth] Browser reports device is offline");
        toast.error('Your device appears to be offline');
        return false;
      }
      
      // Try to ping a reliable endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      console.error("[Auth] Network status check failed:", error);
      toast.error('Network connectivity check failed');
      return false;
    }
  };
  
  return { validateNetworkConnection, checkNetworkStatus };
};
