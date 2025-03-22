
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
    
    // Always check network status before attempting sign in
    setFormError('');
    setIsLoading(true);
    
    try {
      // Check network connection first with a timeout
      const isOnline = await Promise.race([
        validateNetworkConnection(setFormError),
        new Promise<boolean>(resolve => setTimeout(() => resolve(false), 5000))
      ]);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
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
