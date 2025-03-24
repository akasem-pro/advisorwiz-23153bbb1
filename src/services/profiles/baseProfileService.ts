
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { UserType } from '../../types/profileTypes';

/**
 * Fetch profile base data from Supabase
 */
export const fetchBaseProfile = async (userId: string) => {
  try {
    console.log(`[baseProfileService] Fetching base profile for user ${userId}`);
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error('[baseProfileService] Error fetching profile:', profileError);
      return null;
    }
    
    return profileData;
  } catch (error) {
    console.error('[baseProfileService] Unexpected error fetching profile:', error);
    return null;
  }
};

/**
 * Update base profile data in Supabase
 */
export const updateBaseProfile = async (
  user: User,
  userType: UserType,
  profileData: any
) => {
  try {
    console.log(`[baseProfileService] Updating base profile for user ${user.id}`);
    
    // Prepare base profile data
    const baseProfileData: any = {
      // Only include fields that are in the profiles table
      first_name: profileData.name ? profileData.name.split(' ')[0] : undefined,
      last_name: profileData.name ? profileData.name.split(' ').slice(1).join(' ') : undefined,
      email: profileData.email,
      phone: profileData.phone,
      avatar_url: profileData.profilePicture,
      chat_enabled: profileData.chatEnabled,
      online_status: profileData.onlineStatus,
      last_online: profileData.lastOnline,
      show_online_status: profileData.showOnlineStatus,
      user_type: userType,
      updated_at: new Date().toISOString()
    };
    
    // Update the base profile
    const { error: profileUpsertError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...baseProfileData
      }, {
        onConflict: 'id'
      });
    
    if (profileUpsertError) {
      console.error('[baseProfileService] Error updating base profile:', profileUpsertError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('[baseProfileService] Unexpected error updating profile:', error);
    return false;
  }
};
