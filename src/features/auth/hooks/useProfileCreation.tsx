
import { User } from '@supabase/supabase-js';
import { supabase } from '../../../integrations/supabase/client';
import { toast } from 'sonner';
import { UserType } from '../../../types/profileTypes';

/**
 * Hook to handle profile creation after signup
 */
export const useProfileCreation = () => {
  /**
   * Create or update profile for the newly registered user
   */
  const createUserProfile = async (
    user: User,
    userType: UserType = 'consumer'
  ): Promise<boolean> => {
    try {
      console.log('[Profile Creation] Creating profile for user:', user.id);
      
      // Check if profile already exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (profileCheckError && !profileCheckError.message.includes('No rows found')) {
        console.error('[Profile Creation] Error checking existing profile:', profileCheckError);
        return false;
      }
      
      // If profile already exists, skip creation
      if (existingProfile) {
        console.log('[Profile Creation] Profile already exists, skipping creation');
        return true;
      }
      
      // Create basic profile with user type
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          user_type: userType,
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          email: user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (profileError) {
        console.error('[Profile Creation] Error creating profile:', profileError);
        toast.error('Failed to create user profile');
        return false;
      }
      
      // Create specific profile based on user type
      if (userType === 'consumer') {
        const { error: consumerError } = await supabase
          .from('consumer_profiles')
          .insert({
            id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (consumerError) {
          console.error('[Profile Creation] Error creating consumer profile:', consumerError);
          return false;
        }
      } else if (userType === 'advisor') {
        const { error: advisorError } = await supabase
          .from('advisor_profiles')
          .insert({
            id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (advisorError) {
          console.error('[Profile Creation] Error creating advisor profile:', advisorError);
          return false;
        }
      }
      
      console.log('[Profile Creation] Profile created successfully');
      return true;
    } catch (error) {
      console.error('[Profile Creation] Unexpected error creating profile:', error);
      return false;
    }
  };
  
  return { createUserProfile };
};
