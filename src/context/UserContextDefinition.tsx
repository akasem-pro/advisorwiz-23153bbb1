import { createContext } from 'react';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile 
} from '../types/profileTypes';
import { Chat } from '../types/chatTypes';
import { Appointment } from '../types/timeTypes';
import { Firm } from '../types/firmTypes';
import { MatchPreferences } from '../types/compatibilityTypes';
import { Lead } from '../types/leadTypes';
import { CallSession } from '../types/callTypes';

/**
 * User context interface
 */
interface UserContextType {
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  consumerProfile: ConsumerProfile | null;
  setConsumerProfile: React.Dispatch<React.SetStateAction<ConsumerProfile | null>>;
  advisorProfile: AdvisorProfile | null;
  setAdvisorProfile: React.Dispatch<React.SetStateAction<AdvisorProfile | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  updateOnlineStatus: (status: 'online' | 'offline' | 'away') => void;
  handleProfileUpdate: (profileData: any) => Promise<boolean>;
  saveProfileChanges: () => Promise<boolean>;
  
  // Other properties
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  addMessage: (chatId: string, senderId: string, text: string) => void;
  markChatAsRead: (chatId: string, userId: string) => void;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (appointmentId: string, status: string) => void;
  getFilteredAdvisors: (filters: any) => Promise<AdvisorProfile[]>;
  getFilteredConsumers: (filters: any) => Promise<ConsumerProfile[]>;
  firms: Firm[];
  setFirms: React.Dispatch<React.SetStateAction<Firm[]>>;
  addFirm: (firm: Firm) => void;
  getFirmByAdmin: (adminId: string) => Promise<Firm | undefined>;
  calculateCompatibilityScore: (advisorId: string) => number;
  updateMatchPreferences: (preferences: MatchPreferences) => void;
  matchPreferences: MatchPreferences | null;
  getTopMatches: (limit?: number) => Promise<AdvisorProfile[] | ConsumerProfile[]>;
  getRecommendedMatches: (limit?: number) => Promise<AdvisorProfile[] | ConsumerProfile[]>;
  callSessions: CallSession[];
  initiateCall: (otherUserId: string) => void;
  updateCallStatus: (callId: string, status: string) => void;
  activeCall: CallSession | null;
  callMetrics: any;
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLeadStatus: (leadId: string, status: string) => void;
  getLeadByConsumer: (consumerId: string) => Promise<Lead | undefined>;
  getLeadStats: () => any;
  getAdvisorLeads: (advisorId: string) => Promise<Lead[]>;
}

/**
 * User context for managing user profiles and related data
 */
const UserContext = createContext<UserContextType>({
  userType: null,
  setUserType: () => {},
  consumerProfile: null,
  setConsumerProfile: () => {},
  advisorProfile: null,
  setAdvisorProfile: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  updateOnlineStatus: () => {},
  handleProfileUpdate: async () => false,
  saveProfileChanges: async () => false,
  
  // Other default properties
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  markChatAsRead: () => {},
  appointments: [],
  setAppointments: () => {},
  addAppointment: () => {},
  updateAppointmentStatus: () => {},
  getFilteredAdvisors: async () => [],
  getFilteredConsumers: async () => [],
  firms: [],
  setFirms: () => {},
  addFirm: () => {},
  getFirmByAdmin: async () => undefined,
  calculateCompatibilityScore: () => 0,
  updateMatchPreferences: () => {},
  matchPreferences: null,
  getTopMatches: async () => [],
  getRecommendedMatches: async () => [],
  callSessions: [],
  initiateCall: () => {},
  updateCallStatus: () => {},
  activeCall: null,
  callMetrics: null,
  leads: [],
  addLead: () => {},
  updateLeadStatus: () => {},
  getLeadByConsumer: async () => undefined,
  getLeadStats: () => {},
  getAdvisorLeads: async () => [],
});

export default UserContext;
