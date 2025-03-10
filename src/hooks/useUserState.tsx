
import { useState } from 'react';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile, 
  Chat,
  Appointment,
  FinancialFirm
} from '../types/userTypes';
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
  const [matchPreferences, setMatchPreferences] = useState<MatchPreferences>({
    prioritizeLanguage: true,
    prioritizeAvailability: true,
    prioritizeExpertise: true,
    prioritizeLocation: false,
    minimumMatchScore: 40
  });

  return {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    chats, setChats,
    appointments, setAppointments,
    firms, setFirms,
    matchPreferences, setMatchPreferences
  };
};
