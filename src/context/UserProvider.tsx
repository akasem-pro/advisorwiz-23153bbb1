import React, { ReactNode, useEffect } from 'react';
import UserContext, { MatchPreferences } from './UserContextDefinition';
import { useUserState } from '../hooks/useUserState';
import { useChatOperations } from '../hooks/useChatOperations';
import { useAppointmentOperations } from '../hooks/useAppointmentOperations';
import { useFirmOperations } from '../hooks/useFirmOperations';
import { useMatchingAlgorithm } from '../hooks/useMatchingAlgorithm';
import { useUserStatus } from '../hooks/useUserStatus';
import { useFilterOperations } from '../hooks/useFilterOperations';
import { useCallManager } from '../hooks/useCallManager';
import { useLeadTracking } from '../hooks/useLeadTracking';
import { CallMetrics } from '../types/callTypes';
import CallModal from '../components/call/CallModal';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Core state management
  const {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    chats, setChats,
    appointments, setAppointments,
    firms, setFirms,
    matchPreferences, setMatchPreferences,
    callSessions, setCallSessions
  } = useUserState();

  // Chat operations
  const { addMessage, markChatAsRead } = useChatOperations(chats, setChats);

  // Appointment operations
  const { addAppointment, updateAppointmentStatus } = useAppointmentOperations(
    appointments, 
    setAppointments, 
    consumerProfile, 
    setConsumerProfile, 
    advisorProfile, 
    setAdvisorProfile
  );

  // User status operations
  const { updateOnlineStatus } = useUserStatus(
    consumerProfile, 
    setConsumerProfile, 
    advisorProfile, 
    setAdvisorProfile
  );

  // Firm operations
  const { addFirm, getFirmByAdmin } = useFirmOperations(firms, setFirms);

  // Filtering operations
  const { getFilteredAdvisors, getFilteredConsumers } = useFilterOperations();

  // Lead tracking operations
  const { 
    leads, 
    addLead, 
    updateLeadStatus, 
    getLeadByConsumer,
    getAdvisorLeads,
    getLeadStats 
  } = useLeadTracking();

  // Call operations
  const handleMetricsUpdate = (metrics: CallMetrics[]) => {
    // This will be used by the matching algorithm
    console.log("Updated call metrics:", metrics);
  };

  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;

  const {
    callSessions: managedCallSessions,
    activeCall,
    callMetrics,
    initiateCall,
    updateCall: updateCallStatus,
    isCallModalOpen,
    closeCallModal,
    endCall
  } = useCallManager(
    userId || '', 
    userType as 'consumer' | 'advisor' | null,
    handleMetricsUpdate
  );

  // Sync call sessions with state
  useEffect(() => {
    setCallSessions(managedCallSessions);
  }, [managedCallSessions, setCallSessions]);

  // Matching algorithm operations with call metrics integration
  const matching = useMatchingAlgorithm(
    userType,
    consumerProfile,
    advisorProfile,
    matchPreferences,
    chats,
    appointments,
    callMetrics // Pass call metrics to matching algorithm
  );

  // Enhanced with actual state update
  const updateMatchPreferences = (preferences: MatchPreferences) => {
    setMatchPreferences(prev => ({
      ...prev,
      ...preferences
    }));
  };

  const value = {
    userType,
    setUserType,
    consumerProfile,
    setConsumerProfile,
    advisorProfile,
    setAdvisorProfile,
    isAuthenticated,
    setIsAuthenticated,
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
    calculateCompatibilityScore: matching.calculateCompatibilityScore,
    updateMatchPreferences,
    matchPreferences,
    getTopMatches: matching.getTopMatches,
    getRecommendedMatches: matching.getRecommendedMatches,
    // Call functionality
    callSessions: managedCallSessions,
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
