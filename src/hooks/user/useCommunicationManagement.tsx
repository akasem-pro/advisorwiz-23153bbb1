
import { useState, useCallback } from 'react';
import { Chat, ChatMessage } from '../../types/chatTypes';
import { Appointment, AppointmentStatus } from '../../types/timeTypes';
import { 
  addMessageToChat,
  markChatMessagesAsRead 
} from '../../services/chatService';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook to manage chats and appointments
 */
export const useCommunicationManagement = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  /**
   * Add a new message to a chat
   */
  const addMessage = useCallback((chatId: string, message: Omit<ChatMessage, 'id'>) => {
    setChats(prevChats => addMessageToChat(prevChats, chatId, message));
  }, []);

  /**
   * Mark all messages in a chat as read for a specific user
   */
  const markChatAsRead = useCallback((chatId: string, userId: string) => {
    setChats(prevChats => markChatMessagesAsRead(prevChats, chatId, userId));
  }, []);

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
  }, []);

  /**
   * Update an appointment's status
   */
  const updateAppointmentStatus = useCallback((appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prev => {
      return prev.map(appointment => {
        if (appointment.id === appointmentId) {
          return {
            ...appointment,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return appointment;
      });
    });
  }, []);

  return {
    chats, setChats,
    appointments, setAppointments,
    addMessage,
    markChatAsRead,
    addAppointment,
    updateAppointmentStatus
  };
};
