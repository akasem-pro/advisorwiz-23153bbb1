
import { useAuthCore } from './useAuthCore';
import { useSignInHandler } from './useSignInHandler';
import { useSignUpHandler } from './useSignUpHandler';
import { useRetryHandler } from './useRetryHandler';

/**
 * Custom hook for handling auth form submissions and retries
 * with improved error handling and network checking
 */
export const useAuthFormSubmit = () => {
  const { authLoading, networkStatus } = useAuthCore();
  const { handleSignIn } = useSignInHandler();
  const { handleSignUp } = useSignUpHandler();
  const { handleRetry } = useRetryHandler();
  
  return {
    authLoading,
    networkStatus,
    handleSignIn,
    handleSignUp,
    handleRetry
  };
};
