
import { Chat, ChatMessage } from '../types/userTypes';

export const addMessageToChat = (
  chats: Chat[], 
  chatId: string, 
  message: Omit<ChatMessage, 'id'>
): Chat[] => {
  const chatIndex = chats.findIndex(chat => chat.id === chatId);
  
  if (chatIndex === -1) return chats;
  
  const newMessage: ChatMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  
  const updatedChat = {
    ...chats[chatIndex],
    messages: [...chats[chatIndex].messages, newMessage],
    lastUpdated: new Date().toISOString()
  };
  
  const newChats = [...chats];
  newChats[chatIndex] = updatedChat;
  
  return newChats;
};

export const markChatMessagesAsRead = (
  chats: Chat[],
  chatId: string, 
  userId: string
): Chat[] => {
  const chatIndex = chats.findIndex(chat => chat.id === chatId);
  
  if (chatIndex === -1) return chats;
  
  const updatedMessages = chats[chatIndex].messages.map(msg => {
    if (msg.recipientId === userId && !msg.read) {
      return {
        ...msg,
        read: true
      };
    }
    return msg;
  });
  
  const updatedChat = {
    ...chats[chatIndex],
    messages: updatedMessages
  };
  
  const newChats = [...chats];
  newChats[chatIndex] = updatedChat;
  
  return newChats;
};
