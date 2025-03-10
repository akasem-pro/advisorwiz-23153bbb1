
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
  FinancialFirm
} from '../types/userTypes';

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
});

export default UserContext;
