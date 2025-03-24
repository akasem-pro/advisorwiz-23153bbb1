
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';
import { useUser } from '../context/UserContext';
import { Appointment } from '../types/timeTypes';

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
        const appointment = payload.new || {};
        
        switch (eventType) {
          case 'INSERT':
            // Safely convert Supabase appointment to our app's Appointment type
            setAppointments((prev: Appointment[]) => {
              const newAppointment: Appointment = {
                id: appointment.id || '',
                title: appointment.title || 'Appointment',
                date: appointment.scheduled_start || new Date().toISOString(),
                startTime: appointment.scheduled_start ? new Date(appointment.scheduled_start).toLocaleTimeString() : '',
                endTime: appointment.scheduled_end ? new Date(appointment.scheduled_end).toLocaleTimeString() : '',
                advisorId: appointment.advisor_id || '',
                consumerId: appointment.consumer_id || '',
                status: (appointment.status as Appointment['status']) || 'pending',
                location: appointment.meeting_link || '',
                notes: appointment.notes || '',
                createdAt: appointment.created_at || new Date().toISOString(),
                updatedAt: appointment.updated_at || new Date().toISOString()
              };
              return [...prev, newAppointment];
            });
            
            toast('New Appointment', {
              description: `${appointment.title || 'Appointment'} scheduled for ${appointment.scheduled_start ? new Date(appointment.scheduled_start).toLocaleString() : 'unknown date'}`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
            
          case 'UPDATE':
            // Type-safe conversion for UPDATE event
            setAppointments((prev: Appointment[]) => 
              prev.map(item => {
                if (item.id === appointment.id) {
                  return {
                    ...item,
                    title: appointment.title || item.title,
                    date: appointment.scheduled_start || item.date,
                    startTime: appointment.scheduled_start ? new Date(appointment.scheduled_start).toLocaleTimeString() : item.startTime,
                    endTime: appointment.scheduled_end ? new Date(appointment.scheduled_end).toLocaleTimeString() : item.endTime,
                    status: (appointment.status as Appointment['status']) || item.status,
                    location: appointment.meeting_link || item.location,
                    notes: appointment.notes || item.notes,
                    updatedAt: appointment.updated_at || new Date().toISOString()
                  };
                }
                return item;
              })
            );
            
            toast('Appointment Updated', {
              description: `Status: ${(appointment.status || '').toUpperCase()}`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
            
          case 'DELETE':
            // Type-safe handling for DELETE event
            if (payload.old && payload.old.id) {
              setAppointments((prev: Appointment[]) => 
                prev.filter(item => item.id !== payload.old.id)
              );
              
              toast('Appointment Canceled', {
                description: `An appointment has been canceled`,
              });
            }
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
        
        const notification = payload.new || {};
        
        toast(notification.title || 'New Notification', {
          description: notification.message || '',
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
