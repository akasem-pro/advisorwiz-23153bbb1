
import { useState, useCallback, useRef, useEffect } from 'react';
import { Chat, ChatMessage } from '../../types/chatTypes';
import { Appointment, AppointmentStatus } from '../../types/timeTypes';
import { addMessageToChat, markChatMessagesAsRead } from '../../services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { trackEvent } from '../../services/analytics/analyticsService';
import { withPerformanceTracking } from '../../services/performance/performanceService';

/**
 * Enhanced hook to manage chats and appointments with performance tracking and analytics
 */
export const useCommunicationManagement = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use refs to track if components are mounted
  const isMounted = useRef(true);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  /**
   * Add a new message to a chat with analytics tracking
   */
  const addMessage = useCallback((chatId: string, message: Omit<ChatMessage, 'id'>) => {
    setChats(prevChats => {
      const updatedChats = addMessageToChat(prevChats, chatId, message);
      
      // Track this action for analytics
      trackEvent('chat_message_sent', {
        chat_id: chatId,
        sender_type: message.senderId === message.recipientId ? 'self' : 'other'
      });
      
      return updatedChats;
    });
  }, []);

  /**
   * Mark all messages in a chat as read for a specific user
   */
  const markChatAsRead = useCallback((chatId: string, userId: string) => {
    setChats(prevChats => {
      const updatedChats = markChatMessagesAsRead(prevChats, chatId, userId);
      
      // Track this action for analytics
      trackEvent('chat_messages_read', {
        chat_id: chatId,
        user_id: userId
      });
      
      return updatedChats;
    });
  }, []);

  /**
   * Create a new chat or get existing chat between two users
   */
  const getOrCreateChat = useCallback((userId1: string, userId2: string, userName1: string, userName2: string) => {
    // Check if chat already exists
    const existingChat = chats.find(chat => 
      chat.participants.includes(userId1) && 
      chat.participants.includes(userId2)
    );
    
    if (existingChat) {
      return existingChat;
    }
    
    // Create a new chat
    const newChat: Chat = {
      id: uuidv4(),
      participants: [userId1, userId2],
      participantData: {
        [userId1]: { name: userName1 },
        [userId2]: { name: userName2 }
      },
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setChats(prev => [...prev, newChat]);
    
    // Track chat creation
    trackEvent('chat_created', {
      chat_id: newChat.id,
      participant_count: 2
    });
    
    return newChat;
  }, [chats]);

  /**
   * Add a new appointment
   */
  const addAppointment = useCallback((appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    // Track appointment creation
    trackEvent('appointment_created', {
      appointment_id: newAppointment.id,
      appointment_category: appointmentData.category,
      advisor_id: appointmentData.advisorId,
      consumer_id: appointmentData.consumerId
    });
    
    return newAppointment;
  }, []);

  /**
   * Update an appointment's status
   */
  const updateAppointmentStatus = useCallback((appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prev => {
      const updatedAppointments = prev.map(appointment => {
        if (appointment.id === appointmentId) {
          // Track status change
          trackEvent('appointment_status_updated', {
            appointment_id: appointmentId,
            old_status: appointment.status,
            new_status: status
          });
          
          return {
            ...appointment,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return appointment;
      });
      
      return updatedAppointments;
    });
  }, []);

  /**
   * Get all appointments for a user
   */
  const getUserAppointments = useCallback((userId: string) => {
    return appointments.filter(appointment => 
      appointment.advisorId === userId || appointment.consumerId === userId
    );
  }, [appointments]);

  /**
   * Get all chats for a user
   */
  const getUserChats = useCallback((userId: string) => {
    return chats.filter(chat => 
      chat.participants.includes(userId)
    );
  }, [chats]);

  // Wrap key functions with performance tracking
  const trackedAddMessage = withPerformanceTracking(addMessage, 'addMessage');
  const trackedMarkChatAsRead = withPerformanceTracking(markChatAsRead, 'markChatAsRead');
  const trackedAddAppointment = withPerformanceTracking(addAppointment, 'addAppointment');
  const trackedUpdateAppointmentStatus = withPerformanceTracking(updateAppointmentStatus, 'updateAppointmentStatus');

  return {
    chats, setChats,
    appointments, setAppointments,
    isLoading,
    error,
    addMessage: trackedAddMessage,
    markChatAsRead: trackedMarkChatAsRead,
    getOrCreateChat,
    addAppointment: trackedAddAppointment,
    updateAppointmentStatus: trackedUpdateAppointmentStatus,
    getUserAppointments,
    getUserChats
  };
};

export default useCommunicationManagement;
