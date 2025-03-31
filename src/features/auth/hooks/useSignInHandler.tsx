
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
  ): Promise<boolean> => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) return false;
    
    // Clear previous errors
    setFormError('');
    setIsLoading(true);
    
    try {
      // Check network connection first
      const isOnline = await validateNetworkConnection(setFormError);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        return false;
      }
      
      console.log('Attempting signin with:', { email });
      const success = await signIn(email, password);
      
      if (success) {
        return true;
      } else {
        // Handle unsuccessful sign-in
        setFormError('Authentication failed. Please check your credentials.');
        return false;
      }
    } catch (error: any) {
      // Pass isSignIn as true for sign in context
      handleAuthError(error, setFormError, true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleSignIn };
};
