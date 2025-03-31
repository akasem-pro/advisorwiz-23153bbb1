
import React from 'react';
import UserContext from './UserContextDefinition';
import { useUserState } from '../hooks/useUserState';
import { useUserProfiles } from '../hooks/user/useUserProfiles';
import { useUserCommunication } from '../hooks/user/useUserCommunication';
import { useFilterOperations } from '../hooks/user/useFilterOperations';
import { useOrganizationManagement } from '../hooks/user/useOrganizationManagement';
import { useUserMatching } from '../hooks/user/useUserMatching';
import { useCallManagement } from '../hooks/user/useCallManagement';
import { useLeadManagement } from '../hooks/user/useLeadManagement';
import { useAuthStateManagement } from '../hooks/user/useAuthStateManagement';
import { useProfileInitialization } from '../hooks/user/useProfileInitialization';
import { useAuth } from '../components/auth/AuthContext';

export const UserProviderRefactored: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use core user state
  const {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    chats, setChats,
    appointments, setAppointments,
    firms, setFirms,
    callSessions, setCallSessions,
    leads, setLeads,
    matchPreferences, setMatchPreferences
  } = useUserState();
  
  // Get auth context
  const { user } = useAuth();
  
  // Manage auth state
  useAuthStateManagement(setIsAuthenticated);
  
  // Initialize profiles based on auth state
  const { initializeUserProfiles } = useProfileInitialization(
    user,
    userType,
    setUserType,
    consumerProfile,
    setConsumerProfile,
    advisorProfile,
    setAdvisorProfile,
    setIsAuthenticated
  );
  
  // Get user profiles management
  const {
    updateOnlineStatus,
    saveProfileChanges,
    handleProfileUpdate
  } = useUserProfiles();

  // Get user communication operations
  const {
    addMessage,
    markChatAsRead,
    addAppointment,
    updateAppointmentStatus
  } = useUserCommunication();

  // Get filter operations
  const {
    getFilteredAdvisors,
    getFilteredConsumers
  } = useFilterOperations();

  // Get organization management
  const {
    addFirm,
    getFirmByAdmin
  } = useUserOrganizations();
  
  // Get user matching operations
  const {
    calculateCompatibilityScore,
    updateMatchPreferences,
    getTopMatches,
    getRecommendedMatches
  } = useUserMatching(
    userType,
    consumerProfile,
    advisorProfile,
    chats,
    appointments,
    [] // callMetrics
  );
  
  // Get userId based on profile type
  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;
    
  // Initialize call management
  const { 
    callSessions: managedCallSessions,
    setCallSessions: setManagedCallSessions,
    activeCall,
    callMetrics,
    initiateCall,
    updateCallStatus,
  } = useCallManagement(userId, userType as 'consumer' | 'advisor' | null);
  
  // Get lead management operations
  const {
    addLead,
    updateLeadStatus,
    getLeadByConsumer,
    getAdvisorLeads,
    getLeadStats
  } = useLeadManagement();

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
