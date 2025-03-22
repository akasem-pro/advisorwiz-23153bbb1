
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
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    validateForm: () => boolean,
    setFormError: (error: string) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;
    
    // Clear previous errors
    setFormError('');
    setIsLoading(true);
    
    try {
      // Check network connection first
      const isOnline = await validateNetworkConnection(setFormError);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        setIsLoading(false);
        return;
      }
      
      console.log("Attempting sign in with:", { email });
      const success = await signIn(email, password);
      
      if (!success) {
        // Handle unsuccessful sign-in
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
