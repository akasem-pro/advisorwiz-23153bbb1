
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
      
      // Check if we're in a preview environment using a more reliable method
      const hostname = window.location.hostname;
      
      // Define known production domains
      const productionDomains = [
        'advisorwiz.com',
        'consultantwiz.com',
        'app.advisorwiz.com',
        'app.consultantwiz.com',
        'production',
        'localhost'
      ];
      
      // Check if the hostname is a production domain or has a production suffix
      let isProduction = false;
      for (const domain of productionDomains) {
        if (hostname === domain || hostname.endsWith('.' + domain)) {
          isProduction = true;
          break;
        }
      }
      
      // If not explicitly a production domain, check if it looks like one
      if (!isProduction) {
        isProduction = hostname.endsWith('.app') || !hostname.includes('.');
      }
      
      const isPreviewEnv = !isProduction && (hostname.includes('preview') || hostname.includes('lovableproject'));
      
      console.log("[Sign In] Environment check:", { 
        hostname,
        isProduction,
        isPreview: isPreviewEnv 
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
          
          // Navigate to the redirect destination
          navigate(from);
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
      
      // On successful sign in, navigate to the redirect destination
      navigate(from);
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
