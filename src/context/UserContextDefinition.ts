
import { createContext } from 'react';
import {
  UserType,
  ConsumerProfile,
  AdvisorProfile,
  Chat,
  ChatMessage,
  Appointment,
  AppointmentStatus,
  ServiceCategory,
  FinancialFirm,
  TimeSlot,
  AppointmentCategory
} from '../types/userTypes';
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
    startTimeline?: string[];
    preferredLanguage?: string[];
  }) => ConsumerProfile[];
  updateOnlineStatus: (status: 'online' | 'offline' | 'away') => void;
  firms: FinancialFirm[];
  setFirms: (firms: FinancialFirm[]) => void;
  addFirm: (firm: Omit<FinancialFirm, 'id' | 'createdAt'>) => void;
  getFirmByAdmin: (adminId: string) => FinancialFirm[];
  calculateCompatibilityScore: (advisorId: string, consumerId: string) => number;
  updateMatchPreferences: (preferences: MatchPreferences) => void;
  getTopMatches: (limit?: number) => (AdvisorProfile | ConsumerProfile)[];
  getRecommendedMatches: () => (AdvisorProfile | ConsumerProfile)[];
  // Call functionality
  callSessions: CallSession[];
  initiateCall: (recipientId: string, type: CallType) => CallSession | null;
  updateCallStatus: (callId: string, status: CallStatus) => void;
  activeCall: CallSession | null;
  callMetrics: CallMetrics[];
  // Lead tracking functionality
  leads: Lead[];
  addLead: (advisorId: string, consumerId: string, consumerName: string, matchScore: number, source?: LeadSource) => string;
  updateLeadStatus: (leadId: string, status: LeadStatus, notes?: string) => void;
  getLeadByConsumer: (consumerId: string, advisorId?: string) => Lead | null;
  getLeadStats: () => LeadStats;
  getAdvisorLeads: (advisorId: string) => Lead[];
};

// New type for match preferences
export type MatchPreferences = {
  prioritizeLanguage?: boolean;
  prioritizeAvailability?: boolean;
  prioritizeExpertise?: boolean;
  prioritizeLocation?: boolean;
  minimumMatchScore?: number;
  excludedCategories?: ServiceCategory[];
  // New field for considering call interaction data
  considerInteractionData?: boolean;
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
  getTopMatches: () => [],
  getRecommendedMatches: () => [],
  // Call functionality
  callSessions: [],
  initiateCall: () => null,
  updateCallStatus: () => {},
  activeCall: null,
  callMetrics: [],
  // Lead tracking functionality
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
