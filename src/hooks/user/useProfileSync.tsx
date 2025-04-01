
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { ConsumerProfile, AdvisorProfile, UserType } from '../../types/profileTypes';
import { checkSupabaseConnection } from '../../integrations/supabase/client';

/**
 * Hook for synchronizing local profile data with Supabase
 * Handles offline/online transitions and conflict resolution
 */
export const useProfileSync = (
  userId: string | undefined,
  userType: UserType | null,
  consumerProfile: ConsumerProfile | null,
  advisorProfile: AdvisorProfile | null,
  setConsumerProfile: (profile: ConsumerProfile | null) => void,
  setAdvisorProfile: (profile: AdvisorProfile | null) => void
) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [offlineChanges, setOfflineChanges] = useState<boolean>(false);
  
  // Track online status
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  // Set up online/offline listeners
  useEffect(() => {
    const handleOnline = () => {
      console.log("[ProfileSync] Browser reports online");
      setIsOnline(true);
      
      // Auto-sync when coming back online
      if (offlineChanges) {
        syncProfiles();
      }
    };
    
    const handleOffline = () => {
      console.log("[ProfileSync] Browser reports offline");
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineChanges]);
  
  // Function to sync profiles with Supabase
  const syncProfiles = useCallback(async () => {
    if (!userId || !userType) {
      console.log("[ProfileSync] Cannot sync: Missing user ID or type");
      return false;
    }
    
    if (!isOnline) {
      console.log("[ProfileSync] Cannot sync: Browser is offline");
      setOfflineChanges(true);
      return false;
    }
    
    setIsSyncing(true);
    
    try {
      // Check Supabase connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.log("[ProfileSync] Cannot sync: Supabase connection unavailable");
        setOfflineChanges(true);
        return false;
      }
      
      console.log(`[ProfileSync] Syncing ${userType} profile for user ${userId}`);
      
      if (userType === 'consumer' && consumerProfile) {
        // Sync consumer profile
        const { error } = await supabase
          .from('consumer_profiles')
          .upsert({ 
            id: userId,
            age: consumerProfile.age,
            investable_assets: consumerProfile.investableAssets,
            risk_tolerance: consumerProfile.riskTolerance,
            investment_amount: consumerProfile.investmentAmount,
            preferred_communication: consumerProfile.preferredCommunication,
            preferred_language: consumerProfile.preferredLanguage,
            financial_goals: consumerProfile.financialGoals,
            income_bracket: consumerProfile.incomeRange,
            preferred_advisor_specialties: consumerProfile.preferredAdvisorSpecialties,
            start_timeline: consumerProfile.startTimeline,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
          
        if (error) {
          throw new Error(`Failed to sync consumer profile: ${error.message}`);
        }
      } else if ((userType === 'advisor' || userType === 'firm_admin') && advisorProfile) {
        // Sync advisor profile
        const { error } = await supabase
          .from('advisor_profiles')
          .upsert({ 
            id: userId,
            is_accredited: advisorProfile.isAccredited,
            organization: advisorProfile.organization,
            website: advisorProfile.website,
            languages: advisorProfile.languages,
            hourly_rate: advisorProfile.pricing?.hourlyRate,
            portfolio_fee: advisorProfile.pricing?.portfolioFee,
            assets_under_management: advisorProfile.assetsUnderManagement,
            expertise: advisorProfile.expertise,
            years_of_experience: advisorProfile.yearsOfExperience,
            biography: advisorProfile.biography,
            certifications: advisorProfile.certifications,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
          
        if (error) {
          throw new Error(`Failed to sync advisor profile: ${error.message}`);
        }
      }
      
      setOfflineChanges(false);
      setLastSyncTime(new Date());
      console.log("[ProfileSync] Profile synchronized successfully");
      return true;
    } catch (error) {
      console.error("[ProfileSync] Error syncing profile:", error);
      toast.error("Failed to sync profile changes");
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [userId, userType, consumerProfile, advisorProfile, isOnline]);
  
  // Function to fetch latest profile data
  const fetchLatestProfile = useCallback(async () => {
    if (!userId || !userType || !isOnline) {
      return false;
    }
    
    setIsSyncing(true);
    
    try {
      console.log(`[ProfileSync] Fetching latest ${userType} profile for user ${userId}`);
      
      if (userType === 'consumer') {
        // Fetch consumer profile
        const { data: consumerData, error: consumerError } = await supabase
          .from('consumer_profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (consumerError) {
          if (consumerError.code === 'PGRST116') {
            console.log("[ProfileSync] No consumer profile found, may need to create one");
          } else {
            throw consumerError;
          }
        }
        
        if (consumerData) {
          // Fetch the base profile data for name and other fields
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          // Map from database schema to our application model
          const mappedProfile: ConsumerProfile = {
            id: userId,
            name: profileData?.first_name && profileData?.last_name 
              ? `${profileData.first_name} ${profileData.last_name}`
              : 'New User',
            age: consumerData.age || 0,
            status: 'active',
            investableAssets: consumerData.investable_assets || 0,
            riskTolerance: consumerData.risk_tolerance || 'medium',
            preferredCommunication: consumerData.preferred_communication || [],
            preferredLanguage: consumerData.preferred_language || ['English'],
            serviceNeeds: consumerData.service_needs,
            investmentAmount: consumerData.investment_amount,
            financialGoals: consumerData.financial_goals || [],
            incomeRange: consumerData.income_bracket,
            preferredAdvisorSpecialties: consumerData.preferred_advisor_specialties || [],
            location: profileData ? {
              city: profileData.city || '',
              state: profileData.state || '',
              country: profileData.country || 'US'
            } : undefined,
            matches: [],
            chats: [],
            profilePicture: profileData?.avatar_url,
            chatEnabled: profileData?.chat_enabled ?? true,
            appointments: [],
            startTimeline: consumerData.start_timeline as 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure' || 'not_sure',
            onlineStatus: (profileData?.online_status as 'online' | 'offline' | 'away') || 'offline',
            lastOnline: profileData?.last_online || new Date().toISOString(),
            showOnlineStatus: profileData?.show_online_status ?? true
          };
          
          setConsumerProfile(mappedProfile);
        }
      } else if (userType === 'advisor' || userType === 'firm_admin') {
        // Fetch advisor profile
        const { data: advisorData, error: advisorError } = await supabase
          .from('advisor_profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (advisorError) {
          if (advisorError.code === 'PGRST116') {
            console.log("[ProfileSync] No advisor profile found, may need to create one");
          } else {
            throw advisorError;
          }
        }
        
        if (advisorData) {
          // Fetch the base profile data for name and other fields
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          // Map from database schema to our application model
          const mappedProfile: AdvisorProfile = {
            id: userId,
            name: profileData?.first_name && profileData?.last_name 
              ? `${profileData.first_name} ${profileData.last_name}`
              : 'New Advisor',
            organization: advisorData.organization || '',
            isAccredited: advisorData.is_accredited || false,
            website: advisorData.website || '',
            testimonials: [], // Not stored in the database yet
            languages: advisorData.languages || ['English'],
            pricing: {
              hourlyRate: advisorData.hourly_rate,
              portfolioFee: advisorData.portfolio_fee
            },
            assetsUnderManagement: advisorData.assets_under_management || 0,
            expertise: advisorData.expertise || [],
            specializations: [], // Not mapping from database yet
            yearsOfExperience: advisorData.years_of_experience,
            averageRating: advisorData.average_rating,
            ratingCount: advisorData.rating_count,
            biography: advisorData.biography,
            certifications: advisorData.certifications,
            location: profileData ? {
              city: profileData.city || '',
              state: profileData.state || '',
              country: profileData.country || 'US'
            } : undefined,
            matches: [],
            chats: [],
            profilePicture: profileData?.avatar_url,
            availability: [], // Not stored in the database yet
            chatEnabled: profileData?.chat_enabled ?? true,
            appointmentCategories: [], // Not stored in the database yet
            appointments: [],
            onlineStatus: (profileData?.online_status as 'online' | 'offline' | 'away') || 'offline',
            lastOnline: profileData?.last_online || new Date().toISOString(),
            showOnlineStatus: profileData?.show_online_status ?? true
          };
          
          setAdvisorProfile(mappedProfile);
        }
      }
      
      setLastSyncTime(new Date());
      return true;
    } catch (error) {
      console.error("[ProfileSync] Error fetching profile:", error);
      toast.error("Failed to fetch profile data");
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [userId, userType, isOnline, setConsumerProfile, setAdvisorProfile]);
  
  // Auto-fetch profile on mount if online
  useEffect(() => {
    if (userId && userType && isOnline) {
      fetchLatestProfile();
    }
  }, [userId, userType, isOnline]);
  
  return {
    syncProfiles,
    fetchLatestProfile,
    isSyncing,
    lastSyncTime,
    offlineChanges,
    isOnline
  };
};

export default useProfileSync;
