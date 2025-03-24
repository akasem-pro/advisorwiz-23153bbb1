
import { useState } from 'react';
import { toast } from 'sonner';
import { useSupabase } from '../../../hooks/useSupabase';
import { useAuthOperations } from './useAuthOperations';
import { useNetworkRetry } from './useNetworkRetry';

/**
 * Hook for handling authentication actions
 */
export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const { networkStatus, checkNetworkStatus } = useNetworkRetry();
  
  // Get auth operations from the refactored hooks
  const { signIn, signUp, signOut } = useAuthOperations(
    networkStatus,
    setLoading,
    checkNetworkStatus
  );

  return {
    signIn,
    signUp,
    signOut,
    loading,
    setLoading
  };
};
