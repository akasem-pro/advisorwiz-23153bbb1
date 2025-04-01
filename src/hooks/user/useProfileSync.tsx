
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
            ...consumerProfile 
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
            ...advisorProfile 
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
        const { data, error } = await supabase
          .from('consumer_profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (error) {
          if (error.code === 'PGRST116') {
            console.log("[ProfileSync] No consumer profile found, may need to create one");
          } else {
            throw error;
          }
        }
        
        if (data) {
          setConsumerProfile(data as ConsumerProfile);
        }
      } else if (userType === 'advisor' || userType === 'firm_admin') {
        // Fetch advisor profile
        const { data, error } = await supabase
          .from('advisor_profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (error) {
          if (error.code === 'PGRST116') {
            console.log("[ProfileSync] No advisor profile found, may need to create one");
          } else {
            throw error;
          }
        }
        
        if (data) {
          setAdvisorProfile(data as AdvisorProfile);
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
