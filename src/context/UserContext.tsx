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
  startTimeline: 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure' | null; // When they want to start
  onlineStatus: 'online' | 'offline' | 'away'; // New field for online status
  lastOnline: string; // ISO string for last online time
  showOnlineStatus: boolean; // Toggle to show/hide online status
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

// Service categories for advisors
export type ServiceCategory = 
  'retirement' | 
  'investment' | 
  'tax' | 
  'estate' | 
  'business' | 
  'insurance' | 
  'philanthropic' | 
  'education';

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
  expertise: ServiceCategory[]; // Now explicitly typed
  matches: string[];
  chats: string[];
  profilePicture?: string; // URL to profile picture
  availability?: TimeSlot[]; // Weekly availability slots
  chatEnabled: boolean; // New field for chat settings
  appointmentCategories: AppointmentCategory[]; // Available appointment types
  appointments: string[]; // IDs of appointments
  onlineStatus: 'online' | 'offline' | 'away'; // New field for online status
  lastOnline: string; // ISO string for last online time
  showOnlineStatus: boolean; // Toggle to show/hide online status
};

// New type for financial firm
export type FinancialFirm = {
  id: string;
  name: string;
  description: string;
  website: string;
  logo?: string;
  adminId: string; // ID of the user who administers this firm
  advisorIds: string[]; // IDs of advisors in this firm
  createdAt: string;
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
  userType: 'consumer' | 'advisor' | 'firm_admin' | null;
  setUserType: (type: 'consumer' | 'advisor' | 'firm_admin' | null) => void;
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

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<'consumer' | 'advisor' | 'firm_admin' | null>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [firms, setFirms] = useState<FinancialFirm[]>([]);

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

  // Function to update user's online status
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

  // Function to add a new financial firm
  const addFirm = (firmData: Omit<FinancialFirm, 'id' | 'createdAt'>) => {
    const newFirm: FinancialFirm = {
      ...firmData,
      id: `firm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    
    setFirms(prevFirms => [...prevFirms, newFirm]);
  };

  // Function to get firms by admin ID
  const getFirmByAdmin = (adminId: string) => {
    return firms.filter(firm => firm.adminId === adminId);
  };

  // Mock data for filtering
  const mockConsumers: ConsumerProfile[] = [
    {
      id: 'consumer-1',
      name: 'Alex Johnson',
      age: 35,
      status: 'employed',
      investableAssets: 250000,
      riskTolerance: 'medium',
      preferredCommunication: ['email', 'phone'],
      preferredLanguage: ['english', 'spanish'],
      startTimeline: 'immediately',
      matches: [],
      chats: [],
      chatEnabled: true,
      appointments: [],
      onlineStatus: 'online',
      lastOnline: new Date().toISOString(),
      showOnlineStatus: true
    },
    {
      id: 'consumer-2',
      name: 'Taylor Smith',
      age: 42,
      status: 'self-employed',
      investableAssets: 500000,
      riskTolerance: 'high',
      preferredCommunication: ['video', 'inPerson'],
      preferredLanguage: ['english', 'french'],
      startTimeline: 'next_3_months',
      matches: [],
      chats: [],
      chatEnabled: true,
      appointments: [],
      onlineStatus: 'offline',
      lastOnline: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      showOnlineStatus: true
    },
    {
      id: 'consumer-3',
      name: 'Jordan Lee',
      age: 29,
      status: 'employed',
      investableAssets: 150000,
      riskTolerance: 'low',
      preferredCommunication: ['email'],
      preferredLanguage: ['english', 'mandarin'],
      startTimeline: 'next_6_months',
      matches: [],
      chats: [],
      chatEnabled: true,
      appointments: [],
      onlineStatus: 'away',
      lastOnline: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      showOnlineStatus: false
    },
    {
      id: 'consumer-4',
      name: 'Morgan Chen',
      age: 55,
      status: 'retired',
      investableAssets: 1200000,
      riskTolerance: 'medium',
      preferredCommunication: ['phone', 'inPerson'],
      preferredLanguage: ['english', 'cantonese'],
      startTimeline: 'not_sure',
      matches: [],
      chats: [],
      chatEnabled: true,
      appointments: [],
      onlineStatus: 'offline',
      lastOnline: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      showOnlineStatus: true
    }
  ];

  // Filter advisors based on criteria
  const getFilteredAdvisors = (filters: {
    languages?: string[];
    services?: ServiceCategory[];
  }) => {
    // This would usually be a server call
    // For now, use our mock data from MatchingInterface
    const mockAdvisors: AdvisorProfile[] = [
      {
        id: 'advisor-1',
        name: 'Alice Brown',
        organization: 'ABC Financial',
        isAccredited: true,
        website: 'https://www.abcfinancial.com',
        testimonials: [
          { client: 'John Doe', text: 'Great advisor, highly recommended!' }
        ],
        languages: ['english', 'spanish'],
        pricing: {
          hourlyRate: 150,
        },
        assetsUnderManagement: 5000000,
        expertise: ['retirement', 'investment'] as ServiceCategory[],
        matches: [],
        chats: [],
        profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b82a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        availability: [],
        chatEnabled: true,
        appointmentCategories: [],
        appointments: [],
        onlineStatus: 'online',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      },
      {
        id: 'advisor-2',
        name: 'Bob Miller',
        organization: 'XYZ Investments',
        isAccredited: false,
        website: 'https://www.xyzinvestments.com',
        testimonials: [
          { client: 'Jane Smith', text: 'Excellent service and advice.' }
        ],
        languages: ['english', 'french'],
        pricing: {
          portfolioFee: 1.0,
        },
        assetsUnderManagement: 2500000,
        expertise: ['tax', 'estate'] as ServiceCategory[],
        matches: [],
        chats: [],
        profilePicture: 'https://images.unsplash.com/photo-1570295999919-56bcae5b0189?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        availability: [],
        chatEnabled: true,
        appointmentCategories: [],
        appointments: [],
        onlineStatus: 'offline',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      },
      {
        id: 'advisor-3',
        name: 'Charlie Davis',
        organization: '123 Wealth Mgmt',
        isAccredited: true,
        website: 'https://www.123wealth.com',
        testimonials: [
          { client: 'Tom Brown', text: 'Very knowledgeable and helpful.' }
        ],
        languages: ['english', 'mandarin'],
        pricing: {
          hourlyRate: 200,
        },
        assetsUnderManagement: 7500000,
        expertise: ['business', 'insurance'] as ServiceCategory[],
        matches: [],
        chats: [],
        profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d674c80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        availability: [],
        chatEnabled: true,
        appointmentCategories: [],
        appointments: [],
        onlineStatus: 'online',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      },
      {
        id: 'advisor-4',
        name: 'Diana Wilson',
        organization: 'LMN Financial',
        isAccredited: false,
        website: 'https://www.lmnfinancial.com',
        testimonials: [
          { client: 'Sarah Lee', text: 'Provided great financial advice.' }
        ],
        languages: ['english', 'cantonese'],
        pricing: {
          portfolioFee: 1.2,
        },
        assetsUnderManagement: 10000000,
        expertise: ['philanthropic', 'education'] as ServiceCategory[],
        matches: [],
        chats: [],
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        availability: [],
        chatEnabled: true,
        appointmentCategories: [],
        appointments: [],
        onlineStatus: 'offline',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      }
    ];

    return mockAdvisors.filter(advisor => {
      // Check language match
      if (filters.languages && filters.languages.length > 0) {
        if (!filters.languages.some(lang => advisor.languages.includes(lang))) {
          return false;
        }
      }

      // Check service match
      if (filters.services && filters.services.length > 0) {
        if (!filters.services.some(service => advisor.expertise.includes(service))) {
          return false;
        }
      }

      return true;
    });
  };

  // Filter consumers based on criteria
  const getFilteredConsumers = (filters: {
    startTimeline?: ConsumerProfile['startTimeline'][];
    preferredLanguage?: string[];
  }) => {
    return mockConsumers.filter(consumer => {
      // Check timeline match
      if (filters.startTimeline && filters.startTimeline.length > 0) {
        if (!filters.startTimeline.includes(consumer.startTimeline)) {
          return false;
        }
      }

      // Check language match
      if (filters.preferredLanguage && filters.preferredLanguage.length > 0) {
        if (!filters.preferredLanguage.some(lang => consumer.preferredLanguage.includes(lang))) {
          return false;
        }
      }

      return true;
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

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
