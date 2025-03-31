
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';
import { Chat, ChatMessage } from '../../types/chatTypes';

interface UseChatSubscriptionProps {
  userId: string | undefined;
  chats: Chat[];
  addMessage: (chatId: string, message: Omit<ChatMessage, 'id'>) => void;
}

/**
 * Hook to handle real-time subscriptions for chat messages
 */
export const useChatSubscription = ({ 
  userId, 
  chats, 
  addMessage 
}: UseChatSubscriptionProps) => {
  
  useEffect(() => {
    if (!userId) return;

    console.log('[Realtime] Setting up chat subscription for user:', userId);

    // Subscribe to new chat messages
    const chatChannel = supabase
      .channel('chat_messages_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `recipient_id=eq.${userId}`,
      }, (payload) => {
        console.log('[Realtime] New chat message received:', payload);
        
        // Find the chat that this message belongs to
        const message = payload.new;
        if (!message) return;
        
        const senderId = message.sender_id;
        
        // Try to find the existing chat
        let targetChatId = null;
        const existingChat = chats.find(chat => 
          chat.participants.includes(senderId) && 
          chat.participants.includes(userId)
        );
        
        if (existingChat) {
          targetChatId = existingChat.id;
          
          // Add the message to the chat
          addMessage(targetChatId, {
            senderId: message.sender_id,
            senderName: message.sender_name || "Unknown User",
            recipientId: message.recipient_id,
            recipientName: message.recipient_name || "You",
            content: message.content,
            timestamp: message.created_at,
            read: false
          });
          
          // Show a notification
          toast(`New message from ${message.sender_name || 'Unknown User'}`, {
            description: message.content.substring(0, 60) + (message.content.length > 60 ? '...' : ''),
            action: {
              label: 'View',
              onClick: () => window.location.href = `/chat/${targetChatId}`
            }
          });
        } else {
          // If we don't have this chat in state yet, we need to fetch the full chats again
          console.log('[Realtime] Chat not found locally, refreshing data');
          // This would typically call a refresh function
        }
      });

    // Start subscription
    chatChannel.subscribe();

    // Cleanup function
    return () => {
      console.log('[Realtime] Cleaning up chat subscription');
      supabase.removeChannel(chatChannel);
    };
  }, [userId, chats, addMessage]);

  return null;
};
