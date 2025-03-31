
import React, { useState, useEffect } from 'react';
import UserContext from './UserContextDefinition';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile 
} from '../types/profileTypes';
import { useChatOperations } from '../hooks/useChatOperations';
import { supabase } from '../integrations/supabase/client';
import { useUserSettings } from '../hooks/user/useUserSettings';
import { 
  fetchConsumerProfile,
  updateConsumerProfile,
  initializeConsumerProfile 
} from '../services/profiles/consumerProfileService';
import { 
  fetchAdvisorProfile,
  updateAdvisorProfile,
  initializeAdvisorProfile 
} from '../services/profiles/advisorProfileService';
import { toast } from 'sonner';

export const UserProviderRefactored: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Basic user state
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [firms, setFirms] = useState<any[]>([]);
  
  // Get user settings hooks
  const { matchPreferences, updateMatchPreferences } = useUserSettings();
  
  // Get chat operations
  const { addMessage, markChatAsRead } = useChatOperations(chats, setChats);
  
  // Initialize profiles based on auth state
  useEffect(() => {
    const initializeUserData = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data?.session?.user) {
        setIsAuthenticated(true);
        console.log("User is authenticated, getting profiles");
        
        // Try to get consumer profile
        const consumer = await fetchConsumerProfile(data.session.user.id);
        if (consumer) {
          setConsumerProfile(consumer);
          setUserType('consumer');
        }
        
        // Try to get advisor profile
        const advisor = await fetchAdvisorProfile(data.session.user.id);
        if (advisor) {
          setAdvisorProfile(advisor);
          setUserType(consumer ? userType : 'advisor');
        }
      }
    };
    
    initializeUserData();
  }, []);
  
  // Handle profile updates
  const handleProfileUpdate = async (profileData: any): Promise<boolean> => {
    if (!isAuthenticated) {
      console.error("Cannot update profile: user not authenticated");
      return false;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    if (userType === 'consumer') {
      const result = await updateConsumerProfile(user, {
        ...consumerProfile,
        ...profileData
      });
      
      if (result) {
        setConsumerProfile(prev => ({
          ...prev!,
          ...profileData
        }));
        return true;
      }
      return false;
    } else if (userType === 'advisor') {
      const result = await updateAdvisorProfile(user, {
        ...advisorProfile,
        ...profileData
      });
      
      if (result) {
        setAdvisorProfile(prev => ({
          ...prev!,
          ...profileData
        }));
        return true;
      }
      return false;
    }
    
    return false;
  };
  
  // Save profile changes helper
  const saveProfileChanges = async (): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      
      if (userType === 'consumer' && consumerProfile) {
        await updateConsumerProfile(user, consumerProfile);
        toast.success("Consumer profile updated");
        return true;
      } else if (userType === 'advisor' && advisorProfile) {
        await updateAdvisorProfile(user, advisorProfile);
        toast.success("Advisor profile updated");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error saving profile changes:", error);
      toast.error("Failed to save profile changes");
      return false;
    }
  };
  
  // Handle appointment operations
  const addAppointment = (appointment: any) => {
    setAppointments(prev => [...prev, appointment]);
  };
  
  const updateAppointmentStatus = (appointmentId: string, status: string) => {
    setAppointments(prev => prev.map(app => 
      app.id === appointmentId ? { ...app, status } : app
    ));
  };
  
  // Handle firm operations
  const addFirm = (firm: any) => {
    setFirms(prev => [...prev, firm]);
  };
  
  // Modified to return array directly instead of a Promise
  const getFirmByAdmin = (adminId: string) => {
    return firms.filter(firm => firm.adminId === adminId);
  };
  
  // Handle matching operations
  const calculateCompatibilityScore = (advisorId: string) => {
    // Simplified compatibility calculation
    return 75; // Placeholder score
  };
  
  const getFilteredAdvisors = (filters: any) => {
    // Filter logic here
    return [];
  };
  
  const getFilteredConsumers = (filters: any) => {
    // Filter logic here
    return [];
  };
  
  // Online status handling
  const updateOnlineStatus = (status: 'online' | 'offline' | 'away') => {
    if (userType === 'consumer' && consumerProfile) {
      setConsumerProfile({
        ...consumerProfile,
        onlineStatus: status,
        lastOnline: new Date().toISOString()
      });
    } else if (userType === 'advisor' && advisorProfile) {
      setAdvisorProfile({
        ...advisorProfile,
        onlineStatus: status,
        lastOnline: new Date().toISOString()
      });
    }
  };
  
  // Modified to return array directly instead of a Promise
  const getTopMatches = (limit = 5): (ConsumerProfile | AdvisorProfile)[] => {
    // Placeholder for top matches
    return [];
  };
  
  // Modified to return array directly instead of a Promise and match the expected signature
  const getRecommendedMatches = (): (ConsumerProfile | AdvisorProfile)[] => {
    // Placeholder for recommended matches
    return [];
  };
  
  return (
    <UserContext.Provider value={{
      userType,
      setUserType,
      consumerProfile,
      setConsumerProfile,
      advisorProfile,
      setAdvisorProfile,
      isAuthenticated,
      setIsAuthenticated,
      handleProfileUpdate,
      saveProfileChanges,
      chats,
      setChats,
      addMessage,
      markChatAsRead,
      appointments,
      setAppointments,
      addAppointment,
      updateAppointmentStatus,
      getFilteredAdvisors,
      getFilteredConsumers,
      updateOnlineStatus,
      firms,
      setFirms,
      addFirm,
      getFirmByAdmin,
      calculateCompatibilityScore,
      updateMatchPreferences,
      matchPreferences,
      getTopMatches,
      getRecommendedMatches
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProviderRefactored;
