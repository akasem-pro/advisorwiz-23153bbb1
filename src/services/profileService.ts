
import { User } from '@supabase/supabase-js';
import { UserType, ConsumerProfile, AdvisorProfile } from '../types/profileTypes';
import { supabase } from '../integrations/supabase/client';

/**
 * Initialize a user profile based on the user type
 */
export async function initializeUserProfile(user: User, userType: UserType) {
  console.log(`Initializing ${userType} profile for user ${user.id}`);
  
  try {
    // Check if profile already exists in Supabase
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error("Error checking for existing profile:", profileError);
      return null;
    }
    
    if (existingProfile) {
      console.log("Found existing profile:", existingProfile);
      
      // Convert from database format to app format
      // This would be more complex in a real app
      if (userType === 'consumer') {
        const consumerProfile: ConsumerProfile = {
          id: user.id,
          name: `${existingProfile.first_name || ''} ${existingProfile.last_name || ''}`.trim(),
          age: existingProfile.age || 0,
          status: existingProfile.status || 'new',
          investableAssets: existingProfile.investable_assets || 0,
          riskTolerance: existingProfile.risk_tolerance || 'medium',
          preferredCommunication: existingProfile.preferred_communication || ['email'],
          preferredLanguage: existingProfile.preferred_language || ['english'],
          matches: existingProfile.matches || [],
          chats: existingProfile.chats || [],
          chatEnabled: existingProfile.chat_enabled !== false,
          appointments: existingProfile.appointments || [],
          onlineStatus: existingProfile.online_status || 'offline',
          lastOnline: existingProfile.last_online || new Date().toISOString(),
          showOnlineStatus: existingProfile.show_online_status !== false
        };
        return consumerProfile;
      } else if (userType === 'advisor') {
        const advisorProfile: AdvisorProfile = {
          id: user.id,
          name: `${existingProfile.first_name || ''} ${existingProfile.last_name || ''}`.trim(),
          organization: existingProfile.organization || '',
          isAccredited: existingProfile.is_accredited !== false,
          website: existingProfile.website || '',
          testimonials: existingProfile.testimonials || [],
          languages: existingProfile.languages || ['english'],
          pricing: existingProfile.pricing || {},
          assetsUnderManagement: existingProfile.assets_under_management || 0,
          expertise: existingProfile.expertise || [],
          matches: existingProfile.matches || [],
          chats: existingProfile.chats || [],
          chatEnabled: existingProfile.chat_enabled !== false,
          appointmentCategories: existingProfile.appointment_categories || [],
          appointments: existingProfile.appointments || [],
          onlineStatus: existingProfile.online_status || 'offline',
          lastOnline: existingProfile.last_online || new Date().toISOString(),
          showOnlineStatus: existingProfile.show_online_status !== false
        };
        return advisorProfile;
      }
    }
    
    // Create new profile
    console.log("Creating new profile for user type:", userType);
    
    // Initialize default profile values
    if (userType === 'consumer') {
      const newConsumerProfile: ConsumerProfile = {
        id: user.id,
        name: user.user_metadata?.name || '',
        age: 0,
        status: 'new',
        investableAssets: 0,
        riskTolerance: 'medium',
        preferredCommunication: ['email'],
        preferredLanguage: ['english'],
        matches: [],
        chats: [],
        chatEnabled: true,
        appointments: [],
        onlineStatus: 'online',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      };
      
      try {
        // Create profile in database
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: newConsumerProfile.name.split(' ')[0],
            last_name: newConsumerProfile.name.split(' ').slice(1).join(' '),
            email: user.email,
            user_type: 'consumer',
            status: 'new',
            risk_tolerance: 'medium',
            chat_enabled: true,
            online_status: 'online',
            last_online: new Date().toISOString(),
            show_online_status: true
          });
          
        if (insertError) {
          console.error("Error creating consumer profile:", insertError);
        }
      } catch (err) {
        console.error("Exception creating consumer profile:", err);
      }
      
      return newConsumerProfile;
    } else if (userType === 'advisor') {
      const newAdvisorProfile: AdvisorProfile = {
        id: user.id,
        name: user.user_metadata?.name || '',
        organization: '',
        isAccredited: false,
        website: '',
        testimonials: [],
        languages: ['english'],
        pricing: {},
        assetsUnderManagement: 0,
        expertise: [],
        matches: [],
        chats: [],
        chatEnabled: true,
        appointmentCategories: [],
        appointments: [],
        onlineStatus: 'online',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      };
      
      try {
        // Create profile in database
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: newAdvisorProfile.name.split(' ')[0],
            last_name: newAdvisorProfile.name.split(' ').slice(1).join(' '),
            email: user.email,
            user_type: 'advisor',
            is_accredited: false,
            chat_enabled: true,
            online_status: 'online',
            last_online: new Date().toISOString(),
            show_online_status: true
          });
          
        if (insertError) {
          console.error("Error creating advisor profile:", insertError);
        }
      } catch (err) {
        console.error("Exception creating advisor profile:", err);
      }
      
      return newAdvisorProfile;
    }
    
    return null;
  } catch (error) {
    console.error("Unexpected error initializing profile:", error);
    return null;
  }
}
