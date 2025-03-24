
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';
import { useUser } from '../context/UserContext';

/**
 * Hook that handles all real-time subscriptions for the application
 */
export const useRealtimeSubscriptions = () => {
  const { 
    userType, 
    consumerProfile, 
    advisorProfile, 
    setChats, 
    chats, 
    setAppointments, 
    appointments,
    addMessage
  } = useUser();

  // Get the current user ID based on profile type
  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;

  useEffect(() => {
    if (!userId) return;

    console.log('[Realtime] Setting up subscriptions for user:', userId);

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
          // You would typically call a refresh function here
          // This is just a placeholder for now
        }
      });
      
    // Subscribe to appointment updates
    const appointmentChannel = supabase
      .channel('appointments_channel')
      .on('postgres_changes', {
        event: '*', // Listen to all changes
        schema: 'public',
        table: 'appointments',
        filter: `or(advisor_id.eq.${userId},consumer_id.eq.${userId})`,
      }, (payload) => {
        console.log('[Realtime] Appointment update:', payload);
        
        const { eventType } = payload;
        const appointment = payload.new;
        
        switch (eventType) {
          case 'INSERT':
            setAppointments(prev => [...prev, appointment]);
            toast('New Appointment', {
              description: `${appointment.title || 'Appointment'} scheduled for ${new Date(appointment.scheduled_start).toLocaleString()}`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
            
          case 'UPDATE':
            setAppointments(prev => 
              prev.map(item => item.id === appointment.id ? appointment : item)
            );
            
            toast('Appointment Updated', {
              description: `Status: ${appointment.status.toUpperCase()}`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
            
          case 'DELETE':
            setAppointments(prev => 
              prev.filter(item => item.id !== payload.old.id)
            );
            
            toast('Appointment Canceled', {
              description: `An appointment has been canceled`,
            });
            break;
        }
      });
      
    // Subscribe to notifications
    const notificationChannel = supabase
      .channel('notifications_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        console.log('[Realtime] New notification:', payload);
        
        const notification = payload.new;
        
        toast(notification.title, {
          description: notification.message,
          action: notification.action_link ? {
            label: 'View',
            onClick: () => window.location.href = notification.action_link
          } : undefined
        });
      });

    // Start subscriptions
    chatChannel.subscribe();
    appointmentChannel.subscribe();
    notificationChannel.subscribe();

    // Cleanup function to remove subscriptions
    return () => {
      console.log('[Realtime] Cleaning up subscriptions');
      supabase.removeChannel(chatChannel);
      supabase.removeChannel(appointmentChannel);
      supabase.removeChannel(notificationChannel);
    };
  }, [userId, chats, appointments, addMessage, setChats, setAppointments]);

  return null; // This hook doesn't return anything
};
