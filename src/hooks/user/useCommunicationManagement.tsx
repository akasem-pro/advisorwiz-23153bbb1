
import { useState } from 'react';
import { Chat, ChatMessage } from '../../types/chatTypes';
import { Appointment, AppointmentStatus } from '../../types/timeTypes';
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
  const addMessage = (chatId: string, senderId: string, text: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          // Create a properly typed ChatMessage
          const newMessage: ChatMessage = {
            id: uuidv4(),
            senderId,
            senderName: '', // This should be populated from somewhere
            recipientId: chat.participants.find(p => p !== senderId) || '',
            recipientName: '', // This should be populated from somewhere
            content: text,
            timestamp: new Date().toISOString(),
            read: false
          };
          
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastUpdated: new Date().toISOString()
          };
        }
        return chat;
      });
    });
  };

  /**
   * Mark all messages in a chat as read for a specific user
   */
  const markChatAsRead = (chatId: string, userId: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map(msg => {
              if (msg.recipientId === userId && !msg.read) {
                return { ...msg, read: true };
              }
              return msg;
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
  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAppointments(prev => [...prev, newAppointment]);
  };

  /**
   * Update an appointment's status
   */
  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
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
