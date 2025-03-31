
import { createContext } from 'react';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile 
} from '../types/profileTypes';
import { Chat } from '../types/chatTypes';
import { Appointment } from '../types/timeTypes';
import { FinancialFirm } from '../types/firmTypes';
import { MatchPreferences } from '../types/compatibilityTypes';
import { Lead } from '../types/leadTypes';
import { CallSession } from '../types/callTypes';

/**
 * User context interface defining all properties and methods
 * available through useUser() hook
 */
interface UserContextType {
  // User profile state
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  consumerProfile: ConsumerProfile | null;
  setConsumerProfile: React.Dispatch<React.SetStateAction<ConsumerProfile | null>>;
  advisorProfile: AdvisorProfile | null;
  setAdvisorProfile: React.Dispatch<React.SetStateAction<AdvisorProfile | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Profile management
  updateOnlineStatus: (status: 'online' | 'offline' | 'away') => void;
  handleProfileUpdate: (profileData: any) => Promise<boolean>;
  saveProfileChanges: () => Promise<boolean>;
  
  // Communication (chats and messages)
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  addMessage: (chatId: string, senderId: string, text: string) => void;
  markChatAsRead: (chatId: string, userId: string) => void;
  
  // Appointments
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (appointmentId: string, status: string) => void;
  
  // Filtering operations
  getFilteredAdvisors: (filters: any) => Promise<AdvisorProfile[]>;
  getFilteredConsumers: (filters: any) => Promise<ConsumerProfile[]>;
  
  // Organizations
  firms: FinancialFirm[];
  setFirms: React.Dispatch<React.SetStateAction<FinancialFirm[]>>;
  addFirm: (firm: FinancialFirm) => void;
  getFirmByAdmin: (adminId: string) => Promise<FinancialFirm[]>;
  
  // Matching functionality
  calculateCompatibilityScore: (advisorId: string) => number;
  updateMatchPreferences: (preferences: MatchPreferences) => void;
  matchPreferences: MatchPreferences | null;
  getTopMatches: (limit?: number) => Promise<AdvisorProfile[] | ConsumerProfile[]>;
  getRecommendedMatches: (limit?: number) => Promise<AdvisorProfile[] | ConsumerProfile[]>;
  
  // Call functionality
  callSessions: CallSession[];
  initiateCall: (otherUserId: string) => void;
  updateCallStatus: (callId: string, status: string) => void;
  activeCall: CallSession | null;
  callMetrics: any;
  isCallModalOpen: boolean;
  closeCallModal: () => void;
  endCall: (callId: string) => void;
  
  // Lead management
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLeadStatus: (leadId: string, status: string) => void;
  getLeadByConsumer: (consumerId: string) => Promise<Lead | undefined>;
  getLeadStats: () => any;
  getAdvisorLeads: (advisorId: string) => Promise<Lead[]>;
}

/**
 * Default values for the context
 * These are placeholders used before the provider is initialized
 */
const defaultContextValues: UserContextType = {
  // User profile state
  userType: null,
  setUserType: () => {},
  consumerProfile: null,
  setConsumerProfile: () => {},
  advisorProfile: null,
  setAdvisorProfile: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  
  // Profile management
  updateOnlineStatus: () => {},
  handleProfileUpdate: async () => false,
  saveProfileChanges: async () => false,
  
  // Communication
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  markChatAsRead: () => {},
  
  // Appointments
  appointments: [],
  setAppointments: () => {},
  addAppointment: () => {},
  updateAppointmentStatus: () => {},
  
  // Filtering
  getFilteredAdvisors: async () => [],
  getFilteredConsumers: async () => [],
  
  // Organizations
  firms: [],
  setFirms: () => {},
  addFirm: () => {},
  getFirmByAdmin: async () => [],
  
  // Matching
  calculateCompatibilityScore: () => 0,
  updateMatchPreferences: () => {},
  matchPreferences: null,
  getTopMatches: async () => [],
  getRecommendedMatches: async () => [],
  
  // Calls
  callSessions: [],
  initiateCall: () => {},
  updateCallStatus: () => {},
  activeCall: null,
  callMetrics: null,
  isCallModalOpen: false,
  closeCallModal: () => {},
  endCall: () => {},
  
  // Leads
  leads: [],
  addLead: () => {},
  updateLeadStatus: () => {},
  getLeadByConsumer: async () => undefined,
  getLeadStats: () => ({}),
  getAdvisorLeads: async () => [],
};

/**
 * Create the context with default values
 */
const UserContext = createContext<UserContextType>(defaultContextValues);

export default UserContext;
