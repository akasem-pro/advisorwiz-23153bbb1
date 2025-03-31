
import { Chat, ChatMessage } from '../types/chatTypes';

/**
 * Add a message to a chat
 */
export function addMessageToChat(
  chats: Chat[],
  chatId: string,
  messageData: Omit<ChatMessage, 'id'>
): Chat[] {
  return chats.map(chat => {
    if (chat.id === chatId) {
      const newMessage: ChatMessage = {
        ...messageData,
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      };
      
      return {
        ...chat,
        messages: [...chat.messages, newMessage],
        lastUpdated: new Date().toISOString()
      };
    }
    return chat;
  });
}

/**
 * Mark all messages in a chat as read for a specific user
 */
export function markChatMessagesAsRead(
  chats: Chat[],
  chatId: string,
  userId: string
): Chat[] {
  return chats.map(chat => {
    if (chat.id === chatId) {
      return {
        ...chat,
        messages: chat.messages.map(message => 
          message.recipientId === userId ? { ...message, read: true } : message
        )
      };
    }
    return chat;
  });
}
