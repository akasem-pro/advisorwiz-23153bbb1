
import { Chat, ChatMessage } from '../types/userTypes';
import { 
  addMessageToChat, 
  markChatMessagesAsRead 
} from '../services/chatService';

/**
 * Hook that provides chat-related operations
 */
export const useChatOperations = (chats: Chat[], setChats: React.Dispatch<React.SetStateAction<Chat[]>>) => {
  const addMessage = (chatId: string, message: Omit<ChatMessage, 'id'>) => {
    setChats(prevChats => addMessageToChat(prevChats, chatId, message));
  };

  const markChatAsRead = (chatId: string, userId: string) => {
    setChats(prevChats => markChatMessagesAsRead(prevChats, chatId, userId));
  };

  return {
    addMessage,
    markChatAsRead
  };
};
