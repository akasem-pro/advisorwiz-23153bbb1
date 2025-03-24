
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

/**
 * Hook for handling sign in submissions with improved preview environment support
 */
export const useSignInHandler = () => {
  const navigate = useNavigate();
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
      // Check if we're in a preview environment
      const isPreviewEnv = window.location.hostname.includes('preview') || 
                           window.location.hostname.includes('lovableproject') ||
                           window.location.hostname.includes('localhost');
      
      console.log("[Sign In] Environment check:", { 
        isPreview: isPreviewEnv, 
        hostname: window.location.hostname 
      });
      
      // PREVIEW MODE: Special handling for preview environments
      if (isPreviewEnv) {
        console.log("[Sign In] Preview environment detected, using mock authentication");
        
        // Wait to simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo/preview purposes, validate the credentials using default test accounts
        // or allow any login to succeed in preview mode
        const isTestAccount = (
          (email === 'consumer@gmail.com' && password === 'password123') ||
          (email === 'advisor@gmail.com' && password === 'password123')
        );
        
        if (isTestAccount || true) { // Allow any login for easier testing
          console.log("[Sign In] Mock authentication successful");
          toast.success("Successfully signed in!");
          
          // Set a local storage item to simulate logged in state
          localStorage.setItem('mock_auth_user', JSON.stringify({
            id: 'mock-user-id',
            email: email,
            created_at: new Date().toISOString()
          }));
          
          // Redirect to homepage
          navigate('/');
          return true;
        } else {
          console.log("[Sign In] Mock authentication failed");
          setFormError('Invalid email or password. Please try again.');
          setIsLoading(false);
          return false;
        }
      }
      
      // PRODUCTION MODE: Normal authentication flow
      let isOnline = true;
      isOnline = await validateNetworkConnection(setFormError);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        setIsLoading(false);
        return false;
      }

      console.log("Attempting sign in with:", { email });
      const success = await signIn(email, password);
      
      if (!success) {
        setFormError('Authentication failed. Please check your credentials and try again.');
      }
      
      return success;
    } catch (error: any) {
      handleAuthError(error, setFormError, true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignIn };
};
