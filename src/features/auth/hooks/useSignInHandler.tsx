
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook for handling sign in submissions with improved preview environment support
 */
export const useSignInHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, setMockUser } = useAuth();
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
    // Only call preventDefault if e is a valid event
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!validateForm()) return false;

    setFormError('');
    setIsLoading(true);

    try {
      // Extract the redirect destination from location state
      const from = location.state?.from || '/';
      console.log("[SignInHandler] Sign in attempt, will redirect to:", from);
      
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
          
          // Create a mock user object that mimics Supabase user structure
          const mockUser = {
            id: 'mock-user-id',
            email: email,
            created_at: new Date().toISOString(),
            app_metadata: {},
            user_metadata: {
              name: email.split('@')[0],
              avatar_url: '',
            },
            aud: 'authenticated',
            role: 'authenticated'
          };
          
          // Store mock user in localStorage with a different key to avoid conflicts
          localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
          
          // Use the AuthProvider's setMockUser function to update the auth state
          setMockUser(mockUser);
          
          toast.success("Successfully signed in!");
          return true;
        } else {
          console.log("[Sign In] Mock authentication failed");
          setFormError('Invalid email or password. Please try again.');
          return false;
        }
      }
      
      // PRODUCTION MODE: Normal authentication flow
      let isOnline = true;
      isOnline = await validateNetworkConnection(setFormError);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        return false;
      }

      console.log("Attempting sign in with:", { email });
      const success = await signIn(email, password);
      
      if (!success) {
        setFormError('Authentication failed. Please check your credentials and try again.');
        return false;
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
