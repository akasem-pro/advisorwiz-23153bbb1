
import React, { ReactNode, useEffect } from 'react';
import UserContext from './UserContextDefinition';
import { useUserProfiles } from '../hooks/user/useUserProfiles';
import { useUserCommunication } from '../hooks/user/useUserCommunication';
import { useUserOrganizations } from '../hooks/user/useUserOrganizations';
import { useFilterOperations } from '../hooks/user/useFilterOperations';
import { useUserMatching } from '../hooks/user/useUserMatching';
import { useCallManagement } from '../hooks/user/useCallManagement';
import { useLeadManagement } from '../hooks/user/useLeadManagement';
import CallModal from '../components/call/CallModal';
import { useAuth } from '../features/auth/context/AuthProvider';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Auth context for user information
  const { user } = useAuth();
  
  // Core user profiles
  const {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus
  } = useUserProfiles();

  // Update authenticated state based on auth provider
  useEffect(() => {
    if (user) {
      console.log("[UserProvider] User authenticated:", user);
      setIsAuthenticated(true);
      
      // For demo purposes, assign a default userType if not already set
      // In a real app, this would come from the user's profile in the database
      if (!userType) {
        // Check email to guess user type for demo
        const email = user.email?.toLowerCase() || '';
        if (email.includes('consumer')) {
          setUserType('consumer');
          
          // Create a mock consumer profile for demo
          if (!consumerProfile) {
            setConsumerProfile({
              id: user.id,
              name: email.split('@')[0],
              email: email,
              onlineStatus: 'online',
              lastOnline: new Date().toISOString()
            });
          }
        } else if (email.includes('advisor')) {
          setUserType('advisor');
          
          // Create a mock advisor profile for demo
          if (!advisorProfile) {
            setAdvisorProfile({
              id: user.id,
              name: email.split('@')[0],
              email: email,
              onlineStatus: 'online',
              lastOnline: new Date().toISOString()
            });
          }
        } else {
          // Default to consumer for demo
          setUserType('consumer');
          
          // Create a default consumer profile
          if (!consumerProfile) {
            setConsumerProfile({
              id: user.id,
              name: email.split('@')[0] || 'User',
              email: email,
              onlineStatus: 'online',
              lastOnline: new Date().toISOString()
            });
          }
        }
      }
    } else {
      console.log("[UserProvider] No authenticated user");
      setIsAuthenticated(false);
    }
  }, [user, setIsAuthenticated, userType, setUserType, consumerProfile, setConsumerProfile, advisorProfile, setAdvisorProfile]);

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
    getAdvisorLeads,
    getLeadStats
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

  const value = {
    // User profiles
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus,
    
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
    getAdvisorLeads
  };

  return (
    <UserContext.Provider value={value}>
      {children}
      <CallModal 
        callSession={activeCall} 
        isOpen={isCallModalOpen}
        onEnd={() => {
          if (activeCall) {
            endCall(activeCall.id);
          }
          closeCallModal();
        }}
      />
    </UserContext.Provider>
  );
};
