
import { useState } from 'react';
import { supabase } from '../../../../integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Hook for handling password reset operations
 */
export const usePasswordResetOperation = () => {
  const [isResetting, setIsResetting] = useState(false);
  
  /**
   * Request a password reset email
   */
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    if (!email) {
      toast.error('Please provide your email address');
      return false;
    }
    
    setIsResetting(true);
    
    try {
      // Check if we're in a preview environment
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('lovableproject') ||
          window.location.hostname.includes('localhost')) {
        
        console.log("[Auth] Preview environment detected, simulating password reset");
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Password reset instructions sent to your email');
        return true;
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error("[Auth] Password reset error:", error);
        toast.error('Failed to send reset instructions. Please try again.');
        return false;
      }
      
      toast.success('Password reset instructions sent to your email');
      return true;
    } catch (error) {
      console.error("[Auth] Password reset error:", error);
      toast.error('An error occurred. Please try again later.');
      return false;
    } finally {
      setIsResetting(false);
    }
  };
  
  /**
   * Update password with the reset token
   */
  const updatePassword = async (password: string, token?: string): Promise<boolean> => {
    if (!password) {
      toast.error('Please provide a new password');
      return false;
    }
    
    setIsResetting(true);
    
    try {
      // Check if we're in a preview environment
      if (window.location.hostname.includes('preview') || 
          window.location.hostname.includes('lovableproject') ||
          window.location.hostname.includes('localhost')) {
        
        console.log("[Auth] Preview environment detected, simulating password update");
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Password has been updated successfully');
        return true;
      }
      
      // If we have a token, use it to update the password
      if (token) {
        const { error } = await supabase.auth.updateUser({
          password: password
        });
        
        if (error) {
          console.error("[Auth] Password update error:", error);
          toast.error('Failed to update password. Please try again.');
          return false;
        }
      } else {
        // Otherwise try to update the password for the current user
        const { error } = await supabase.auth.updateUser({
          password: password
        });
        
        if (error) {
          console.error("[Auth] Password update error:", error);
          toast.error('Failed to update password. Please try again.');
          return false;
        }
      }
      
      toast.success('Password has been updated successfully');
      return true;
    } catch (error) {
      console.error("[Auth] Password update error:", error);
      toast.error('An error occurred. Please try again later.');
      return false;
    } finally {
      setIsResetting(false);
    }
  };
  
  return {
    isResetting,
    requestPasswordReset,
    updatePassword
  };
};
