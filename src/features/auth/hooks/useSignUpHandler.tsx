
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';
import { toast } from 'sonner';
import { UserType } from '../../../types/profileTypes';

/**
 * Hook for handling sign up submissions with improved error handling and connection checking
 */
export const useSignUpHandler = () => {
  const { signUp, checkSupabaseConnection } = useAuth();
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
      // First check if we can connect to Supabase
      const canConnect = await checkSupabaseConnection();
      if (!canConnect) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        console.error('[SignUp] Unable to connect to Supabase auth service');
        toast.error('Connection to authentication service failed');
        return false;
      }
      
      // Then check network connection
      const isOnline = await validateNetworkConnection(setFormError);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        return false;
      }
      
      console.log('Attempting signup with:', { email });
      const success = await signUp(email, password, 'consumer' as UserType);
      
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
        // Pass isSignIn as false for sign up context
        handleAuthError(error, setFormError, false);
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleSignUp };
};
