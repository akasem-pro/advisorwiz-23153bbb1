
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../../integrations/supabase/client';
import { isPreviewEnvironment } from '../../../utils/mockAuthUtils';
import { UserType } from '../../../types/profileTypes';

/**
 * Centralized hook for all auth operations
 * @param createUserProfile Function to create user profiles upon signup
 * @param setMockUser Function to set mock user for preview environments
 */
export const useAuthOperations = (
  createUserProfile: (user: User, userType: UserType) => Promise<boolean>,
  setMockUser?: (user: User | null) => void
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      toast.error('Please provide both email and password');
      return false;
    }

    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting sign in process with email:", email);
      
      // Check for preview environments where we might want to use mock auth
      if (isPreviewEnvironment() && setMockUser) {
        console.log("[Auth Debug] Preview environment detected, checking for mock auth");
        
        // If in dev environment, allow mock login with any credentials
        const mockUser = {
          id: 'mock-user-id',
          email,
          app_metadata: { provider: 'email' },
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString()
        } as unknown as User;
        
        setMockUser(mockUser);
        localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
        
        toast.success(`Welcome back, ${email}`);
        navigate('/');
        return true;
      }
      
      // Normal Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("[Auth Debug] Sign in error:", error);
        throw error;
      }

      if (!data.user) {
        console.error("[Auth Debug] Sign in success but no user returned");
        throw new Error('Sign in successful but user data is missing');
      }

      console.log("[Auth Debug] Sign in successful:", {
        userId: data.user.id,
        email: data.user.email
      });
      
      toast.success(`Welcome back, ${data.user.email}`);
      navigate('/');
      return true;

    } catch (error: any) {
      console.error("[Auth Debug] Sign in error details:", error);
      
      // Provide user-friendly error messages
      if (error.message.includes('Invalid login')) {
        toast.error('Invalid email or password');
      } else if (error.message.includes('Email not confirmed')) {
        toast.error('Please confirm your email before signing in');
      } else {
        toast.error(error.message || 'Failed to sign in');
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (
    email: string, 
    password: string, 
    userType: UserType
  ): Promise<boolean> => {
    if (!email || !password) {
      toast.error('Please provide both email and password');
      return false;
    }

    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting sign up process with email:", email);
      console.log("[Auth Debug] User type:", userType);
      
      // Check for preview environments
      if (isPreviewEnvironment() && setMockUser) {
        console.log("[Auth Debug] Preview environment detected, creating mock user");
        
        const mockUser = {
          id: 'mock-user-id',
          email,
          app_metadata: { provider: 'email' },
          user_metadata: { user_type: userType },
          aud: 'authenticated',
          created_at: new Date().toISOString()
        } as unknown as User;
        
        setMockUser(mockUser);
        localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
        
        // Create user profile with the mock user
        await createUserProfile(mockUser, userType);
        
        toast.success('Account created successfully! (Preview Mode)');
        navigate('/');
        return true;
      }
      
      // Normal Supabase sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
          },
        },
      });

      if (error) {
        console.error("[Auth Debug] Sign up error:", error);
        throw error;
      }

      if (!data.user) {
        console.error("[Auth Debug] Sign up success but no user returned");
        throw new Error('Sign up successful but user data is missing');
      }

      console.log("[Auth Debug] Sign up successful:", {
        userId: data.user.id,
        email: data.user.email
      });
      
      // Create user profile for the new user
      await createUserProfile(data.user, userType);
      
      if (data.session) {
        // User is automatically signed in
        toast.success('Account created and signed in successfully!');
        navigate('/');
      } else {
        // Email confirmation required
        toast.success('Account created! Please check your email to confirm your account.');
        navigate('/signin');
      }
      
      return true;
    } catch (error: any) {
      console.error("[Auth Debug] Sign up error details:", error);
      
      // Provide user-friendly error messages
      if (error.message.includes('already registered')) {
        toast.error('This email is already registered');
      } else {
        toast.error(error.message || 'Failed to create account');
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async (): Promise<boolean> => {
    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting sign out process");
      
      // Handle mock users in preview environments
      if (isPreviewEnvironment() && setMockUser) {
        if (localStorage.getItem('mock_auth_user')) {
          localStorage.removeItem('mock_auth_user');
          setMockUser(null);
          toast.success("Signed out successfully");
          navigate('/signin');
          return true;
        }
      }
      
      // Normal Supabase sign out
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("[Auth Debug] Sign out error:", error);
        throw error;
      }

      console.log("[Auth Debug] Sign out successful");
      toast.success("Signed out successfully");
      navigate('/signin');
      return true;
      
    } catch (error: any) {
      console.error("[Auth Debug] Sign out error details:", error);
      toast.error(error.message || 'Failed to sign out');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset password for a user
   */
  const resetPassword = async (email: string): Promise<boolean> => {
    if (!email) {
      toast.error('Please provide an email address');
      return false;
    }

    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting password reset for:", email);
      
      // Check for preview environments
      if (isPreviewEnvironment()) {
        console.log("[Auth Debug] Preview environment detected, simulating password reset");
        toast.success('Password reset email sent! (Preview Mode)');
        return true;
      }
      
      // Send password reset email via Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
      });

      if (error) {
        console.error("[Auth Debug] Password reset error:", error);
        throw error;
      }

      console.log("[Auth Debug] Password reset email sent");
      toast.success('Password reset email sent! Please check your inbox.');
      return true;
      
    } catch (error: any) {
      console.error("[Auth Debug] Password reset error details:", error);
      toast.error(error.message || 'Failed to send password reset email');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update password for current user
   */
  const updatePassword = async (newPassword: string): Promise<boolean> => {
    if (!newPassword) {
      toast.error('Please provide a new password');
      return false;
    }

    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting password update");
      
      // Check for preview environments
      if (isPreviewEnvironment()) {
        console.log("[Auth Debug] Preview environment detected, simulating password update");
        toast.success('Password updated successfully! (Preview Mode)');
        navigate('/');
        return true;
      }
      
      // Update password via Supabase
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("[Auth Debug] Password update error:", error);
        throw error;
      }

      console.log("[Auth Debug] Password updated successfully");
      toast.success('Password updated successfully!');
      navigate('/');
      return true;
      
    } catch (error: any) {
      console.error("[Auth Debug] Password update error details:", error);
      toast.error(error.message || 'Failed to update password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update email for current user
   */
  const updateEmail = async (newEmail: string): Promise<boolean> => {
    if (!newEmail) {
      toast.error('Please provide a new email address');
      return false;
    }

    try {
      setLoading(true);
      
      console.log("[Auth Debug] Starting email update to:", newEmail);
      
      // Check for preview environments
      if (isPreviewEnvironment() && setMockUser) {
        console.log("[Auth Debug] Preview environment detected, updating mock user email");
        
        const mockUserString = localStorage.getItem('mock_auth_user');
        if (mockUserString) {
          const mockUser = JSON.parse(mockUserString) as User;
          mockUser.email = newEmail;
          localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
          setMockUser(mockUser);
        }
        
        toast.success('Email updated successfully! (Preview Mode)');
        return true;
      }
      
      // Update email via Supabase
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        console.error("[Auth Debug] Email update error:", error);
        throw error;
      }

      console.log("[Auth Debug] Email update initiated");
      toast.success('Email update initiated. Please check your new email for confirmation.');
      return true;
      
    } catch (error: any) {
      console.error("[Auth Debug] Email update error details:", error);
      toast.error(error.message || 'Failed to update email');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send password reset email
   */
  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    return await resetPassword(email);
  };

  return {
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
    sendPasswordResetEmail,
  };
};
