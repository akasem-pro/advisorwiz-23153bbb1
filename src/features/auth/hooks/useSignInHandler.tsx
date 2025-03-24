
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';
import { toast } from 'sonner';

/**
 * Hook for handling sign in submissions
 */
export const useSignInHandler = () => {
  const { signIn } = useAuth();
  const { 
    validateNetworkConnection, 
    handleAuthError 
  } = useAuthCore();
  
  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement> | undefined,
    email: string,
    password: string,
    validateForm: () => boolean,
    setFormError: (error: string) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
    // Only call preventDefault if e is a valid event
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!validateForm()) return;

    setFormError('');
    setIsLoading(true);

    try {
      const isOnline = await validateNetworkConnection(setFormError);

      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        return;
      }

      console.log("Attempting sign in with:", { email });

      const success = await signIn(email, password);

      if (!success) {
        setFormError('Authentication failed. Please check your credentials and try again.');
      }
    } catch (error: any) {
      handleAuthError(error, setFormError, true);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignIn };
};
