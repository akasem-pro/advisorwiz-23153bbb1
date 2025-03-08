
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
});

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<'consumer' | 'advisor' | null>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    userType,
    setUserType,
    consumerProfile,
    setConsumerProfile,
    advisorProfile,
    setAdvisorProfile,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
