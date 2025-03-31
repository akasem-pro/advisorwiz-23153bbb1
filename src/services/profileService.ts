
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
      
      // Get additional data based on user type
      if (userType === 'consumer') {
        const { data: consumerData, error: consumerError } = await supabase
          .from('consumer_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (consumerError && consumerError.code !== 'PGRST116') {
          console.error("Error fetching consumer data:", consumerError);
        }
        
        // Convert from database format to app format
        const consumerProfile: ConsumerProfile = {
          id: user.id,
          name: `${existingProfile.first_name || ''} ${existingProfile.last_name || ''}`.trim(),
          age: consumerData?.age || 0,
          status: consumerData?.status || 'new',
          investableAssets: consumerData?.investable_assets || 0,
          riskTolerance: (consumerData?.risk_tolerance as "low" | "medium" | "high") || 'medium',
          preferredCommunication: consumerData?.preferred_communication || ['email'],
          preferredLanguage: consumerData?.preferred_language || ['english'],
          matches: consumerData?.matches || [],
          chats: consumerData?.chats || [],
          chatEnabled: existingProfile.chat_enabled !== false,
          appointments: consumerData?.appointments || [],
          onlineStatus: existingProfile.online_status || 'offline',
          lastOnline: existingProfile.last_online || new Date().toISOString(),
          showOnlineStatus: existingProfile.show_online_status !== false,
          startTimeline: consumerData?.start_timeline || 'not_sure'
        };
        return consumerProfile;
      } else if (userType === 'advisor') {
        const { data: advisorData, error: advisorError } = await supabase
          .from('advisor_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (advisorError && advisorError.code !== 'PGRST116') {
          console.error("Error fetching advisor data:", advisorError);
        }
        
        const advisorProfile: AdvisorProfile = {
          id: user.id,
          name: `${existingProfile.first_name || ''} ${existingProfile.last_name || ''}`.trim(),
          organization: advisorData?.organization || '',
          isAccredited: advisorData?.is_accredited !== false,
          website: advisorData?.website || '',
          testimonials: advisorData?.testimonials || [],
          languages: advisorData?.languages || ['english'],
          pricing: advisorData?.pricing || {},
          assetsUnderManagement: advisorData?.assets_under_management || 0,
          expertise: advisorData?.expertise || [],
          matches: advisorData?.matches || [],
          chats: advisorData?.chats || [],
          chatEnabled: existingProfile.chat_enabled !== false,
          appointmentCategories: advisorData?.appointment_categories || [],
          appointments: advisorData?.appointments || [],
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
        showOnlineStatus: true,
        startTimeline: 'not_sure'
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
            chat_enabled: true,
            online_status: 'online',
            last_online: new Date().toISOString(),
            show_online_status: true
          });
          
        if (insertError) {
          console.error("Error creating profile record:", insertError);
        } else {
          // Insert consumer-specific data
          const { error: consumerError } = await supabase
            .from('consumer_profiles')
            .insert({
              id: user.id,
              age: 0,
              risk_tolerance: 'medium',
              status: 'new',
              start_timeline: 'not_sure'
            });
            
          if (consumerError) {
            console.error("Error creating consumer profile:", consumerError);
          }
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
            chat_enabled: true,
            online_status: 'online',
            last_online: new Date().toISOString(),
            show_online_status: true
          });
          
        if (insertError) {
          console.error("Error creating profile record:", insertError);
        } else {
          // Insert advisor-specific data
          const { error: advisorError } = await supabase
            .from('advisor_profiles')
            .insert({
              id: user.id,
              is_accredited: false,
              organization: '',
              assets_under_management: 0
            });
            
          if (advisorError) {
            console.error("Error creating advisor profile:", advisorError);
          }
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
