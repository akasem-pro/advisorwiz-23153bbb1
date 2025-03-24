
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';
import { toast } from 'sonner';

/**
 * Hook for handling sign in submissions with improved preview environment support
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
      // In preview environments, simplify the connection check
      const isPreviewEnv = window.location.hostname.includes('preview') || 
                           window.location.hostname.includes('lovableproject') ||
                           window.location.hostname.includes('localhost');
      
      let isOnline = true;
      
      if (!isPreviewEnv) {
        isOnline = await validateNetworkConnection(setFormError);
        
        if (!isOnline) {
          setFormError('Unable to connect to authentication service. Please check your connection and try again.');
          setIsLoading(false);
          return;
        }
      }

      console.log("Attempting sign in with:", { email });

      // Special handling for preview environments
      if (isPreviewEnv) {
        console.log("[Sign In] Preview environment detected, using special handling");
        try {
          const success = await signIn(email, password);
          
          if (!success) {
            // In preview, assume credential error rather than connection error
            setFormError('Authentication failed. Please check your credentials and try again.');
          }
        } catch (error: any) {
          console.error("[Sign In Preview] Error:", error);
          // In preview, assume credential error is most likely
          setFormError('Authentication failed. Please check your credentials and try again.');
        }
      } else {
        // Normal production flow
        const success = await signIn(email, password);
        
        if (!success) {
          setFormError('Authentication failed. Please check your credentials and try again.');
        }
      }
    } catch (error: any) {
      handleAuthError(error, setFormError, true);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignIn };
};
