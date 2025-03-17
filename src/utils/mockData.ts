
import { Chat, ChatMessage } from '../types/userTypes';

// Mock chat data
export const generateMockChats = (
  consumerId: string, 
  consumerName: string, 
  advisorId: string, 
  advisorName: string
): Chat[] => {
  const chatId = `chat-${consumerId}-${advisorId}`;
  
  const messages: ChatMessage[] = [
    {
      id: 'msg-1',
      senderId: advisorId,
      senderName: advisorName,
      recipientId: consumerId,
      content: "Hello! Thank you for connecting with me. How can I help with your financial planning needs?",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      read: true,
      readTimestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours after
      status: 'read'
    },
    {
      id: 'msg-2',
      senderId: consumerId,
      senderName: consumerName,
      recipientId: advisorId,
      content: "Hi! I'm interested in discussing retirement planning options. I'm 45 and want to make sure I'm on track.",
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      read: true,
      readTimestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000).toISOString(), // 1 hour after
      status: 'read'
    },
    {
      id: 'msg-3',
      senderId: advisorId,
      senderName: advisorName,
      recipientId: consumerId,
      content: "Great! I'd be happy to help with retirement planning. Could you share a bit about your current savings and investments?",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      read: true,
      readTimestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // 3 hours after
      status: 'read'
    },
    {
      id: 'msg-4',
      senderId: consumerId,
      senderName: consumerName,
      recipientId: advisorId,
      content: "I have about $250,000 in my 401(k) and another $50,000 in a Roth IRA. I also have some company stock worth around $30,000.",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      read: true,
      readTimestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // 4 hours after
      status: 'read'
    },
    {
      id: 'msg-5',
      senderId: advisorId,
      senderName: advisorName,
      recipientId: consumerId,
      content: "Thanks for sharing that information. Those are good starting points. Do you have any specific retirement goals or a target retirement age in mind?",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      read: true,
      readTimestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours after
      status: 'read'
    },
    {
      id: 'msg-6',
      senderId: consumerId,
      senderName: consumerName,
      recipientId: advisorId,
      content: "I'd like to retire by 65 if possible. I'm hoping to travel more and possibly downsize our home.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      read: true,
      readTimestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000).toISOString(), // 1 hour after
      status: 'read'
    },
    {
      id: 'msg-7',
      senderId: advisorId,
      senderName: advisorName,
      recipientId: consumerId,
      content: "That sounds like a reasonable plan. I think we should schedule a meeting to discuss your retirement strategy in more detail. Would you be available for a video call next week?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      read: false,
      status: 'delivered'
    },
  ];
  
  return [
    {
      id: chatId,
      participants: [consumerId, advisorId],
      messages,
      lastMessageAt: messages[messages.length - 1].timestamp,
      unreadCount: { [consumerId]: 1 },
      lastUpdated: messages[messages.length - 1].timestamp
    }
  ];
};
