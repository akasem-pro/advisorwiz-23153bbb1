
import { createContext } from 'react';
import {
  UserType,
  ConsumerProfile,
  AdvisorProfile
} from '../types/profileTypes';
import {
  Chat,
  ChatMessage
} from '../types/chatTypes';
import {
  Appointment,
  AppointmentStatus
} from '../types/timeTypes';
import {
  ServiceCategory
} from '../types/serviceTypes';
import {
  FinancialFirm
} from '../types/firmTypes';
import { CallSession, CallStatus, CallType, CallMetrics } from '../types/callTypes';
import { Lead, LeadStatus, LeadStats, LeadSource } from '../types/leadTypes';

// Type for the user context
export type UserContextType = {
  userType: UserType;
  setUserType: (type: UserType) => void;
  consumerProfile: ConsumerProfile | null;
  setConsumerProfile: (profile: ConsumerProfile | null) => void;
  advisorProfile: AdvisorProfile | null;
  setAdvisorProfile: (profile: AdvisorProfile | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addMessage: (chatId: string, message: Omit<ChatMessage, 'id'>) => void;
  markChatAsRead: (chatId: string, userId: string) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => void;
  getFilteredAdvisors: (filters: {
    languages?: string[];
    services?: ServiceCategory[];
  }) => AdvisorProfile[];
  getFilteredConsumers: (filters: {
    startTimeline?: ConsumerProfile['startTimeline'][];
    preferredLanguage?: string[];
  }) => ConsumerProfile[];
  updateOnlineStatus: (status: 'online' | 'offline' | 'away') => void;
  firms: FinancialFirm[];
  setFirms: (firms: FinancialFirm[]) => void;
  addFirm: (firm: Omit<FinancialFirm, 'id' | 'createdAt'>) => void;
  getFirmByAdmin: (adminId: string) => FinancialFirm[];
  calculateCompatibilityScore: (advisorId: string, consumerId: string) => number;
  updateMatchPreferences: (preferences: MatchPreferences) => void;
  matchPreferences: MatchPreferences;
  getTopMatches: (limit?: number) => (AdvisorProfile | ConsumerProfile)[];
  getRecommendedMatches: () => (AdvisorProfile | ConsumerProfile)[];
  // New call functionality
  callSessions: CallSession[];
  initiateCall: (recipientId: string, type: CallType) => CallSession | null;
  updateCallStatus: (callId: string, status: CallStatus) => void;
  activeCall: CallSession | null;
  callMetrics: CallMetrics[];
  // New lead tracking functionality
  leads: Lead[];
  addLead: (advisorId: string, consumerId: string, consumerName: string, matchScore: number, source?: LeadSource) => string;
  updateLeadStatus: (leadId: string, status: LeadStatus, notes?: string) => void;
  getLeadByConsumer: (consumerId: string, advisorId?: string) => Lead | null;
  getLeadStats: () => LeadStats;
  getAdvisorLeads: (advisorId: string) => Lead[];
};

// Expanded type for match preferences with weighting factors
export type MatchPreferences = {
  prioritizeLanguage?: boolean;
  prioritizeAvailability?: boolean;
  prioritizeExpertise?: boolean;
  prioritizeLocation?: boolean;
  minimumMatchScore?: number;
  excludedCategories?: ServiceCategory[];
  // Consider call interaction data
  considerInteractionData?: boolean;
  // Dynamic weight factors (0-100)
  weightFactors?: {
    language?: number;
    expertise?: number;
    availability?: number;
    location?: number;
    interaction?: number;
  };
};

// Create the context with default values
const UserContext = createContext<UserContextType>({
  userType: null,
  setUserType: () => {},
  consumerProfile: null,
  setConsumerProfile: () => {},
  advisorProfile: null,
  setAdvisorProfile: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  chats: [],
  setChats: () => {},
  addMessage: () => {},
  markChatAsRead: () => {},
  appointments: [],
  setAppointments: () => {},
  addAppointment: () => {},
  updateAppointmentStatus: () => {},
  getFilteredAdvisors: () => [],
  getFilteredConsumers: () => [],
  updateOnlineStatus: () => {},
  firms: [],
  setFirms: () => {},
  addFirm: () => {},
  getFirmByAdmin: () => [],
  calculateCompatibilityScore: () => 0,
  updateMatchPreferences: () => {},
  matchPreferences: {
    prioritizeLanguage: true,
    prioritizeAvailability: true,
    prioritizeExpertise: true,
    prioritizeLocation: false,
    minimumMatchScore: 40,
    considerInteractionData: true,
    weightFactors: {
      language: 50,
      expertise: 50,
      availability: 30,
      location: 20,
      interaction: 40
    }
  },
  getTopMatches: () => [],
  getRecommendedMatches: () => [],
  // New call functionality
  callSessions: [],
  initiateCall: () => null,
  updateCallStatus: () => {},
  activeCall: null,
  callMetrics: [],
  // New lead tracking functionality
  leads: [],
  addLead: () => "",
  updateLeadStatus: () => {},
  getLeadByConsumer: () => null,
  getLeadStats: () => ({
    totalLeads: 0,
    activeLeads: 0,
    convertedLeads: 0,
    conversionRate: 0,
    averageTimeToConversion: 0,
    leadsByStatus: {} as Record<LeadStatus, number>,
    leadsBySource: {} as Record<LeadSource, number>
  }),
  getAdvisorLeads: () => []
});

export default UserContext;
