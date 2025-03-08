
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
};

// Time slot type for weekly availability
export type TimeSlot = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string; // Format: "HH:MM" in 24-hour format
  isAvailable: boolean;
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
});

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<'consumer' | 'advisor' | null>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);

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
    markChatAsRead
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
