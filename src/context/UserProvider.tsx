
import React, { ReactNode } from 'react';
import UserContext, { MatchPreferences } from './UserContextDefinition';
import { useUserState } from '../hooks/useUserState';
import { useChatOperations } from '../hooks/useChatOperations';
import { useAppointmentOperations } from '../hooks/useAppointmentOperations';
import { useFirmOperations } from '../hooks/useFirmOperations';
import { useMatchingAlgorithm } from '../hooks/useMatchingAlgorithm';
import { useUserStatus } from '../hooks/useUserStatus';
import { useFilterOperations } from '../hooks/useFilterOperations';

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
    matchPreferences, setMatchPreferences
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

  // Matching algorithm operations
  const matching = useMatchingAlgorithm(
    userType,
    consumerProfile,
    advisorProfile,
    matchPreferences,
    chats,
    appointments
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
    getTopMatches: matching.getTopMatches,
    getRecommendedMatches: matching.getRecommendedMatches
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
