
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
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    validateForm: () => boolean,
    setFormError: (error: string) => void,
    setIsLoading: (loading: boolean) => void,
    setActiveTab: (tab: string) => void,
    setSignInEmail: (email: string) => void,
    resetFields: () => void
  ) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;
    
    setFormError('');
    setIsLoading(true);
    
    try {
      // Check network connection first
      const isOnline = await validateNetworkConnection(setFormError);
      if (!isOnline) {
        return;
      }
      
      console.log('Attempting signup with:', { email });
      const success = await signUp(email, password);
      
      if (success) {
        // Switch to sign in tab
        resetFields();
        setActiveTab('signin');
        setSignInEmail(email);
        
        toast.success("Registration successful! Please check your email to verify your account.");
      } else {
        // Handle unsuccessful sign-up
        setFormError('Registration failed. Please try again later.');
      }
    } catch (error: any) {
      if (error.message?.includes('already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
        setActiveTab('signin');
        setSignInEmail(email);
      } else {
        handleAuthError(error, setFormError, false);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleSignUp };
};
