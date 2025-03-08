import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for the consumer and advisor profiles
export type ConsumerProfile = {
  id: string;
  name: string;
  age: number;
  status: string;
  investableAssets: number;
  riskTolerance: 'low' | 'medium' | 'high';
  preferredCommunication: string[];
  preferredLanguage: string[];
  matches: string[];
  chats: string[];
  profilePicture?: string; // URL to profile picture
  chatEnabled: boolean; // New field for chat settings
  appointments: string[]; // IDs of appointments
};

// Time slot type for weekly availability
export type TimeSlot = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string; // Format: "HH:MM" in 24-hour format
  isAvailable: boolean;
};

// Appointment category type
export type AppointmentCategory = {
  id: string;
  name: 'free_consultation' | 'discovery_call' | 'investment_call' | 'tax_planning' | 'business_entrepreneurship';
  label: string;
  description: string;
  duration: number; // in minutes
  enabled: boolean;
};

export type AdvisorProfile = {
  id: string;
  name: string;
  organization: string;
  isAccredited: boolean;
  website: string;
  testimonials: { client: string; text: string }[];
  languages: string[];
  pricing: {
    hourlyRate?: number;
    portfolioFee?: number;
  };
  assetsUnderManagement: number;
  expertise: string[];
  matches: string[];
  chats: string[];
  profilePicture?: string; // URL to profile picture
  availability?: TimeSlot[]; // Weekly availability slots
  chatEnabled: boolean; // New field for chat settings
  appointmentCategories: AppointmentCategory[]; // Available appointment types
  appointments: string[]; // IDs of appointments
};

// Appointment status type
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Appointment type
export type Appointment = {
  id: string;
  advisorId: string;
  consumerId: string;
  categoryId: string;
  title: string;
  date: string; // ISO string format
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string; // Format: "HH:MM" in 24-hour format
  status: AppointmentStatus;
  notes?: string;
  location?: string; // Could be 'video', 'phone', physical address, etc.
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
};

// Message type for the chat
export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string; // ISO string format
  read: boolean;
  readTimestamp?: string; // ISO string format
};

// Chat type
export type Chat = {
  id: string;
  participants: string[]; // Array of participant IDs
  messages: ChatMessage[];
  lastUpdated: string; // ISO string format
};

// Type for the user context
type UserContextType = {
  userType: 'consumer' | 'advisor' | null;
  setUserType: (type: 'consumer' | 'advisor' | null) => void;
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
});

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<'consumer' | 'advisor' | null>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Function to add a message to a chat
  const addMessage = (chatId: string, message: Omit<ChatMessage, 'id'>) => {
    setChats(prevChats => {
      const chatIndex = prevChats.findIndex(chat => chat.id === chatId);
      
      if (chatIndex === -1) return prevChats;
      
      const newMessage: ChatMessage = {
        ...message,
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      
      const updatedChat = {
        ...prevChats[chatIndex],
        messages: [...prevChats[chatIndex].messages, newMessage],
        lastUpdated: new Date().toISOString()
      };
      
      const newChats = [...prevChats];
      newChats[chatIndex] = updatedChat;
      
      return newChats;
    });
  };

  // Function to mark all messages in a chat as read
  const markChatAsRead = (chatId: string, userId: string) => {
    setChats(prevChats => {
      const chatIndex = prevChats.findIndex(chat => chat.id === chatId);
      
      if (chatIndex === -1) return prevChats;
      
      const updatedMessages = prevChats[chatIndex].messages.map(msg => {
        if (msg.recipientId === userId && !msg.read) {
          return {
            ...msg,
            read: true,
            readTimestamp: new Date().toISOString()
          };
        }
        return msg;
      });
      
      const updatedChat = {
        ...prevChats[chatIndex],
        messages: updatedMessages
      };
      
      const newChats = [...prevChats];
      newChats[chatIndex] = updatedChat;
      
      return newChats;
    });
  };

  // Function to add a new appointment
  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    
    // Update consumer and advisor appointment lists
    if (consumerProfile && appointmentData.consumerId === consumerProfile.id) {
      setConsumerProfile({
        ...consumerProfile,
        appointments: [...(consumerProfile.appointments || []), newAppointment.id]
      });
    }
    
    if (advisorProfile && appointmentData.advisorId === advisorProfile.id) {
      setAdvisorProfile({
        ...advisorProfile,
        appointments: [...(advisorProfile.appointments || []), newAppointment.id]
      });
    }
  };

  // Function to update appointment status
  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prevAppointments => {
      const appointmentIndex = prevAppointments.findIndex(appt => appt.id === appointmentId);
      
      if (appointmentIndex === -1) return prevAppointments;
      
      const updatedAppointment = {
        ...prevAppointments[appointmentIndex],
        status,
        updatedAt: new Date().toISOString()
      };
      
      const newAppointments = [...prevAppointments];
      newAppointments[appointmentIndex] = updatedAppointment;
      
      return newAppointments;
    });
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
    updateAppointmentStatus
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
