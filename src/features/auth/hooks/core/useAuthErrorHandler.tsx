
/**
 * Hook for handling authentication errors with improved categorization
 */
export const useAuthErrorHandler = () => {
  /**
   * Generic form submission error handler with improved error categorization
   */
  const handleAuthError = (
    error: any, 
    setFormError: (error: string) => void,
    isSignIn: boolean = true
  ) => {
    const errorMessage = error.message || `An error occurred during ${isSignIn ? 'sign in' : 'sign up'}`;
    console.error(`Failed to ${isSignIn ? 'sign in' : 'sign up'}:`, errorMessage);
    
    // Handle network and timeout errors
    if (!navigator.onLine || 
        error.message?.includes('timeout') || 
        error.message?.includes('timed out') || 
        error.message?.includes('fetch failed') ||
        error.message?.includes('Failed to fetch') ||
        error.message?.includes('network request failed')) {
      setFormError('Unable to connect to authentication service. Please check your connection and try again.');
      return;
    }
    
    // Handle specific auth errors
    if (isSignIn) {
      if (error.message?.includes('Invalid login credentials') || 
          error.message?.includes('Invalid email or password')) {
        setFormError('Invalid email or password. Please try again.');
      } else {
        setFormError(errorMessage);
      }
    } else {
      if (error.message?.includes('email already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
      } else {
        setFormError(errorMessage);
      }
    }
  };
  
  return {
    handleAuthError
  };
};
