
import React, { ReactNode, useEffect } from 'react';
import UserContext from './UserContextDefinition';
import { useUserProfiles } from '../hooks/user/useUserProfiles';
import { useUserCommunication } from '../hooks/user/useUserCommunication';
import { useUserOrganizations } from '../hooks/user/useUserOrganizations';
import { useFilterOperations } from '../hooks/user/useFilterOperations';
import { useUserMatching } from '../hooks/user/useUserMatching';
import { useCallManagement } from '../hooks/user/useCallManagement';
import { useLeadManagement } from '../hooks/user/useLeadManagement';
import { useProfileInitialization } from '../hooks/user/useProfileInitialization';
import CallModal from '../components/call/CallModal';
import { useAuth } from '../features/auth/context/AuthProvider';
import { supabase } from '../integrations/supabase/client';

export const UserProviderRefactored = ({ children }: { children: ReactNode }) => {
  // Auth context for user information
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

  // Effect to set the authenticated state based on user existence
  useEffect(() => {
    const updateAuthState = async () => {
      // Check if we have a user from the auth context
      if (user) {
        setIsAuthenticated(true);
        console.log("[UserProvider] User authenticated from context:", user.email);
      } else {
        // Fallback to checking with supabase directly
        try {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("[UserProvider] Error checking session:", error);
            setIsAuthenticated(false);
            return;
          }
          
          if (data?.session?.user) {
            setIsAuthenticated(true);
            console.log("[UserProvider] User authenticated from Supabase session:", data.session.user.email);
          } else {
            setIsAuthenticated(false);
            console.log("[UserProvider] No authenticated user found");
          }
        } catch (err) {
          console.error("[UserProvider] Exception checking auth state:", err);
          setIsAuthenticated(false);
        }
      }
    };
    
    updateAuthState();
    
    // Setup auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[UserProvider] Auth state changed:", event, !!session);
      setIsAuthenticated(!!session);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user, setIsAuthenticated]);

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

  const value = {
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
