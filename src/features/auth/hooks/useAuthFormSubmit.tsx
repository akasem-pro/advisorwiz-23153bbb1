
import { useState, useCallback } from 'react';
import { useSignInHandler } from './useSignInHandler';
import { useSignUpHandler } from './useSignUpHandler';
import { useRetryHandler } from './useRetryHandler';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';

/**
 * Combined hook for handling authentication form submissions with improved error handling
 */
export const useAuthFormSubmit = () => {
  // Get the necessary auth context
  const { loading: authLoading, networkStatus, checkNetworkStatus } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Import the individual handlers
  const { handleSignIn } = useSignInHandler();
  const { handleSignUp } = useSignUpHandler();
  const { handleRetry, isRetrying } = useRetryHandler();
  
  // Combined loading state
  const isLoading = authLoading || isSubmitting || isRetrying;
  
  // Enhanced retry function with better error feedback
  const retryConnection = async () => {
    try {
      toast.loading('Checking connection...');
      console.log("[Auth Form] Testing Supabase connection directly");
      
      // Test Supabase connection directly
      const start = performance.now();
      const { data, error } = await supabase.auth.getSession();
      const end = performance.now();
      
      console.log("[Auth Form] Supabase connection test took", Math.round(end - start), "ms");
      console.log("[Auth Form] Supabase response:", { data, error });
      
      if (error) {
        console.error("[Auth Form] Supabase connection error:", error);
        toast.dismiss();
        toast.error('Connection failed: ' + error.message);
        return false;
      }
      
      // Short timeout to simulate connection check
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For better UX in preview environments, always assume connection is restored
      toast.dismiss();
      toast.success('Connection verified!');
      return true;
    } catch (error) {
      console.error("[Auth Form] Connection retry error:", error);
      toast.dismiss();
      toast.error('Connection check failed');
      return false;
    }
  };
  
  return {
    authLoading,
    networkStatus,
    isSubmitting,
    setIsSubmitting,
    isRetrying,
    isLoading,
    handleSignIn,
    handleSignUp,
    handleRetry,
    retryConnection
  };
};
