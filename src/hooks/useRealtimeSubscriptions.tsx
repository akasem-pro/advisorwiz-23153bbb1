
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';
import { useUser } from '../context/UserContext';
import { Appointment, AppointmentStatus } from '../types/timeTypes';

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
        // Create a safe reference to the payload.new
        const appointmentData = payload.new || {};
        
        switch (eventType) {
          case 'INSERT': {
            // Ensure we're creating an object that matches the Appointment type
            const newAppointment: Appointment = {
              id: appointmentData.id || '',
              categoryId: '', // Required field, providing a default empty string
              title: appointmentData.title || 'Appointment',
              date: appointmentData.scheduled_start || new Date().toISOString(),
              startTime: appointmentData.scheduled_start 
                ? new Date(appointmentData.scheduled_start).toLocaleTimeString() 
                : '',
              endTime: appointmentData.scheduled_end 
                ? new Date(appointmentData.scheduled_end).toLocaleTimeString() 
                : '',
              advisorId: appointmentData.advisor_id || '',
              consumerId: appointmentData.consumer_id || '',
              status: (appointmentData.status as AppointmentStatus) || 'pending',
              location: appointmentData.meeting_link || '',
              notes: appointmentData.notes || '',
              createdAt: appointmentData.created_at || new Date().toISOString(),
              updatedAt: appointmentData.updated_at || new Date().toISOString()
            };
            
            // Update state in a type-safe way
            setAppointments((prevAppointments: Appointment[]) => [...prevAppointments, newAppointment]);
            
            // Show a notification about the new appointment
            toast('New Appointment', {
              description: `${appointmentData.title || 'Appointment'} scheduled for ${
                appointmentData.scheduled_start 
                  ? new Date(appointmentData.scheduled_start).toLocaleString() 
                  : 'unknown date'
              }`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
          }
            
          case 'UPDATE': {
            // Update existing appointment in state
            setAppointments((prevAppointments: Appointment[]) => 
              prevAppointments.map(item => {
                if (item.id === appointmentData.id) {
                  return {
                    ...item,
                    title: appointmentData.title || item.title,
                    date: appointmentData.scheduled_start || item.date,
                    startTime: appointmentData.scheduled_start 
                      ? new Date(appointmentData.scheduled_start).toLocaleTimeString() 
                      : item.startTime,
                    endTime: appointmentData.scheduled_end 
                      ? new Date(appointmentData.scheduled_end).toLocaleTimeString() 
                      : item.endTime,
                    status: (appointmentData.status as AppointmentStatus) || item.status,
                    location: appointmentData.meeting_link || item.location,
                    notes: appointmentData.notes || item.notes,
                    updatedAt: appointmentData.updated_at || new Date().toISOString()
                  };
                }
                return item;
              })
            );
            
            // Show update notification
            toast('Appointment Updated', {
              description: `Status: ${(appointmentData.status || '').toUpperCase()}`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
          }
            
          case 'DELETE': {
            // Remove deleted appointment from state
            if (payload.old && payload.old.id) {
              setAppointments((prevAppointments: Appointment[]) => 
                prevAppointments.filter(item => item.id !== payload.old.id)
              );
              
              // Show cancellation notification
              toast('Appointment Canceled', {
                description: `An appointment has been canceled`,
              });
            }
            break;
          }
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
        
        // Make sure notification exists, otherwise use empty object
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
