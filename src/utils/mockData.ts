
import { ChatMessage, Chat } from '../types/chatTypes';
// Keep the rest of the imports

// Fix only the chat messages and chat object that have errors
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    senderId: 'advisor1',
    recipientId: 'user1',
    content: 'Hello! How can I help you today?',
    timestamp: '2023-04-20T10:00:00Z',
    read: true,
    senderName: 'John Advisor'
  },
  {
    id: 'msg2',
    senderId: 'user1',
    recipientId: 'advisor1',
    content: 'I\'m interested in retirement planning options.',
    timestamp: '2023-04-20T10:05:00Z',
    read: true,
    senderName: 'Sarah Client'
  },
  {
    id: 'msg3',
    senderId: 'advisor1',
    recipientId: 'user1',
    content: 'Great! I specialize in retirement planning. When are you planning to retire?',
    timestamp: '2023-04-20T10:10:00Z',
    read: true,
    senderName: 'John Advisor'
  },
  {
    id: 'msg4',
    senderId: 'user1',
    recipientId: 'advisor1',
    content: 'I\'m aiming for about 10 years from now.',
    timestamp: '2023-04-20T10:15:00Z',
    read: true,
    senderName: 'Sarah Client'
  },
  {
    id: 'msg5',
    senderId: 'advisor1',
    recipientId: 'user1',
    content: 'That gives us a good timeframe to work with. Have you already started saving for retirement?',
    timestamp: '2023-04-20T10:20:00Z',
    read: false,
    senderName: 'John Advisor'
  },
  {
    id: 'msg6',
    senderId: 'advisor2',
    recipientId: 'user1',
    content: 'Hi Sarah, I noticed you were interested in financial planning. I\'d love to help!',
    timestamp: '2023-04-21T09:00:00Z',
    read: false,
    senderName: 'Emily Advisor'
  },
  {
    id: 'msg7',
    senderId: 'user1',
    recipientId: 'advisor3',
    content: 'Do you have experience with education savings plans?',
    timestamp: '2023-04-19T14:30:00Z',
    read: true,
    senderName: 'Sarah Client'
  }
];

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: ['advisor1', 'user1'],
    messages: mockChatMessages.filter(msg => 
      (msg.senderId === 'advisor1' && msg.recipientId === 'user1') || 
      (msg.senderId === 'user1' && msg.recipientId === 'advisor1')
    ),
    lastUpdated: '2023-04-20T10:20:00Z',
    createdAt: '2023-04-20T10:00:00Z',
    updatedAt: '2023-04-20T10:20:00Z',
    participantData: {
      advisor1: {
        name: 'John Advisor',
        avatar: '/assets/advisor1.jpg',
        lastSeen: '2023-04-20T10:25:00Z'
      },
      user1: {
        name: 'Sarah Client',
        lastSeen: '2023-04-20T10:18:00Z'
      }
    }
  }
];
