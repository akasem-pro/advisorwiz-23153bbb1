// Types for user profiles and related data

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

// Location type for user profiles
export type Location = {
  city: string;
  state: string;
  country: string;
};

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
  serviceNeeds?: ServiceCategory[];
  investmentAmount?: number;
  financialGoals?: string[];
  incomeBracket?: string;
  preferredAdvisorSpecialties?: string[];
  location?: Location;
  advisorPreferences?: {
    experience?: string;
    feeStructure?: string;
    minimumInvestment?: number;
  };
  languages?: string[];
  matches: string[];
  chats: string[];
  profilePicture?: string; // URL to profile picture
  chatEnabled: boolean; // New field for chat settings
  appointments: string[];
  startTimeline: 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure' | null; // When they want to start
  onlineStatus: 'online' | 'offline' | 'away'; // New field for online status
  lastOnline: string; // ISO string for last online time
  showOnlineStatus: boolean; // Toggle to show/hide online status

  // Additional fields for the form
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  province?: string;
  postalCode?: string;
  industry?: string;
  jobTitle?: string;
  preferredMeetingTimes?: string[];
  advisorInvolvement?: string;
  wantsEducation?: boolean;
  termsConsent?: boolean;
  advisorContactConsent?: boolean;
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
  expertise: ServiceCategory[]; // Now explicitly typed
  specializations?: string[]; // New field for specific areas of expertise
  yearsOfExperience?: number; // New field
  averageRating?: number; // New field
  ratingCount?: number; // New field
  biography?: string; // New field
  certifications?: string[]; // New field
  location?: Location; // New field
  matches: string[];
  compatibilityScores?: Record<string, number>; // Add this optional property
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
  industry?: string; // New field
  size?: string; // New field
  assetsUnderManagement?: number; // New field
  employeeCount?: number; // New field
  location?: Location; // New field
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
  recipientName: string;
  content: string;
  timestamp: string; // ISO string format
  read: boolean;
};

// Chat type for conversations
export type Chat = {
  id: string;
  participants: string[];
  messages: ChatMessage[];
  lastUpdated: string; // ISO string format
};

// Review type
export type Review = {
  id: string;
  advisorId: string;
  consumerId: string;
  rating: number;
  reviewText?: string;
  timestamp: string; // ISO string format
  isPublic: boolean;
};

// Notification type
export type Notification = {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'appointment' | 'system';
  title: string;
  message?: string;
  read: boolean;
  actionLink?: string;
  timestamp: string; // ISO string format
};

// User type
export type UserType = 'consumer' | 'advisor' | 'firm_admin' | null;
