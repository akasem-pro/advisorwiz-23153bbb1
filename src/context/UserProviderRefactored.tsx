
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
import { useCallManagement } from '../hooks/user/useCallManagement';
import { CallSession, CallStatus, CallType } from '../types/callTypes';
import { Lead, LeadStatus, LeadSource } from '../types/leadTypes';

export const UserProviderRefactored: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Basic user state
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [firms, setFirms] = useState<any[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // Get user settings hooks
  const { matchPreferences, updateMatchPreferences } = useUserSettings();
  
  // Get chat operations
  const { addMessage, markChatAsRead } = useChatOperations(chats, setChats);
  
  // Get userId based on profile type
  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;
    
  // Initialize call management
  const { 
    callSessions,
    setCallSessions,
    activeCall,
    callMetrics,
    initiateCall,
    updateCallStatus,
  } = useCallManagement(userId, userType as 'consumer' | 'advisor' | null);
  
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
  
  // Lead management functions
  const addLead = (advisorId: string, consumerId: string, consumerName: string, matchScore: number, source?: LeadSource): string => {
    const leadId = `lead-${Date.now()}`;
    const newLead: Lead = {
      id: leadId,
      advisorId,
      consumerId,
      consumerName,
      status: 'matched',  // Changed from 'new' to 'matched' which is a valid LeadStatus
      matchScore,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),  // Added missing required property
      source: source || 'platform_match',   // Changed from 'matching' to valid 'platform_match'
      history: []  // Added missing required property
    };
    
    setLeads(prev => [...prev, newLead]);
    return leadId;
  };
  
  const updateLeadStatus = (leadId: string, status: LeadStatus, notes?: string): void => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status, 
            // Since notes property doesn't exist on Lead type, we need to handle this differently
            // For now, we'll add the notes to history if provided
            history: notes 
              ? [...lead.history, { id: `event-${Date.now()}`, timestamp: new Date().toISOString(), status, notes }] 
              : lead.history
          } 
        : lead
    ));
  };
  
  const getLeadByConsumer = (consumerId: string, advisorId?: string): Lead | null => {
    return leads.find(lead => 
      lead.consumerId === consumerId && 
      (advisorId ? lead.advisorId === advisorId : true)
    ) || null;
  };
  
  const getLeadStats = () => {
    const totalLeads = leads.length;
    const activeLeads = leads.filter(lead => lead.status !== 'converted' && lead.status !== 'lost').length;
    const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
    
    return {
      totalLeads,
      activeLeads,
      convertedLeads,
      conversionRate: totalLeads ? (convertedLeads / totalLeads) * 100 : 0,
      averageTimeToConversion: 0, // Would calculate based on timestamps
      leadsByStatus: {} as Record<LeadStatus, number>,
      leadsBySource: {} as Record<LeadSource, number>
    };
  };
  
  const getAdvisorLeads = (advisorId: string): Lead[] => {
    return leads.filter(lead => lead.advisorId === advisorId);
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
      getRecommendedMatches,
      callSessions,
      initiateCall,
      updateCallStatus,
      activeCall,
      callMetrics,
      leads,
      addLead,
      updateLeadStatus,
      getLeadByConsumer,
      getLeadStats,
      getAdvisorLeads
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProviderRefactored;
