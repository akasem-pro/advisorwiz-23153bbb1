
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';
import { toast } from 'sonner';

/**
 * Hook for handling sign up submissions
 */
export const useSignUpHandler = () => {
  const { signUp } = useAuth();
  const { 
    validateNetworkConnection, 
    handleAuthError
  } = useAuthCore();
  
  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement> | undefined,
    email: string,
    password: string,
    validateForm: () => boolean,
    setFormError: (error: string) => void,
    setIsLoading: (loading: boolean) => void,
    setActiveTab: (tab: string) => void,
    setSignInEmail: (email: string) => void,
    resetFields: () => void
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
      
      console.log('Attempting signup with:', { email });
      const success = await signUp(email, password);
      
      if (success) {
        // Switch to sign in tab
        resetFields();
        setActiveTab('signin');
        setSignInEmail(email);
        
        toast.success("Registration successful! Please check your email to verify your account.");
        return true;
      } else {
        // Handle unsuccessful sign-up
        setFormError('Registration failed. Please try again later.');
        return false;
      }
    } catch (error: any) {
      if (error.message?.includes('already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
        setActiveTab('signin');
        setSignInEmail(email);
        return false;
      } else {
        handleAuthError(error, setFormError, false);
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleSignUp };
};
