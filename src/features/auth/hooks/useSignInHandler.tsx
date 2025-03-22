
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';

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
      // Check network connection first
      const isOnline = await validateNetworkConnection(setFormError);
      if (!isOnline) {
        return;
      }
      
      console.log("Attempting sign in with:", { email });
      const success = await signIn(email, password);
      
      if (!success) {
        // Handle unsuccessful sign-in
        setFormError('Authentication failed. Please check your credentials and try again.');
      }
    } catch (error: any) {
      if (error.message?.includes('Invalid login credentials') || 
          error.message?.includes('Invalid email or password')) {
        setFormError('Invalid email or password. Please try again.');
      } else {
        handleAuthError(error, setFormError, true);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleSignIn };
};
