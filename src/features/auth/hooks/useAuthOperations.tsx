
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useSignInOperation } from './auth-operations/useSignInOperation';
import { useSignOutOperation } from './auth-operations/useSignOutOperation';
import { useSignUpOperation } from './auth-operations/useSignUpOperation';
import { usePasswordResetOperation } from './auth-operations/usePasswordResetOperation';
import { useNetworkStatus } from './useNetworkStatus';
import { UserType } from '../../../types/profileTypes';

export const useAuthOperations = (
  createUserProfile?: (user: User, userType: UserType) => Promise<any>,
  setMockUser?: (user: User | null) => void
) => {
  const [loading, setLoading] = useState(false);
  const { networkStatus } = useNetworkStatus();
  
  // Initialize auth operations hooks
  const { signIn } = useSignInOperation(networkStatus, setLoading);
  const { signOut } = useSignOutOperation(setLoading);
  const { signUp } = useSignUpOperation(setLoading, setMockUser);
  const { 
    resetPassword, 
    updatePassword, 
    updateEmail, 
    sendPasswordResetEmail 
  } = usePasswordResetOperation(setLoading);
  
  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
    sendPasswordResetEmail,
  };
};
