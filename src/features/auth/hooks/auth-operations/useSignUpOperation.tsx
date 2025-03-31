
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../integrations/supabase/client';
import { UserType } from '../../../../types/profileTypes';

/**
 * Custom hook for sign-up operation with improved error handling
 */
export const useSignUpOperation = (
  setLoading: (loading: boolean) => void,
  setMockUser?: (user: User | null) => void
) => {
  const navigate = useNavigate();

  const signUp = async (
    email: string,
    password: string,
    userType: UserType
  ): Promise<boolean> => {
    try {
      setLoading(true);
      
      console.log('[Auth Debug] Starting sign up process with email:', email);
      console.log('[Auth Debug] User type:', userType);
      
      // Check for preview environments
      const isPreviewEnv = window.location.hostname.includes('preview') || 
                          window.location.hostname.includes('lovableproject') ||
                          window.location.hostname.includes('localhost');
      
      if (isPreviewEnv && setMockUser) {
        console.log('[Auth Debug] Preview environment detected, creating mock user');
        const mockUser = {
          id: 'mock-' + Math.random().toString(36).substring(2, 15),
          email,
          app_metadata: { provider: 'email' },
          user_metadata: { user_type: userType },
          aud: 'authenticated',
          created_at: new Date().toISOString()
        } as unknown as User;
        
        setMockUser(mockUser);
        localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
        toast.success('Account created successfully! (Preview Mode)');
        navigate('/');
        return true;
      }
      
      // Only allow valid user types for registration
      const validUserType = (userType === 'consumer' || 
                           userType === 'advisor' || 
                           userType === 'firm_admin') 
                           ? userType 
                           : 'consumer';
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: validUserType,
          },
        },
      });
      
      if (error) {
        console.error('[Auth Debug] Sign up error details:', error);
        throw error;
      }
      
      console.log('[Auth Debug] Sign up successful, user data:', {
        id: data.user?.id,
        email: data.user?.email
      });
      
      return true;
    } catch (error) {
      console.error('[Auth Debug] Error during sign up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signUp };
};
