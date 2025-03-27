
import { useState } from 'react';
import { Chat } from '../../types/chatTypes';
import { Appointment } from '../../types/timeTypes';

/**
 * Hook to manage user communication (chats and appointments)
 */
export const useCommunicationManagement = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  /**
   * Add a new message to a chat
   */
  const addMessage = (chatId: string, senderId: string, text: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: `msg-${Date.now()}`,
                senderId,
                text,
                timestamp: new Date().toISOString(),
                isRead: false
              }
            ]
          };
        }
        return chat;
      });
    });
  };
  
  /**
   * Mark a chat as read for a specific user
   */
  const markChatAsRead = (chatId: string, userId: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map(message => {
              if (message.senderId !== userId && !message.isRead) {
                return { ...message, isRead: true };
              }
              return message;
            })
          };
        }
        return chat;
      });
    });
  };
  
  /**
   * Add a new appointment
   */
  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };
  
  /**
   * Update the status of an appointment
   */
  const updateAppointmentStatus = (appointmentId: string, status: string) => {
    setAppointments(prev => {
      return prev.map(appointment => {
        if (appointment.id === appointmentId) {
          return { ...appointment, status };
        }
        return appointment;
      });
    });
  };
  
  return {
    chats, 
    setChats,
    addMessage, 
    markChatAsRead,
    appointments, 
    setAppointments,
    addAppointment, 
    updateAppointmentStatus
  };
};
