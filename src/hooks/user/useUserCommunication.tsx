
import { useState, useCallback } from 'react';
import { Chat, ChatMessage } from '../../types/chatTypes';
import { Appointment, AppointmentStatus } from '../../types/timeTypes';
import { 
  addMessageToChat, 
  markChatMessagesAsRead 
} from '../../services/chatService';

/**
 * Hook to manage user communication state and operations
 */
export const useUserCommunication = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Chat operations
  const addMessage = useCallback((chatId: string, message: Omit<ChatMessage, 'id'>) => {
    setChats(prevChats => addMessageToChat(prevChats, chatId, message));
  }, []);

  const markChatAsRead = useCallback((chatId: string, userId: string) => {
    setChats(prevChats => markChatMessagesAsRead(prevChats, chatId, userId));
  }, []);

  // Appointment operations
  const addAppointment = useCallback((appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `appointment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  }, []);

  const updateAppointmentStatus = useCallback((appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status, updatedAt: new Date().toISOString() } 
          : appointment
      )
    );
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
