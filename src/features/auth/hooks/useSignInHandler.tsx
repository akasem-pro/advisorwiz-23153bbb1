
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useAuthCore } from './useAuthCore';
import { trackAuthEvent, trackConnectionEvent } from '../../../utils/tagManager';

/**
 * Hook for handling sign in submissions with improved error tracking
 */
export const useSignInHandler = () => {
  const navigate = useNavigate();
  const { signIn, checkSupabaseConnection } = useAuth();
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
    setIsLoading: (loading: boolean) => void,
    navigate: ReturnType<typeof useNavigate>
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
      trackAuthEvent('attempt', 'email', { emailDomain: email.split('@')[1] });
      
      const canConnect = await checkSupabaseConnection();
      if (!canConnect) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        console.error('[SignIn] Unable to connect to Supabase auth service');
        trackConnectionEvent('supabase_auth', 'failure', { 
          reason: 'connection_failed',
          timestamp: new Date().toISOString()
        });
        return false;
      }
      
      // Then check network connection
      const isOnline = await validateNetworkConnection(setFormError);
      
      if (!isOnline) {
        setFormError('Unable to connect to authentication service. Please check your connection and try again.');
        trackConnectionEvent('browser_network', 'failure', { 
          reason: 'offline',
          timestamp: new Date().toISOString()
        });
        return false;
      }
      
      console.log('[SignIn] Attempting login with email:', email);
      const success = await signIn(email, password);
      
      if (success) {
        console.log('[SignIn] Login successful');
        trackAuthEvent('success', 'email', { emailDomain: email.split('@')[1] });
        navigate('/');
        return true;
      } else {
        console.error('[SignIn] Login failed');
        setFormError('Invalid email or password. Please try again.');
        trackAuthEvent('failure', 'email', { 
          reason: 'invalid_credentials',
          emailDomain: email.split('@')[1]
        });
        return false;
      }
    } catch (error: any) {
      console.error('[SignIn] Login error:', error);
      trackAuthEvent('failure', 'email', { 
        reason: error.message || 'unknown_error',
        errorDetail: JSON.stringify(error)
      });
      handleAuthError(error, setFormError, true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleSignIn };
};
