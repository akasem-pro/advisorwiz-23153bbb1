
// Types related to chat functionality

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
