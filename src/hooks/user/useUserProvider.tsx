
import { ReactNode } from 'react';
import { useUserProfiles } from './useUserProfiles';
import { useUserCommunication } from './useUserCommunication';
import { useUserOrganizations } from './useUserOrganizations';
import { useFilterOperations } from './useFilterOperations';
import { useUserMatching } from './useUserMatching';
import { useCallManagement } from './useCallManagement';
import { useLeadManagement } from './useLeadManagement';
import { useProfileInitialization } from './useProfileInitialization';
import { useAuthStateManagement } from './useAuthStateManagement';
import { useAuth } from '../../features/auth/context/AuthProvider';

/**
 * Main hook for the User Provider that combines all specialized hooks
 */
export const useUserProvider = () => {
  const { user } = useAuth();
  
  // Core user profiles
  const {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus,
    saveProfileChanges,
    handleProfileUpdate
  } = useUserProfiles();

  // Handle auth state management
  useAuthStateManagement(setIsAuthenticated);

  // Initialize profiles based on authentication
  useProfileInitialization(
    user,
    userType,
    setUserType,
    consumerProfile,
    setConsumerProfile,
    advisorProfile,
    setAdvisorProfile,
    setIsAuthenticated
  );

  // Communication (chats and appointments)
  const {
    chats, setChats,
    appointments, setAppointments,
    addMessage, markChatAsRead,
    addAppointment, updateAppointmentStatus
  } = useUserCommunication();

  // Organizations (firms)
  const {
    firms, setFirms,
    addFirm, getFirmByAdmin
  } = useUserOrganizations();

  // Filtering operations
  const { getFilteredAdvisors, getFilteredConsumers } = useFilterOperations();

  // Get the current user ID based on profile type
  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;

  // Call management
  const {
    callSessions,
    activeCall,
    callMetrics,
    initiateCall,
    updateCallStatus,
    isCallModalOpen,
    closeCallModal,
    endCall
  } = useCallManagement(userId, userType as 'consumer' | 'advisor' | null);

  // Lead management
  const {
    leads,
    addLead,
    updateLeadStatus,
    getLeadByConsumer,
    getLeadStats,
    getAdvisorLeads
  } = useLeadManagement();

  // User matching
  const {
    matchPreferences,
    updateMatchPreferences,
    calculateCompatibilityScore,
    getTopMatches,
    getRecommendedMatches
  } = useUserMatching(
    userType,
    consumerProfile,
    advisorProfile,
    chats,
    appointments,
    callMetrics
  );

  return {
    // User profiles
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus,
    handleProfileUpdate,
    saveProfileChanges,
    
    // Communication (chats and appointments)
    chats, setChats,
    addMessage, markChatAsRead,
    appointments, setAppointments,
    addAppointment, updateAppointmentStatus,
    
    // Filter operations
    getFilteredAdvisors, getFilteredConsumers,
    
    // Organizations (firms)
    firms, setFirms,
    addFirm, getFirmByAdmin,
    
    // Matching
    calculateCompatibilityScore,
    updateMatchPreferences,
    matchPreferences,
    getTopMatches, 
    getRecommendedMatches,
    
    // Call functionality
    callSessions,
    initiateCall,
    updateCallStatus,
    activeCall,
    callMetrics,
    
    // Lead tracking functionality
    leads,
    addLead,
    updateLeadStatus,
    getLeadByConsumer,
    getLeadStats,
    getAdvisorLeads,
    
    // Call UI state
    isCallModalOpen,
    closeCallModal,
    endCall
  };
};
