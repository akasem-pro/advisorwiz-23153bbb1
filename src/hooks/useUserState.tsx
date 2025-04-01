
import React, { useState } from 'react';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile, 
  Chat,
  Appointment,
  FinancialFirm
} from '../types/userTypes';
import { CallSession } from '../types/callTypes';
import { Lead } from '../types/leadTypes';
import { MatchPreferences } from '../context/UserContextDefinition';

/**
 * Hook to manage the core user state in the application
 */
export const useUserState = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [firms, setFirms] = useState<FinancialFirm[]>([]);
  const [callSessions, setCallSessions] = useState<CallSession[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [matchPreferences, setMatchPreferences] = useState<MatchPreferences>({
    prioritizeLanguage: true,
    prioritizeAvailability: true,
    prioritizeExpertise: true,
    prioritizeLocation: false,
    minimumMatchScore: 40,
    considerInteractionData: true // Enable interaction data by default
  });

  return {
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
  };
};

export default useUserState;
