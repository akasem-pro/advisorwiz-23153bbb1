
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
  } = usePasswordResetOperation(setLoading);

  // Mock functions that would be implemented in a real app
  const updateEmail = async (newEmail: string): Promise<boolean> => {
    console.log("Update email functionality to be implemented");
    return Promise.resolve(false);
  };
  
  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    return resetPassword(email);
  };
  
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
