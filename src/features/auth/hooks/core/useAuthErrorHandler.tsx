
import { toast } from 'sonner';

/**
 * Hook for handling authentication errors with improved diagnostics
 */
export const useAuthErrorHandler = () => {
  const handleAuthError = (
    error: any, 
    setFormError: (error: string) => void,
    isSignIn: boolean
  ): void => {
    // Extract error message
    const errorMessage = error.message || 'An unknown error occurred';
    console.error(`[Auth Error] ${isSignIn ? 'Sign In' : 'Sign Up'} error:`, errorMessage);
    
    // Log detailed error information
    console.error("[Auth Error] Full error object:", error);
    
    if (errorMessage.includes('Invalid login credentials') || 
        errorMessage.includes('Invalid email or password')) {
      setFormError('Invalid email or password. Please try again.');
    } else if (errorMessage.includes('User already registered')) {
      setFormError('This email is already registered. Please sign in instead.');
    } else if (errorMessage.includes('No user found')) {
      setFormError('No account found with this email. Please check your email or sign up.');
    } else if (errorMessage.includes('Unable to connect') || 
              errorMessage.includes('fetch') || 
              errorMessage.includes('network') || 
              !navigator.onLine) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
    } else if (errorMessage.includes('rate limit')) {
      setFormError('Too many failed attempts. Please try again later.');
    } else {
      // Fallback to the original error message, but make it more user-friendly
      setFormError(`Authentication failed: ${errorMessage}`);
    }
  };
  
  return { handleAuthError };
};
