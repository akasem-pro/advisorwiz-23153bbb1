
import React, { useState, ReactNode } from 'react';
import UserContext from './UserContextDefinition';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile, 
  Chat, 
  ChatMessage,
  Appointment, 
  AppointmentStatus, 
  FinancialFirm,
  ServiceCategory
} from '../types/userTypes';
import { 
  addMessageToChat, 
  markChatMessagesAsRead 
} from '../services/chatService';
import { 
  createAppointment, 
  updateAppointmentStatusById, 
  updateProfileWithAppointment 
} from '../services/appointmentService';
import { 
  createFirm, 
  getFirmsByAdminId 
} from '../services/firmService';
import { 
  filterAdvisors, 
  filterConsumers 
} from '../services/filterService';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [firms, setFirms] = useState<FinancialFirm[]>([]);

  // Chat operations
  const addMessage = (chatId: string, message: Omit<ChatMessage, 'id'>) => {
    setChats(prevChats => addMessageToChat(prevChats, chatId, message));
  };

  const markChatAsRead = (chatId: string, userId: string) => {
    setChats(prevChats => markChatMessagesAsRead(prevChats, chatId, userId));
  };

  // Appointment operations
  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment = createAppointment(appointmentData);
    
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    
    // Update consumer and advisor appointment lists
    if (consumerProfile && appointmentData.consumerId === consumerProfile.id) {
      setConsumerProfile(prevProfile => 
        updateProfileWithAppointment(prevProfile, newAppointment.id) as ConsumerProfile | null
      );
    }
    
    if (advisorProfile && appointmentData.advisorId === advisorProfile.id) {
      setAdvisorProfile(prevProfile => 
        updateProfileWithAppointment(prevProfile, newAppointment.id) as AdvisorProfile | null
      );
    }
  };

  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prevAppointments => 
      updateAppointmentStatusById(prevAppointments, appointmentId, status)
    );
  };

  // User status operations
  const updateOnlineStatus = (status: 'online' | 'offline' | 'away') => {
    if (consumerProfile) {
      setConsumerProfile({
        ...consumerProfile,
        onlineStatus: status,
        lastOnline: new Date().toISOString()
      });
    } else if (advisorProfile) {
      setAdvisorProfile({
        ...advisorProfile,
        onlineStatus: status,
        lastOnline: new Date().toISOString()
      });
    }
  };

  // Firm operations
  const addFirm = (firmData: Omit<FinancialFirm, 'id' | 'createdAt'>) => {
    const newFirm = createFirm(firmData);
    setFirms(prevFirms => [...prevFirms, newFirm]);
  };

  const getFirmByAdmin = (adminId: string) => {
    return getFirmsByAdminId(firms, adminId);
  };

  // Filtering operations
  const getFilteredAdvisors = (filters: {
    languages?: string[];
    services?: ServiceCategory[];
  }) => {
    return filterAdvisors(filters);
  };

  const getFilteredConsumers = (filters: {
    startTimeline?: ConsumerProfile['startTimeline'][];
    preferredLanguage?: string[];
  }) => {
    return filterConsumers(filters);
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
    getFirmByAdmin
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
