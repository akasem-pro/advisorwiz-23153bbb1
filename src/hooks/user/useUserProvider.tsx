
import { useUserProfiles } from './useUserProfiles';
import { useCommunicationManagement } from './useCommunicationManagement';
import { useOrganizationManagement } from './useOrganizationManagement';
import { useFilterOperations } from './useFilterOperations';
import { useUserMatching } from './useUserMatching';
import { useCallManagement } from './useCallManagement';
import { useLeadManagement } from './useLeadManagement';
import { useProfileInitialization } from './useProfileInitialization';
import { useAuthStateManagement } from './useAuthStateManagement';
import { useUserSettings } from './useUserSettings';
import { useAuth } from '../../components/auth/AuthContext';
import { User } from '@supabase/supabase-js';

/**
 * Main hook for the User Provider that combines all specialized hooks
 */
export const useUserProvider = () => {
  const { user: authUser } = useAuth();
  
  // Map AuthUser to User type if needed
  const user: User | null = authUser ? {
    id: authUser.id,
    email: authUser.email,
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString()
  } : null;
  
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
  } = useCommunicationManagement();

  // Organizations (firms)
  const {
    firms, setFirms,
    addFirm, getFirmByAdmin
  } = useOrganizationManagement();

  // Filtering operations
  const { getFilteredAdvisors, getFilteredConsumers } = useFilterOperations();

  // User settings and preferences
  const {
    matchPreferences,
    updateMatchPreferences
  } = useUserSettings();

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
