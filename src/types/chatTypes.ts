
// Base chat message type
export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  readAt?: string;
}

// Participant data for a chat
export interface ParticipantData {
  name: string;
  avatar?: string;
  lastSeen?: string;
}

// Chat type definition
export interface Chat {
  id: string;
  participants: string[];
  participantData: Record<string, ParticipantData>;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  lastMessage?: ChatMessage;
}

// Chat preview type (for displaying in lists)
export interface ChatPreview {
  id: string;
  participants: string[];
  participantData: Record<string, ParticipantData>;
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
}
