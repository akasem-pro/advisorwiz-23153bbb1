
import { ConsumerProfile, AdvisorProfile } from '../types/profileTypes';

// Mock consumer data for filtering
export const mockConsumers: ConsumerProfile[] = [
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

// Mock advisor data for filtering
export const mockAdvisors: AdvisorProfile[] = [
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
    expertise: ['retirement', 'investment'],
    specializations: ['retirement_planning', 'wealth_management'],
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
    expertise: ['tax', 'estate'],
    specializations: ['tax_planning', 'estate_planning'],
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
    expertise: ['business', 'insurance'],
    specializations: ['business_planning', 'insurance_planning'],
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
    expertise: ['philanthropic', 'education'],
    specializations: ['philanthropic_planning', 'education_planning'],
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
